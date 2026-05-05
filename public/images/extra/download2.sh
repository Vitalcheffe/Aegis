#!/bin/bash
# Download replacement images for failed ones
urls=(
  "https://images.unsplash.com/photo-1470813259227-8c2862a7d5c1?w=1920&q=80" # airport
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80" # data center
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80" # tech lab
  "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=1920&q=80" # drone
  "https://images.unsplash.com/photo-1548607682-9b3e2034c25e?w=1920&q=80" # military base
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80" # coordination
  "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1920&q=80" # tech
  "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1920&q=80" # radar
  "https://images.unsplash.com/photo-1559253664-ca249d4608c6?w=1920&q=80" # warship
  "https://images.unsplash.com/photo-1599815034606-1b4af4e1c7b5?w=1920&q=80" # security camera
  "https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=1920&q=80" # border wall
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80" # jail/prison
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920&q=80" # vip event
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80" # esports/tech
  "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=1920&q=80" # conference
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80" # office
  "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1920&q=80" # hospital
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&q=80" # data viz
  "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1920&q=80" # military
  "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=1920&q=80" # formation
)

names=(
  "airport-terminal.jpg"
  "server-room.jpg"
  "tech-lab.jpg"
  "drone-surveillance.jpg"
  "military-facility.jpg"
  "tactical-coordination.jpg"
  "ai-technology.jpg"
  "radar-display.jpg"
  "warship-sea.jpg"
  "security-camera.jpg"
  "border-wall.jpg"
  "prison-facility.jpg"
  "vip-event.jpg"
  "esports-tech.jpg"
  "conference-stage.jpg"
  "modern-office.jpg"
  "hospital-corridor.jpg"
  "data-dashboard.jpg"
  "military-formation.jpg"
  "military-march.jpg"
)

for i in "${!urls[@]}"; do
  echo "Downloading ${names[$i]}..."
  curl -sL "${urls[$i]}" -o "${names[$i]}" &
done
wait
echo "All downloads complete"

# Remove any failed downloads
for f in *.jpg; do
  size=$(stat -c%s "$f" 2>/dev/null || echo 0)
  if [ "$size" -lt 5000 ]; then
    echo "REMOVING failed: $f ($size bytes)"
    rm -f "$f"
  fi
done

echo "Final count:"
ls *.jpg | wc -l
