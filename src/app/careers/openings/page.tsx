"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import {
  MapPin,
  Shield,
  Briefcase,
  ChevronRight,
  X,
} from "lucide-react";

/* ──────────────────────────────────────────────
   JOB DATA
   ────────────────────────────────────────────── */

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  clearance: string;
  description: string;
  fullDescription: string;
  requirements: string[];
  responsibilities: string[];
}

const jobs: JobListing[] = [
  {
    id: 1,
    title: "Senior Radar Systems Engineer",
    department: "Engineering",
    location: "Arlington, VA",
    clearance: "TS/SCI",
    description:
      "Design and optimize X-band and Ku-band radar signal processing chains for Aegis Core and Tactical platforms.",
    fullDescription:
      "Lead the design, simulation, and optimization of X-band and Ku-band radar signal processing pipelines for Aegis Core and Tactical detection platforms. You will own the end-to-end radar processing chain from raw I/Q data through CFAR detection, STAP clutter suppression, and track initiation. Work closely with FPGA engineers, ML researchers, and field operations to deliver systems that perform in contested electromagnetic environments across 12 nations.",
    requirements: [
      "8+ years in radar systems engineering with demonstrated expertise in phased array beamforming and waveform design",
      "Deep expertise in X-band and Ku-band radar signal processing, including CFAR, STAP, and MTI algorithms",
      "Experience with GPU-accelerated DSP implementation (CUDA/OpenCL)",
      "Active TS/SCI clearance required",
      "MSEE or PhD in Electrical Engineering, Radar Systems, or related field",
      "Familiarity with STANAG 4671 and NATO radar interoperability standards",
    ],
    responsibilities: [
      "Own the end-to-end radar processing chain for Aegis Core v4.0 and Aegis Tactical platforms",
      "Lead radar system modeling and simulation using MATLAB, Python, and C++",
      "Collaborate with hardware engineers on receiver/exciter design and calibration procedures",
      "Support field validation campaigns at test ranges and operational deployment sites",
      "Mentor junior radar engineers and contribute to technical roadmap planning",
    ],
  },
  {
    id: 2,
    title: "AI/ML Engineer — Counter-UAS Classification",
    department: "Engineering",
    location: "Arlington, VA",
    clearance: "Secret",
    description:
      "Develop and deploy neural network architectures for real-time drone classification at 175 TOPS inference throughput.",
    fullDescription:
      "Design, train, and deploy deep learning models for real-time drone detection, classification, and intent assessment on Aegis sensor platforms. You will work with our 12-million-signature labeled dataset—the largest of its kind—to push classification accuracy beyond 99.5% while maintaining sub-20ms inference latency on edge hardware delivering 175 TOPS. This role bridges the gap between cutting-edge ML research and operational deployment in defense-critical systems.",
    requirements: [
      "5+ years developing production ML systems with demonstrated deployment on edge hardware",
      "Expert-level proficiency in PyTorch, ONNX, and TensorRT optimization pipelines",
      "Experience with NVIDIA Jetson, Hailo, or comparable edge AI accelerator platforms",
      "Strong background in object detection, image classification, and signal processing ML",
      "Active Secret clearance required; TS/SCI preferred",
      "MS or PhD in Computer Science, Machine Learning, or equivalent experience",
    ],
    responsibilities: [
      "Architect and train neural networks for multi-spectral drone classification (RF, EO/IR, acoustic)",
      "Optimize models for inference on edge accelerators achieving sub-20ms latency targets",
      "Build and maintain the ML training pipeline including data curation, augmentation, and validation",
      "Collaborate with radar and RF engineers to fuse sensor data for multi-modal classification",
      "Publish findings in top-tier venues (NeurIPS, CVPR) and ship research into production within 18 months",
    ],
  },
  {
    id: 3,
    title: "Embedded Systems Engineer",
    department: "Engineering",
    location: "Arlington, VA",
    clearance: "Secret",
    description:
      "Real-time firmware development for Aegis sensor nodes running on ARM/RISC-V platforms with sub-millisecond latency requirements.",
    fullDescription:
      "Develop real-time embedded firmware for Aegis sensor nodes deployed in operational environments worldwide. You will architect and implement low-latency signal acquisition, processing, and communication subsystems on ARM Cortex and RISC-V platforms, ensuring deterministic sub-millisecond response times critical for counter-UAS engagement timelines. This role requires deep expertise in bare-metal programming, RTOS internals, and hardware-software co-design.",
    requirements: [
      "5+ years in embedded firmware development for ARM Cortex-M/A or RISC-V platforms",
      "Deep expertise in real-time operating systems (FreeRTOS, Zephyr, or bare-metal super-loops)",
      "Experience with sub-millisecond latency systems and deterministic scheduling",
      "Proficiency in C/C++ with strong understanding of memory-mapped I/O and DMA controllers",
      "Active Secret clearance required",
      "BSEE or BSCS with embedded systems focus; MSEE preferred",
    ],
    responsibilities: [
      "Design and implement real-time firmware for Aegis sensor nodes with deterministic timing guarantees",
      "Develop SPI, I2C, UART, and Ethernet device drivers for sensor interfaces",
      "Implement bootloaders, OTA update mechanisms, and secure firmware signing workflows",
      "Collaborate with hardware engineers on PCB bring-up, signal integrity, and power optimization",
      "Conduct code reviews, static analysis, and formal verification for safety-critical components",
    ],
  },
  {
    id: 4,
    title: "RF Systems Engineer",
    department: "Engineering",
    location: "Tel Aviv, Israel",
    clearance: "Secret (or equivalent)",
    description:
      "Design and validate wideband RF direction-finding and signal classification systems across 70 MHz – 6 GHz.",
    fullDescription:
      "Lead the design and validation of wideband RF direction-finding and signal classification systems spanning 70 MHz to 6 GHz for Aegis counter-UAS platforms. Based in our Tel Aviv R&D center, you will work at the intersection of analog RF design and digital signal processing to deliver systems that detect, geolocate, and classify drone RF emissions in dense electromagnetic environments. This role requires expertise in both receiver architecture and modern SDR platforms.",
    requirements: [
      "7+ years in RF systems engineering with experience in wideband receiver design",
      "Expertise in direction-finding algorithms (MUSIC, ESPRIT, correlative interferometry)",
      "Experience with SDR platforms (Ettus USRP, Analog Devices AD9361, or equivalent)",
      "Proficiency in RF simulation tools (ADS, CST, HFSS) and MATLAB/Simulink",
      "Active Secret clearance or Israeli equivalent security clearance",
      "MSEE with RF/microwave engineering focus; PhD preferred",
    ],
    responsibilities: [
      "Architect wideband RF receiver chains covering 70 MHz – 6 GHz with high dynamic range",
      "Design and validate direction-finding algorithms for drone RF emissions",
      "Lead system integration and testing of RF subsystems with Aegis Core processing pipeline",
      "Collaborate with antenna engineers on array design and calibration procedures",
      "Support field testing and validation at operational deployment sites in EMEA",
    ],
  },
  {
    id: 5,
    title: "Product Manager — Aegis Command",
    department: "Product",
    location: "Arlington, VA",
    clearance: "Secret",
    description:
      "Own the product roadmap for Aegis Command C2 platform, serving 240+ deployed systems across 12 nations.",
    fullDescription:
      "Own the product roadmap, feature prioritization, and go-to-market strategy for Aegis Command, our enterprise multi-site command and control platform serving 240+ deployed systems across 12 nations. You will translate operational requirements from defense ministries and critical infrastructure operators into prioritized feature specifications, drive sprint planning with engineering, and coordinate release cycles that balance rapid innovation with the reliability demands of defense-critical software.",
    requirements: [
      "5+ years in B2B SaaS product management; defense or critical infrastructure domain strongly preferred",
      "Demonstrated experience managing product roadmaps for complex enterprise software platforms",
      "Strong technical aptitude: ability to engage deeply with engineering on architecture decisions",
      "Experience with agile development methodologies and cross-functional team leadership",
      "Active Secret clearance required",
      "MBA or equivalent business experience preferred",
    ],
    responsibilities: [
      "Define and maintain the Aegis Command product roadmap aligned with customer needs and company strategy",
      "Translate operational requirements from defense customers into detailed product specifications",
      "Drive sprint planning, backlog grooming, and release coordination across engineering and design teams",
      "Conduct customer discovery sessions with defense ministries and infrastructure operators worldwide",
      "Own pricing, packaging, and go-to-market strategy for Aegis Command feature releases",
    ],
  },
  {
    id: 6,
    title: "Product Manager — Aegis Mobile",
    department: "Product",
    location: "London, UK",
    clearance: "Secret (or equivalent)",
    description:
      "Lead product strategy for vehicle-integrated counter-UAS systems across EMEA defense programs.",
    fullDescription:
      "Lead the product strategy and development for Aegis Mobile, our vehicle-integrated counter-UAS system deployed on military convoys, border patrol vehicles, and mobile command platforms across EMEA. Based in London, you will own the end-to-end product lifecycle from concept through fielded capability, working closely with engineering, military stakeholders, and international defense procurement teams to deliver mobile C-UAS solutions that protect forces on the move.",
    requirements: [
      "5+ years in product management for defense, automotive, or mobile platform systems",
      "Experience with vehicle electronics integration, MIL-STD-1275, and military platform requirements",
      "Familiarity with EMEA defense procurement processes and NATO interoperability standards",
      "Strong stakeholder management skills across multi-national defense programs",
      "Active Secret clearance or UK DV clearance preferred",
      "Engineering degree preferred; MBA a plus",
    ],
    responsibilities: [
      "Define the Aegis Mobile product roadmap serving EMEA defense vehicle integration programs",
      "Manage requirements from UK MoD, German Bundeswehr, and allied EMEA defense ministries",
      "Coordinate vehicle platform integration including power, mounting, EMI/EMC, and crew interface",
      "Drive product decisions balancing SWaP-C constraints with operational capability requirements",
      "Represent Aegis at EMEA defense exhibitions and customer technical review boards",
    ],
  },
  {
    id: 7,
    title: "Defense Solutions Architect",
    department: "Business Development",
    location: "Abu Dhabi, UAE",
    clearance: "Secret",
    description:
      "Technical pre-sales for GCC nation defense programs, conducting classified briefings and system design workshops.",
    fullDescription:
      "Serve as the primary technical interface between Aegis and defense ministries across Gulf Cooperation Council (GCC) nations. You will conduct classified technical briefings, design counter-UAS system architectures tailored to customer requirements, and translate operational needs into compelling technical proposals. This role combines deep technical expertise with strategic sales acumen in one of the world's most active defense procurement markets.",
    requirements: [
      "10+ years in defense technology with expertise in C-UAS, radar, or electronic warfare systems",
      "Established relationships with GCC defense procurement organizations and military leadership",
      "Experience conducting classified briefings and managing security-cleared technical discussions",
      "Deep understanding of GCC defense procurement processes and offset requirements",
      "Active Secret clearance required; TS/SCI preferred",
      "Fluency in Arabic strongly preferred; English required",
    ],
    responsibilities: [
      "Lead technical engagement with GCC defense ministries from initial briefing through contract award",
      "Design counter-UAS system architectures tailored to specific customer threat profiles and terrain",
      "Conduct classified system demonstrations and technical workshops for military decision-makers",
      "Coordinate with engineering on proposal technical volumes and system performance guarantees",
      "Manage UAE offset and technology transfer requirements for Aegis programs",
    ],
  },
  {
    id: 8,
    title: "Business Development Manager — Asia Pacific",
    department: "Business Development",
    location: "Singapore",
    clearance: "Secret",
    description:
      "Drive counter-UAS adoption across INDOPACOM allied nations.",
    fullDescription:
      "Drive business development and counter-UAS adoption across INDOPACOM allied nations from our Singapore regional headquarters. You will identify, qualify, and close new business opportunities with defense ministries and security agencies across Japan, South Korea, Australia, Taiwan, and Southeast Asian nations. This role requires a combination of defense industry relationships, regional market knowledge, and the ability to navigate complex international procurement processes.",
    requirements: [
      "10+ years in defense business development with established INDOPACOM regional relationships",
      "Deep understanding of FMS (Foreign Military Sales), DCS (Direct Commercial Sales), and regional procurement processes",
      "Experience with Japanese, Korean, or Australian defense acquisition frameworks",
      "Proven track record of closing large ($10M+) defense technology contracts",
      "Active Secret clearance required",
      "Asian language skills (Japanese, Korean, Mandarin) a significant advantage",
    ],
    responsibilities: [
      "Identify and pursue counter-UAS business opportunities across INDOPACOM allied nations",
      "Manage the full procurement lifecycle from initial engagement through contract award",
      "Build and maintain relationships with defense ministries, military leadership, and procurement agencies",
      "Coordinate with Washington HQ on FMS cases, export licensing, and technology release approvals",
      "Represent Aegis at regional defense exhibitions (IMDEX, ADEX, DSEI Japan) and industry events",
    ],
  },
  {
    id: 9,
    title: "Field Service Engineer",
    department: "Operations",
    location: "Arlington, VA (Travel 60%)",
    clearance: "Secret",
    description:
      "Deploy to operational sites worldwide for Aegis system installation, commissioning, and operator training.",
    fullDescription:
      "Deploy to operational sites worldwide for Aegis system installation, commissioning, acceptance testing, and operator training. You will be the face of Aegis at customer sites across EUCOM, INDOPACOM, and CENTCOM areas of responsibility, ensuring 99.97% operational availability for systems protecting critical national assets. This role requires technical depth, cultural adaptability, and the willingness to travel 60% of the time to austere locations.",
    requirements: [
      "4+ years in defense field engineering or military technical specialization",
      "Experience with radar, RF, or C2 system installation and commissioning",
      "Strong troubleshooting skills across hardware, software, and network domains",
      "Active Secret clearance required; TS/SCI preferred",
      "Willingness to travel 60% to operational sites worldwide, including austere locations",
      "Military service (E-5+ or O-2+) with technical MOS/AFSC highly valued",
    ],
    responsibilities: [
      "Install, commission, and validate Aegis systems at customer sites worldwide",
      "Conduct operator and maintenance training for customer personnel",
      "Perform preventive and corrective maintenance, troubleshooting hardware and software issues",
      "Document site-specific configurations, acceptance test results, and as-built drawings",
      "Provide field feedback to engineering for product improvement and reliability enhancement",
    ],
  },
  {
    id: 10,
    title: "Cybersecurity Engineer",
    department: "Operations",
    location: "Arlington, VA",
    clearance: "TS/SCI",
    description:
      "Secure Aegis Command platform and customer networks against advanced persistent threats. RMF/MATURITY Level 3 compliance.",
    fullDescription:
      "Protect Aegis Command platform infrastructure, source code repositories, and customer networks against advanced persistent threats from nation-state adversaries. You will manage the vulnerability management program, conduct red team exercises, maintain RMF/STIG compliance across all Aegis products, and lead incident response for our global network of development and operational environments. This role is critical to maintaining the trust that defense ministries place in our platform.",
    requirements: [
      "5+ years in cybersecurity with focus on defense or critical infrastructure sectors",
      "Expertise in NIST RMF, STIG compliance, and CMMC Level 3 implementation",
      "Experience with APT threat hunting, SIEM platforms, and incident response procedures",
      "Knowledge of NIST 800-171, 800-53, and classified system accreditation processes",
      "Active TS/SCI clearance mandatory",
      "CISSP, CISM, or equivalent certifications required; OSCP preferred",
    ],
    responsibilities: [
      "Manage the Aegis vulnerability management program including scanning, triage, and remediation",
      "Conduct quarterly red team exercises against Aegis Command infrastructure and customer deployments",
      "Maintain RMF compliance and STIG hardening across all Aegis products and cloud environments",
      "Lead incident response for security events across development and operational environments",
      "Develop and deliver cybersecurity training for all Aegis employees and contractors",
    ],
  },
  {
    id: 11,
    title: "Trade Compliance Manager",
    department: "Corporate",
    location: "Arlington, VA",
    clearance: "Secret",
    description:
      "Manage ITAR/EAR compliance for international defense programs. Must have expertise in DDTC and BIS regulations.",
    fullDescription:
      "Manage all aspects of trade compliance for Aegis international defense programs, ensuring full adherence to ITAR, EAR, and relevant foreign export control regulations. You will oversee DDTC and BIS licensing, manage technology transfer agreements, conduct compliance training, and serve as the subject matter expert for our rapidly expanding global operations across 12 nations. This role is essential to maintaining Aegis's ability to operate in international markets while strictly complying with U.S. export control laws.",
    requirements: [
      "7+ years in trade compliance with deep expertise in ITAR and EAR regulations",
      "Experience with DDTC licensing (DSP-5, DSP-73, TAA, MLA) and BIS licensing processes",
      "Knowledge of Wassenaar Arrangement, MTCR, and multilateral export control regimes",
      "Experience managing compliance for defense programs with classified components",
      "Active Secret clearance required",
      "JD or equivalent legal training preferred; CUSECO certification a plus",
    ],
    responsibilities: [
      "Manage all ITAR and EAR licensing for Aegis international defense programs",
      "Review and approve all international shipments, technical data releases, and foreign national access",
      "Develop and maintain the Aegis trade compliance program including policies, procedures, and training",
      "Conduct internal audits and voluntary disclosures when compliance issues are identified",
      "Advise business development and engineering teams on export control classification and licensing strategy",
    ],
  },
  {
    id: 12,
    title: "Technical Writer",
    department: "Corporate",
    location: "Arlington, VA",
    clearance: "Secret",
    description:
      "Create operator manuals, training materials, and technical documentation for the Aegis product line.",
    fullDescription:
      "Create and maintain the comprehensive documentation suite for the Aegis product line—from operator manuals and maintenance procedures to API references and system architecture guides. You will work directly with engineers, field service teams, and military operators to translate complex technical concepts into clear, actionable documentation that supports deployment, training, and compliance. Your work directly impacts the operational effectiveness of systems protecting critical national assets.",
    requirements: [
      "5+ years in technical writing for defense, aerospace, or complex technology products",
      "Experience with defense technical publication standards (MIL-DTL-87900, S1000D)",
      "Proficiency with XML-based authoring systems (DITA, Arbortext) and content management platforms",
      "Ability to understand and document complex systems involving radar, RF, and C2 software",
      "Active Secret clearance required",
      "Technical degree or equivalent technical aptitude strongly preferred",
    ],
    responsibilities: [
      "Write and maintain operator manuals, maintenance procedures, and troubleshooting guides for Aegis products",
      "Develop training materials and courseware for operator and maintainer certification programs",
      "Create API documentation, system architecture guides, and integration specifications",
      "Work with engineering to document new features and system changes for each software release",
      "Manage documentation localization and translation for international customer programs",
    ],
  },
];

const departments = ["Engineering", "Product", "Business Development", "Operations", "Corporate"];

/* ──────────────────────────────────────────────
   DEPARTMENT FILTER
   ────────────────────────────────────────────── */

function DepartmentFilter({
  active,
  onChange,
  counts,
}: {
  active: string | null;
  onChange: (dept: string | null) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
          active === null
            ? "bg-white text-black border-white"
            : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
        }`}
      >
        All ({jobs.length})
      </button>
      {departments.map((dept) => (
        <button
          key={dept}
          onClick={() => onChange(dept)}
          className={`px-4 py-2 text-[10px] uppercase tracking-[0.15em] border transition-colors ${
            active === dept
              ? "bg-white text-black border-white"
              : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
          }`}
        >
          {dept} ({counts[dept] || 0})
        </button>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   JOB CARD
   ────────────────────────────────────────────── */

function JobCard({
  job,
  onClick,
}: {
  job: JobListing;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left border border-white/10 hover:border-white/25 transition-all duration-300 bg-[#0a0a0a] hover:bg-[#111] group p-6 md:p-8"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1">
              {job.department}
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/30 border border-white/5 px-3 py-1">
              {job.clearance}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-white/90 transition-colors leading-tight mb-3">
            {job.title}
          </h3>
          <p className="text-[#767676] text-sm leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>
        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-[#767676] text-xs">
            <MapPin className="w-3 h-3" />
            <span>{job.location}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors hidden md:block" />
        </div>
      </div>
    </motion.button>
  );
}

/* ──────────────────────────────────────────────
   JOB DETAIL DIALOG
   ────────────────────────────────────────────── */

function JobDetailDialog({
  job,
  open,
  onOpenChange,
}: {
  job: JobListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-3 py-1">
              {job.department}
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/30 border border-white/5 px-3 py-1">
              <Shield className="w-3 h-3 inline mr-1" />
              {job.clearance}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold text-white leading-tight">
            {job.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1.5 text-[#767676] text-sm mt-1">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Description */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">
              About This Role
            </h4>
            <p className="text-[#b9b9b9] text-sm leading-relaxed">
              {job.fullDescription}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">
              Key Responsibilities
            </h4>
            <ul className="space-y-2">
              {job.responsibilities.map((r, i) => (
                <li
                  key={i}
                  className="text-[#b9b9b9] text-sm leading-relaxed flex items-start gap-2"
                >
                  <span className="text-white/20 mt-1.5 shrink-0">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-3">
              Requirements
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((r, i) => (
                <li
                  key={i}
                  className="text-[#b9b9b9] text-sm leading-relaxed flex items-start gap-2"
                >
                  <span className="text-white/20 mt-1.5 shrink-0">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-white text-black hover:bg-[#e0e0e0] text-[11px] uppercase tracking-[0.15em] px-8 py-3 font-medium">
              Apply Now
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */

export default function CareersOpeningsPage() {
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredJobs = activeDept
    ? jobs.filter((j) => j.department === activeDept)
    : jobs;

  const counts = departments.reduce(
    (acc, dept) => {
      acc[dept] = jobs.filter((j) => j.department === dept).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
    setDialogOpen(true);
  };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a]" />
        <div className="relative z-10 max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 mb-6 border border-white/10 px-4 py-1.5">
              Careers
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white max-w-5xl"
          >
            Open Positions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 text-[#b9b9b9] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
          >
            Build the technology that protects nations. Join a team where your
            work has direct mission impact.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
          >
            <div>
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                Open Roles
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">5</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                Departments
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">6</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#767676] mt-1">
                Locations
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── JOB LISTINGS ── */}
      <section className="py-20 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal>
            <div className="mb-12 md:mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-4">
                Current Openings
              </span>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white mb-8">
                Available Positions
              </h2>
              <DepartmentFilter
                active={activeDept}
                onChange={setActiveDept}
                counts={counts}
              />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job, i) => (
              <ScrollReveal key={job.id} delay={i * 60}>
                <JobCard job={job} onClick={() => handleJobClick(job)} />
              </ScrollReveal>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-[#767676] text-lg">
                No open positions in this department right now.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 md:py-44 bg-black border-t border-white/10">
        <div className="max-w-[80rem] mx-auto px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-[-0.04em] leading-[0.95] text-white">
              Don&apos;t See Your Role?
            </h2>
            <p className="mt-6 text-[#767676] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We&apos;re always looking for exceptional people. Send us your
              resume and tell us how you can contribute to the mission.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-black px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#e0e0e0] transition-all duration-300"
              >
                Submit Your Resume
              </Link>
              <Link
                href="/careers/culture"
                className="border border-white/30 text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Our Culture
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── JOB DETAIL DIALOG ── */}
      <JobDetailDialog
        job={selectedJob}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
