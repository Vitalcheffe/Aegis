"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Lock } from "lucide-react";
import { SectionHero, CTASection, ScrollReveal } from "@/components/sections";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ────────────────────────────────────────────────────────────────
   Video Data
   ──────────────────────────────────────────────────────────────── */
type Category =
  | "All"
  | "Product Demo"
  | "System Overview"
  | "Operational Footage"
  | "Technical Deep Dive"
  | "Events & Presentations";

interface Video {
  id: number;
  title: string;
  category: Category;
  duration: string;
  description: string;
  date: string;
}

const CATEGORIES: Category[] = [
  "All",
  "Product Demo",
  "System Overview",
  "Operational Footage",
  "Technical Deep Dive",
  "Events & Presentations",
];

const VIDEOS: Video[] = [
  {
    id: 1,
    title: "Aegis Core — Live Fire Demonstration",
    category: "Product Demo",
    duration: "12:34",
    description:
      "Watch Aegis Core detect, classify, and neutralize a swarm of 15 UAS in real-time during a classified live-fire exercise at Yuma Proving Ground.",
    date: "2025-01-15",
  },
  {
    id: 2,
    title: "Kill Chain Closure in 20 Milliseconds",
    category: "System Overview",
    duration: "8:45",
    description:
      "A detailed walkthrough of the Aegis kill chain architecture, from initial RF detection to effector engagement, demonstrating sub-20ms closure times.",
    date: "2025-02-08",
  },
  {
    id: 3,
    title: "Aegis SkyWatch — Airport Deployment",
    category: "Operational Footage",
    duration: "15:22",
    description:
      "Follow the 72-hour deployment of Aegis SkyWatch at a major international airport, from site survey to operational handover.",
    date: "2025-01-28",
  },
  {
    id: 4,
    title: "Sensor Fusion Deep Dive",
    category: "Technical Deep Dive",
    duration: "22:10",
    description:
      "Chief Technology Officer Dr. Elena Vasquez explains the multi-spectral sensor fusion algorithms that power Aegis classification accuracy.",
    date: "2024-12-10",
  },
  {
    id: 5,
    title: "DSEI 2025 — Aegis Keynote",
    category: "Events & Presentations",
    duration: "45:00",
    description:
      "CEO Dr. Marcus Chen delivers the opening keynote at Defence and Security Equipment International, outlining the future of counter-UAS technology.",
    date: "2025-03-05",
  },
  {
    id: 6,
    title: "Aegis Shield — Critical Infrastructure Protection",
    category: "Product Demo",
    duration: "10:18",
    description:
      "See how Aegis Shield protects a 500MW power generation facility from coordinated drone surveillance and attack scenarios.",
    date: "2025-02-20",
  },
  {
    id: 7,
    title: "Naval Counter-UAS Operations",
    category: "Operational Footage",
    duration: "18:36",
    description:
      "Aegis naval variant in action during RIMPAC 2025, protecting a carrier strike group from simulated swarm attacks in the Pacific.",
    date: "2025-01-05",
  },
  {
    id: 8,
    title: "AI Classification Models Explained",
    category: "Technical Deep Dive",
    duration: "28:45",
    description:
      "An in-depth technical presentation on the machine learning models behind Aegis autonomous threat classification.",
    date: "2024-11-22",
  },
  {
    id: 9,
    title: "Aegis Mobile — Rapid Deployment",
    category: "Product Demo",
    duration: "6:52",
    description:
      "Aegis Mobile deployed from backpack to operational in under 15 minutes. See the complete setup and first detection sequence.",
    date: "2025-03-12",
  },
  {
    id: 10,
    title: "Eurosatory 2025 — Live Demo",
    category: "Events & Presentations",
    duration: "32:15",
    description:
      "Full recording of the Aegis live demonstration at Eurosatory 2025, including Q&A with defense ministers from 8 nations.",
    date: "2025-02-14",
  },
  {
    id: 11,
    title: "Electronic Warfare Integration",
    category: "Technical Deep Dive",
    duration: "19:30",
    description:
      "How Aegis integrates with existing EW suites to provide layered defense in contested electromagnetic environments.",
    date: "2024-12-18",
  },
  {
    id: 12,
    title: "Aegis Tactical — Special Operations",
    category: "Operational Footage",
    duration: "14:08",
    description:
      "Aegis Tactical supporting special operations forces during a joint training exercise, demonstrating man-portable counter-UAS capability.",
    date: "2025-03-01",
  },
];

/* ────────────────────────────────────────────────────────────────
   Video Card
   ──────────────────────────────────────────────────────────────── */
function VideoCard({
  video,
  onClick,
}: {
  video: Video;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer border border-[#222222] bg-[#0a0a0a] hover:border-[#444444] transition-colors duration-300"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-b from-[#111111] to-[#000000]">
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all duration-300">
            <Play className="w-5 h-5 text-white/60 group-hover:text-white ml-0.5 transition-colors duration-300" />
          </div>
        </div>

        {/* Category Badge — top left */}
        <div className="absolute top-3 left-3">
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/70 bg-black/70 border border-white/10 px-2.5 py-1 backdrop-blur-sm">
            {video.category}
          </span>
        </div>

        {/* Duration Badge — top right */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-medium text-white/80 bg-black/70 border border-white/10 px-2 py-1 backdrop-blur-sm tabular-nums">
            {video.duration}
          </span>
        </div>

        {/* Bottom gradient for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-white/90 transition-colors">
          {video.title}
        </h3>
        <p className="text-[#767676] text-sm leading-relaxed line-clamp-2 mb-3">
          {video.description}
        </p>
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#555555]">
          {new Date(video.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Video Modal
   ──────────────────────────────────────────────────────────────── */
function VideoModal({
  video,
  open,
  onOpenChange,
}: {
  video: Video | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!video) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-[#0a0a0a] border-[#222222] text-white max-w-3xl p-0 overflow-hidden"
        showCloseButton={false}
      >
        {/* Video Placeholder Area */}
        <div className="relative aspect-video w-full bg-gradient-to-b from-[#111111] to-[#000000] flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center">
            <Play className="w-8 h-8 text-white/40 ml-1" />
          </div>

          {/* Duration overlay */}
          <div className="absolute top-4 right-4">
            <span className="text-xs font-medium text-white/70 bg-black/60 border border-white/10 px-3 py-1.5 backdrop-blur-sm tabular-nums">
              {video.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl md:text-2xl font-bold text-white leading-tight">
                {video.title}
              </DialogTitle>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 border border-white/10 px-2.5 py-1">
                  {video.category}
                </span>
                <span className="text-[10px] text-[#555555]">
                  {new Date(video.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="shrink-0 w-9 h-9 flex items-center justify-center border border-[#222222] hover:border-[#444444] text-[#767676] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <DialogDescription className="mt-4 text-[#b9b9b9] text-sm md:text-base leading-relaxed">
            {video.description}
          </DialogDescription>

          {/* Access Message */}
          <div className="mt-6 border border-[#222222] bg-[#000000] p-4 flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#767676] mt-0.5 shrink-0" />
            <p className="text-[#767676] text-sm leading-relaxed">
              Full video access requires authenticated credentials.{" "}
              <a
                href="/contact"
                className="text-white border-b border-white/30 hover:border-white transition-colors"
              >
                Contact us
              </a>{" "}
              for access.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ────────────────────────────────────────────────────────────────
   Videos Page
   ──────────────────────────────────────────────────────────────── */
export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredVideos =
    activeCategory === "All"
      ? VIDEOS
      : VIDEOS.filter((v) => v.category === activeCategory);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  return (
    <>
      {/* SectionHero */}
      <SectionHero
        image="/images/resources/videos.jpg"
        label="Resources"
        title="Video Library"
        subtitle="Watch Aegis counter-UAS systems in action — product demonstrations, operational footage, technical deep dives, and expert presentations from defense exhibitions worldwide."
        cta="Browse Videos"
        ctaHref="#gallery"
        gradient="from-black via-black/75 to-black/40"
        align="center"
      />

      {/* Category Filter + Video Grid */}
      <section id="gallery" className="py-20 md:py-32 bg-black">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
          {/* Section Heading */}
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Browse by Category
              </span>
              <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
                Featured Videos
              </h2>
            </div>
          </ScrollReveal>

          {/* Filter Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-12 md:mb-16 border-b border-[#222222] pb-0">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-4 py-3 text-[11px] uppercase tracking-[0.12em] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-[#767676] hover:text-white/80"
                    }`}
                  >
                    {cat}
                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Video Count */}
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#555555]">
              {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Video Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#767676] text-sm">
                No videos found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      {/* CTA Section */}
      <CTASection
        title="Request Video Access"
        subtitle="Gain full access to our complete video library, including classified operational footage and technical deep dives. Credentials required."
        primaryCta="Request Access"
        primaryHref="/request-demo"
        secondaryCta="Contact Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
