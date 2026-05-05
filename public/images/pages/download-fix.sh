#!/bin/bash
# Re-download failed images with alternative URLs
declare -A FIX

FIX[aegis-command-battle]="https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=1920&q=85"
FIX[aegis-mobile-hero]="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=85"
FIX[aegis-mobile-portable]="https://images.unsplash.com/photo-1532629345422-751700f69382?w=1920&q=85"
FIX[careers-culture]="https://images.unsplash.com/photo-1527684651643-3df0b46f43e0?w=1920&q=85"
FIX[classification-hero]="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=85"
FIX[company-mission]="https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=1920&q=85"
FIX[defense-satellite-dish]="https://images.unsplash.com/photo-1530124566582-a45a7e3e29f0?w=1920&q=85"
FIX[fob-hero]="https://images.unsplash.com/photo-1532629345422-751700f69382?w=1920&q=85"
FIX[maritime-port]="https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=1920&q=85"
FIX[neutralization-hero]="https://images.unsplash.com/photo-1603509902991-e7e7e1930a9e?w=1920&q=85"
FIX[neutralization-jamming]="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=85"
FIX[partners-hero]="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=85"
FIX[prisons-perimeter]="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=85"
FIX[products-hero]="https://images.unsplash.com/photo-1548607682-9b3e2034c25e?w=1920&q=85"
FIX[urban-hero]="https://images.unsplash.com/photo-1470219556762-1fd5b23f975d?w=1920&q=85"

for key in "${!FIX[@]}"; do
  echo "Re-downloading ${key}..."
  curl -sL "${FIX[$key]}" -o "${key}.jpg" &
done
wait

# Check again
for f in *.jpg; do
  size=$(stat -c%s "$f" 2>/dev/null || echo 0)
  if [ "$size" -lt 5000 ]; then
    echo "STILL FAILED: $f ($size bytes) - removing"
    rm -f "$f"
  fi
done
echo "Total files: $(ls *.jpg | wc -l)"
