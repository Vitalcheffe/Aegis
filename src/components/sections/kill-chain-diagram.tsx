"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const killChainPhases = [
  {
    id: "detect",
    number: "01",
    title: "Detect",
    subtitle: "Multi-Spectral Sensing",
    description:
      "S-band radar, RF direction finding, EO/IR cameras, and acoustic arrays operate in concert to detect UAS threats at ranges exceeding 12 kilometers. Bayesian correlation algorithms fuse sensor data in real-time, ensuring no threat goes unnoticed regardless of altitude, speed, or signature.",
    specs: ["12km Detection Range", "360° Coverage", "4 Sensor Modalities", "<2s First Detection"],
    color: "#ffffff",
    href: "/capabilities/detection",
  },
  {
    id: "track",
    number: "02",
    title: "Track",
    subtitle: "IMM-UKF Algorithms",
    description:
      "Interacting Multiple Model Unscented Kalman Filter algorithms maintain 500+ simultaneous tracks at a 50Hz update rate. Autonomous track initiation, correlation, and handoff between sensors ensure continuous custody even during high-G maneuvers and swarm scenarios.",
    specs: ["500+ Simultaneous Tracks", "50Hz Update Rate", "Swarm-Capable", "Auto Track Initiation"],
    color: "#ffffff",
    href: "/capabilities/tracking",
  },
  {
    id: "classify",
    number: "03",
    title: "Classify",
    subtitle: "AI-Driven Identification",
    description:
      "Machine learning models trained on 200+ drone signatures achieve 98.9% classification accuracy in under 20 milliseconds. Multi-modal fusion of RF, radar, and visual features enables threat prioritization, intent assessment, and friend-or-foe determination with a false positive rate below 0.1%.",
    specs: ["98.9% Accuracy", "200+ Signatures", "<20ms Classification", "<0.1% False Positive"],
    color: "#ffffff",
    href: "/capabilities/classification",
  },
  {
    id: "neutralize",
    number: "04",
    title: "Neutralize",
    subtitle: "Graduated Response",
    description:
      "Five effector modalities — RF jamming, GPS spoofing, directed energy, net capture, and kinetic intercept — provide a graduated response from non-kinetic to lethal. Human-in-the-loop authorization for kinetic options ensures compliance with rules of engagement while maintaining sub-second engagement timelines.",
    specs: ["5 Effector Modalities", "Sub-Second Engagement", "Human-in-the-Loop", "Graduated Escalation"],
    color: "#ffffff",
    href: "/capabilities/neutralization",
  },
];

export function KillChainDiagram({ className = "" }: { className?: string }) {
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Scroll reveal
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Canvas animation — radar sweep / data flow visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    let angle = 0;

    // Target blips
    const targets = Array.from({ length: 8 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: 30 + Math.random() * (Math.min(cx, cy) - 60),
      speed: 0.002 + Math.random() * 0.005,
      size: 2 + Math.random() * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Range rings
      for (let i = 1; i <= 4; i++) {
        const r = (Math.min(cx, cy) - 20) * (i / 4);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.04)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Cross lines
      ctx.beginPath();
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, h - 20);
      ctx.moveTo(20, cy);
      ctx.lineTo(w - 20, cy);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sweep line
      const sweepAngle = angle;
      // Sweep gradient (not widely supported, using fallback approach)
      const _gradient = null;

      // Draw sweep trail
      for (let i = 0; i < 30; i++) {
        const a = sweepAngle - (i * 0.02);
        const opacity = (1 - i / 30) * 0.15;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
          cx + Math.cos(a) * (Math.min(cx, cy) - 20),
          cy + Math.sin(a) * (Math.min(cx, cy) - 20)
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Main sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(sweepAngle) * (Math.min(cx, cy) - 20),
        cy + Math.sin(sweepAngle) * (Math.min(cx, cy) - 20)
      );
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Targets
      targets.forEach((t) => {
        t.angle += t.speed;
        if (t.angle > Math.PI * 2) t.angle -= Math.PI * 2;

        const x = cx + Math.cos(t.angle) * t.dist;
        const y = cy + Math.sin(t.angle) * t.dist;

        // Check if sweep recently passed this target
        const angleDiff = Math.abs(sweepAngle - t.angle) % (Math.PI * 2);
        const recentlySwept = angleDiff < 0.5;

        if (recentlySwept) {
          ctx.beginPath();
          ctx.arc(x, y, t.size + 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, t.size, 0, Math.PI * 2);
        ctx.fillStyle = recentlySwept
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 0.15)";
        ctx.fill();
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fill();

      angle += 0.02;
      if (angle > Math.PI * 2) angle -= Math.PI * 2;

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      className={`py-28 md:py-44 bg-black relative overflow-hidden ${className}`}
    >
      {/* Background Canvas */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div
          className={`mb-20 md:mb-28 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">
            The Kill Chain
          </span>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
            Detect. Track.
            <br />
            Classify. Neutralize.
          </h2>
        </div>

        {/* Phase Navigation */}
        <div className="grid grid-cols-4 gap-0 border-t border-white/10 mb-0">
          {killChainPhases.map((phase, i) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(i)}
              className={`relative py-8 md:py-12 text-left transition-all duration-500 border-b-2 ${
                activePhase === i
                  ? "border-white bg-white/[0.03]"
                  : "border-transparent hover:bg-white/[0.01]"
              }`}
            >
              <div className="px-4 md:px-8">
                <div
                  className={`text-[10px] uppercase tracking-[0.2em] mb-3 transition-colors duration-500 ${
                    activePhase === i ? "text-white/60" : "text-white/20"
                  }`}
                >
                  {phase.number}
                </div>
                <div
                  className={`text-[clamp(1.2rem,3vw,2rem)] font-bold tracking-[-0.02em] transition-colors duration-500 ${
                    activePhase === i ? "text-white" : "text-white/30"
                  }`}
                >
                  {phase.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Phase Detail */}
        <div className="py-16 md:py-24 border-b border-white/10">
          <div
            key={activePhase}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-[fadeInUp_0.5s_ease-out]"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">
                {killChainPhases[activePhase].subtitle}
              </div>
              <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.03em] text-white mb-8">
                {killChainPhases[activePhase].title}
              </h3>
              <p className="text-[#b9b9b9] text-base md:text-lg leading-relaxed max-w-xl">
                {killChainPhases[activePhase].description}
              </p>
              <Link
                href={killChainPhases[activePhase].href}
                className="inline-block mt-8 text-[11px] uppercase tracking-[0.15em] text-white border-b border-white/30 pb-1 hover:border-white transition-colors"
              >
                Explore {killChainPhases[activePhase].title} →
              </Link>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-6">
                {killChainPhases[activePhase].specs.map((spec, i) => (
                  <div
                    key={spec}
                    className="border border-white/10 p-6 md:p-8"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="text-white text-lg md:text-xl font-bold tracking-[-0.02em]">
                      {spec}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connection Line Visualization */}
        <div className="py-12 flex items-center justify-center gap-2">
          {killChainPhases.map((phase, i) => (
            <div key={phase.id} className="flex items-center">
              <div
                className={`w-12 md:w-24 h-0.5 transition-all duration-500 ${
                  i <= activePhase ? "bg-white/40" : "bg-white/10"
                }`}
              />
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i <= activePhase ? "bg-white" : "bg-white/20"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
