export const site = {
  name: "Sneha B Gawali",
  shortName: "Sneha Gawali",
  heroName: "SNEHA GAWALI",
  handle: "sneha://ai",
  role: "AI & Robotics Engineer",
  roleLine: "AI & Robotics Engineer",
  email: "sneha.gawali19@gmail.com",
  phone: "+91 8762621757",
  github: "https://github.com/snehagawali19",
  linkedin: "https://www.linkedin.com/in/sneha-gawali-5a70571ba",
  resume: "/projects/RESEUME_AI.pdf",
  tagline: "Sense, decide, move.",
  subline: "I connect models with motors, sensors, and real constraints.",
  aboutHeadline: "I build intelligent systems at the intersection of robotics, AI, and real-world complexity.",
  about:
    "Robotics & AI Engineer based in Bangalore. Exploring graph-enhanced RAG, reinforcement learning for fleet rebalancing, and real-time deepfake detection.",
  aboutMeta: [
    "Previously: GRAG AI Factory · Rooman Technologies",
    "B.E. in Robotics & Artificial Intelligence, VTU.",
  ],
} as const;

export const nav = [
  { href: "#about", label: "About", id: "about" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;

export const projects = [
  {
    id: "1",
    slug: "incidentrag",
    title: "IncidentRAG",
    kind: "incident triage",
    year: "2026",
    stack: "Python / FastAPI / Qdrant / Neo4j / OpenRouter / Streamlit",
    summary:
      "Evidence-grounded incident-triage backend. Pulls public Argo CD issues, ranks at most two bug reports, then runs assessment with BM25 + Qdrant, Neo4j graph context, OpenRouter reasoning, a grounding verifier, and an approval gate.",
    accent: "left" as const,
    href: "https://incident-rag-clean.vercel.app/",
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
    href: "https://frontend-rho-weld-29.vercel.app/",
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
    href: "https://github.com/snehagawali19/Rebalance_RL",
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
    href: "https://deepsheild-deepfake-detection.vercel.app/",
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
