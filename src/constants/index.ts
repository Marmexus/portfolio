// ─── Types ───────────────────────────────────────────────────────────────────

export type NavLink = {
  label: string;
  href: string;
};

export type TechItem = {
  name: string;
  category: string;
  tooltip: string;
  color: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  metrics: string[];
  tags: string[];
};

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  demo?: string;
  image: string;
  featured?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ─── Tech Stack ──────────────────────────────────────────────────────────────

export const TECH_STACK: TechItem[] = [
  {
    name: "NestJS",
    category: "Backend",
    tooltip: "Modular microservices & dependency injection for scalable APIs",
    color: "#e0234e",
  },
  {
    name: "Next.js",
    category: "Frontend",
    tooltip:
      "App Router, RSC, and edge-optimized full-stack React applications",
    color: "#ffffff",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    tooltip: "Relational data modeling for complex ERP/WMS schemas",
    color: "#336791",
  },
  {
    name: "TypeScript",
    category: "Language",
    tooltip: "End-to-end type safety across frontend and backend codebases",
    color: "#3178c6",
  },
  {
    name: "Docker",
    category: "DevOps",
    tooltip: "Containerized deployments and reproducible dev environments",
    color: "#2496ed",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    tooltip: "Utility-first CSS for rapid, consistent UI development",
    color: "#06b6d4",
  },
  {
    name: "TypeORM",
    category: "ORM",
    tooltip: "Type-safe ORM with PostgreSQL and MySQL for multi-tenant data isolation",
    color: "#e83e8c",
  },
  {
    name: "Redis",
    category: "Cache",
    tooltip:
      "In-memory caching for high-throughput session and queue management",
    color: "#dc382d",
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCE: Experience[] = [
  {
    company: "Octagram",
    role: "Full Stack Developer",
    period: "Jan 2024 — Present",
    location: "Bangkok, Thailand",
    description:
      "Developing a multi-tenant ERP system supporting inventory, POS, and e-commerce operations across multiple branches.",
    metrics: [
      "Designed and implemented NestJS APIs with PostgreSQL and TypeORM, ensuring secure data isolation per company",
      "Integrated RFID hardware data via gRPC-based services and exposed real-time inventory updates via SSE",
      "Built responsive admin and customer-facing applications using Next.js 14/15 with App Router",
      "Maintained production systems across multiple branches, handling bug fixes, performance improvements, and feature enhancements",
    ],
    tags: ["NestJS", "Next.js", "PostgreSQL", "TypeORM", "gRPC", "Redis"],
  },
  {
    company: "T.C.C. Technology",
    role: "Software Engineer (Internship)",
    period: "May 2023 — Oct 2023",
    location: "Bangkok, Thailand",
    description:
      "Developed backend services and RESTful APIs using TypeScript, Node.js, Express.js, and Strapi CMS.",
    metrics: [
      "Designed and implemented PostgreSQL database schemas and API endpoints for content-driven applications",
      "Created comprehensive API documentation using Swagger/OpenAPI",
      "Collaborated with team members using Git-based workflows and participated in code reviews and deployments",
    ],
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Strapi", "Swagger"],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    title: "Enterprise ERP System",
    description:
      "Multi-tenant ERP system supporting inventory, POS, and e-commerce operations across multiple branches with secure per-company data isolation.",
    longDescription:
      "Designed and maintained core backend architecture for a multi-tenant ERP system. Implemented multi-tenant data isolation and role-based access control. Optimized performance with Redis caching and efficient database queries.",
    tags: ["NestJS", "Next.js", "PostgreSQL", "Redis", "TypeORM"],
    link: "https://github.com/Marmexus",
    demo: undefined,
    image: "/projects/erp-demo.png",
    featured: true,
  },
  {
    title: "Travel Planning Platform",
    description:
      "RESTful API and admin dashboard for managing trips, hotels, and attractions with Excel import/export tools for bulk data operations.",
    longDescription:
      "Developed RESTful APIs and an admin dashboard for managing trips, hotels, and attractions. Built Excel import/export tools for bulk data operations.",
    tags: ["NestJS", "Next.js", "MySQL"],
    link: "https://github.com/Marmexus",
    demo: undefined,
    image: "/projects/travel-demo.png",
    featured: true,
  },
];

// ─── Social Links ────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Marmexus",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nattapong-nantasang",
    icon: "linkedin",
  },
];

// ─── Personal Info ────────────────────────────────────────────────────────────

export const PERSONAL_INFO = {
  name: "Nattapong Nantasang",
  role: "Full Stack Developer",
  email: "ntp.nantasang@gmail.com",
  location: "Bangkok, Thailand",
  bio: "Full Stack Developer with 2+ years of experience shipping production web applications with Next.js and NestJS. I build clean, performant UIs and solid backend APIs — from landing pages to enterprise systems — and thrive in collaborative team environments.",
  yearsOfExperience: 2,
  cvUrl: "/NATTAPONG_NANTASANG_Resume.pdf",
};
