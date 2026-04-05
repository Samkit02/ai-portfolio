// ─────────────────────────────────────────────────────────────────────────────
// content/projects.ts
// All projects displayed on samkit.ai — edit here, UI updates automatically.
// ─────────────────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  num: string;            // display number e.g. "01"
  featured: boolean;      // featured = spans 2 cols in bento grid
  name: string;
  tagline: string;        // one-liner shown on card
  description: string;    // 2–3 sentences for expanded view
  tech: readonly string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  paperUrl?: string;      // for research / publications
  imageUrl?: string;      // /public/projects/<id>.png
  metrics?: readonly string[];     // quantified wins to show as badges
  status: "live" | "wip" | "archived";
};

export type ProjectCategory =
  | "fullstack"
  | "mobile"
  | "ai"
  | "research"
  | "devtools"
  | "ecommerce";

// ─── PROJECTS LIST ───────────────────────────────────────────────────────────
// Order = display order. First featured:true card gets the big bento slot.

export const PROJECTS: readonly Project[] = [
  {
    id: "kalaa-har-jagah",
    num: "01",
    featured: true,
    name: "Kalaa Har Jagah",
    tagline: "E-commerce marketplace built for artists, end-to-end.",
    description:
      "Architected and launched a full-stack e-commerce platform for artists from scratch. " +
      "Led end-to-end development — from the React frontend to the Node.js backend — and " +
      "managed hosting, maintenance, and cron jobs for a live production environment.",
    tech: ["React", "Node.js", "PostgreSQL", "Express.js", "Docker"],
    category: "ecommerce",
    status: "live",
    liveUrl: "https://kalaaharjagah.com",     // add your URL
    githubUrl: undefined,   // add if public
    metrics: [
      "End-to-end ownership",
      "Live in production",
      "Cron job automation",
    ],
  },
  // {
  //   id: "vern-mental-health-portal",
  //   num: "02",
  //   featured: false,
  //   name: "Mental Health Provider Portal",
  //   tagline: "Admin dashboard + guided chatbot for a national non-profit.",
  //   description:
  //     "Delivered an admin portal for a national mental-health non-profit partner to list and " +
  //     "search providers and embed a guided chatbot. Decreased manual staff handoffs ~40% " +
  //     "through in-product guidance and automated routing.",
  //   tech: ["React", "Node.js", "PostgreSQL", "AI / LLM", "Docker", "GitHub Actions"],
  //   category: "fullstack",
  //   status: "live",
  //   metrics: [
  //     "~40% fewer manual handoffs",
  //     "8+ stakeholders",
  //     "Embedded chatbot",
  //   ],
  // },
  // {
  //   id: "emotion-voice-bot",
  //   num: "03",
  //   featured: false,
  //   name: "Emotion-Aware Voice Bot",
  //   tagline: "NLP-powered voice assistant with real-time sentiment detection.",
  //   description:
  //     "Prototyped an emotion-aware voice bot using NLP sentiment and emotion classification, " +
  //     "integrated with LiveKit and Deepgram TTS/STT pipelines. Refined end-to-end latency ~30% " +
  //     "through pipeline optimisation and model tuning.",
  //   tech: ["Python", "LiveKit", "Deepgram", "NLP", "Node.js", "WebSockets"],
  //   category: "ai",
  //   status: "live",
  //   metrics: [
  //     "~30% latency reduction",
  //     "Real-time emotion detection",
  //     "TTS + STT integrated",
  //   ],
  // },
  {
    id: "brightmind-flutter",
    num: "02",
    featured: false,
    name: "Brightmind Mobile App",
    tagline: "Cross-platform Flutter app with 4.5-star app store rating.",
    description:
      "Assisted in building a cross-platform mobile application for iOS and Android using Flutter and Dart " +
      "for Brightmind Enrichment & Schooling. Implemented performance optimisations that " +
      "improved key metrics by 30% and earned a 4.5-star rating on both app stores.",
    tech: ["Flutter", "Dart", "Firebase", "Node.js", "PostgreSQL"],
    category: "mobile",
    status: "live",
    metrics: [
      "4.5★ App Store rating",
      "30% performance improvement",
      "iOS + Android",
    ],
  },
  {
    id: "haemoglobin-dcnn",
    num: "03",
    featured: false,
    name: "Bloodless Haemoglobin Detection",
    tagline: "DCNN achieving 92% accuracy — 15% above prior methods.",
    description:
      "Research paper proposing a novel Deep Convolutional Neural Network (DCNN) algorithm " +
      "for non-invasive haemoglobin level detection from finger images. Achieved 92% accuracy, " +
      "outperforming existing benchmark methods by 15%.",
    tech: ["Python", "Deep Learning", "DCNN", "Computer Vision", "NumPy", "TensorFlow"],
    category: "research",
    status: "archived",
    paperUrl: "https://www.irjet.net/archives/V9/i5/IRJET-V9I5210.pdf",   // add DOI / link if available
    metrics: [
      "92% accuracy",
      "15% above baseline",
      "Published research",
    ],
  },
  {
    id: "event-finder",
    num: "04",
    featured: false,
    name: "Event Finder",
    tagline: "Mobile app for local event discovery built in Java.",
    description:
      "Developed a user-friendly mobile application in Java for local event discovery. " +
      "Designed an intuitive platform for users to explore, plan, and engage with " +
      "community events with a clean, accessible UI.",
    tech: ["Java", "Android", "REST APIs", "SQLite"],
    category: "mobile",
    status: "archived",
    githubUrl: "https://github.com/Samkit02/EventFinder",   // add if public
    metrics: [
      "Local event discovery",
      "Intuitive UX",
      "Android native",
    ],
  },
  // ── SAMKIT.AI (this site) ─────────────────────────────────────────────────
  {
    id: "samkit-ai",
    num: "05",
    featured: false,
    name: "samkit.ai — This Site",
    tagline: "Personal brand + AI tools showcase. Built in public.",
    description:
      "This portfolio site — built with Next.js, React Three Fiber, " +
      "Supabase, and the Claude API. Features a 3D animated hero, project showcase, " +
      "interactive resume, and AI tool demos you can clone or download.",
    tech: ["Next.js", "TypeScript", "React Three Fiber", "Supabase", "Claude API", "Framer Motion"],
    category: "devtools",
    status: "wip",
    liveUrl: "https://samkit.ai",
    githubUrl: undefined,   // add if you open-source it
    metrics: [
      "AI tool demos",
      "Clone/download to use",
      "3D animations",
    ],
  },
] as const;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Returns the single featured project (used in bento grid hero slot) */
export const getFeaturedProject = () =>
  PROJECTS.find((p) => p.featured) ?? PROJECTS[0];

/** Returns all non-featured projects */
export const getGridProjects = () => PROJECTS.filter((p) => !p.featured);

/** Filter by category */
export const getProjectsByCategory = (category: ProjectCategory) =>
  PROJECTS.filter((p) => p.category === category);
