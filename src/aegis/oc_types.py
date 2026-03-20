from __future__ import annotations

import math
import time
import uuid
import hashlib
from enum import IntEnum, IntFlag
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Tuple, Any
import numpy as np


# ── Versioning ────────────────────────────────────────────────────────────────
AEGIS_VERSION    = "1.0.0"
PROTOCOL_VERSION = 3

# ── ISA @ 300m AGL ───────────────────────────────────────────────────────────
ISA_T0_K         = 288.15
ISA_P0_PA        = 101325.0
ISA_LAPSE        = 0.0065
GAS_CONSTANT_AIR = 287.058
GAMMA_AIR        = 1.4
G_EARTH          = 9.80665
MISSION_ALT_M    = 300.0

ISA_T_300M_K     = ISA_T0_K - ISA_LAPSE * MISSION_ALT_M
ISA_P_300M_PA    = ISA_P0_PA * (ISA_T_300M_K / ISA_T0_K) ** 5.2561
RHO_300M         = ISA_P_300M_PA / (GAS_CONSTANT_AIR * ISA_T_300M_K)
SPEED_SOUND_300M = math.sqrt(GAMMA_AIR * GAS_CONSTANT_AIR * ISA_T_300M_K)

# ── Aerodynamics — Tessera MK.II delta-canard ─────────────────────────────────
# CD = CD0 + K·CL²,  K = 1/(π·e·AR),  L/D_max at CL_opt = √(CD0/K)
DRONE_SPAN_M   = 0.94
DRONE_S_REF    = 0.42
DRONE_LENGTH_M = 1.12
DRONE_AR       = DRONE_SPAN_M**2 / DRONE_S_REF
DRONE_CD0      = 0.024
DRONE_OSWALD   = 0.87
DRONE_K        = 1.0 / (math.pi * DRONE_OSWALD * DRONE_AR)
DRONE_CL_MAX   = 1.52

# ── Mass budget ────────────────────────────────────────────────────────────────
MASS_AIRFRAME_KG = 1.80
MASS_BATTERY_KG  = 0.78
MASS_AVIONICS_KG = 0.92
MASS_MOTOR_KG    = 0.45
MASS_PAYLOAD_KG  = 2.40
DRONE_MASS_KG    = 7.20
DRONE_WEIGHT_N   = DRONE_MASS_KG * G_EARTH

# ── Flight envelope ────────────────────────────────────────────────────────────
DRONE_CL_OPT = math.sqrt(DRONE_CD0 / DRONE_K)

V_STALL_MS  = math.sqrt(2 * DRONE_WEIGHT_N / (RHO_300M * DRONE_S_REF * DRONE_CL_MAX))
V_PATROL_MS = math.sqrt(2 * DRONE_WEIGHT_N / (RHO_300M * DRONE_S_REF * DRONE_CL_OPT))
V_DASH_MS   = 75.0
V_SPRINT_MS = 88.89

# ── Structural limits — MIL-STD-1522A SF ≥ 1.5 ────────────────────────────────
G_DESIGN     = 22.0
G_ULTIMATE   = 33.0
G_AERO_MAX   = 42.51
SF_STRUCTURE = G_AERO_MAX / G_DESIGN

MACH_SPRINT  = V_SPRINT_MS / SPEED_SOUND_300M
DELTA_T_STAG = ISA_T_300M_K * (GAMMA_AIR - 1) / 2 * MACH_SPRINT**2

# ── Battery — Tattu Plus 10Ah 6S ──────────────────────────────────────────────
BATT_CELLS     = 6
BATT_V_NOM     = BATT_CELLS * 3.7
BATT_V_FULL    = BATT_CELLS * 4.2
BATT_V_MIN     = BATT_CELLS * 3.0
BATT_CAP_AH    = 10.0
BATT_CAP_WH    = BATT_V_NOM * BATT_CAP_AH
BATT_DOD_MAX   = 0.80
DRONE_E_USABLE = BATT_CAP_WH * BATT_DOD_MAX

# Three inviolable reserves (chute > RTB > combat, in priority order)
E_RESERVE_CHUTE_WH = 10.0
E_RESERVE_RTB_WH   = 40.0
E_RESERVE_COMBAT   = 60.0
E_PATROL_WH        = DRONE_E_USABLE - E_RESERVE_COMBAT - E_RESERVE_RTB_WH - E_RESERVE_CHUTE_WH

P_AVIONICS_W = 10.0 + 3.5 + 8.0 + 4.3

# ── Booster — Cesaroni Pro54 6GXL APCP ────────────────────────────────────────
# ±200ms timing jitter → ±8.9m miss at V_sprint. Drives clock-sync requirement.
BOOSTER_IMPULSE_NS = 764.5
BOOSTER_DURATION_S = 1.80
BOOSTER_THRUST_N   = BOOSTER_IMPULSE_NS / BOOSTER_DURATION_S
BOOSTER_PROP_KG    = 0.400
BOOSTER_TOTAL_KG   = 0.520
BOOSTER_DV_MS      = BOOSTER_IMPULSE_NS / (DRONE_MASS_KG - BOOSTER_PROP_KG / 2)
BOOSTER_JITTER_S   = 0.200

# ── 60 GHz mesh — Sivers IQ EVK06002 ──────────────────────────────────────────
# O2 absorption 15dB/km limits range — tactical advantage (hard to intercept).
# ITU-R P.838-3: γ = k_H × R^α_H  (dB/km, horizontal polarisation, 60GHz)
MESH_FREQ_GHZ      = 60.0
MESH_RATE_NOM_HZ   = 50.0
MESH_RATE_RAIN_HZ  = 2.0
MESH_RANGE_CLEAR_M = 800.0
MESH_RANGE_RAIN_M  = 420.0
MESH_LATENCY_US    = 1200.0
MESH_QUORUM_RATIO  = 2 / 3
ITU_K_H            = 0.187
ITU_ALPHA_H        = 1.021
O2_ABSORB_DB_KM    = 15.0
PACKET_SENSOR_BYTES  = 120
PACKET_COMMAND_BYTES = 48
PACKET_STATUS_BYTES  = 96

# ── UKF — Van der Merwe 2001 ───────────────────────────────────────────────────
# Q built per-axis as Singer model. σ_acc=25m/s² ≈ 2.5G unexpected manoeuvre.
UKF_N_STATE         = 9
UKF_N_MEAS          = 3
UKF_ALPHA           = 1e-3
UKF_BETA            = 2.0
UKF_KAPPA           = 0.0
UKF_DT_S            = 1.0 / 50.0
UKF_SIGMA_ACC       = 25.0
UKF_SIGMA_MEAS      = 3.0
UKF_HORIZON_S       = 12.0
UKF_SCAN_STEP       = 0.1
UKF_INTERCEPT_TOL_S = 0.30
UKF_TIMEOUT_S       = 3.0
UKF_MAX_TRACKS      = 50
UKF_P0_POS          = 25.0
UKF_P0_VEL          = 100.0
UKF_P0_ACC          = 50.0

# ── Spectral fusion ────────────────────────────────────────────────────────────
CLUSTER_RADIUS_M = 25.0
VOTE_THRESHOLD   = 0.67
LURE_T_FLARE_K   = 700.0
LURE_T_BALLOON_K = 305.0
LURE_TEMP_STD_K  = 40.0
LURE_DECEL_MS2   = 15.0
BFT_SIGMA_THRESH = 3.0
STALE_CLUSTER_S  = 1.5

# ── Elastic net formation ──────────────────────────────────────────────────────
NET_SPACING_M      = 45.0
NET_SPACING_ENGAGE = 34.0
NET_MAX_STRETCH_M  = 85.0
NET_MIN_M          = 15.0
NET_K_SPRING       = 0.12
NET_K_REPULSE      = 500.0
NET_F_CLAMP_MS2    = 5.0
NET_N_NEIGHBORS    = 6
NET_REFORM_THRESH  = 0.75
NET_REFORM_DONE    = 0.92

# ── Safety layer ───────────────────────────────────────────────────────────────
# Cone depth: 7.2kg × (88.9m/s)² / 2 = 28,445J → frag radius 45m + 15m margin
SPHERE_RADIUS_M   = 15.0
CONE_HALF_DEG     = 45.0
CONE_DEPTH_M      = 60.0
CONE_COS          = math.cos(math.radians(CONE_HALF_DEG))
HUMAN_VETO_S      = 8.0
AUTO_CONF_THRESH  = 0.85
HIGH_RISK_MASS_KG = 30.0
HIGH_RISK_CONF    = 0.95
CIVIL_G_MAX       = 3.5
CIVIL_VRATE_MIN   = -20.0
CIVIL_SPEED_TOL   = 25.0
SPOOF_CONF_MIN    = 0.40
WORTH_RTB         = 60.0
WORTH_ASK         = 80.0

KINETIC_E_J   = 0.5 * DRONE_MASS_KG * V_SPRINT_MS**2
MOTOR_P_MAX_W = 2400.0


# =============================================================================
#  Enumerations
# =============================================================================

class DroneRole(IntEnum):
    PATROL     = 0
    SPRINT     = 1
    SECONDARY  = 2
    NET_ANCHOR = 3
    NET_FILL   = 4
    RTB        = 5
    RECOVERY   = 6
    STANDBY    = 7
    LOST       = 8

    def is_airborne(self)     -> bool: return self not in (DroneRole.STANDBY, DroneRole.RECOVERY, DroneRole.LOST)
    def is_combat_ready(self) -> bool: return self in (DroneRole.PATROL, DroneRole.NET_ANCHOR, DroneRole.NET_FILL)
    def can_sprint(self)      -> bool: return self == DroneRole.PATROL


class DroneHealth(IntEnum):
    NOMINAL  = 0
    DEGRADED = 1
    CRITICAL = 2
    LOST     = 3

    def is_operational(self) -> bool: return self in (DroneHealth.NOMINAL, DroneHealth.DEGRADED)


class TargetClass(IntEnum):
    UNKNOWN     = 0
    PROBABLE    = 1
    CONFIRMED   = 2
    LURE        = 3
    NEUTRAL     = 4
    NEUTRALIZED = 5

    def is_threat(self)     -> bool: return self in (TargetClass.PROBABLE, TargetClass.CONFIRMED)
    def is_engageable(self) -> bool: return self == TargetClass.CONFIRMED


class TargetType(IntEnum):
    UNKNOWN        = 0
    SHAHED_136     = 1
    LANCET_3       = 2
    ORLAN_10       = 3
    SMALL_DRONE    = 4
    CIVIL_AIRCRAFT = 5
    ARTILLERY      = 6
    CRUISE_MISSILE = 7
    MORTAR         = 8
    BALLOON_LURE   = 9
    FLARE_LURE     = 10

    def estimated_mass_kg(self) -> float:
        return {0:20.,1:50.,2:5.,3:15.,4:3.,5:70000.,6:.045,7:500.,8:4.5,9:2.,10:.5}.get(self.value, 20.)

    def estimated_speed_ms(self) -> float:
        return {0:80.,1:51.4,2:83.3,3:41.7,4:22.2,5:240.,6:850.,7:250.,8:290.,9:8.,10:40.}.get(self.value, 80.)


class PayloadMode(IntEnum):
    KINETIC = 0
    NET     = 1


class BoosterState(IntEnum):
    ARMED    = 0
    COUNTING = 2
    FIRING   = 3
    SPENT    = 4
    SAFE     = 5

    def can_fire(self) -> bool: return self == BoosterState.ARMED


class NetState(IntEnum):
    PATROL  = 0
    ENGAGE  = 1
    PURSUIT = 2
    REFORM  = 3

    def transition(self, trigger: str) -> 'NetState':
        _t = {
            (NetState.PATROL,  'target_confirmed'): NetState.ENGAGE,
            (NetState.ENGAGE,  'target_outside'):   NetState.PURSUIT,
            (NetState.ENGAGE,  'target_lost'):      NetState.PATROL,
            (NetState.PURSUIT, 'target_inside'):    NetState.ENGAGE,
            (NetState.PURSUIT, 'target_lost'):      NetState.PATROL,
            (NetState.REFORM,  'health_ok'):        NetState.PATROL,
        }
        return _t.get((self, trigger), self)


class LockReason(IntEnum):
    NONE           = 0
    FRIENDLY_NEAR  = 1
    FRIENDLY_CONE  = 2
    HUMAN_VETO     = 3
    NETWORK_LOSS   = 4
    SELF_TEST_FAIL = 5
    EMERGENCY      = 6
    ROE_OVERRIDE   = 7


class EnergyDecision(IntEnum):
    CONTINUE_PATROL   = 0
    EXECUTE_INTERCEPT = 1
    ABORT_INTERCEPT   = 2
    INITIATE_RTB      = 3
    EMERGENCY_CHUTE   = 4

    def is_abort(self) -> bool:
        return self in (EnergyDecision.ABORT_INTERCEPT,
                        EnergyDecision.INITIATE_RTB,
                        EnergyDecision.EMERGENCY_CHUTE)


class SensorStatus(IntFlag):
    NONE    = 0
    EO      = 1
    LWIR    = 2
    DOPPLER = 4
    GPS     = 8
    IMU     = 16
    BARO    = 32
    MESH_60 = 64
    FALLBK  = 128
    ALL     = 255

    def has_eo(self)       -> bool: return bool(self & SensorStatus.EO)
    def has_ir(self)       -> bool: return bool(self & SensorStatus.LWIR)
    def has_doppler(self)  -> bool: return bool(self & SensorStatus.DOPPLER)
    def has_gps(self)      -> bool: return bool(self & SensorStatus.GPS)
    def has_imu(self)      -> bool: return bool(self & SensorStatus.IMU)
    def has_mesh(self)     -> bool: return bool(self & (SensorStatus.MESH_60 | SensorStatus.FALLBK))
    def is_full(self)      -> bool: return self == SensorStatus.ALL
    def sensor_count(self) -> int:  return bin(int(self)).count('1')


# =============================================================================
#  Vec3 — immutable NED vector
# =============================================================================

class Vec3:
    """
    Immutable 3D vector, NED frame (Z+ downward).
    altitude_m = -Z.
    __slots__: ~80 bytes/instance vs ~280 with __dict__ — matters at N=500.
    """
    __slots__ = ('x', 'y', 'z')

    def __init__(self, x: float = 0., y: float = 0., z: float = 0.):
        object.__setattr__(self, 'x', float(x))
        object.__setattr__(self, 'y', float(y))
        object.__setattr__(self, 'z', float(z))

    def __setattr__(self, n, v): raise AttributeError("Vec3 is immutable")

    def __add__(self, o): return Vec3(self.x+o.x, self.y+o.y, self.z+o.z)
    def __sub__(self, o): return Vec3(self.x-o.x, self.y-o.y, self.z-o.z)
    def __mul__(self, s): return Vec3(self.x*s,   self.y*s,   self.z*s)
    def __rmul__(self, s): return self.__mul__(s)
    def __neg__(self):     return Vec3(-self.x, -self.y, -self.z)
    def __repr__(self):    return f"Vec3(N={self.x:.2f}, E={self.y:.2f}, D={self.z:.2f})"
    def __hash__(self):    return hash((round(self.x,3), round(self.y,3), round(self.z,3)))

    def __truediv__(self, s):
        if abs(s) < 1e-15: raise ZeroDivisionError("Vec3 / 0")
        return Vec3(self.x/s, self.y/s, self.z/s)

    def __eq__(self, o):
        if not isinstance(o, Vec3): return False
        return abs(self.x-o.x)<1e-9 and abs(self.y-o.y)<1e-9 and abs(self.z-o.z)<1e-9

    def norm(self)    -> float: return math.sqrt(self.x*self.x + self.y*self.y + self.z*self.z)
    def norm_sq(self) -> float: return self.x*self.x + self.y*self.y + self.z*self.z
    def dot(self, o)  -> float: return self.x*o.x + self.y*o.y + self.z*o.z

    def normalized(self) -> 'Vec3':
        n = self.norm()
        return Vec3(1.,0.,0.) if n < 1e-12 else Vec3(self.x/n, self.y/n, self.z/n)

    def cross(self, o) -> 'Vec3':
        return Vec3(self.y*o.z-self.z*o.y, self.z*o.x-self.x*o.z, self.x*o.y-self.y*o.x)

    def dist(self, o)    -> float: return (self-o).norm()
    def dist_2d(self, o) -> float: return math.sqrt((self.x-o.x)**2+(self.y-o.y)**2)

    def angle_to(self, o) -> float:
        n1, n2 = self.norm(), o.norm()
        if n1<1e-12 or n2<1e-12: return 0.
        return math.acos(max(-1., min(1., self.dot(o)/(n1*n2))))

    def lerp(self, o, t) -> 'Vec3': return self + (o-self)*t

    def project_onto(self, axis) -> 'Vec3':
        d = axis.norm_sq()
        return Vec3() if d<1e-12 else axis*(self.dot(axis)/d)

    def in_cone(self, apex: 'Vec3', axis: 'Vec3', cos_half: float, depth: float) -> bool:
        """O(1) point-in-cone, no sqrt until final check."""
        v = self - apex
        a = axis.normalized()
        d = v.dot(a)
        if d < 0. or d > depth: return False
        vn = v.norm()
        if vn < 1e-12: return True
        return d/vn >= cos_half

    @property
    def altitude_m(self) -> float: return -self.z

    def to_np(self)   -> 'np.ndarray': return np.array([self.x, self.y, self.z], dtype=np.float64)
    def to_dict(self) -> Dict:          return {'x': self.x, 'y': self.y, 'z': self.z}

    @staticmethod
    def from_np(a: 'np.ndarray') -> 'Vec3': return Vec3(float(a[0]),float(a[1]),float(a[2]))
    @staticmethod
    def from_dict(d: Dict) -> 'Vec3':        return Vec3(d.get('x',0.),d.get('y',0.),d.get('z',0.))
    @staticmethod
    def zero()  -> 'Vec3': return Vec3(0.,0.,0.)
    @staticmethod
    def north(d: float=1.) -> 'Vec3': return Vec3(d,0.,0.)
    @staticmethod
    def east(d: float=1.)  -> 'Vec3': return Vec3(0.,d,0.)
    @staticmethod
    def up(d: float=1.)    -> 'Vec3': return Vec3(0.,0.,-d)


# =============================================================================
#  Data structures
# =============================================================================

@dataclass
class EODetection:
    target_pos_world: Optional[Vec3]                  = None
    confidence:       float                           = 0.0
    bbox_px:          Optional[Tuple[int,int,int,int]]= None
    track_id:         Optional[int]                   = None
    class_label:      str                             = "unknown"
    frame_number:     int                             = 0

    @property
    def has_detection(self) -> bool:
        return self.target_pos_world is not None and self.confidence > 0.1


@dataclass
class IRDetection:
    centroid_world: Optional[Vec3]  = None
    temp_K:         Optional[float] = None
    background_K:   float           = ISA_T_300M_K
    contrast_K:     float           = 0.0
    pixel_area:     int             = 0
    max_temp_K:     Optional[float] = None
    uniformity:     float           = 0.0

    @property
    def is_flare(self)     -> bool: return self.temp_K is not None and self.temp_K > LURE_T_FLARE_K
    @property
    def is_cold_lure(self) -> bool: return self.contrast_K < 5. and self.pixel_area > 10
    @property
    def has_detection(self)-> bool: return self.centroid_world is not None and self.contrast_K > 2.


@dataclass
class DopplerMeasurement:
    radial_velocity_ms: Optional[float] = None
    range_m:            Optional[float] = None
    snr_db:             float           = 0.0
    confidence:         float           = 0.0

    @property
    def closing_speed_ms(self) -> Optional[float]:
        return None if self.radial_velocity_ms is None else -self.radial_velocity_ms

    @property
    def has_detection(self) -> bool:
        return self.radial_velocity_ms is not None and self.confidence > 0.1


@dataclass
class SensorFrame:
    drone_id:       str
    sequence_num:   int              = 0
    timestamp_s:    float            = field(default_factory=time.time)
    eo:             EODetection      = field(default_factory=EODetection)
    ir:             IRDetection      = field(default_factory=IRDetection)
    doppler:        DopplerMeasurement = field(default_factory=DopplerMeasurement)
    drone_pos:      Vec3             = field(default_factory=Vec3.zero)
    drone_vel:      Vec3             = field(default_factory=Vec3.zero)
    heading_deg:    float            = 0.0
    altitude_m:     float            = MISSION_ALT_M
    battery_wh:     float            = DRONE_E_USABLE
    active_sensors: SensorStatus     = SensorStatus.ALL
    rssi_dbm:       float            = -45.0
    cpu_load_pct:   float            = 30.0
    motor_temp_c:   float            = 35.0

    @property
    def has_target(self) -> bool:
        return self.eo.has_detection or self.ir.has_detection or self.doppler.has_detection

    @property
    def is_valid(self) -> bool:
        return (self.active_sensors.has_imu() and
                self.active_sensors.has_mesh() and
                self.battery_wh > E_RESERVE_CHUTE_WH)

    @property
    def age_ms(self) -> float: return (time.time() - self.timestamp_s) * 1000.


@dataclass
class FusedTarget:
    target_id:    str        = field(default_factory=lambda: f"TGT_{uuid.uuid4().hex[:6].upper()}")
    timestamp_s:  float      = field(default_factory=time.time)
    first_seen_s: float      = field(default_factory=time.time)
    classification: TargetClass = TargetClass.UNKNOWN
    target_type:    TargetType  = TargetType.UNKNOWN
    is_lure:        bool        = False
    lure_reason:    str         = ""
    lure_confidence:float       = 0.0
    pos:     Vec3 = field(default_factory=Vec3.zero)
    vel:     Vec3 = field(default_factory=Vec3.zero)
    acc:     Vec3 = field(default_factory=Vec3.zero)
    pos_std: Vec3 = field(default_factory=lambda: Vec3(50.,50.,50.))
    ukf_state:   Optional['np.ndarray'] = None
    ukf_cov:     Optional['np.ndarray'] = None
    ukf_updates: int                    = 0
    eo_votes:    int   = 0
    ir_votes:    int   = 0
    total_voters:int   = 0
    bft_rejected:int   = 0
    mean_temp_K: float = 0.0
    max_temp_K:  float = 0.0
    temp_std_K:  float = 0.0
    intercept_pos:  Optional[Vec3]  = None
    intercept_t_s:  Optional[float] = None
    intercept_conf: float           = 0.0
    assigned_drone_id:  Optional[str]   = None
    engagement_start_s: Optional[float] = None

    @property
    def vote_ratio(self) -> float:
        if self.total_voters == 0: return 0.
        return (self.eo_votes + self.ir_votes) / (2 * self.total_voters)

    @property
    def is_confirmed(self) -> bool:
        return (self.classification == TargetClass.CONFIRMED and
                self.vote_ratio >= VOTE_THRESHOLD and not self.is_lure)

    @property
    def is_stale(self)   -> bool:  return (time.time() - self.timestamp_s) > UKF_TIMEOUT_S
    @property
    def speed_ms(self)   -> float: return self.vel.norm()
    @property
    def speed_kmh(self)  -> float: return self.speed_ms * 3.6
    @property
    def age_s(self)      -> float: return time.time() - self.first_seen_s

    @property
    def track_quality(self) -> float:
        return float(np.mean([
            min(self.age_s / 2., 1.),
            min(self.vote_ratio / VOTE_THRESHOLD, 1.),
            min(self.ukf_updates / 100, 1.),
            max(0., 1. - self.pos_std.norm() / 50.),
        ]))

    def to_dict(self) -> Dict:
        return {'id': self.target_id, 'class': self.classification.name,
                'type': self.target_type.name, 'is_lure': self.is_lure,
                'pos_m': self.pos.to_dict(), 'speed_kmh': round(self.speed_kmh, 1),
                'vote_ratio': round(self.vote_ratio, 3), 'temp_K': round(self.mean_temp_K, 1),
                'track_quality': round(self.track_quality, 3),
                'intercept_t_s': round(self.intercept_t_s, 2) if self.intercept_t_s else None}


@dataclass
class DroneState:
    drone_id:      str
    formation_idx: int           = -1
    role:          DroneRole     = DroneRole.PATROL
    health:        DroneHealth   = DroneHealth.NOMINAL
    payload:       PayloadMode   = PayloadMode.KINETIC
    booster:       BoosterState  = BoosterState.ARMED
    active_sensors:SensorStatus  = SensorStatus.ALL
    pos:           Vec3          = field(default_factory=Vec3.zero)
    vel:           Vec3          = field(default_factory=Vec3.zero)
    acc:           Vec3          = field(default_factory=Vec3.zero)
    heading_deg:   float         = 0.0
    battery_wh:    float         = DRONE_E_USABLE
    battery_v:     float         = BATT_V_NOM
    power_draw_w:  float         = 0.0
    assigned_target_id: Optional[str] = None
    last_seen_s:   float         = field(default_factory=time.time)
    rssi_dbm:      float         = -45.0
    n_peers:       int           = 0
    mission_start_s:    float    = field(default_factory=time.time)
    total_sprints:      int      = 0
    intercepts_success: int      = 0

    @property
    def speed_ms(self)    -> float: return self.vel.norm()
    @property
    def altitude_m(self)  -> float: return -self.pos.z
    @property
    def battery_pct(self) -> float: return self.battery_wh / DRONE_E_USABLE
    @property
    def is_alive(self)    -> bool:  return self.health != DroneHealth.LOST

    @property
    def can_intercept(self) -> bool:
        has_vision = self.active_sensors.has_eo() or self.active_sensors.has_ir()
        has_energy = self.battery_wh > (E_RESERVE_RTB_WH + E_RESERVE_CHUTE_WH + 20.)
        return self.is_alive and self.role.is_combat_ready() and has_energy and has_vision

    @property
    def link_ok(self) -> bool:
        return self.rssi_dbm > -70. and (time.time() - self.last_seen_s) < 1.

    def to_dict(self) -> Dict:
        return {'id': self.drone_id, 'role': self.role.name, 'health': self.health.name,
                'pos': self.pos.to_dict(), 'speed_ms': round(self.speed_ms, 1),
                'battery_pct': round(self.battery_pct*100, 1), 'altitude_m': round(self.altitude_m, 1)}


@dataclass
class InterceptOrder:
    order_id:      str   = field(default_factory=lambda: f"ORD_{uuid.uuid4().hex[:8].upper()}")
    drone_id:      str   = ""
    target_id:     str   = ""
    issued_s:      float = field(default_factory=time.time)
    aim_pos:       Vec3  = field(default_factory=Vec3.zero)
    eta_s:         float = 0.0
    booster_req:   bool  = False
    booster_fire_t:float = 0.0
    payload:       PayloadMode = PayloadMode.KINETIC
    target_type:   TargetType  = TargetType.UNKNOWN
    abort_batt_wh: float       = E_RESERVE_RTB_WH
    acknowledged:  bool        = False
    aborted:       bool        = False
    abort_reason:  str         = ""
    completed:     bool        = False
    human_approved:bool        = False

    @property
    def is_active(self) -> bool:
        return self.acknowledged and not self.aborted and not self.completed

    @property
    def booster_countdown_s(self) -> float:
        return float('inf') if not self.booster_req else self.booster_fire_t - time.time()

    @property
    def age_s(self) -> float: return time.time() - self.issued_s

    def to_dict(self) -> Dict:
        s = 'COMPLETED' if self.completed else 'ABORTED' if self.aborted else 'ACTIVE' if self.is_active else 'PENDING'
        return {'order_id': self.order_id, 'drone': self.drone_id, 'target': self.target_id,
                'aim_pos': self.aim_pos.to_dict(), 'eta_s': round(self.eta_s, 2),
                'booster': self.booster_req,
                'fire_in_s': round(self.booster_countdown_s, 3) if self.booster_req else None,
                'status': s}


@dataclass
class DroneCommand:
    drone_id:      str
    timestamp_s:   float       = field(default_factory=time.time)
    seq_num:       int         = 0
    role:          DroneRole   = DroneRole.PATROL
    target_pos:    Vec3        = field(default_factory=Vec3.zero)
    target_speed:  float       = V_PATROL_MS
    formation_slot:int         = -1
    formation_pos: Optional[Vec3] = None
    intercept_order: Optional[InterceptOrder] = None
    fire_booster:  bool        = False
    booster_at:    float       = 0.0
    deploy_payload:bool        = False
    payload_mode:  PayloadMode = PayloadMode.KINETIC
    initiate_rtb:  bool        = False
    deploy_chute:  bool        = False

    @property
    def is_hostile_action(self) -> bool: return self.deploy_payload or self.fire_booster

    def checksum(self) -> str:
        data = f"{self.drone_id}{self.timestamp_s:.3f}{self.role}{self.fire_booster}{self.deploy_payload}"
        return hashlib.md5(data.encode()).hexdigest()[:8]


@dataclass
class ProximityLockState:
    drone_id:      str
    timestamp_s:   float      = field(default_factory=time.time)
    eval_num:      int        = 0
    is_locked:     bool       = True
    lock_reason:   LockReason = LockReason.NONE
    sphere_clear:  bool       = False
    cone_clear:    bool       = False
    network_ok:    bool       = False
    human_clear:   bool       = False
    nearest_m:     float      = float('inf')
    n_in_sphere:   int        = 0
    n_in_cone:     int        = 0
    network_ratio: float      = 0.0
    eval_us:       float      = 0.0

    @property
    def all_clear(self) -> bool:
        return (not self.is_locked and self.sphere_clear and
                self.cone_clear and self.network_ok and self.human_clear)


@dataclass
class ThreatProfile:
    target_id:       str
    target_type:     TargetType = TargetType.UNKNOWN
    mass_kg:         float      = 20.0
    velocity_ms:     float      = 80.0
    collateral_risk: float      = 0.5

    @property
    def kinetic_energy_J(self) -> float: return 0.5 * self.mass_kg * self.velocity_ms**2

    @property
    def threat_score(self) -> float:
        """
        Composite [0-100]. Precision bonus for LANCET_3/CRUISE_MISSILE:
        guidance compensates for low mass in lethality assessment.
        """
        mass_s     = max(min(self.mass_kg / 50., 1.) * 30., 15.)
        vel_s      = min(self.velocity_ms / 200., 1.) * 30.
        col_s      = self.collateral_risk * 25.
        prec_bonus = 15. if self.target_type in (TargetType.LANCET_3, TargetType.CRUISE_MISSILE) else 0.
        return min(mass_s + vel_s + col_s + prec_bonus, 100.)

    @property
    def is_high_risk(self) -> bool:
        return self.mass_kg > HIGH_RISK_MASS_KG or self.threat_score > WORTH_ASK


@dataclass
class AuditEntry:
    entry_id:   str   = field(default_factory=lambda: uuid.uuid4().hex[:12].upper())
    timestamp_s:float = field(default_factory=time.time)
    event_type: str   = ""
    drone_id:   str   = ""
    target_id:  str   = ""
    confidence: float = 0.0
    score:      float = 0.0
    operator:   str   = "SYSTEM"
    outcome:    str   = ""

    def to_dict(self) -> Dict:
        return {'id': self.entry_id, 'ts': self.timestamp_s, 'type': self.event_type,
                'drone': self.drone_id, 'target': self.target_id,
                'conf': round(self.confidence,3), 'score': round(self.score,1),
                'op': self.operator, 'outcome': self.outcome}


@dataclass
class SwarmStatus:
    timestamp_s:         float
    n_total:             int
    n_patrol:            int
    n_sprint:            int
    n_rtb:               int
    n_lost:              int
    n_confirmed_targets: int
    n_lures_total:       int
    n_bft_rejected:      int
    formation_health:    float
    formation_state:     NetState
    mean_battery_pct:    float
    min_battery_pct:     float
    n_combat_ready:      int
    network_quorum:      float
    rain_mode:           bool  = False

    @property
    def readiness(self) -> float:
        if self.n_total == 0: return 0.
        return (self.n_combat_ready / max(self.n_total - self.n_lost, 1)) * self.formation_health


# =============================================================================
#  Utility functions
# =============================================================================

def rain_attenuation_db_km(rain_mm_h: float) -> float:
    """ITU-R P.838-3, horizontal polarisation, 60GHz."""
    if rain_mm_h <= 0.: return 0.
    return ITU_K_H * (rain_mm_h ** ITU_ALPHA_H)


def mesh_range_m(rain_mm_h: float, link_budget_db: float = 13.0) -> float:
    if rain_mm_h <= 0.: return MESH_RANGE_CLEAR_M
    return max(50., (link_budget_db / (rain_attenuation_db_km(rain_mm_h) + O2_ABSORB_DB_KM)) * 1000.)


def aero_drag_N(v_ms: float, alt_m: float = MISSION_ALT_M) -> float:
    """Drag including induced component. CL from level-flight equilibrium L=W."""
    if v_ms < 0.5: return 0.
    T   = ISA_T0_K - ISA_LAPSE * alt_m
    rho = (ISA_P0_PA * (T/ISA_T0_K)**5.2561) / (GAS_CONSTANT_AIR * T)
    q   = 0.5 * rho * v_ms * v_ms
    CL  = min(DRONE_WEIGHT_N / (q * DRONE_S_REF), DRONE_CL_MAX)
    return q * DRONE_S_REF * (DRONE_CD0 + DRONE_K * CL * CL)


MOTOR_ETA = 0.93
PROP_ETA  = 0.78


def propulsive_power_W(v_ms: float, alt_m: float = MISSION_ALT_M) -> float:
    if v_ms < 0.5: return P_AVIONICS_W
    return aero_drag_N(v_ms, alt_m) * v_ms / (MOTOR_ETA * PROP_ETA) + P_AVIONICS_W


def energy_for_segment_wh(v_ms: float, dist_m: float) -> float:
    if v_ms < 0.5 or dist_m < 0.1: return 0.
    return propulsive_power_W(v_ms) * (dist_m / v_ms / 3600.)


def generate_drone_ids(n: int, prefix: str = "AEGIS") -> List[str]:
    return [f"{prefix}_{i:04d}" for i in range(n)]


PATROL_ENDURANCE_MIN: float = DRONE_E_USABLE / propulsive_power_W(V_PATROL_MS) * 60.
PATROL_ENDURANCE_S:   float = PATROL_ENDURANCE_MIN * 60.


# =============================================================================
#  Self-test
# =============================================================================

def _run_self_test() -> bool:
    import warnings
    errors = []

    def check(cond, msg):
        if not cond: errors.append(msg)

    check(1.10 < RHO_300M < 1.25,           f"rho={RHO_300M:.4f}")
    check(330 < SPEED_SOUND_300M < 345,      f"c={SPEED_SOUND_300M:.1f}")
    check(10 < V_STALL_MS < 22,              f"V_stall={V_STALL_MS:.2f}")
    check(24 < V_PATROL_MS < 36,             f"V_patrol={V_PATROL_MS:.2f}")
    check(85 < V_SPRINT_MS < 95,             f"V_sprint={V_SPRINT_MS:.2f}")
    check(0.24 < MACH_SPRINT < 0.28,         f"Mach={MACH_SPRINT:.4f}")
    check(3.0 < DELTA_T_STAG < 5.5,          f"dT_stag={DELTA_T_STAG:.2f}")
    check(170 < DRONE_E_USABLE < 185,        f"E_usable={DRONE_E_USABLE:.1f}")
    check(15 < PATROL_ENDURANCE_MIN < 30,    f"endurance={PATROL_ENDURANCE_MIN:.1f}min")
    check(410 < BOOSTER_THRUST_N < 440,      f"thrust={BOOSTER_THRUST_N:.1f}N")
    check(BOOSTER_DV_MS > 50,                f"dv={BOOSTER_DV_MS:.1f}")
    check(SF_STRUCTURE >= 1.5,               f"SF={SF_STRUCTURE:.2f}")

    v1, v2 = Vec3(1,2,3), Vec3(4,5,6)
    check(abs((v1+v2).x - 5) < 1e-9,        "Vec3+")
    check(abs(v1.dot(v2) - 32.) < 1e-9,     "Vec3·")
    check(abs(v1.dist(Vec3()) - math.sqrt(14)) < 1e-6, "Vec3 dist")
    check(abs(v1.normalized().norm()-1.) < 1e-9, "Vec3 norm")
    try:
        v1.x = 0
        errors.append("Vec3 mutability breach")
    except AttributeError:
        pass
    check( Vec3(30,10,0).in_cone(Vec3(),Vec3(1,0,0),CONE_COS,CONE_DEPTH_M), "cone FN")
    check(not Vec3(30,40,0).in_cone(Vec3(),Vec3(1,0,0),CONE_COS,CONE_DEPTH_M), "cone FP")

    if errors:
        for e in errors:
            warnings.warn(f"[oc_types] {e}", RuntimeWarning, stacklevel=3)
        return False
    return True


_SELF_TEST_OK: bool = _run_self_test()
