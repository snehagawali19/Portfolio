export const site = {
  name: "Sneha B Gawali",
  shortName: "Sneha Gawali",
  heroName: "SNEHA GAWALI",
  handle: "sneha://ai",
  role: "AI / Robotics Engineer",
  roleLine: "AI · Robotics · Engineering",
  city: "Bangalore",
  email: "sneha.gawali19@gmail.com",
  phone: "+91 8762621757",
  github: "https://github.com/snehagawali19",
  linkedin: "https://www.linkedin.com/in/sneha-gawali-5a70571ba",
  resume: "/Sneha_resume.pdf",
  tagline: "Sense, decide, move.",
  subline: "I connect models with motors, sensors, and real constraints.",
  about:
    "Robotics and AI engineer at VTU. I build systems that sense the room, make a decision, and move with intent. Graph optimization, deep RL, and offline RAG, shipped with real constraints.",
  loaderWords: ["Models", "Graph", "Curiosity", "RAG"],
} as const;

export const nav = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export const constellation = [
  { text: "Graph", kind: "serif" as const, x: "17%", mx: "50%", y: "18%" },
  { text: "Curiosity", kind: "serif" as const, x: "81%", mx: "50%", y: "38%" },
  { text: "PPO", kind: "sans" as const, x: "18%", mx: "50%", y: "58%" },
  { text: "RAG", kind: "serif" as const, x: "80%", mx: "50%", y: "78%" },
] as const;

export const projects = [
  {
    id: "1",
    slug: "incidentrag",
    title: "IncidentRAG",
    kind: "on-call triage",
    year: "2026",
    stack: "Python / LangChain / Llama 3.1 / FastAPI / Docker",
    summary:
      "Offline RAG agent: Oracle 26ai HNSW search plus a ReAct tool loop on Llama 3.1 8B. Sub-second retrieval, no cloud API cost.",
    accent: "left" as const,
  },
  {
    id: "2",
    slug: "disputeflow",
    title: "DisputeFlow",
    kind: "AI / application",
    year: "2026",
    stack: "Python / LangGraph / XGBoost / React / PostgreSQL",
    summary:
      "Operations console for payment-dispute analysis. Six LangGraph nodes classify a case, score supplied facts, draft a rebuttal, and record a simulated filing. Win probability is XGBoost on synthetic labels.",
    accent: "right" as const,
    href: "https://github.com/snehagawali19/disputeflow",
  },
  {
    id: "3",
    slug: "rebalancerl",
    title: "RebalanceRL",
    kind: "deep RL",
    year: "2025",
    stack: "Python / PPO / Stable-Baselines3 / Flask / React",
    summary:
      "PPO agent in a custom bike-sharing sim with 300+ stations. Trip success 80.60% against a 5.56% non-learning baseline.",
    accent: "left" as const,
  },
  {
    id: "4",
    slug: "deepshield",
    title: "DeepShield AI",
    kind: "deepfake / live video",
    year: "2026",
    stack: "TypeScript / Vite / MediaPipe / RNNoise",
    summary:
      "Real-time deepfake detection for live video calls. Behavioral and voice signals feed a live risk score, confidence metrics, and visual alerts, with OBS Virtual Camera support.",
    accent: "right" as const,
    href: "https://deepsheild-deepfake-detection.vercel.app",
  },
] as const;

export const experience = [
  {
    year: "2026",
    title: "AI Research Analyst Intern",
    org: "GRAG AI Factory (startup)",
    detail:
      "Clinical ML pipeline on de-identified screening records. Gradient-boosted and deep classifiers, FastAPI/Docker inference.",
  },
  {
    year: "2026",
    title: "Machine Learning Intern",
    org: "Rooman Technology",
    detail:
      "End-to-end ML pipelines and REST APIs on AWS. Regression, classification, clustering for technical and business teams.",
  },
] as const;

export const education = {
  school: "Maratha Mandal Engineering College, VTU",
  degree: "B.E. Robotics and Artificial Intelligence",
  meta: "CGPA 8.2 / 10  ·  2022-2026",
};
