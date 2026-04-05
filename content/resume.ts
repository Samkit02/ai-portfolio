// ─────────────────────────────────────────────────────────────────────────────
// content/resume.ts
// Single source of truth for all personal + professional content on samkit.ai
// ─────────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  name: "Samkit Shah",
  title: "Full Stack Engineer & AI Builder",
  tagline: "I build fast, resilient software — from React UIs to AI-powered voice bots.",
  shortBio:
    "Full-stack engineer with 4+ years building and scaling React, Node.js, and Flutter apps. " +
    "I obsess over performance, clean architecture, and shipping things that actually work.",
  bio: [
    "I'm a full-stack engineer with 4+ years of experience turning complex problems into clean, " +
    "scalable software. I've worked across the entire stack — from pixel-perfect React UIs to " +
    "resilient Node.js APIs, CI/CD pipelines, and AI-powered voice and chat systems.",
    "Currently at VERN AI, I build full-stack features, direct CI/CD workflows, and craft " +
    "conversation flows for intelligent assistants. I've cut page load times by ~35%, slashed " +
    "deployment times by ~50%, and reduced chatbot task failures by ~25% — all while keeping " +
    "releases on schedule.",
    "Beyond the day job, I'm deeply interested in agentic AI systems, developer tooling, and " +
    "building products people actually want to use. samkit.ai is where I ship those ideas publicly.",
  ],
  email: "24samkit.shah@gmail.com",
  phone: "(312) 714 3581",
  location: "USA",
  openToRemote: true,
  github: "https://github.com/Samkit02",         // update if different
  linkedin: "https://www.linkedin.com/in/samkit-shah-23a908171",  // update with real slug
  portfolio: "https://samkit.ai",
  resumePdf: "/Samkit_Shah_Resume.pdf",
} as const;

// ─── STATS (shown in About section grid) ────────────────────────────────────
export const STATS = {
  yearsExperience: 4,
  projectsShipped: 10,      // adjust to your real count
  deploymentCut: "50%",     // your CI/CD achievement
  pageLoadCut: "35%",       // your perf achievement
  testCoverage: "90%",      // your quality achievement
  appStoreRating: "4.5★",
} as const;

// ─── SKILLS ─────────────────────────────────────────────────────────────────
export const SKILLS = {
  languages: [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "Dart", "SQL", "Bash", "Go",
  ],
  frontend: [
    "React", "Next.js", "HTML5", "CSS3", "Flexbox / Grid",
    "Responsive UI", "Accessible UI", "Figma → UI", "State Management",
  ],
  backend: [
    "Node.js", "Express.js", "RESTful APIs", "WebSockets",
    "Microservices", "Auth (RBAC / JWT)",
  ],
  mobile: [
    "Flutter", "Dart", "Android", "iOS",
    "Push Notifications", "In-app Messaging",
  ],
  databases: [
    "PostgreSQL", "Firebase (Auth / Firestore / Functions)",
    "MongoDB", "Indexing", "Query Tuning",
  ],
  ai: [
    "Prompt Engineering", "Guardrail Logic", "NLP Sentiment / Emotion Classification",
    "TTS / STT Pipelines", "LiveKit", "Deepgram", "Claude API",
  ],
  devops: [
    "Docker", "GitHub Actions", "Jenkins", "CI/CD",
    "Containerized Deployments", "Linux",
  ],
  testing: [
    "Jest", "Postman", "Integration Testing", "Unit Testing",
    "Code Reviews", "Linting / Pre-commit",
  ],
} as const;

// ─── WORK EXPERIENCE ────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id: "vern-ai",
    period: "Dec 2024 – Present",
    role: "Software Developer",
    company: "VERN AI",
    type: "Full-time · Remote",
    current: true,
    highlights: [
      "Engineered full-stack features with React + Node.js, boosting page load time ~35% via code-splitting, caching, and query optimization.",
      "Directed CI/CD pipelines with GitHub Actions + Docker, cutting deployment time ~50% and reducing release errors through automated tests.",
      "Collaborated on conversation flows and prompt/guardrail logic for chat and voice assistants; increased successful task completion ~25%.",
      "Prototyped emotion-aware voice bots using NLP sentiment/emotion classification with LiveKit + Deepgram TTS/STT — reduced end-to-end latency ~30%.",
      "Delivered an admin portal for a national mental-health non-profit to list/search providers and embed a guided chatbot, decreasing manual handoffs ~40%.",
      "Led sprint planning with 7+ user stories per sprint; presented bi-weekly demos to 8+ stakeholders.",
    ],
    tech: ["React", "Node.js", "Docker", "GitHub Actions", "LiveKit", "Deepgram", "NLP"],
  },
  {
    id: "brightmind",
    period: "Jul 2024 – Dec 2024",
    role: "Web Developer",
    company: "Brightmind Enrichment & Schooling",
    type: "Volunteer · Remote",
    current: false,
    highlights: [
      "Contributed to a React/Firebase platform; built role-based access control, post-flagging, and moderation tools.",
      "Wrote integration and API tests (Jest/Postman), achieving ~90% coverage on core modules and lowering production bugs ~30%.",
      "Built a cross-platform Flutter app (iOS + Android) with performance optimizations achieving a 4.5-star app store rating.",
      "Pioneered backend services with Node.js + Express.js + PostgreSQL for high-volume data; refactored legacy code to 90% test coverage.",
      "Optimised RESTful APIs, achieving a 20% reduction in data retrieval latency.",
    ],
    tech: ["React", "Firebase", "Flutter", "Dart", "Node.js", "Express.js", "PostgreSQL", "Jest", "Postman"],
  },
  {
    id: "webpioneer",
    period: "Jun 2018 – May 2022",
    role: "Software Developer",
    company: "Webpioneer",
    type: "Full-time · On-site",
    current: false,
    highlights: [
      "Delivered React frontend + Java/Node backend for e-commerce and enterprise projects; improved Core Web Vitals, reduced bundle size ~25% via code-splitting and tree-shaking.",
      "Led Flutter migration for Android/iOS apps with Firebase Auth, real-time sync, and push notifications — cut average app load time by 1.5 seconds.",
      "Architected scalable Node.js backend services with PostgreSQL for high-volume data operations and complex queries.",
      "Led full-stack development of React.js web apps and Java backend services for enterprise e-commerce clients.",
      "Re-engineered a client-facing dashboard in React with responsive design, improving user engagement metrics 15%.",
      "Automated CI/CD with Jenkins + Docker, cutting deployment times 50% and reducing production rollback incidents 90%.",
    ],
    tech: ["React", "Java", "Node.js", "Flutter", "Firebase", "PostgreSQL", "Jenkins", "Docker"],
  },
] as const;

// ─── EDUCATION ───────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    id: "iit",
    period: "Aug 2022 – May 2024",
    degree: "MS in Computer Science",
    school: "Illinois Institute of Technology",
    location: "Chicago, IL",
    note: "Graduate studies in CS with focus on software systems and AI.",
  },
  {
    id: "mumbai",
    period: "Aug 2019 – May 2022",
    degree: "BS in Information Technology",
    school: "University of Mumbai",
    location: "Mumbai, India",
    note: "Undergraduate foundation in IT, software engineering, and databases.",
  },
] as const;
