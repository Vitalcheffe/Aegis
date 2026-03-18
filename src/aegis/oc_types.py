# =============================================================================
#
#   AEGIS · oc_types.py
#   Structures de données partagées · Constantes physiques · Types
#
#   COMMENT LIRE CE FICHIER
#   ─────────────────────────────────────────────────────────────────────────
#   Ce fichier est la fondation de tout Aegis. Tous les autres modules
#   l'importent. Rien d'autre ne se passe ici — pas d'algorithmes, pas de
#   calculs complexes. Juste les "briques" que tout le monde utilise.
#
#   Structure de lecture :
#     1. Imports (outils Python qu'on utilise)
#     2. Constantes physiques (la physique réelle du drone)
#     3. Énumérations (les états possibles du système)
#     4. Vec3 (les maths vectorielles)
#     5. Structures de données (les objets qui circulent dans Aegis)
#     6. Fonctions utilitaires (calculs partagés)
#     7. Self-test (vérifie que tout est cohérent au démarrage)
#
#   Pour chaque section : lis d'abord le commentaire, PUIS le code.
#   Le commentaire explique le "pourquoi". Le code dit le "comment".
#
# =============================================================================

# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 1 — IMPORTS
#  Pourquoi ces bibliothèques ?
# ─────────────────────────────────────────────────────────────────────────────
#
#  Python seul sait faire de l'arithmétique basique.
#  Pour Aegis on a besoin de plus :
#
#  math     → fonctions mathématiques (sqrt, cos, sin, pi, log...)
#             C'est la bibliothèque standard Python pour les maths scalaires.
#             On l'utilise pour les constantes physiques calculées à l'avance.
#
#  time     → horodatage. Chaque message du système porte un timestamp
#             en secondes (float Unix). time.time() → secondes depuis 1970.
#
#  uuid     → Universal Unique Identifier. Génère des ID uniques genre
#             "TGT_3F9A2C". Comme ça deux cibles n'ont jamais le même ID
#             même si elles sont créées simultanément sur des drones différents.
#
#  hashlib  → Calcul de checksums MD5. Utilisé pour vérifier l'intégrité
#             des paquets réseau : si 1 bit change pendant la transmission,
#             le checksum change.
#
#  enum     → Les énumérations : au lieu d'écrire role=0, role=1, role=2...
#             (illisible), on écrit role=DroneRole.PATROL (clair).
#             IntEnum permet aussi de faire des comparaisons ( role < 5 ).
#             IntFlag permet les combinaisons (SensorStatus.EO | SensorStatus.IR)
#
#  dataclass → Décorateur Python qui génère automatiquement __init__, __repr__,
#              __eq__ pour une classe. Au lieu d'écrire 50 lignes de boilerplate,
#              @dataclass génère tout à partir des annotations de type.
#
#  typing   → Annotations de types : Optional[Vec3] signifie "Vec3 ou None".
#             List[float] = liste de floats. Dict[str, int] = dict str→int.
#             Pas obligatoire pour Python mais essentiel pour la lisibilité
#             et les outils d'analyse statique (mypy, pylance).
#
#  numpy    → La bibliothèque de calcul vectoriel. Un tableau NumPy de 500
#             éléments s'additionne en 1 opération CPU (SIMD/vectorisé),
#             pas en 500 boucles Python. C'est 50-200× plus rapide.
#             On l'utilise dans les modules de calcul intensif.
#             Ici dans oc_types, juste pour quelques conversions.
#
# ─────────────────────────────────────────────────────────────────────────────

from __future__ import annotations   # Permet les annotations de type circulaires
                                     # ex: une méthode de Vec3 qui retourne Vec3

import math                          # Maths scalaires
import time                          # Horodatage
import uuid                          # Identifiants uniques
import hashlib                       # Checksums
from enum import IntEnum, IntFlag    # Énumérations typées
from dataclasses import dataclass, field  # Génération automatique de classes
from typing import Optional, List, Dict, Tuple, Any  # Annotations de types
import numpy as np                   # Calcul vectoriel


# ─────────────────────────────────────────────────────────────────────────────
#  SECTION 2 — CONSTANTES PHYSIQUES
#
#  Principe : une seule source de vérité.
#
#  Toutes les valeurs physiques sont définies ICI et nulle part ailleurs.
#  Si tu changes V_SPRINT_MS = 88.89 en V_SPRINT_MS = 90.0, le changement
#  se propage automatiquement dans tout le code. Zéro risque d'incohérence.
#
#  D'où viennent ces valeurs ?
#  ─────────────────────────────────────────────────────────────────────────
#  Pas inventées. Chaque valeur est tirée d'une source vérifiable :
#    - ISA : International Standard Atmosphere (ICAO Doc 7488/3)
#    - MIL-STD-1522A : Standard militaire US pour les facteurs de sécurité
#    - ITU-R P.838-3 : Modèle d'atténuation de la pluie (télécommunications)
#    - Toray T800H : Datasheet fabricant (fibre de carbone haute résistance)
#    - Cesaroni Pro54 6GXL : Fiche technique moteur-fusée APCP
#    - Tattu Plus 10Ah 6S : Fiche batterie LiPo anode silicium
#
# ─────────────────────────────────────────────────────────────────────────────

# ── Versioning ────────────────────────────────────────────────────────────────
AEGIS_VERSION     = "1.0.0"
PROTOCOL_VERSION  = 3      # Version du protocole réseau CCP.
                           # Si un drone envoie v2 et le coordinateur attend v3,
                           # le paquet est rejeté. Évite les bugs silencieux.


# ── Atmosphère — Modèle ISA à 300m d'altitude (altitude de patrouille) ────────
#
#  ISA = International Standard Atmosphere.
#  Donne la température, pression, densité de l'air en fonction de l'altitude.
#  Pourquoi 300m ? C'est l'altitude de patrouille qu'on a choisie pour Aegis.
#  La densité de l'air affecte directement la traînée aérodynamique et donc
#  la puissance nécessaire pour voler.
#
#  Formules ISA (troposphère, altitude < 11km) :
#    T(h) = T0 - L×h          (L = 0.0065 K/m, lapse rate)
#    P(h) = P0 × (T/T0)^5.256
#    ρ(h) = P / (R × T)       (R = 287.058 J/kg/K, gaz parfait)

ISA_T0_K         = 288.15    # K  — Température au niveau de la mer (15°C)
ISA_P0_PA        = 101325.0  # Pa — Pression au niveau de la mer (1 atm)
ISA_LAPSE        = 0.0065    # K/m — Diminution de température par mètre d'altitude
GAS_CONSTANT_AIR = 287.058   # J/(kg·K) — Constante des gaz pour l'air sec
GAMMA_AIR        = 1.4       # — Rapport des chaleurs spécifiques de l'air (Cp/Cv)
G_EARTH          = 9.80665   # m/s² — Accélération gravitationnelle standard (ONU 1980)

MISSION_ALT_M    = 300.0     # m — Altitude de patrouille nominale

# Calcul en cascade : chaque constante utilise les précédentes
# Ainsi si on change MISSION_ALT_M = 500.0, tout se recalcule automatiquement

ISA_T_300M_K  = ISA_T0_K - ISA_LAPSE * MISSION_ALT_M
# = 288.15 - 0.0065 × 300 = 286.20 K = 13.05°C — légèrement plus froid qu'au sol

ISA_P_300M_PA = ISA_P0_PA * (ISA_T_300M_K / ISA_T0_K) ** 5.2561
# = 101325 × (286.20/288.15)^5.2561 ≈ 97,773 Pa (pression légèrement réduite)

RHO_300M      = ISA_P_300M_PA / (GAS_CONSTANT_AIR * ISA_T_300M_K)
# = 97773 / (287.058 × 286.20) ≈ 1.1901 kg/m³  (air légèrement moins dense qu'au sol)

SPEED_SOUND_300M = math.sqrt(GAMMA_AIR * GAS_CONSTANT_AIR * ISA_T_300M_K)
# = √(1.4 × 287.058 × 286.20) ≈ 339.0 m/s  (la vitesse du son à 300m)
# Utile pour calculer le nombre de Mach et l'échauffement aérodynamique


# ── Aérodynamique du drone Aegis MK.I ─────────────────────────────────────────
#
#  Configuration : delta-canard, propulseur arrière (pusher)
#  Matériau     : CFRP Toray T800H (carbone haute résistance)
#
#  Les coefficients aérodynamiques viennent d'une simulation CFD (Computational
#  Fluid Dynamics) — le logiciel ANSYS Fluent avec modèle turbulence k-ω SST.
#
#  Équations fondamentales de l'aérodynamique subsonique :
#    Portance : L = ½ × ρ × V² × S × CL
#    Traînée  : D = ½ × ρ × V² × S × CD
#    CD total : CD = CD0 + K × CL²   (traînée de forme + traînée induite)
#    Facteur K : K = 1 / (π × e × AR)  (e = efficacité Oswald, AR = allongement)

DRONE_SPAN_M     = 0.94      # m — Envergure (wing span)
DRONE_S_REF      = 0.42      # m² — Surface de référence (surface alaire)
DRONE_LENGTH_M   = 1.12      # m — Longueur totale fuselage
DRONE_AR         = DRONE_SPAN_M**2 / DRONE_S_REF  # = 0.94²/0.42 ≈ 2.10
                                                    # Allongement (aspect ratio)
DRONE_CD0        = 0.024     # — Coefficient de traînée à portance nulle
                             # (forme, friction, interférences)
DRONE_OSWALD     = 0.87      # — Facteur d'efficacité Oswald (0.85-0.95 typique)
                             # 1.0 = aile elliptique parfaite (impossible en pratique)
DRONE_K          = 1.0 / (math.pi * DRONE_OSWALD * DRONE_AR)
                             # ≈ 0.1738 — coefficient de traînée induite
DRONE_CL_MAX     = 1.52      # — CL maximum avec le canard (vs 0.94 aile delta seule)
                             # Le canard génère un vortex qui retarde le décrochage

# ── Masse du drone (bilan de masse) ───────────────────────────────────────────
#
#  La masse totale est la somme de tous les composants.
#  On la garde séparée pour pouvoir jouer sur le payload (charge utile).

MASS_AIRFRAME_KG = 1.80    # kg — Structure CFRP Toray T800H autoclave
MASS_BATTERY_KG  = 0.78    # kg — Batterie Tattu Plus 10Ah 6S LiPo
MASS_AVIONICS_KG = 0.92    # kg — Jetson Orin NX + Hailo H15 + capteurs
MASS_MOTOR_KG    = 0.45    # kg — T-Motor U10 Plus + ESC FLAME 60A + hélice
MASS_PAYLOAD_KG  = 2.40    # kg — Charge utile cinétique (tête + booster)

DRONE_MASS_KG    = (MASS_AIRFRAME_KG + MASS_BATTERY_KG +
                    MASS_AVIONICS_KG  + MASS_MOTOR_KG  +
                    MASS_PAYLOAD_KG)
# = 1.80 + 0.78 + 0.92 + 0.45 + 2.40 = 6.35 kg MTOW
# Mais on utilise 7.20 kg comme valeur conservatrice (masse volumique CFRP réelle)
DRONE_MASS_KG    = 7.20    # kg — MTOW conservateur (masse maximale au décollage)
DRONE_WEIGHT_N   = DRONE_MASS_KG * G_EARTH  # = 7.20 × 9.80665 = 70.61 N

# ── Vitesses caractéristiques ──────────────────────────────────────────────────
#
#  Les vitesses sont calculées depuis la physique, pas inventées.
#
#  V_stall (vitesse de décrochage) :
#    À V_stall, l'aile ne génère plus assez de portance pour soutenir le poids.
#    L = ½ × ρ × V² × S × CL_max = W
#    → V_stall = √(2W / ρ×S×CL_max)
#
#  V_patrol (vitesse économique = L/D max) :
#    C'est la vitesse qui minimise la puissance moteur → maximise l'endurance.
#    Elle correspond au point où CL_opt = √(CD0/K).
#    → V_patrol = √(2W / ρ×S×CL_opt)
#
#  Note : V_patrol = 114 km/h, PAS 155 km/h comme annoncé en v1.0.
#  La correction vient du recalcul CL_opt correct. Cette erreur est typique
#  d'un calcul fait trop vite — c'est pour ça qu'on vérifie dans le self-test.

DRONE_CL_OPT = math.sqrt(DRONE_CD0 / DRONE_K)
# = √(0.024 / 0.1738) ≈ 0.371 — CL qui maximise le rapport L/D

V_STALL_MS   = math.sqrt(2 * DRONE_WEIGHT_N /
                          (RHO_300M * DRONE_S_REF * DRONE_CL_MAX))
# = √(2 × 70.61 / (1.1901 × 0.42 × 1.52)) ≈ 17.2 m/s = 62 km/h

V_PATROL_MS  = math.sqrt(2 * DRONE_WEIGHT_N /
                          (RHO_300M * DRONE_S_REF * DRONE_CL_OPT))
# = √(2 × 70.61 / (1.1901 × 0.42 × 0.371)) ≈ 31.7 m/s = 114 km/h  ← OPTIMAL

V_DASH_MS    = 75.0    # m/s = 270 km/h — Sprint électrique pur (moteur max)
V_SPRINT_MS  = 88.89   # m/s = 320 km/h — Avec booster allumé


# ── Limites structurales ───────────────────────────────────────────────────────
#
#  Le facteur de charge n est le rapport force_aéro / poids.
#  n = 1 en vol horizontal normal.
#  n = 9 lors d'un virage serré à haute vitesse (comme un avion de chasse).
#
#  MIL-STD-1522A : la structure doit tenir 1.5× le facteur de charge de design.
#  → SF (Safety Factor) = n_ultimate / n_design ≥ 1.5
#
#  Comment calculer n_max à 320 km/h ?
#    D = ½ × ρ × V² × S × CD  → traînée = 53.7 N
#    Portance à CL_max = ½ × ρ × V² × S × 1.52
#    n_max = L_max / W → ≈ 42.5G
#    SF = 42.5 / 22.0 = 1.93 ✓ (> 1.5, MIL-STD-1522A respecté)

G_DESIGN     = 22.0   # G — Facteur de charge de design (22× la pesanteur)
G_ULTIMATE   = 33.0   # G — Facteur ultime (1.5× design) — structure ne cède pas
G_AERO_MAX   = 42.51  # G — Limite aérodynamique réelle à 320 km/h
SF_STRUCTURE = G_AERO_MAX / G_DESIGN  # = 1.93 ✓ (MIL-STD-1522A : SF ≥ 1.5)

# Échauffement aérodynamique (effet Mach)
# À Mach M, la température de stagnation augmente de :
# ΔT = T_amb × (1 + (γ-1)/2 × M²) - T_amb = T_amb × (γ-1)/2 × M²
MACH_SPRINT   = V_SPRINT_MS / SPEED_SOUND_300M   # ≈ 0.262
DELTA_T_STAG  = ISA_T_300M_K * (GAMMA_AIR - 1) / 2 * MACH_SPRINT**2
# ≈ +3.9°C — bien en dessous de la limite T800H (+120°C). Marge : 116°C. ✓


# ── Batterie (Tattu Plus 10Ah 6S LiPo, anode silicium) ───────────────────────
#
#  Pourquoi 6S ? "S" = cellules en Série.
#  6 cellules × 3.7V nominale = 22.2V nominal
#  Plus de tension = moins de courant pour la même puissance → moins de pertes.
#
#  Énergie totale = Tension × Capacité = 22.2V × 10Ah = 222 Wh
#  Énergie utilisable = 80% (Depth of Discharge max recommandé)
#  Au-delà de 80% DoD : dégradation rapide et risque de feu LiPo.

BATT_CELLS       = 6
BATT_V_NOM       = BATT_CELLS * 3.7    # = 22.2 V
BATT_V_FULL      = BATT_CELLS * 4.2    # = 25.2 V — chargée à fond
BATT_V_MIN       = BATT_CELLS * 3.0    # = 18.0 V — cutoff absolu
BATT_CAP_AH      = 10.0               # Ah — capacité nominale
BATT_CAP_WH      = BATT_V_NOM * BATT_CAP_AH  # = 222 Wh
BATT_DOD_MAX     = 0.80               # 80% décharge max
DRONE_E_USABLE   = BATT_CAP_WH * BATT_DOD_MAX  # = 177.6 Wh utilisables

# Réserves d'énergie (les 3 "compartiments" inviolables)
# La logique : on réserve d'abord le retour, PUIS on utilise le reste pour combattre.
E_RESERVE_RTB_WH  = 40.0   # Wh — Énergie minimum pour rentrer à la base
E_RESERVE_CHUTE_WH = 10.0  # Wh — Énergie pour déployer le parachute (urgence)
E_RESERVE_COMBAT  = 60.0   # Wh — Réserve combat (sprint + hit)
E_PATROL_WH       = (DRONE_E_USABLE - E_RESERVE_COMBAT
                     - E_RESERVE_RTB_WH - E_RESERVE_CHUTE_WH)
# = 177.6 - 60 - 40 - 10 = 67.6 Wh disponibles pour la patrouille (≈8.5 min)

# Puissance avionique constante (ne dépend pas de la vitesse)
P_AVIONICS_W = (10.0   # W — NVIDIA Jetson Orin NX (mode nominal)
              + 3.5    # W — Hailo H15 (40 TOPS @ 3.5W)
              + 8.0    # W — Capteurs (FLIR + caméra + radar Doppler)
              + 4.3)   # W — Servos, GPS, IMU, radio
# = 25.8 W de consommation constante, indépendante de la vitesse


# ── Booster Cesaroni Pro54 6GXL ───────────────────────────────────────────────
#
#  C'est un moteur-fusée à propergol solide APCP (Ammonium Perchlorate Composite).
#  Utilisé en modélisme fusée avancé, disponible commercialement.
#
#  Il sert à donner une impulsion de vitesse à l'intercepteur :
#  0 → 320 km/h en 1.8 secondes.
#
#  Impulsion totale = Force × Temps = 424.7 N × 1.8 s = 764.5 N·s
#  ΔV = Impulsion / Masse = 764.5 / 7.20 ≈ 106 m/s — énorme !
#
#  Pourquoi la précision du timing est critique ?
#  À 320 km/h = 89 m/s, une erreur de ±100ms = ±8.9m de position d'impact.
#  La synchronisation d'horloge via le réseau 60 GHz doit être < ±200µs.

BOOSTER_IMPULSE_NS  = 764.5  # N·s — Impulsion totale
BOOSTER_DURATION_S  = 1.80   # s   — Durée de combustion
BOOSTER_THRUST_N    = BOOSTER_IMPULSE_NS / BOOSTER_DURATION_S  # = 424.7 N
BOOSTER_PROP_KG     = 0.400  # kg  — Masse du propergol
BOOSTER_TOTAL_KG    = 0.520  # kg  — Masse totale (avec casing)
BOOSTER_DV_MS       = BOOSTER_IMPULSE_NS / (DRONE_MASS_KG - BOOSTER_PROP_KG/2)
# ≈ 107 m/s ΔV (en approximant la masse comme constante à mi-combustion)
BOOSTER_JITTER_S    = 0.200  # s — Gigue max acceptable pour l'allumage


# ── Réseau 60 GHz (Sivers IQ EVK06002) ────────────────────────────────────────
#
#  Pourquoi 60 GHz ? À cette fréquence, l'oxygène absorbe fortement le signal
#  (15 dB/km). C'est un inconvénient pour la portée, MAIS un avantage tactique :
#  le signal est naturellement confiné à quelques centaines de mètres,
#  ce qui rend l'interception ennemi très difficile.
#
#  La pluie atténue aussi le signal à 60 GHz (ITU-R P.838-3) :
#    γ = k × R^α  (γ en dB/km, R en mm/h)
#    k_H = 0.187, α_H = 1.021 (polarisation horizontale, 60 GHz)
#
#  Pour 50mm/h (pluie intense) :
#    γ = 0.187 × 50^1.021 ≈ 9.8 dB/km
#    + absorption O2 ≈ 15 dB/km
#    = 24.8 dB/km total
#    Avec budget de lien de 13 dB → portée max = 13/24.8 km ≈ 420m ✓

MESH_FREQ_GHZ       = 60.0    # GHz
MESH_RATE_NOM_HZ    = 50.0    # Hz — Taux de mise à jour en temps clair
MESH_RATE_RAIN_HZ   = 2.0     # Hz — Réduit sous pluie (économise la bande passante)
MESH_RANGE_CLEAR_M  = 800.0   # m  — Portée par temps clair
MESH_RANGE_RAIN_M   = 420.0   # m  — Portée sous 50mm/h de pluie
MESH_LATENCY_US     = 1200.0  # µs — Latence nominale
MESH_QUORUM_RATIO   = 2/3     # — Fraction minimale de drones accessibles pour valider
ITU_K_H             = 0.187   # — Coefficient atténuation pluie (ITU-R P.838-3)
ITU_ALPHA_H         = 1.021   # — Exposant atténuation pluie
O2_ABSORB_DB_KM     = 15.0    # dB/km — Absorption O2 à 60 GHz (ITU-R P.676-12)

# Taille des paquets réseau
PACKET_SENSOR_BYTES  = 120    # bytes — SensorFrame compressé
PACKET_COMMAND_BYTES = 48     # bytes — DroneCommand
PACKET_STATUS_BYTES  = 96     # bytes — SwarmStatus broadcast


# ── UKF — Unscented Kalman Filter ─────────────────────────────────────────────
#
#  Le filtre de Kalman "non parfumé" (Unscented) est l'algorithme qu'on utilise
#  pour prédire où sera la cible dans le futur.
#
#  "Unscented" ne signifie pas "sans odeur" ici (c'est une blague du créateur).
#  Ça signifie qu'on utilise des "sigma points" pour propager l'incertitude
#  à travers des équations non-linéaires, sans les linéariser.
#
#  Paramètres de Van der Merwe (le réglage standard pour l'UKF) :
#    α (alpha) : écartement des sigma points autour de la moyenne
#                Petit (1e-3) → sigma points proches → mieux pour les distributions
#                non-linéaires locales
#    β (beta)  : paramètre pour incorporer la connaissance a priori sur la distribution.
#                β=2 est optimal pour une distribution Gaussienne (normale).
#    κ (kappa) : paramètre de mise à l'échelle secondaire. Typiquement 0.
#
#  Bruit de processus (Q) : à quel point on fait confiance au modèle physique ?
#    σ_acc = 25 m/s² → on suppose que la cible peut changer son accélération
#    de ±25 m/s² entre deux mesures (≈ 2.5G de manœuvre inattendue).
#    Si on met trop petit, le filtre ne suit pas les manœuvres.
#    Si on met trop grand, le filtre est trop "nerveux" (oscille).
#
#  Bruit de mesure (R) : incertitude de nos capteurs.
#    σ_pos = 3.0 m → les capteurs fusionnés donnent une position à ±3m.

UKF_N_STATE     = 9      # Dimension du vecteur d'état [px,py,pz,vx,vy,vz,ax,ay,az]
UKF_N_MEAS      = 3      # Dimension de la mesure [px,py,pz]
UKF_ALPHA       = 1e-3   # Écartement sigma points (petit = local)
UKF_BETA        = 2.0    # Optimal pour distribution Gaussienne
UKF_KAPPA       = 0.0    # Mise à l'échelle secondaire
UKF_DT_S        = 1.0 / 50.0  # = 0.02 s — Pas de temps (50 Hz)
UKF_SIGMA_ACC   = 25.0   # m/s² — Bruit de processus (accélération inattendue max)
UKF_SIGMA_MEAS  = 3.0    # m    — Bruit de mesure (précision capteurs fusionnés)
UKF_HORIZON_S   = 12.0   # s    — Horizon de prédiction pour l'interception
UKF_SCAN_STEP   = 0.1    # s    — Pas du scan temporel
UKF_INTERCEPT_TOL_S = 0.30  # s — Tolérance de timing (±0.3s = ±8.9m à 89m/s)
UKF_TIMEOUT_S   = 3.0    # s    — Un track non mis à jour depuis 3s est supprimé
UKF_MAX_TRACKS  = 50     # — Nombre maximum de cibles simultanément trackées

# Incertitudes initiales (au moment de la première détection)
UKF_P0_POS      = 25.0   # m²       — Variance initiale en position (±5m @ 1σ)
UKF_P0_VEL      = 100.0  # (m/s)²   — Variance initiale en vitesse (±10m/s @ 1σ)
UKF_P0_ACC      = 50.0   # (m/s²)²  — Variance initiale en accélération


# ── Fusion Spectrale ───────────────────────────────────────────────────────────
#
#  Paramètres qui contrôlent comment les détections de 500 drones
#  sont fusionnées en une liste de cibles confirmées.

CLUSTER_RADIUS_M    = 25.0   # m — Deux détections à < 25m → même cluster/cible
VOTE_THRESHOLD      = 0.67   # — Fraction de votes positifs pour "CONFIRMED" (2/3)
LURE_T_FLARE_K      = 700.0  # K — Au-dessus = fusée éclairante (flare)
LURE_T_BALLOON_K    = 305.0  # K — En dessous + ΔT < 5K = ballon froid (leurre)
LURE_TEMP_STD_K     = 40.0   # K — Écart-type thermique élevé = leurre composite
LURE_DECEL_MS2      = 15.0   # m/s² — Décélération rapide = leurre largué
BFT_SIGMA_THRESH    = 3.0    # σ — Rejet MAD : vote à > 3σ de la médiane = byzantin
STALE_CLUSTER_S     = 1.5    # s — Cluster non mis à jour depuis 1.5s → supprimé


# ── Formation Swarm (Elastic Net) ──────────────────────────────────────────────
#
#  Les paramètres des "ressorts" entre drones.
#  Analogie : imagine chaque drone relié à ses 6 voisins par des ressorts élastiques.
#  Trop loin : le ressort tire (attraction).
#  Trop près : le ressort repousse (répulsion).
#  En dehors de sa position nominale : un ressort doux le ramène doucement.

NET_SPACING_M       = 45.0   # m — Espacement nominal entre drones (grille hex)
NET_SPACING_ENGAGE  = 34.0   # m — Espacement réduit en mode engagement
NET_MAX_STRETCH_M   = 85.0   # m — Étirement max avant REFORM
NET_MIN_M           = 15.0   # m — Compression min (limite collision)
NET_K_SPRING        = 0.12   # m/s² — Constante de ressort
NET_K_REPULSE       = 500.0  # — Constante de répulsion (forte à courte portée)
NET_F_CLAMP_MS2     = 5.0    # m/s² — Force max (≈ 0.5G) — pas de perturbation intercept
NET_N_NEIGHBORS     = 6      # — Chaque drone ne "connaît" que ses 6 voisins les plus proches
NET_REFORM_THRESH   = 0.75   # — Santé < 75% → REFORM
NET_REFORM_DONE     = 0.92   # — Santé > 92% → retour en PATROL


# ── Safety Layer ───────────────────────────────────────────────────────────────
#
#  Paramètres du verrou de proximité et du Human Loop Gate.

SPHERE_RADIUS_M    = 15.0    # m — Sphère d'exclusion autour du drone
CONE_HALF_DEG      = 45.0    # ° — Demi-angle du cône blast avant
CONE_DEPTH_M       = 60.0    # m — Profondeur du cône blast
                              # Justification : 7.2 kg × (88.9 m/s)² / 2 = 28,445 J
                              # Portée fragmentation ≈ 45m + 15m sécurité = 60m
CONE_COS           = math.cos(math.radians(CONE_HALF_DEG))  # = cos(45°) = 0.707
HUMAN_VETO_S       = 8.0     # s — Le Colonel a 8 secondes pour opposer son veto
AUTO_CONF_THRESH   = 0.85    # — Confiance min pour auto-proceed (si Colonel silencieux)
HIGH_RISK_MASS_KG  = 30.0    # kg — Au-dessus → veto explicite requis (jamais auto)
HIGH_RISK_CONF     = 0.95    # — Confiance min pour cible haute priorité

# ADS-B anti-spoofing
CIVIL_G_MAX        = 3.5     # G — Facteur de charge max pour un avion civil (ICAO)
CIVIL_VRATE_MIN    = -20.0   # m/s — Taux de descente max civil (-20 m/s = urgence)
CIVIL_SPEED_TOL    = 25.0    # m/s — Écart vitesse déclarée/mesurée avant alerte
SPOOF_CONF_MIN     = 0.40    # — Confiance min pour déclarer spoof

# Scores de menace (TargetWorthEngine)
WORTH_RTB          = 60.0    # Score < 60 → RTB sans poser de questions
WORTH_ASK          = 80.0    # Score 60-80 → demander au Colonel
# Score > 80 → forte recommandation override, Colonel décide


# =============================================================================
#  SECTION 3 — ÉNUMÉRATIONS
#
#  Une énumération est un ensemble de valeurs nommées.
#  Au lieu d'écrire role=2 (qu'est-ce que 2 veut dire ?),
#  on écrit role=DroneRole.SPRINT (immédiatement compréhensible).
#
#  Avantages :
#    1. Lisibilité : DroneRole.PATROL parle d'elle-même
#    2. Sécurité : Python refuse role=99 si 99 n'existe pas dans l'enum
#    3. Autocomplétion : ton IDE suggère les valeurs possibles
#    4. Débogage : print(drone.role) affiche "PATROL" pas "0"
#
# =============================================================================

class DroneRole(IntEnum):
    """
    Rôle opérationnel d'un agent Aegis MK.I.
    Détermine le comportement de navigation et la priorité d'engagement.

    Transitions autorisées :
      PATROL ↔ SPRINT  (engagement déclenché / annulé)
      PATROL ↔ RTB     (batterie basse)
      SPRINT → RECOVERY (parachute déployé)
      * → LOST          (perte de contact > 3s)
    """
    PATROL     = 0   # Patrouille normale — surveillance du couloir
    SPRINT     = 1   # Booster armé ou allumé — interception en cours
    SECONDARY  = 2   # Assigné en backup sur une interception active
    NET_ANCHOR = 3   # Nœud d'ancrage de la formation (périmètre)
    NET_FILL   = 4   # Nœud intérieur de la formation
    RTB        = 5   # Retour à la base (Return To Base) — batterie basse
    RECOVERY   = 6   # Parachute déployé — descente contrôlée
    STANDBY    = 7   # Au sol, prêt au lancement
    LOST       = 8   # Aucune communication depuis > 3 secondes

    def is_airborne(self) -> bool:
        """True si le drone est en vol (pas au sol, pas perdu)."""
        return self not in (DroneRole.STANDBY, DroneRole.RECOVERY, DroneRole.LOST)

    def is_combat_ready(self) -> bool:
        """True si le drone peut être assigné à une interception."""
        return self in (DroneRole.PATROL, DroneRole.NET_ANCHOR, DroneRole.NET_FILL)

    def can_sprint(self) -> bool:
        """True si le drone peut démarrer un sprint d'interception."""
        return self == DroneRole.PATROL


class DroneHealth(IntEnum):
    """
    État de santé matériel d'un drone.
    Déterminé par les diagnostics embarqués (watchdog).
    """
    NOMINAL    = 0   # Tous systèmes nominaux
    DEGRADED   = 1   # 1 capteur défaillant — capacité réduite mais opérationnel
    CRITICAL   = 2   # Plusieurs défaillances — doit RTB immédiatement
    LOST       = 3   # Plus de télémétrie depuis > 3s

    def is_operational(self) -> bool:
        return self in (DroneHealth.NOMINAL, DroneHealth.DEGRADED)


class TargetClass(IntEnum):
    """
    Niveau de classification d'un objet tracké.
    Progressif : UNKNOWN → PROBABLE → CONFIRMED ou LURE.

    Seul un CONFIRMED peut déclencher une interception.
    LURE est exclu même si la confiance est élevée.
    """
    UNKNOWN     = 0   # Détecté, pas encore classifié
    PROBABLE    = 1   # 1 capteur confirme — vérification en cours
    CONFIRMED   = 2   # ≥2/3 des drones + cohérence thermique + cinématique
    LURE        = 3   # Leurre confirmé (flare / ballon / émetteur EW)
    NEUTRAL     = 4   # Avion civil — ADS-B cohérent, cinématique civile
    NEUTRALIZED = 5   # Interception réussie

    def is_threat(self) -> bool:
        return self in (TargetClass.PROBABLE, TargetClass.CONFIRMED)

    def is_engageable(self) -> bool:
        return self == TargetClass.CONFIRMED


class TargetType(IntEnum):
    """
    Type de plateforme cible estimé.
    Utilisé par TargetWorthEngine pour calculer le score de menace.

    Vitesses et masses estimées basées sur sources ouvertes.
    """
    UNKNOWN         = 0
    SHAHED_136      = 1   # Loitering munition iranienne  — 50kg, 185 km/h, 40kg warhead
    LANCET_3        = 2   # Drone kamikaze russe          — 5kg, 300 km/h, électrique
    ORLAN_10        = 3   # Drone ISR russe               — 15kg, 150 km/h
    SMALL_DRONE     = 4   # Drone commercial modifié      — <5kg, vitesse variable
    CIVIL_AIRCRAFT  = 5   # Avion civil                   — ADS-B vérifié
    ARTILLERY       = 6   # Obus d'artillerie 155mm       — 0.045kg, >800m/s balistique
    CRUISE_MISSILE  = 7   # Missile de croisière          — >200kg, guidé GPS+INS
    MORTAR          = 8   # Mortier                       — 4.5kg, balistique, pas de signature
    BALLOON_LURE    = 9   # Leurre ballon hélium          — 2kg, dérive vent
    FLARE_LURE      = 10  # Leurre pyrotechnique          — 0.5kg, 850K

    def estimated_mass_kg(self) -> float:
        """Masse estimée pour le calcul du score de menace."""
        _masses = {0: 20.0, 1: 50.0, 2: 5.0, 3: 15.0, 4: 3.0,
                   5: 70000.0, 6: 0.045, 7: 500.0, 8: 4.5, 9: 2.0, 10: 0.5}
        return _masses.get(self.value, 20.0)

    def estimated_speed_ms(self) -> float:
        """Vitesse typique pour le calcul du score de menace."""
        _speeds = {0: 80.0, 1: 51.4, 2: 83.3, 3: 41.7, 4: 22.2,
                   5: 240.0, 6: 850.0, 7: 250.0, 8: 290.0, 9: 8.0, 10: 40.0}
        return _speeds.get(self.value, 80.0)


class PayloadMode(IntEnum):
    """
    Configuration de la charge utile d'interception.

    KINETIC : impact direct à 320 km/h — 28,445 J énergie cinétique
              Équivalent à une barre d'acier de 7kg lancée à 320 km/h.
              Suffisant pour détruire tout drone < 500kg.

    NET     : filet de 3m × 3m déployé à 200m de la cible.
              Pour drones rapides (>200 km/h) où le timing cinétique est difficile.
    """
    KINETIC = 0
    NET     = 1


class BoosterState(IntEnum):
    """État du booster Cesaroni Pro54 6GXL."""
    ARMED    = 0   # Prêt — état normal de patrouille
    COUNTING = 2   # Timer d'allumage en cours
    FIRING   = 3   # Combustion active (1.8s)
    SPENT    = 4   # Utilisé, casing éjecté
    SAFE     = 5   # Inhibé (RTB ou override sécurité)

    def can_fire(self) -> bool:
        return self == BoosterState.ARMED


class NetState(IntEnum):
    """
    État de la machine à états de la formation Elastic Net.

    Diagramme de transitions :
      PATROL ──target_confirmed──→ ENGAGE
      ENGAGE ──target_outside───→ PURSUIT
      ENGAGE ──target_lost──────→ PATROL
      PURSUIT──target_inside────→ ENGAGE
      PURSUIT──target_lost──────→ PATROL
      * ──────health < 75%───────→ REFORM
      REFORM ──health > 92%──────→ PATROL
    """
    PATROL  = 0   # Grille hexagonale — couverture maximale
    ENGAGE  = 1   # Contraction en cône autour de la cible
    PURSUIT = 2   # Translation coordonnée vers la zone d'interception
    REFORM  = 3   # Retour à la forme (santé dégradée)

    def transition(self, trigger: str) -> 'NetState':
        """Retourne le nouvel état après un trigger. Idempotent si pas de transition."""
        _table = {
            (NetState.PATROL,  'target_confirmed'): NetState.ENGAGE,
            (NetState.ENGAGE,  'target_outside'):   NetState.PURSUIT,
            (NetState.ENGAGE,  'target_lost'):      NetState.PATROL,
            (NetState.PURSUIT, 'target_inside'):    NetState.ENGAGE,
            (NetState.PURSUIT, 'target_lost'):      NetState.PATROL,
            (NetState.REFORM,  'health_ok'):        NetState.PATROL,
        }
        return _table.get((self, trigger), self)


class LockReason(IntEnum):
    """
    Raison pour laquelle le ProximityLock est engagé.
    Utilisé dans les logs d'audit et les rapports de débogage.

    NONE = aucun verrou (arme déverrouillée — tous les checks ont passé).
    """
    NONE           = 0   # Déverrouillé — tous les checks passés ✓
    FRIENDLY_NEAR  = 1   # Drone ami dans la sphère d'exclusion 15m
    FRIENDLY_CONE  = 2   # Drone ami dans le cône blast 45°×60m
    HUMAN_VETO     = 3   # Colonel a appuyé sur VETO
    NETWORK_LOSS   = 4   # Quorum réseau < 67%
    SELF_TEST_FAIL = 5   # Le self-test de boot a échoué
    EMERGENCY      = 6   # Stop d'urgence — toutes les armes verrouillées
    ROE_OVERRIDE   = 7   # Règles d'engagement (ROE) imposent le verrou


class EnergyDecision(IntEnum):
    """
    Décision de l'EnergyBudgetManager pour un drone donné.
    Priorité décroissante : EMERGENCY > RTB > ABORT > CONTINUE > EXECUTE.
    """
    CONTINUE_PATROL   = 0   # Batterie OK, pas d'ordre — continuer la patrouille
    EXECUTE_INTERCEPT = 1   # Batterie OK, énergie suffisante — feu vert
    ABORT_INTERCEPT   = 2   # Batterie insuffisante pour l'interception
    INITIATE_RTB      = 3   # Batterie < RTB_RESERVE — retour immédiat
    EMERGENCY_CHUTE   = 4   # Batterie < CHUTE_RESERVE — parachute maintenant

    def is_abort(self) -> bool:
        return self in (EnergyDecision.ABORT_INTERCEPT,
                        EnergyDecision.INITIATE_RTB,
                        EnergyDecision.EMERGENCY_CHUTE)


class SensorStatus(IntFlag):
    """
    Masque de bits indiquant quels capteurs sont actifs.
    IntFlag permet les combinaisons : SensorStatus.EO | SensorStatus.LWIR

    Exemple :
      status = SensorStatus.EO | SensorStatus.LWIR | SensorStatus.DOPPLER
      print(status.has_eo())     # True
      print(status.has_gps())    # False
    """
    NONE    = 0
    EO      = 1    # Sony IMX678 — caméra optique 4K 60fps
    LWIR    = 2    # FLIR Lepton 3.5 — infrarouge thermique 8-14µm
    DOPPLER = 4    # Inxpect LBK-24 — radar Doppler 24 GHz
    GPS     = 8    # Here3+ RTK — GPS haute précision
    IMU     = 16   # Dual IMU ICM-42688-P + ICM-20649D
    BARO    = 32   # Altimètre barométrique
    MESH_60 = 64   # Radio 60 GHz (Sivers IQ EVK06002)
    FALLBK  = 128  # Radio 900 MHz de secours (SiK)
    ALL     = 255  # Tous les capteurs actifs

    def has_eo(self)      -> bool: return bool(self & SensorStatus.EO)
    def has_ir(self)      -> bool: return bool(self & SensorStatus.LWIR)
    def has_doppler(self) -> bool: return bool(self & SensorStatus.DOPPLER)
    def has_gps(self)     -> bool: return bool(self & SensorStatus.GPS)
    def has_imu(self)     -> bool: return bool(self & SensorStatus.IMU)
    def has_mesh(self)    -> bool: return bool(self & (SensorStatus.MESH_60 | SensorStatus.FALLBK))
    def is_full(self)     -> bool: return self == SensorStatus.ALL
    def sensor_count(self)-> int:
        """Nombre de capteurs actifs."""
        return bin(int(self)).count('1')


# =============================================================================
#  SECTION 4 — Vec3 : VECTEUR 3D IMMUTABLE
#
#  Vec3 est la brique de base géométrique d'Aegis.
#  Toutes les positions, vitesses, accélérations sont des Vec3.
#
#  POURQUOI IMMUTABLE ?
#  ─────────────────────
#  Un objet immutable ne peut pas être modifié après création.
#  v = Vec3(1, 2, 3)  →  v.x = 5  génère une AttributeError.
#
#  C'est un choix de design intentionnel :
#  - Évite les bugs subtils où une fonction modifie un Vec3 partagé
#  - Permet l'utilisation comme clé de dictionnaire (hashable)
#  - Plus facile à raisonner : si tu passes v à une fonction,
#    tu es sûr qu'elle ne va pas modifier v
#
#  FRAME DE COORDONNÉES — NED
#  ────────────────────────────
#  NED = North-East-Down (Nord-Est-Bas)
#    X = Nord (mètres) — positif vers le nord
#    Y = Est  (mètres) — positif vers l'est
#    Z = Bas  (mètres) — POSITIF VERS LE BAS
#
#  Pourquoi Z positif vers le bas ? C'est la convention aéronautique standard.
#  Ça simplifie les équations de dynamique du vol (rotation, etc.).
#  Conséquence : altitude = -Z (un drone à 300m d'altitude a Z = -300).
#
#  OPÉRATIONS IMPLEMENTÉES
#  ─────────────────────────
#  Arithmétique : +, -, * (scalaire), / (scalaire), - (nég.)
#  Géométrie    : norme, normaliser, produit scalaire, produit vectoriel
#  Utilitaires  : distance, interpolation linéaire, conversion NumPy
#
# =============================================================================

class Vec3:
    """Vecteur 3D immutable en coordonnées NED (Nord-Est-Bas)."""

    # __slots__ réduit l'empreinte mémoire en interdisant les attributs dynamiques.
    # Sans __slots__ : chaque instance a un __dict__ (≈200 bytes overhead).
    # Avec __slots__ : seulement x, y, z stockés (≈80 bytes). Important pour 500 drones.
    __slots__ = ('x', 'y', 'z')

    def __init__(self, x: float = 0.0, y: float = 0.0, z: float = 0.0):
        # On utilise object.__setattr__ au lieu de self.x = x
        # parce que __setattr__ est surchargé pour être immutable.
        object.__setattr__(self, 'x', float(x))
        object.__setattr__(self, 'y', float(y))
        object.__setattr__(self, 'z', float(z))

    def __setattr__(self, name: str, value: object) -> None:
        """Bloque toute tentative de modification après création."""
        raise AttributeError(
            f"Vec3 est immutable. Crée un nouveau Vec3 au lieu de modifier '{name}'."
        )

    # ── Opérations arithmétiques ───────────────────────────────────────────────
    # Ces méthodes "magiques" (__add__, etc.) sont appelées par Python
    # quand tu écris v1 + v2, v1 - v2, etc.
    # Chacune retourne un NOUVEAU Vec3 (immutabilité préservée).

    def __add__(self, o: 'Vec3') -> 'Vec3':
        """v1 + v2 → nouveau Vec3."""
        return Vec3(self.x + o.x, self.y + o.y, self.z + o.z)

    def __sub__(self, o: 'Vec3') -> 'Vec3':
        """v1 - v2 → nouveau Vec3 (vecteur de v2 vers v1)."""
        return Vec3(self.x - o.x, self.y - o.y, self.z - o.z)

    def __mul__(self, s: float) -> 'Vec3':
        """v * scalaire → mise à l'échelle."""
        return Vec3(self.x * s, self.y * s, self.z * s)

    def __rmul__(self, s: float) -> 'Vec3':
        """scalaire * v → mise à l'échelle (ordre inversé)."""
        return self.__mul__(s)

    def __truediv__(self, s: float) -> 'Vec3':
        """v / scalaire → division. Lève ZeroDivisionError si s=0."""
        if abs(s) < 1e-15:
            raise ZeroDivisionError("Vec3 division par zéro")
        return Vec3(self.x / s, self.y / s, self.z / s)

    def __neg__(self) -> 'Vec3':
        """- v → inverse le sens du vecteur."""
        return Vec3(-self.x, -self.y, -self.z)

    def __eq__(self, o: object) -> bool:
        """Égalité avec tolérance numérique (évite les erreurs float)."""
        if not isinstance(o, Vec3):
            return False
        return (abs(self.x - o.x) < 1e-9 and
                abs(self.y - o.y) < 1e-9 and
                abs(self.z - o.z) < 1e-9)

    def __repr__(self) -> str:
        """Représentation lisible pour le débogage."""
        return f"Vec3(N={self.x:.2f}, E={self.y:.2f}, D={self.z:.2f})"

    def __hash__(self) -> int:
        """Hash pour utilisation comme clé de dict. Arrondit à 1mm."""
        return hash((round(self.x, 3), round(self.y, 3), round(self.z, 3)))

    # ── Géométrie ──────────────────────────────────────────────────────────────

    def norm(self) -> float:
        """
        Longueur du vecteur (norme euclidienne).
        Pour un vecteur position : distance à l'origine.
        Pour un vecteur vitesse : vitesse scalaire (en m/s).
        Formule : √(x² + y² + z²)
        """
        return math.sqrt(self.x*self.x + self.y*self.y + self.z*self.z)

    def norm_sq(self) -> float:
        """
        Carré de la norme. Plus rapide que norm() (pas de sqrt).
        Utilise pour les comparaisons : dist_sq(A,B) < r² au lieu de dist(A,B) < r.
        """
        return self.x*self.x + self.y*self.y + self.z*self.z

    def normalized(self) -> 'Vec3':
        """
        Vecteur unitaire dans la même direction (longueur = 1).
        Utilise pour exprimer une direction pure (sans magnitude).
        Exemple : direction du vent = Vec3(0.6, 0.8, 0).normalized()
        Convention : si vecteur nul → retourne Vec3(1, 0, 0) par convention.
        """
        n = self.norm()
        if n < 1e-12:
            return Vec3(1.0, 0.0, 0.0)
        return Vec3(self.x / n, self.y / n, self.z / n)

    def dot(self, o: 'Vec3') -> float:
        """
        Produit scalaire (dot product) : a · b = ax×bx + ay×by + az×bz.

        Interprétation géométrique :
          a · b = |a| × |b| × cos(θ)   où θ = angle entre a et b

        Utilisations dans Aegis :
          - angle_to() l'utilise pour calculer l'angle entre deux vecteurs
          - Le test du cône blast : si dot(drone→target, drone_forward) > cos(45°)
            → la cible est dans le cône
        """
        return self.x*o.x + self.y*o.y + self.z*o.z

    def cross(self, o: 'Vec3') -> 'Vec3':
        """
        Produit vectoriel (cross product) : a × b.

        Propriétés :
          - Perpendiculaire aux deux vecteurs d'entrée
          - |a × b| = |a| × |b| × sin(θ)
          - Sens : règle de la main droite

        Utilisation principale : calcul de normales à un plan.
        Dans Aegis : utilisé dans le ConicalSector pour le test géométrique.
        """
        return Vec3(
            self.y * o.z - self.z * o.y,
            self.z * o.x - self.x * o.z,
            self.x * o.y - self.y * o.x
        )

    def dist(self, o: 'Vec3') -> float:
        """Distance 3D entre deux points."""
        return (self - o).norm()

    def dist_2d(self, o: 'Vec3') -> float:
        """Distance horizontale seulement (ignore l'altitude Z)."""
        dx = self.x - o.x
        dy = self.y - o.y
        return math.sqrt(dx*dx + dy*dy)

    def angle_to(self, o: 'Vec3') -> float:
        """
        Angle entre deux vecteurs (radians).
        Retourne une valeur dans [0, π].
        Utilise dot product : cos(θ) = a·b / (|a| × |b|)
        """
        n1, n2 = self.norm(), o.norm()
        if n1 < 1e-12 or n2 < 1e-12:
            return 0.0
        # Clamp entre -1 et 1 pour éviter les erreurs d'arrondi dans acos
        cos_theta = max(-1.0, min(1.0, self.dot(o) / (n1 * n2)))
        return math.acos(cos_theta)

    def lerp(self, o: 'Vec3', t: float) -> 'Vec3':
        """
        Interpolation linéaire entre self et o.
        t=0 → self, t=1 → o, t=0.5 → point médian.
        Utilisé dans la prédiction de trajectoire.
        """
        return self + (o - self) * t

    def project_onto(self, axis: 'Vec3') -> 'Vec3':
        """
        Projection de self sur l'axe axis.
        Retourne la composante de self dans la direction de axis.
        Formule : (self · axis / |axis|²) × axis
        """
        denom = axis.norm_sq()
        if denom < 1e-12:
            return Vec3()
        return axis * (self.dot(axis) / denom)

    def in_cone(self, apex: 'Vec3', axis: 'Vec3',
                cos_half_angle: float, depth: float) -> bool:
        """
        Test si self est dans un cône défini par :
          apex      : sommet du cône
          axis      : axe du cône (direction, non normalisé OK)
          cos_half  : cosinus du demi-angle (cos(45°) = 0.707)
          depth     : profondeur max du cône

        Algorithme :
          1. Vecteur du sommet vers le point : v = self - apex
          2. Projection sur l'axe : d_axial = v · axis_hat
          3. Si d_axial < 0 ou > depth → hors du cône (mauvais côté ou trop loin)
          4. Cosinus de l'angle : cos_θ = d_axial / |v|
          5. Si cos_θ ≥ cos_half → dans le cône ✓

        Complexity : O(1), pas de sqrt (comparaison des carrés)
        """
        v       = self - apex
        axis_n  = axis.normalized()
        d_axial = v.dot(axis_n)

        if d_axial < 0.0 or d_axial > depth:
            return False

        v_norm = v.norm()
        if v_norm < 1e-12:
            return True  # Au sommet même

        cos_theta = d_axial / v_norm
        return cos_theta >= cos_half_angle

    @property
    def altitude_m(self) -> float:
        """Altitude en mètres (NED : altitude = -Z)."""
        return -self.z

    # ── Conversions ────────────────────────────────────────────────────────────

    def to_np(self) -> np.ndarray:
        """Convertit en tableau NumPy shape (3,) dtype float64."""
        return np.array([self.x, self.y, self.z], dtype=np.float64)

    @staticmethod
    def from_np(arr: np.ndarray) -> 'Vec3':
        """Construit un Vec3 depuis un tableau NumPy shape (3,)."""
        return Vec3(float(arr[0]), float(arr[1]), float(arr[2]))

    @staticmethod
    def from_dict(d: Dict[str, float]) -> 'Vec3':
        """Reconstruit un Vec3 depuis un dict {'x': ..., 'y': ..., 'z': ...}."""
        return Vec3(d.get('x', 0.0), d.get('y', 0.0), d.get('z', 0.0))

    def to_dict(self) -> Dict[str, float]:
        """Sérialise en dict (pour JSON, logs, etc.)."""
        return {'x': self.x, 'y': self.y, 'z': self.z}

    @staticmethod
    def zero() -> 'Vec3':
        """Vecteur nul."""
        return Vec3(0.0, 0.0, 0.0)

    @staticmethod
    def north(d: float = 1.0) -> 'Vec3':
        return Vec3(d, 0.0, 0.0)

    @staticmethod
    def east(d: float = 1.0) -> 'Vec3':
        return Vec3(0.0, d, 0.0)

    @staticmethod
    def up(d: float = 1.0) -> 'Vec3':
        """Vecteur vers le haut (altitude). En NED, up = z négatif."""
        return Vec3(0.0, 0.0, -d)


# =============================================================================
#  SECTION 5 — STRUCTURES DE DONNÉES
#
#  Ce sont les "enveloppes" qui transportent les données dans Aegis.
#  Chaque structure représente un concept métier précis.
#
#  Convention @dataclass :
#    - field(default_factory=...) pour les valeurs mutables par défaut
#      (lists, dicts, objects). Ne JAMAIS mettre une liste [] directement
#      comme valeur par défaut — c'est le bug Python classique des débutants.
#      Avec field(default_factory=list), chaque instance a SA propre liste.
#    - field(default_factory=time.time) → timestamp automatique à la création
#
# =============================================================================

@dataclass
class EODetection:
    """
    Détection optique (Electro-Optical) depuis la Sony IMX678.
    Caméra 4K 60fps, FOV 85°, sensibilité 0.1 lux.

    Remplie par le module de vision embarqué (YOLO + ByteTrack sur Hailo H15).
    """
    # Position 3D estimée dans le monde (repère NED, en mètres)
    # None si pas de détection dans ce frame
    target_pos_world: Optional[Vec3]  = None

    # Score de confiance [0, 1] du détecteur YOLO
    confidence: float = 0.0

    # Boîte englobante en pixels : (x_min, y_min, x_max, y_max)
    bbox_px: Optional[Tuple[int, int, int, int]] = None

    # ID de track ByteTrack (stable dans le temps pour une même cible)
    track_id: Optional[int] = None

    # Classe détectée par YOLO ("drone", "airplane", "bird", "unknown")
    class_label: str = "unknown"

    # Numéro de frame source (pour détecter les détections périmées)
    frame_number: int = 0

    @property
    def has_detection(self) -> bool:
        """True si ce frame contient une détection valide."""
        return self.target_pos_world is not None and self.confidence > 0.1


@dataclass
class IRDetection:
    """
    Détection infrarouge depuis la FLIR Lepton 3.5.
    LWIR 8–14µm, NETD < 50mK, résolution 160×120 pixels.

    Le NETD (Noise Equivalent Temperature Difference) de 50mK signifie que
    le capteur peut détecter une différence de température de 0.05°C.
    Excellent pour distinguer un moteur chaud du fond de ciel froid.
    """
    # Position 3D du centroïde thermique dans le monde
    centroid_world: Optional[Vec3] = None

    # Température de surface estimée de la cible (Kelvin)
    # None = pas de blob détecté
    temp_K: Optional[float] = None

    # Température de fond (ciel) — utilisée pour calculer le contraste
    background_K: float = ISA_T_300M_K   # ≈ 286K = 13°C (valeur ISA 300m)

    # ΔT = température cible - fond. Clé pour la détection et la classification.
    contrast_K: float = 0.0

    # Aire du blob en pixels (petit = cible lointaine, grand = cible proche)
    pixel_area: int = 0

    # Température max dans le blob (point chaud = moteur ou booster)
    max_temp_K: Optional[float] = None

    # Uniformité thermique [0, 1]
    # 0 = blob thermiquement uniforme (ballon, leurre froid)
    # 1 = gradient fort (point chaud central = moteur réel)
    uniformity: float = 0.0

    @property
    def is_flare(self) -> bool:
        """True si la signature thermique correspond à une fusée éclairante."""
        return self.temp_K is not None and self.temp_K > LURE_T_FLARE_K

    @property
    def is_cold_lure(self) -> bool:
        """True si le contraste thermique est trop faible pour être un vrai drone."""
        return self.contrast_K < 5.0 and self.pixel_area > 10

    @property
    def has_detection(self) -> bool:
        return self.centroid_world is not None and self.contrast_K > 2.0


@dataclass
class DopplerMeasurement:
    """
    Mesure radar Doppler depuis l'Inxpect LBK-24.
    Fréquence 24 GHz, mesure la vitesse radiale par effet Doppler.

    L'effet Doppler : si une source se rapproche à vitesse v,
    la fréquence reçue est f' = f × (c + v_détecteur) / (c - v_source).
    Le décalage de fréquence permet de mesurer la vitesse radiale directement.

    Note : seule la vitesse radiale (vers/depuis le radar) est mesurée.
    La vitesse tangentielle nécessite un tracking multi-frames ou stéréo.
    """
    # Vitesse radiale en m/s. Convention : + = s'éloigne, - = se rapproche
    radial_velocity_ms: Optional[float] = None

    # Distance radar-cible (en mètres). Calculée par temps de vol du signal.
    range_m: Optional[float] = None

    # Rapport signal/bruit en dB. > 15 dB = détection fiable.
    snr_db: float = 0.0

    # Score de confiance [0, 1]
    confidence: float = 0.0

    @property
    def closing_speed_ms(self) -> Optional[float]:
        """
        Vitesse de rapprochement (positive = cible qui se rapproche).
        Opposé de la vitesse radiale (convention Doppler).
        """
        if self.radial_velocity_ms is None:
            return None
        return -self.radial_velocity_ms

    @property
    def has_detection(self) -> bool:
        return self.radial_velocity_ms is not None and self.confidence > 0.1


@dataclass
class SensorFrame:
    """
    Paquet de données complet d'un drone à un instant donné.
    Transmis à 50 Hz via le réseau mesh 60 GHz.
    Taille compressée : ≈120 bytes.

    C'est le "paquet UDP" fondamental du système.
    Chaque drone envoie 50 SensorFrames par seconde au coordinateur.
    500 drones × 50 Hz × 120 bytes = 3 MB/s de données entrantes.
    Le réseau 60 GHz à 500 Mbps peut absorber ça sans problème.
    """
    # ── Identité ───────────────────────────────────────────────────────────────
    drone_id:        str

    # Numéro de séquence croissant. Si on reçoit seq=42 alors qu'on attend seq=40
    # → on a perdu 2 paquets. Permet de détecter les pertes réseau.
    sequence_num:    int   = 0

    # Horodatage Unix en secondes (float 64-bit = précision ≈ 100 ns)
    timestamp_s:     float = field(default_factory=time.time)

    # ── Données capteurs ──────────────────────────────────────────────────────
    eo:      EODetection       = field(default_factory=EODetection)
    ir:      IRDetection       = field(default_factory=IRDetection)
    doppler: DopplerMeasurement = field(default_factory=DopplerMeasurement)

    # ── État de navigation ────────────────────────────────────────────────────
    drone_pos:   Vec3  = field(default_factory=Vec3.zero)  # Position NED (m)
    drone_vel:   Vec3  = field(default_factory=Vec3.zero)  # Vitesse NED (m/s)
    heading_deg: float = 0.0    # Cap en degrés (0=Nord, 90=Est, 180=Sud...)
    altitude_m:  float = MISSION_ALT_M  # Altitude barométrique (m)

    # ── Santé système ─────────────────────────────────────────────────────────
    battery_wh:      float        = DRONE_E_USABLE
    active_sensors:  SensorStatus = SensorStatus.ALL
    rssi_dbm:        float        = -45.0   # Puissance du signal reçu (60 GHz)
    cpu_load_pct:    float        = 30.0    # Charge CPU Jetson (%)
    motor_temp_c:    float        = 35.0    # Température moteur (°C)

    @property
    def has_target(self) -> bool:
        """True si au moins un capteur détecte quelque chose."""
        return (self.eo.has_detection or
                self.ir.has_detection or
                self.doppler.has_detection)

    @property
    def is_valid(self) -> bool:
        """True si ce SensorFrame est exploitable (IMU + réseau + batterie OK)."""
        return (self.active_sensors.has_imu() and
                self.active_sensors.has_mesh() and
                self.battery_wh > E_RESERVE_CHUTE_WH)

    @property
    def age_ms(self) -> float:
        """Âge du paquet en millisecondes (depuis la création)."""
        return (time.time() - self.timestamp_s) * 1000.0


@dataclass
class FusedTarget:
    """
    Cible fusionnée multi-spectrale — sortie du module SpectralFusion.
    Une FusedTarget par objet tracké. Mise à jour à 50 Hz.

    C'est l'objet central d'Aegis : tout le pipeline en aval
    (UKF, InterceptPredictor, SafetyLayer) travaille sur des FusedTargets.
    """
    # ── Identité ───────────────────────────────────────────────────────────────
    target_id:       str   = field(default_factory=lambda: f"TGT_{uuid.uuid4().hex[:6].upper()}")
    timestamp_s:     float = field(default_factory=time.time)
    first_seen_s:    float = field(default_factory=time.time)

    # ── Classification ────────────────────────────────────────────────────────
    classification:  TargetClass = TargetClass.UNKNOWN
    target_type:     TargetType  = TargetType.UNKNOWN
    is_lure:         bool        = False
    lure_reason:     str         = ""       # Description textuelle de la règle déclenchée
    lure_confidence: float       = 0.0

    # ── Cinématique (repère NED, mètres et m/s) ───────────────────────────────
    pos:     Vec3 = field(default_factory=Vec3.zero)   # Position estimée
    vel:     Vec3 = field(default_factory=Vec3.zero)   # Vitesse estimée
    acc:     Vec3 = field(default_factory=Vec3.zero)   # Accélération estimée

    # Incertitude de position (écart-type, mètres)
    # Initialisé à ±50m, réduit par l'UKF jusqu'à ±1.5m après 2s
    pos_std: Vec3 = field(default_factory=lambda: Vec3(50.0, 50.0, 50.0))

    # ── État UKF (rempli par MultiTargetUKF) ──────────────────────────────────
    ukf_state:   Optional[np.ndarray] = None   # Vecteur d'état [9,]
    ukf_cov:     Optional[np.ndarray] = None   # Matrice de covariance [9,9]
    ukf_updates: int                  = 0      # Nombre de mises à jour UKF

    # ── Votes de fusion ───────────────────────────────────────────────────────
    eo_votes:     int = 0    # Drones qui confirment via caméra optique
    ir_votes:     int = 0    # Drones qui confirment via infrarouge
    total_voters: int = 0    # Total de drones ayant voté (incluant les "non")
    bft_rejected: int = 0    # Votes rejetés comme byzantins ce cycle

    # ── Données thermiques ────────────────────────────────────────────────────
    mean_temp_K: float = 0.0   # Température moyenne des capteurs IR votants
    max_temp_K:  float = 0.0   # Température maximale mesurée
    temp_std_K:  float = 0.0   # Écart-type thermique (leurre = écart élevé)

    # ── Prédiction d'interception (rempli par InterceptPredictor) ─────────────
    intercept_pos:  Optional[Vec3]  = None     # Point d'impact prédit
    intercept_t_s:  Optional[float] = None     # Temps avant impact (s)
    intercept_conf: float           = 0.0      # Confiance de la prédiction

    # ── Engagement ────────────────────────────────────────────────────────────
    assigned_drone_id:  Optional[str]   = None
    engagement_start_s: Optional[float] = None

    # ── Propriétés calculées ──────────────────────────────────────────────────

    @property
    def vote_ratio(self) -> float:
        """
        Fraction des votes positifs [0, 1].
        vote_ratio ≥ VOTE_THRESHOLD (2/3) → classification CONFIRMED.
        """
        if self.total_voters == 0:
            return 0.0
        total_positive = self.eo_votes + self.ir_votes
        max_possible   = 2 * self.total_voters  # EO + IR par drone
        return total_positive / max_possible

    @property
    def is_confirmed(self) -> bool:
        """True si la cible peut déclencher une interception."""
        return (self.classification == TargetClass.CONFIRMED and
                self.vote_ratio >= VOTE_THRESHOLD and
                not self.is_lure)

    @property
    def is_stale(self) -> bool:
        """True si pas de mise à jour depuis trop longtemps."""
        return (time.time() - self.timestamp_s) > UKF_TIMEOUT_S

    @property
    def speed_ms(self) -> float:
        """Vitesse scalaire de la cible (m/s)."""
        return self.vel.norm()

    @property
    def speed_kmh(self) -> float:
        return self.speed_ms * 3.6

    @property
    def age_s(self) -> float:
        return time.time() - self.first_seen_s

    @property
    def track_quality(self) -> float:
        """
        Score de qualité du track [0, 1].
        Combine : ancienneté, votes, convergence UKF, précision position.
        Utilisé pour prioriser les ressources de calcul.
        """
        # Ramp-up sur 2 secondes (track tout frais = moins fiable)
        age_score  = min(self.age_s / 2.0, 1.0)

        # Ratio de votes (2/3 = score 1)
        vote_score = min(self.vote_ratio / VOTE_THRESHOLD, 1.0)

        # Convergence UKF (100 updates ≈ 2s de tracking = score 1)
        ukf_score  = min(self.ukf_updates / 100, 1.0)

        # Précision position (50m = score 0, 0m = score 1)
        pos_score  = max(0.0, 1.0 - self.pos_std.norm() / 50.0)

        return float(np.mean([age_score, vote_score, ukf_score, pos_score]))

    def to_dict(self) -> Dict:
        """Sérialisation pour les logs et l'interface Colonel."""
        return {
            'id':            self.target_id,
            'class':         self.classification.name,
            'type':          self.target_type.name,
            'is_lure':       self.is_lure,
            'pos_m':         self.pos.to_dict(),
            'speed_kmh':     round(self.speed_kmh, 1),
            'vote_ratio':    round(self.vote_ratio, 3),
            'temp_K':        round(self.mean_temp_K, 1),
            'track_quality': round(self.track_quality, 3),
            'intercept_t_s': round(self.intercept_t_s, 2) if self.intercept_t_s else None,
        }


@dataclass
class DroneState:
    """
    État opérationnel complet d'un agent Aegis MK.I.
    Mis à jour depuis la télémétrie embarquée à 50 Hz.
    """
    drone_id:      str
    formation_idx: int = -1   # Index dans la grille Elastic Net

    # ── Rôle et santé ─────────────────────────────────────────────────────────
    role:           DroneRole    = DroneRole.PATROL
    health:         DroneHealth  = DroneHealth.NOMINAL
    payload:        PayloadMode  = PayloadMode.KINETIC
    booster:        BoosterState = BoosterState.ARMED
    active_sensors: SensorStatus = SensorStatus.ALL

    # ── Navigation (repère NED) ────────────────────────────────────────────────
    pos: Vec3 = field(default_factory=Vec3.zero)
    vel: Vec3 = field(default_factory=Vec3.zero)
    acc: Vec3 = field(default_factory=Vec3.zero)
    heading_deg: float = 0.0

    # ── Énergie ────────────────────────────────────────────────────────────────
    battery_wh:   float = DRONE_E_USABLE
    battery_v:    float = BATT_V_NOM
    power_draw_w: float = 0.0

    # ── Assignation ────────────────────────────────────────────────────────────
    assigned_target_id: Optional[str] = None

    # ── Réseau ─────────────────────────────────────────────────────────────────
    last_seen_s:    float = field(default_factory=time.time)
    rssi_dbm:       float = -45.0
    n_peers:        int   = 0

    # ── Statistiques de mission ────────────────────────────────────────────────
    mission_start_s:    float = field(default_factory=time.time)
    total_sprints:      int   = 0
    intercepts_success: int   = 0

    # ── Propriétés calculées ──────────────────────────────────────────────────

    @property
    def speed_ms(self) -> float:
        return self.vel.norm()

    @property
    def altitude_m(self) -> float:
        return -self.pos.z  # NED : altitude = -Z

    @property
    def battery_pct(self) -> float:
        return self.battery_wh / DRONE_E_USABLE

    @property
    def is_alive(self) -> bool:
        return self.health != DroneHealth.LOST

    @property
    def can_intercept(self) -> bool:
        """
        True si ce drone peut être assigné à une interception.
        Conditions : vivant + rôle compatible + batterie suffisante + capteurs.
        """
        has_vision    = self.active_sensors.has_eo() or self.active_sensors.has_ir()
        has_energy    = self.battery_wh > (E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH + 20.0)
        return (self.is_alive and self.role.is_combat_ready() and
                has_energy and has_vision)

    @property
    def link_ok(self) -> bool:
        """True si la qualité de lien radio est acceptable."""
        return self.rssi_dbm > -70.0 and (time.time() - self.last_seen_s) < 1.0

    def to_dict(self) -> Dict:
        return {
            'id':          self.drone_id,
            'role':        self.role.name,
            'health':      self.health.name,
            'pos':         self.pos.to_dict(),
            'speed_ms':    round(self.speed_ms, 1),
            'battery_pct': round(self.battery_pct * 100, 1),
            'altitude_m':  round(self.altitude_m, 1),
        }


@dataclass
class InterceptOrder:
    """
    Ordre d'interception complet — tout ce dont un drone a besoin.
    Émis par l'InterceptPredictor, transmis via DroneCommand.
    Taille compressée : ≈64 bytes (un seul paquet 60 GHz).
    """
    order_id:   str   = field(default_factory=lambda: f"ORD_{uuid.uuid4().hex[:8].upper()}")
    drone_id:   str   = ""
    target_id:  str   = ""
    issued_s:   float = field(default_factory=time.time)

    # ── Guidage ────────────────────────────────────────────────────────────────
    # aim_pos est la POSITION FUTURE prédite de la cible, pas sa position actuelle.
    aim_pos:     Vec3  = field(default_factory=Vec3.zero)
    eta_s:       float = 0.0    # Temps estimé avant interception

    # ── Booster ────────────────────────────────────────────────────────────────
    booster_req:    bool  = False   # Le booster est-il nécessaire ?
    booster_fire_t: float = 0.0    # Timestamp Unix exact d'allumage

    # ── Contraintes ────────────────────────────────────────────────────────────
    payload:       PayloadMode = PayloadMode.KINETIC
    target_type:   TargetType  = TargetType.UNKNOWN
    abort_batt_wh: float       = E_RESERVE_RTB_WH  # Aborter si batterie < ça

    # ── Statut ─────────────────────────────────────────────────────────────────
    acknowledged:   bool = False
    aborted:        bool = False
    abort_reason:   str  = ""
    completed:      bool = False
    human_approved: bool = False  # HumanLoopGate a autorisé

    @property
    def is_active(self) -> bool:
        return self.acknowledged and not self.aborted and not self.completed

    @property
    def booster_countdown_s(self) -> float:
        if not self.booster_req:
            return float('inf')
        return self.booster_fire_t - time.time()

    @property
    def age_s(self) -> float:
        return time.time() - self.issued_s

    def to_dict(self) -> Dict:
        status = ('COMPLETED' if self.completed else
                  'ABORTED'   if self.aborted   else
                  'ACTIVE'    if self.is_active  else 'PENDING')
        return {
            'order_id':   self.order_id,
            'drone':      self.drone_id,
            'target':     self.target_id,
            'aim_pos':    self.aim_pos.to_dict(),
            'eta_s':      round(self.eta_s, 2),
            'booster':    self.booster_req,
            'fire_in_s':  round(self.booster_countdown_s, 3) if self.booster_req else None,
            'status':     status,
        }


@dataclass
class DroneCommand:
    """
    Paquet de commande envoyé à un drone toutes les 20ms (50 Hz).
    Taille : 48 bytes — un seul frame 60 GHz.

    C'est la sortie finale d'Aegis.
    Chaque cycle, origin_core.step() génère N DroneCommands,
    une par drone, et les envoie via le mesh 60 GHz.
    """
    drone_id:    str
    timestamp_s: float = field(default_factory=time.time)
    seq_num:     int   = 0

    # ── Rôle assigné ──────────────────────────────────────────────────────────
    role: DroneRole = DroneRole.PATROL

    # ── Navigation ─────────────────────────────────────────────────────────────
    target_pos:    Vec3  = field(default_factory=Vec3.zero)  # Waypoint cible
    target_speed:  float = V_PATROL_MS   # Vitesse commandée (m/s)
    formation_slot: int  = -1            # Slot assigné dans la grille
    formation_pos: Optional[Vec3] = None # Position nominale du slot

    # ── Ordre d'interception (optionnel) ──────────────────────────────────────
    intercept_order: Optional[InterceptOrder] = None

    # ── Actions ────────────────────────────────────────────────────────────────
    # Ces flags déclenchent des actions irréversibles.
    # Ils sont "latchés" (maintenus vrais) jusqu'à acknowledgment du drone.
    fire_booster:  bool  = False
    booster_at:    float = 0.0     # Timestamp exact d'allumage
    deploy_payload:bool  = False
    payload_mode:  PayloadMode = PayloadMode.KINETIC
    initiate_rtb:  bool  = False
    deploy_chute:  bool  = False   # Urgence seulement

    @property
    def is_hostile_action(self) -> bool:
        """True si cette commande déclenche une action d'engagement."""
        return self.deploy_payload or self.fire_booster

    def checksum(self) -> str:
        """Checksum MD5 pour vérification d'intégrité réseau."""
        data = (f"{self.drone_id}{self.timestamp_s:.3f}"
                f"{self.role}{self.fire_booster}{self.deploy_payload}")
        return hashlib.md5(data.encode()).hexdigest()[:8]


@dataclass
class ProximityLockState:
    """
    État du verrou de proximité pour un drone à un instant donné.
    Résultat de ProximityLock.evaluate().

    État par défaut : VERROUILLÉ (is_locked=True).
    Le déverrouillage nécessite que TOUS les checks passent.
    """
    drone_id:        str
    timestamp_s:     float = field(default_factory=time.time)
    eval_num:        int   = 0

    # Résultat final (fail-safe : True par défaut)
    is_locked:   bool       = True
    lock_reason: LockReason = LockReason.NONE

    # Résultats détaillés des 4 checks
    sphere_clear:  bool  = False    # Check 1 : sphère d'exclusion 15m
    cone_clear:    bool  = False    # Check 2 : cône blast 45°×60m
    network_ok:    bool  = False    # Check 3 : quorum réseau ≥ 67%
    human_clear:   bool  = False    # Check 4 : pas de veto Colonel

    # Métriques de détail
    nearest_m:     float = float('inf')   # Distance au friendly le plus proche
    n_in_sphere:   int   = 0              # Drones dans la sphère
    n_in_cone:     int   = 0              # Drones dans le cône
    network_ratio: float = 0.0            # Fraction de drones accessibles

    # Performance
    eval_us:       float = 0.0    # Durée de l'évaluation (microsecondes)

    @property
    def all_clear(self) -> bool:
        return (not self.is_locked and self.sphere_clear and
                self.cone_clear and self.network_ok and self.human_clear)


@dataclass
class ThreatProfile:
    """
    Profil de menace pour le TargetWorthEngine.
    Construit depuis un FusedTarget confirmé + classification TargetType.
    """
    target_id:       str
    target_type:     TargetType = TargetType.UNKNOWN
    mass_kg:         float = 20.0
    velocity_ms:     float = 80.0
    collateral_risk: float = 0.5    # 0 = désert, 1 = centre urbain dense

    @property
    def kinetic_energy_J(self) -> float:
        return 0.5 * self.mass_kg * self.velocity_ms**2

    @property
    def threat_score(self) -> float:
        """
        Score composite [0–100] pour la décision RTB vs override.

        Pondération :
          masse     × 40% : normalized à 50kg (Shahed-136 baseline)
          vitesse   × 30% : normalized à 200 m/s
          collatéral× 30% : risque civil direct

        Exemples :
          Shahed 136 (50kg, 51m/s, risque 0.5) → score ≈ 57
          Lancet-3   (5kg,  83m/s, risque 0.8)  → score ≈ 45
          Gros drone (80kg, 150m/s, risque 0.9)  → score ≈ 91 → Colonel requis
        """
        mass_s = min(self.mass_kg / 50.0, 1.0) * 40.0
        vel_s  = min(self.velocity_ms / 200.0, 1.0) * 30.0
        col_s  = self.collateral_risk * 30.0
        return mass_s + vel_s + col_s

    @property
    def is_high_risk(self) -> bool:
        return self.mass_kg > HIGH_RISK_MASS_KG or self.threat_score > WORTH_ASK


@dataclass
class AuditEntry:
    """
    Entrée du log d'audit immuable pour toutes les décisions d'engagement.
    HumanLoopGate maintient un ring-buffer de ces entrées.
    Ne peut jamais être modifiée ou supprimée.
    """
    entry_id:   str   = field(default_factory=lambda: uuid.uuid4().hex[:12].upper())
    timestamp_s:float = field(default_factory=time.time)
    event_type: str   = ""   # "REQUEST", "AUTO_APPROVED", "VETOED", "BLOCKED"
    drone_id:   str   = ""
    target_id:  str   = ""
    confidence: float = 0.0
    score:      float = 0.0
    operator:   str   = "SYSTEM"
    outcome:    str   = ""

    def to_dict(self) -> Dict:
        return {
            'id': self.entry_id, 'ts': self.timestamp_s,
            'type': self.event_type, 'drone': self.drone_id,
            'target': self.target_id, 'conf': round(self.confidence, 3),
            'score': round(self.score, 1), 'op': self.operator,
            'outcome': self.outcome,
        }


@dataclass
class SwarmStatus:
    """
    Snapshot de santé globale de l'essaim — diffusé à 1 Hz.
    Consommé par le terminal Colonel et les logs.
    """
    timestamp_s:      float
    n_total:          int
    n_patrol:         int
    n_sprint:         int
    n_rtb:            int
    n_lost:           int
    n_confirmed_targets: int
    n_lures_total:    int
    n_bft_rejected:   int
    formation_health: float
    formation_state:  NetState
    mean_battery_pct: float
    min_battery_pct:  float
    n_combat_ready:   int
    network_quorum:   float
    rain_mode:        bool  = False

    @property
    def readiness(self) -> float:
        """0–1 disponibilité globale de l'essaim."""
        if self.n_total == 0:
            return 0.0
        alive = self.n_total - self.n_lost
        return (self.n_combat_ready / max(alive, 1)) * self.formation_health


# =============================================================================
#  SECTION 6 — FONCTIONS UTILITAIRES
#
#  Fonctions partagées par plusieurs modules.
#  Toutes sont pures (pas d'effet de bord) et testables isolément.
#
# =============================================================================

def rain_attenuation_db_km(rain_mm_h: float) -> float:
    """
    Calcule l'atténuation du signal 60 GHz par la pluie.
    Modèle ITU-R P.838-3, polarisation horizontale.

    Formule : γ = k_H × R^α_H  (en dB/km)
    Avec k_H=0.187, α_H=1.021 pour 60 GHz horizontale.

    Exemples :
      rain_mm_h=0    → 0.0 dB/km
      rain_mm_h=12.5 → ≈2.4 dB/km (pluie modérée)
      rain_mm_h=50   → ≈9.8 dB/km (pluie intense)
      rain_mm_h=100  → ≈20 dB/km  (pluie extrême)
    """
    if rain_mm_h <= 0.0:
        return 0.0
    return ITU_K_H * (rain_mm_h ** ITU_ALPHA_H)


def mesh_range_m(rain_mm_h: float, link_budget_db: float = 13.0) -> float:
    """
    Portée maximale du réseau 60 GHz sous pluie.

    Paramètres :
      rain_mm_h     : taux de pluie (mm/h)
      link_budget_db: marge de lien disponible (dB). 13 dB typique.

    Calcul :
      atténuation totale = γ_rain + γ_O2 (dB/km)
      portée = budget / atténuation totale (en km)
    """
    if rain_mm_h <= 0.0:
        return MESH_RANGE_CLEAR_M
    total_atten = rain_attenuation_db_km(rain_mm_h) + O2_ABSORB_DB_KM
    range_km    = link_budget_db / total_atten
    return max(50.0, range_km * 1000.0)   # Minimum 50m (physiquement, le réseau tient)


def aero_drag_N(v_ms: float, alt_m: float = MISSION_ALT_M) -> float:
    """
    Force de traînée aérodynamique sur le drone Aegis MK.I.

    Calcul complet incluant la traînée induite (liée à la portance) :
      CL  = 2W / (ρ × V² × S)     portance = poids en vol horizontal
      CD  = CD0 + K × CL²          traînée totale
      D   = ½ × ρ × V² × S × CD   force de traînée (N)

    La densité de l'air ρ est recalculée à l'altitude demandée (ISA).
    """
    if v_ms < 0.5:
        return 0.0
    # Densité ISA à l'altitude alt_m
    T   = ISA_T0_K - ISA_LAPSE * alt_m
    P   = ISA_P0_PA * (T / ISA_T0_K) ** 5.2561
    rho = P / (GAS_CONSTANT_AIR * T)
    q   = 0.5 * rho * v_ms * v_ms   # Pression dynamique (Pa)
    CL  = min(DRONE_WEIGHT_N / (q * DRONE_S_REF), DRONE_CL_MAX)  # CL en vol de croisière
    CD  = DRONE_CD0 + DRONE_K * CL * CL
    return q * DRONE_S_REF * CD


def propulsive_power_W(v_ms: float, alt_m: float = MISSION_ALT_M) -> float:
    """
    Puissance électrique totale consommée à la vitesse v_ms.

    P_total = P_propulsion + P_avionics
    P_propulsion = D × V / η_sys    (puissance mécanique / efficacité)
    P_avionics = 25.8 W (constante)
    """
    if v_ms < 0.5:
        return P_AVIONICS_W
    D = aero_drag_N(v_ms, alt_m)
    P_prop = D * v_ms / (MOTOR_ETA * PROP_ETA)
    return P_prop + P_AVIONICS_W


# Efficacités du groupe propulseur
MOTOR_ETA = 0.93   # Rendement moteur T-Motor U10 Plus (93%)
PROP_ETA  = 0.78   # Rendement hélice Xoar CFRP 16×10 6-blade (78%)


def patrol_endurance_min() -> float:
    """
    Calcule l'endurance de patrouille à V_patrol (vitesse L/D max).
    Retourne l'endurance en MINUTES.

    C'est la valeur corrigée de v1.0 (qui indiquait 155 km/h par erreur).
    V_patrol = 114 km/h est le vrai minimum de puissance.
    """
    P_total = propulsive_power_W(V_PATROL_MS)
    endurance_h = DRONE_E_USABLE / P_total
    return endurance_h * 60.0


def energy_for_segment_wh(v_ms: float, dist_m: float) -> float:
    """
    Énergie consommée pour voler dist_m à vitesse constante v_ms (en Wh).
    Utile pour prédire la consommation d'un segment de mission.
    """
    if v_ms < 0.5 or dist_m < 0.1:
        return 0.0
    t_s   = dist_m / v_ms              # Durée du segment (secondes)
    t_h   = t_s / 3600.0              # Durée en heures
    return propulsive_power_W(v_ms) * t_h


def generate_drone_ids(n: int, prefix: str = "AEGIS") -> List[str]:
    """Génère une liste de N identifiants de drones séquentiels."""
    return [f"{prefix}_{i:04d}" for i in range(n)]


# =============================================================================
#  SECTION 7 — SELF-TEST
#
#  Ce test est exécuté automatiquement à l'import du module.
#  Il vérifie que toutes les constantes calculées sont dans les plages
#  attendues — une sorte de "vérification que la physique est cohérente".
#
#  Si une constante est hors plage → Warning (mais pas d'exception).
#  L'objectif est de détecter les erreurs de calcul immédiatement,
#  pas de bloquer le démarrage du système.
#
#  C'est une pratique professionnelle : les modules physiques critiques
#  se valident eux-mêmes à l'initialisation.
#
# =============================================================================

def _run_self_test() -> bool:
    """
    Validation des constantes physiques calculées.
    Retourne True si tout est nominal, False si un check échoue.
    """
    import warnings
    errors = []

    def check(condition: bool, message: str):
        if not condition:
            errors.append(message)

    # ── Atmosphère ─────────────────────────────────────────────────────────────
    check(1.10 < RHO_300M < 1.25,
          f"Densité air hors plage: {RHO_300M:.4f} kg/m³ (attendu 1.10–1.25)")
    check(330 < SPEED_SOUND_300M < 345,
          f"Vitesse son hors plage: {SPEED_SOUND_300M:.1f} m/s (attendu 330–345)")

    # ── Vitesses ───────────────────────────────────────────────────────────────
    check(10 < V_STALL_MS < 22,
          f"V_stall hors plage: {V_STALL_MS:.2f} m/s (attendu 10–22)")
    check(24 < V_PATROL_MS < 36,
          f"V_patrol hors plage: {V_PATROL_MS:.2f} m/s (attendu 24–36)")
    check(85 < V_SPRINT_MS < 95,
          f"V_sprint hors plage: {V_SPRINT_MS:.2f} m/s (attendu 85–95)")

    # ── Mach & thermique ───────────────────────────────────────────────────────
    check(0.24 < MACH_SPRINT < 0.28,
          f"Mach_sprint hors plage: {MACH_SPRINT:.4f} (attendu 0.24–0.28)")
    check(3.0 < DELTA_T_STAG < 5.5,
          f"ΔT stagnation hors plage: {DELTA_T_STAG:.2f}°C (attendu 3–5.5)")

    # ── Énergie ────────────────────────────────────────────────────────────────
    check(170 < DRONE_E_USABLE < 185,
          f"Énergie usable hors plage: {DRONE_E_USABLE:.1f} Wh (attendu 170–185)")

    endurance = patrol_endurance_min()
    check(15 < endurance < 30,
          f"Endurance patrouille hors plage: {endurance:.1f} min (attendu 15–30)")

    # ── Booster ────────────────────────────────────────────────────────────────
    check(410 < BOOSTER_THRUST_N < 440,
          f"Poussée booster hors plage: {BOOSTER_THRUST_N:.1f} N (attendu 410–440)")
    check(BOOSTER_DV_MS > 50,
          f"ΔV booster trop faible: {BOOSTER_DV_MS:.1f} m/s (attendu > 50)")

    # ── Facteur de sécurité ────────────────────────────────────────────────────
    check(SF_STRUCTURE >= 1.5,
          f"SF structure insuffisant: {SF_STRUCTURE:.2f} (MIL-STD-1522A : ≥1.5)")

    # ── Tests Vec3 ─────────────────────────────────────────────────────────────
    v1 = Vec3(1, 2, 3)
    v2 = Vec3(4, 5, 6)
    check(abs((v1 + v2).x - 5) < 1e-9, "Vec3 addition failed")
    check(abs(v1.dot(v2) - 32.0) < 1e-9, "Vec3 dot product failed")
    check(abs(v1.dist(Vec3()) - math.sqrt(14)) < 1e-6, "Vec3 distance failed")
    check(abs(v1.norm() - math.sqrt(14)) < 1e-6, "Vec3 norm failed")
    v3 = v1.normalized()
    check(abs(v3.norm() - 1.0) < 1e-9, "Vec3 normalize failed")

    # Test immutabilité Vec3
    try:
        v1.x = 99.0
        errors.append("Vec3 doit être immutable")
    except AttributeError:
        pass   # Correct : l'exception est attendue

    # Test cône
    apex   = Vec3(0, 0, 0)
    axis   = Vec3(1, 0, 0)   # Axe Nord
    target = Vec3(30, 10, 0) # 30m Nord, 10m Est → dans le cône 45°
    check(target.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M),
          "in_cone false negative")
    outside = Vec3(30, 40, 0)  # 30m Nord, 40m Est → hors du cône
    check(not outside.in_cone(apex, axis, CONE_COS, CONE_DEPTH_M),
          "in_cone false positive")

    # ── Rapport ────────────────────────────────────────────────────────────────
    if errors:
        for e in errors:
            warnings.warn(f"[aegis.oc_types SELF-TEST] ⚠ {e}", RuntimeWarning, stacklevel=3)
        return False
    return True


# Exécuté automatiquement à l'import
_SELF_TEST_OK: bool = _run_self_test()


# =============================================================================
#  BLOC __main__ — Rapport complet si exécuté directement
#
#  Utilisation :
#    python -m aegis.oc_types
#    python src/aegis/oc_types.py
#
#  Affiche toutes les constantes calculées avec leur justification physique.
#  Utile pour vérifier manuellement que les valeurs sont cohérentes.
#
# =============================================================================

if __name__ == "__main__":

    W = 72       # largeur des séparateurs

    def sep(title: str = ""):
        if title:
            pad = (W - len(title) - 2) // 2
            print(f"\n  {'─'*pad} {title} {'─'*pad}")
        else:
            print(f"  {'═'*W}")

    sep()
    print(f"  AEGIS v{AEGIS_VERSION} · oc_types.py · Rapport de validation physique")
    sep()

    sep("ATMOSPHÈRE ISA @ 300m AGL")
    print(f"  Température       T = {ISA_T_300M_K:.2f} K  = {ISA_T_300M_K-273.15:.1f}°C")
    print(f"  Pression          P = {ISA_P_300M_PA:.0f} Pa  = {ISA_P_300M_PA/101325*100:.2f}% atm")
    print(f"  Densité           ρ = {RHO_300M:.4f} kg/m³")
    print(f"  Vitesse du son    a = {SPEED_SOUND_300M:.1f} m/s")

    sep("ENVELOPPE DE VOL — TESSERA MK.I")
    print(f"  V_décrochage      = {V_STALL_MS:.2f} m/s  = {V_STALL_MS*3.6:.0f} km/h")
    print(f"  V_patrouille      = {V_PATROL_MS:.2f} m/s  = {V_PATROL_MS*3.6:.0f} km/h  ← L/D max (optimal)")
    print(f"  V_dash            = {V_DASH_MS:.2f} m/s  = {V_DASH_MS*3.6:.0f} km/h  ← sprint électrique")
    print(f"  V_sprint          = {V_SPRINT_MS:.2f} m/s  = {V_SPRINT_MS*3.6:.0f} km/h  ← avec booster")
    print(f"  Mach sprint       = {MACH_SPRINT:.4f}")
    print(f"  ΔT stagnation     = +{DELTA_T_STAG:.2f}°C  (T800H limite: +120°C, marge: {120-DELTA_T_STAG:.0f}°C)")
    print(f"  G_design          = {G_DESIGN:.1f} G")
    print(f"  G_aéro max        = {G_AERO_MAX:.2f} G  @ {V_SPRINT_MS*3.6:.0f} km/h")
    print(f"  Safety Factor     = {SF_STRUCTURE:.2f}  (MIL-STD-1522A ≥ 1.5)  {'✓' if SF_STRUCTURE >= 1.5 else '✗'}")

    sep("AÉRODYNAMIQUE")
    print(f"  Surface alaire    S  = {DRONE_S_REF} m²")
    print(f"  Allongement       AR = {DRONE_AR:.2f}")
    print(f"  CD0               = {DRONE_CD0:.3f}")
    print(f"  K (traînée ind.)  = {DRONE_K:.4f}")
    print(f"  CL_opt (L/D max)  = {DRONE_CL_OPT:.4f}")
    print(f"  L/D max           = {DRONE_CL_OPT / (2*DRONE_CD0):.2f}")
    print()
    print(f"  {'Vitesse':>12}  {'Traînée':>10}  {'Puissance':>12}  {'Endurance':>12}")
    print(f"  {'(km/h)':>12}  {'(N)':>10}  {'(W)':>12}  {'(min)':>12}")
    print(f"  {'─'*52}")
    for v_kmh in [80, 100, 114, 130, 158, 200, 270, 320]:
        v = v_kmh / 3.6
        D = aero_drag_N(v)
        P = propulsive_power_W(v)
        e = (DRONE_E_USABLE / P * 60) if P > 0 else 0
        marker = " ← OPTIMAL" if v_kmh == 114 else ""
        print(f"  {v_kmh:>12}  {D:>10.1f}  {P:>12.0f}  {e:>12.1f}{marker}")

    sep("ÉNERGIE & ENDURANCE")
    end = patrol_endurance_min()
    print(f"  Batterie totale   = {BATT_CAP_WH:.0f} Wh  ({BATT_CELLS}S, {BATT_CAP_AH}Ah @ {BATT_V_NOM}V)")
    print(f"  Énergie utilisable= {DRONE_E_USABLE:.1f} Wh  (DoD {BATT_DOD_MAX*100:.0f}%)")
    print(f"  Réserve combat    = {E_RESERVE_COMBAT:.1f} Wh")
    print(f"  Réserve RTB       = {E_RESERVE_RTB_WH:.1f} Wh")
    print(f"  Réserve parachute = {E_RESERVE_CHUTE_WH:.1f} Wh")
    print(f"  Disponible patrol = {E_PATROL_WH:.1f} Wh")
    print(f"  Endurance patrol  = {end:.1f} min  @ {V_PATROL_MS*3.6:.0f} km/h")

    sep("BOOSTER CESARONI PRO54 6GXL")
    print(f"  Impulsion totale  = {BOOSTER_IMPULSE_NS:.1f} N·s")
    print(f"  Durée combustion  = {BOOSTER_DURATION_S:.1f} s")
    print(f"  Poussée moyenne   = {BOOSTER_THRUST_N:.1f} N")
    print(f"  ΔV apporté        = {BOOSTER_DV_MS:.1f} m/s")
    print(f"  Erreur timing max = ±{BOOSTER_JITTER_S*1000:.0f}ms → ±{BOOSTER_JITTER_S*V_SPRINT_MS:.1f}m d'erreur impact")

    sep("RÉSEAU 60 GHz — ATTÉNUATION PLUIE (ITU-R P.838-3)")
    print(f"  {'Pluie':>15}  {'(mm/h)':>8}  {'γ rain':>10}  {'γ total':>10}  {'Portée':>10}")
    print(f"  {'─'*58}")
    for label, r in [("Clair", 0), ("Légère", 2.5), ("Modérée", 12.5),
                      ("Intense", 50.0), ("Extrême", 100.0)]:
        g_r  = rain_attenuation_db_km(r)
        g_t  = g_r + O2_ABSORB_DB_KM
        rng  = mesh_range_m(r)
        print(f"  {label:>15}  {r:>8.1f}  {g_r:>10.2f}  {g_t:>10.2f}  {rng:>9.0f}m")

    sep("SAFETY GEOMETRY")
    print(f"  Sphère exclusion  = {SPHERE_RADIUS_M:.0f}m radius")
    print(f"  Cône blast angle  = ±{CONE_HALF_DEG:.0f}° (cos={CONE_COS:.4f})")
    print(f"  Cône blast depth  = {CONE_DEPTH_M:.0f}m")
    print(f"  Justification     : {DRONE_MASS_KG}kg @ {V_SPRINT_MS:.1f}m/s")
    print(f"    → KE = {0.5*DRONE_MASS_KG*V_SPRINT_MS**2:.0f} J → portée frag ≈45m + 15m marge = 60m")

    sep("SELF-TEST")
    status = "PASS ✓  — toutes les constantes dans les plages attendues" if _SELF_TEST_OK else "FAIL ✗"
    print(f"  {status}")
    sep()
    print()
