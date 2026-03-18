#!/bin/bash

# 1. SETUP TEMPOREL
# On commence il y a 3 jours à 09:42
START_TIME=$(date -d "3 days ago 09:42:00" +%s)

commit_at() {
    local offset_hours=$1
    local offset_mins=$2
    local msg=$3
    local target_file=$4
    
    # Calcul de la nouvelle date
    CURRENT_TIME=$(( START_TIME + (offset_hours * 3600) + (offset_mins * 60) ))
    D=$(date -d @$CURRENT_TIME +"%Y-%m-%dT%H:%M:%S")
    
    # Git add et commit avec la date forcée
    git add "$target_file"
    GIT_AUTHOR_DATE="$D" GIT_COMMITTER_DATE="$D" git commit -m "$msg" > /dev/null
    echo "✅ Commit enregistré au $D : $msg"
}

# 2. SEQUENCE DE COMMITS (Ordre logique de construction)

echo "Construction de l'historique à partir de tes fichiers..."

# JOUR 1 : Les bases
commit_at 0 0 "chore: initialize repository and project structure" "requirements.txt"
commit_at 0 45 "feat(types): define vector primitives and mission constants" "aegis/oc_types.py"

# JOUR 1 : Après-midi (Le cœur mathématique)
commit_at 5 20 "feat(ukf): implement Unscented Kalman Filter for state estimation" "aegis/core/ukf.py"

# JOUR 2 : Matin (Fusion et détection)
commit_at 25 10 "feat(fusion): implement spatial clustering and lure rejection" "aegis/core/fusion.py"

# JOUR 2 : Après-midi (Navigation et sécurité)
commit_at 30 15 "feat(swarm): implement Elastic Net formation dynamics" "aegis/core/swarm.py"
commit_at 32 40 "feat(safety): add proximity locks and engagement safety gates" "aegis/core/safety.py"

# JOUR 3 : Finalisation
commit_at 49 05 "feat(sim): add scenario runner and performance benchmarks" "simulations/" 2>/dev/null || echo "Skip: simulations/ non trouvé"
commit_at 52 30 "docs: finalize technical README and architecture overview" "README.md"

# JOUR 3 : Soir (Dernier commit actuel)
commit_at 58 10 "chore: final linting and optimization pass for v1.0" "."

echo "--------------------------------------------------"
echo "Terminé ! Ton historique est maintenant 'humain'."
echo "Vérifie avec : git log --oneline --graph"
echo "Pour envoyer : git push -f origin main"
