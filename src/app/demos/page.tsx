"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  SectionHero,
  Callout,
  CardGrid,
  CTASection,
  ScrollReveal,
  AnimatedLine,
} from "@/components/sections";

/* ════════════════════════════════════════════════════════════════
   RADAR PPI CANVAS — Interactive radar sweep animation
   ════════════════════════════════════════════════════════════════ */
interface Target {
  angle: number;
  distance: number;
  size: number;
  speed: number;
  lastSeen: number;
  label: string;
  type: "hostile" | "unknown" | "friendly";
}

function RadarPPICanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef(0);
  const targetsRef = useRef<Target[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const initTargets = useCallback(() => {
    const labels = [
      "TGT-001",
      "TGT-002",
      "TGT-003",
      "TGT-004",
      "TGT-005",
      "UAV-006",
      "UAV-007",
      "DRN-008",
      "DRN-009",
      "TGT-010",
      "UAV-011",
      "DRN-012",
    ];
    const types: Target["type"][] = [
      "hostile",
      "unknown",
      "friendly",
      "hostile",
      "unknown",
      "hostile",
      "unknown",
      "hostile",
      "friendly",
      "unknown",
      "hostile",
      "unknown",
    ];
    targetsRef.current = labels.map((label, i) => ({
      angle: (Math.PI * 2 * i) / labels.length + Math.random() * 0.5,
      distance: 0.2 + Math.random() * 0.65,
      size: 2 + Math.random() * 3,
      speed: (0.0002 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1),
      lastSeen: 0,
      label,
      type: types[i],
    }));
  }, []);

  useEffect(() => {
    initTargets();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, 700);
      canvas.width = size * 2; // Retina
      canvas.height = size * 2;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.max(1, Math.min(cx, cy) - 40);

      // Clear with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#050505";
      ctx.beginPath();
      ctx.arc(cx, cy, maxR + 20, 0, Math.PI * 2);
      ctx.fill();

      // Range rings
      const rings = 5;
      for (let i = 1; i <= rings; i++) {
        const r = Math.max(1, (maxR / rings) * i);
        ctx.strokeStyle = i === rings ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)";
        ctx.lineWidth = i === rings ? 2 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Range labels
        if (i > 0) {
          const rangeKm = i * 20;
          ctx.fillStyle = "rgba(255,255,255,0.25)";
          ctx.font = `${Math.max(10, 18)}px monospace`;
          ctx.textAlign = "center";
          ctx.fillText(`${rangeKm}km`, cx, cy - r + 16);
        }
      }

      // Cross hairs
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      // Vertical
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.stroke();
      // Diagonal lines
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let a = Math.PI / 6; a < Math.PI * 2; a += Math.PI / 6) {
        if (Math.abs(a - Math.PI / 2) < 0.01 || Math.abs(a - (3 * Math.PI) / 2) < 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.lineTo(cx - Math.cos(a) * maxR, cy - Math.sin(a) * maxR);
        ctx.stroke();
      }

      // Sweep line
      const sweepAngle = angleRef.current;
      const sweepLength = 0.5; // radians of sweep trail
      // Sweep gradient (not widely supported, using fallback)
      const _gradient = null;

      // Draw sweep trail (multiple arcs for fade effect)
      for (let i = 0; i < 30; i++) {
        const trailAngle = sweepAngle - (sweepLength * i) / 30;
        const alpha = (1 - i / 30) * 0.15;
        ctx.strokeStyle = `rgba(200, 255, 200, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(trailAngle) * maxR,
          cy + Math.sin(trailAngle) * maxR
        );
        ctx.stroke();
      }

      // Main sweep line
      ctx.strokeStyle = "rgba(200, 255, 200, 0.8)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(sweepAngle) * maxR,
        cy + Math.sin(sweepAngle) * maxR
      );
      ctx.stroke();

      // Sweep glow cone
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - 0.5, sweepAngle, false);
      ctx.closePath();
      const coneGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      coneGrad.addColorStop(0, "rgba(200, 255, 200, 0.06)");
      coneGrad.addColorStop(1, "rgba(200, 255, 200, 0.01)");
      ctx.fillStyle = coneGrad;
      ctx.fill();
      ctx.restore();

      // Center dot
      ctx.fillStyle = "rgba(200, 255, 200, 0.9)";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw targets
      const now = Date.now();
      targetsRef.current.forEach((target) => {
        // Move target
        target.angle += target.speed;
        target.distance += Math.sin(now * 0.001 + target.angle * 5) * 0.0001;
        target.distance = Math.max(0.1, Math.min(0.9, target.distance));

        // Check if sweep passed over target
        const angleDiff = ((sweepAngle - target.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (angleDiff < 0.05) {
          target.lastSeen = now;
        }

        // Calculate target position
        const tx = cx + Math.cos(target.angle) * target.distance * maxR;
        const ty = cy + Math.sin(target.angle) * target.distance * maxR;

        // Fade based on time since last seen by sweep
        const timeSinceSeen = now - target.lastSeen;
        const fadeFactor = Math.max(0, 1 - timeSinceSeen / 4000);
        if (fadeFactor <= 0) return;

        // Target color based on type
        let r = 200, g = 255, b = 200;
        if (target.type === "hostile") {
          r = 255; g = 80; b = 80;
        } else if (target.type === "unknown") {
          r = 255; g = 200; b = 60;
        }

        // Draw target blip with glow
        const blipAlpha = fadeFactor;

        // Outer glow
        const glowGrad = ctx.createRadialGradient(tx, ty, 0, tx, ty, target.size * 6);
        glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blipAlpha * 0.3})`);
        glowGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(tx, ty, target.size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core blip
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${blipAlpha})`;
        ctx.beginPath();
        ctx.arc(tx, ty, target.size, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring for recently seen
        if (timeSinceSeen < 1000) {
          const pulseRadius = target.size + (1 - timeSinceSeen / 1000) * 12;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - timeSinceSeen / 1000) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(tx, ty, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Label
        if (fadeFactor > 0.3) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${blipAlpha * 0.8})`;
          ctx.font = "bold 16px monospace";
          ctx.textAlign = "left";
          ctx.fillText(target.label, tx + target.size + 8, ty - 4);

          // Type tag
          const typeText = target.type === "hostile" ? "HSTL" : target.type === "unknown" ? "UNKN" : "FRND";
          ctx.font = "12px monospace";
          ctx.fillText(typeText, tx + target.size + 8, ty + 12);

          // Altitude line
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${blipAlpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(tx + target.size + 50, ty);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Compass labels
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("N", cx, cy - maxR - 14);
      ctx.fillText("S", cx, cy + maxR + 14);
      ctx.fillText("E", cx + maxR + 14, cy);
      ctx.fillText("W", cx - maxR - 14, cy);

      // HUD info - top left
      ctx.fillStyle = "rgba(200, 255, 200, 0.5)";
      ctx.font = "14px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      const heading = (((sweepAngle * 180) / Math.PI) % 360 + 360) % 360;
      ctx.fillText(`BRG: ${heading.toFixed(1).padStart(6, "0")}°`, 20, 20);
      ctx.fillText(`RNG: 100 km`, 20, 38);
      ctx.fillText(`TGT: ${targetsRef.current.filter((t) => Date.now() - t.lastSeen < 4000).length} TRACKS`, 20, 56);

      // Mouse position info
      if (mouseRef.current) {
        const mx = mouseRef.current.x * 2;
        const my = mouseRef.current.y * 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxR) {
          const cursorAngle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
          const cursorRange = (dist / maxR) * 100;
          ctx.fillStyle = "rgba(200, 255, 200, 0.5)";
          ctx.fillText(`CUR: ${cursorAngle.toFixed(1).padStart(6, "0")}° / ${cursorRange.toFixed(1)} km`, 20, 74);

          // Crosshair at cursor
          ctx.strokeStyle = "rgba(200, 255, 200, 0.3)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(mx, cy - maxR);
          ctx.lineTo(mx, cy + maxR);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx - maxR, my);
          ctx.lineTo(cx + maxR, my);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Time stamp
      const timeStr = new Date().toISOString().replace("T", " ").substring(0, 19);
      ctx.fillStyle = "rgba(200, 255, 200, 0.3)";
      ctx.font = "12px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`UTC: ${timeStr}`, w - 20, 20);
      ctx.fillText("AEGIS RADAR PPI v4.2.1", w - 20, 36);
      ctx.fillText("MODE: SURVEILLANCE", w - 20, 52);

      // Bottom status bar
      ctx.fillStyle = "rgba(200, 255, 200, 0.15)";
      ctx.fillRect(0, h - 36, w, 36);
      ctx.fillStyle = "rgba(200, 255, 200, 0.5)";
      ctx.font = "12px monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("■ HOSTILE", 20, h - 18);
      ctx.fillStyle = "rgba(255, 200, 60, 0.5)";
      ctx.fillText("■ UNKNOWN", 140, h - 18);
      ctx.fillStyle = "rgba(200, 255, 200, 0.5)";
      ctx.fillText("■ FRIENDLY", 280, h - 18);
      ctx.fillStyle = "rgba(200, 255, 200, 0.3)";
      ctx.textAlign = "right";
      ctx.fillText("SECTOR: ALPHA | ANTENNA: 360° ROT | RPM: 12", w - 20, h - 18);

      // Advance sweep
      angleRef.current += 0.025;

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initTargets]);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        className="border border-white/10 cursor-crosshair max-w-full"
      />
    </div>
  );
}

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const handleDemoClick = (demoId: string) => {
    setActiveDemo(activeDemo === demoId ? null : demoId);
  };

  return (
    <>
      <SectionHero
        image="/images/pages/demo-hero.jpg"
        label="Interactive"
        title="Live Demos"
        subtitle="Experience Aegis"
      />

      <Callout>
        Explore interactive demonstrations of Aegis counter-UAS capabilities.
        Each simulation provides a representative view of system performance in
        operational scenarios.
      </Callout>

      <CardGrid
        label="Demonstrations"
        title="Available Demos"
        cards={[
          {
            title: "Radar PPI Display",
            description:
              "Real-time Plan Position Indicator display showing 360° surveillance coverage, multi-target tracking, and threat classification with range rings and compass bearing overlay.",
            tag: "Interactive",
          },
          {
            title: "Multi-Sensor Fusion",
            description:
              "Demonstration of sensor data fusion from radar, electro-optical, and RF detection systems, correlating multiple data streams into a unified operational picture.",
            tag: "Simulation",
          },
          {
            title: "Tracking Simulation",
            description:
              "Dynamic target tracking engine showing predictive path analysis, velocity estimation, and trajectory prediction for multiple simultaneous UAS threats across the operational area.",
            tag: "Simulation",
          },
          {
            title: "Classification Engine",
            description:
              "AI-powered threat classification system demonstrating automatic identification of UAS type, manufacturer, threat level assessment, and recommended response protocols.",
            tag: "AI Powered",
          },
        ]}
      />

      <AnimatedLine />

      {/* Interactive Radar PPI Demo */}
      <section className="py-28 md:py-44 bg-black">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
              Live Simulation
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-white mb-4">
              Radar PPI Display
            </h2>
            <p className="text-[#767676] text-base leading-relaxed mb-12 max-w-2xl">
              This interactive simulation demonstrates the Aegis Plan Position
              Indicator (PPI) radar display. Move your cursor over the display
              to see bearing and range data. The rotating sweep line detects and
              illuminates targets as it passes — watch hostile, unknown, and
              friendly tracks appear and fade.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex gap-3 mb-8 flex-wrap">
              <button
                onClick={() => handleDemoClick("radar")}
                className={`px-6 py-3 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                  activeDemo === "radar"
                    ? "bg-white text-black"
                    : "border border-white/30 text-white hover:bg-white/10"
                }`}
              >
                {activeDemo === "radar" ? "Hide Radar" : "Launch Radar PPI"}
              </button>
            </div>
          </ScrollReveal>

          {activeDemo === "radar" && (
            <ScrollReveal>
              <div className="border border-white/10 bg-black p-4 md:p-8">
                <RadarPPICanvas />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      System Status
                    </div>
                    <div className="text-white font-mono text-xs space-y-1">
                      <div>MODE: SURVEILLANCE</div>
                      <div>COVERAGE: 360° AZIMUTH</div>
                      <div>MAX RANGE: 100 KM</div>
                      <div>RESOLUTION: HIGH</div>
                    </div>
                  </div>
                  <div className="border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      Track Legend
                    </div>
                    <div className="text-white font-mono text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
                        HOSTILE — Confirmed threat
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />
                        UNKNOWN — Unidentified
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-300 rounded-full inline-block" />
                        FRIENDLY — Authorized
                      </div>
                    </div>
                  </div>
                  <div className="border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      Controls
                    </div>
                    <div className="text-white font-mono text-xs space-y-1">
                      <div>MOUSE — Bearing / Range cursor</div>
                      <div>SWEEP — 12 RPM rotation</div>
                      <div>TARGETS — 12 simulated tracks</div>
                      <div>RANGE RINGS — 20 km intervals</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Multi-Sensor Fusion Description */}
          <ScrollReveal>
            <div className="mt-20 border border-white/10 p-8 md:p-12">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 mb-6 inline-block">
                Simulation
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Multi-Sensor Fusion
              </h3>
              <p className="text-[#767676] text-sm leading-relaxed">
                The Aegis Multi-Sensor Fusion engine correlates data from
                multiple detection modalities — primary radar, secondary radar,
                electro-optical/infrared cameras, RF direction finding arrays,
                and acoustic sensors — into a single integrated operational
                picture. The fusion algorithm applies Kalman filtering and
                Bayesian inference to produce high-confidence track associations
                while eliminating false positives and redundant returns. This
                demonstration shows how disparate sensor feeds are time-aligned,
                spatially correlated, and confidence-weighted to provide
                operators with a coherent, actionable view of the threat
                environment.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-6 border border-white/10 p-8 md:p-12">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 mb-6 inline-block">
                Simulation
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Tracking Simulation
              </h3>
              <p className="text-[#767676] text-sm leading-relaxed">
                The Aegis Tracking Engine maintains simultaneous tracks on
                hundreds of UAS targets, applying predictive kinematic models to
                estimate future positions and alert operators to trajectory
                changes. The system supports both cooperative and
                non-cooperative tracking modes, automatically switching between
                tracking algorithms based on target behavior and environmental
                conditions. Predictive path analysis enables early warning of
                threatening trajectories and automated alert generation when
                targets breach configurable geofence boundaries.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-6 border border-white/10 p-8 md:p-12">
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1 mb-6 inline-block">
                AI Powered
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Classification Engine
              </h3>
              <p className="text-[#767676] text-sm leading-relaxed">
                The Aegis Classification Engine uses deep learning models trained
                on an extensive library of UAS signatures to automatically
                identify drone type, manufacturer, model, and threat level.
                Classification is performed in real-time using RF signal
                fingerprinting, radar cross-section analysis, and flight
                behavioral patterns. The engine outputs a confidence-scored
                classification with recommended response protocols, enabling
                operators to make rapid, informed engagement decisions. The
                model is continuously updated with new threat signatures
                gathered from field operations and intelligence sources.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title="Ready for a Live Briefing?"
        subtitle="Schedule a classified demonstration with our defense solutions team to see the full Aegis platform in a controlled operational environment."
        primaryCta="Request a Demo"
        primaryHref="/request-demo"
        secondaryCta="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
