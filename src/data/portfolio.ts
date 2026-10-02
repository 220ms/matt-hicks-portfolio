// All site content lives here. Edit this file to update the portfolio.
// Items marked TODO are placeholders — replace them with your real details.

export const profile = {
  name: "Matt Hicks",
  role: "Software Engineer",
  focus: "Backend & Data",
  location: "Melbourne, Australia",
  tagline: "I build the backend services and data pipelines behind high-scale adtech.",
  available: false, // true shows the "open to opportunities" badge
  email: "hello@matthicks.com.au",
  resumeUrl: "/resume" as string | undefined, // set to undefined to hide the Résumé button
  socials: {
    github: "https://github.com/220ms",
    linkedin: "https://www.linkedin.com/in/matthew-hicks-b85877217/",
  },
}

export const about = {
  paragraphs: [
    "I'm a Melbourne-based software engineer with a strong foundation in programming and a genuine passion for technology. I'm currently at Trillion, building and maintaining backend services for high-scale adtech systems, where I work with PHP and a big-data stack spanning PostgreSQL, ClickHouse, Trino, Spark, HDFS and Airflow to process and analyse large datasets. Before that, I spent a year at Fluger building full-stack PHP and MySQL systems for pharmacy booking software.",
    "I thrive in collaborative, cross-functional teams and I'm committed to continuous learning. I'm always looking for meaningful projects where I can keep growing and put my experience in software development to work.",
  ],
  stats: [
    { value: "2+", label: "Years in industry" },
    { value: "2", label: "Companies" },
    { value: "BIT", label: "Monash University" },
  ],
  skills: [
    "PHP",
    "Laravel",
    "MySQL",
    "PostgreSQL",
    "ClickHouse",
    "Trino",
    "Spark",
    "HDFS",
    "Airflow",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Prisma",
    "Stripe",
    "AWS",
    "HTML & CSS",
    "Tailwind CSS",
    "Bootstrap",
    "REST APIs",
    "Docker",
    "Google Cloud",
    "Git",
    "Linux",
    "Jira",
    "Agile",
    "Data pipelines",
    "A/B testing",
  ],
  education: [
    {
      school: "Monash University",
      degree: "Bachelor of Information Technology",
      detail: "Majoring in Networks & Cyber Security and Software Development",
      start: "2020",
      end: "2023",
    },
  ],
}

export type Job = {
  company: string
  companyUrl?: string
  role: string
  start: string
  end: string
  location?: string
  highlights: string[]
  tech: string[]
}

export const experience: Job[] = [
  {
    company: "Trillion",
    companyUrl: "https://trillion.com",
    role: "Software Engineer",
    start: "Feb 2025",
    end: "Present",
    location: "Beaumaris, VIC",
    highlights: [
      "Develop and maintain backend services supporting high-scale adtech systems.",
      "Work with PHP, PostgreSQL, ClickHouse and Trino to process and analyse large datasets.",
      "Build dashboards and data pipelines with Airflow and Spark on HDFS to monitor performance and drive business outcomes.",
      "Collaborate with cross-functional teams to improve bidding strategies and monetisation performance.",
      "Contribute to experimentation and A/B testing frameworks with a focus on profitability.",
    ],
    tech: ["PHP", "PostgreSQL", "ClickHouse", "Trino", "Spark", "HDFS", "Airflow"],
  },
  {
    company: "Fluger Pty Ltd",
    companyUrl: "https://fluger.com.au/",
    role: "Junior Software Developer",
    start: "Feb 2024",
    end: "Feb 2025",
    location: "Mornington, VIC",
    highlights: [
      "Built and maintained full-stack PHP and MySQL systems for pharmacy booking software.",
      "Developed server-side logic in PHP, with CRON jobs automating tasks every few minutes.",
      "Designed and managed MySQL databases, including schema design, query optimisation and performance tuning.",
      "Built user interfaces with HTML, CSS, JavaScript, Bootstrap and jQuery, and integrated third-party RESTful APIs.",
      "Implemented templated email (via Mailgun) and SMS communications.",
      "Applied frontend and backend validation to keep user input secure.",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "jQuery", "Bootstrap", "Docker", "Git", "Jira"],
  },
]

export type Project = {
  title: string
  meta: string // e.g. your role and the year
  description: string
  tech: string[]
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    title: "PayChase",
    meta: "Solo project · Full-stack SaaS",
    description:
      "An invoicing platform for small businesses that I designed, built and launched solo. Users create quotes that clients accept from a public link, convert them into invoices and get paid by card through Stripe Connect or by bank transfer. Includes automated email and SMS payment reminders, client and expense tracking, PDF generation, and tiered subscription billing driven by Stripe webhooks — all covered by Vitest unit/integration tests and Playwright end-to-end tests.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Resend", "Twilio", "Tailwind CSS", "Playwright"],
    live: "https://www.paychase.com.au/",
  },
  {
    title: "Pet Social Sphere",
    meta: "Solo project · Full-stack social platform",
    description:
      "A social network for pet owners that I built end to end on my own. Users create profiles for their pets, share posts with likes and comments, add friends and join groups. Backed by a REST API with JWT auth and refresh tokens, email verification and password reset, and image uploads to S3.",
    tech: ["React", "Vite", "TanStack Query", "Node.js", "Express", "MongoDB", "AWS S3", "Tailwind CSS"],
  },
  {
    title: "Visibility Lab",
    meta: "Project Lead · 2023",
    description:
      "Led a cross-functional team expanding a coaching portal that helps users grow their business reach and strategy. Kept a steady line of communication with the project owner through regular updates and progress reports, and conceived and built new features that broadened what the platform could do.",
    tech: ["Team leadership", "Full-stack", "Stakeholder management"], // TODO: swap in the actual stack
  },
  {
    title: "AI Trademark Predictor",
    meta: "Legal Hackathon · Monash LSS x MDN · 2022",
    description:
      "Worked with a mixed IT and law team to rapidly prototype a tool that cuts the legal cost of consultations before filing a trademark application. Led the design and development of the interface for the AI-driven trademark prediction prototype.",
    tech: ["UI design", "Prototyping", "AI"], // TODO: swap in the actual stack
  },
]

// Résumé-only content for /resume. Experience and education are shared with the site above.
export const resume = {
  summary:
    "Software engineer with 2+ years of professional experience across backend services, data pipelines and full-stack web applications. Currently building high-scale adtech systems at Trillion with PHP, PostgreSQL, ClickHouse, Trino, Spark, HDFS and Airflow. Outside of work I design, build and ship my own products end to end, including PayChase, a live invoicing SaaS with Stripe billing.",
  skillGroups: [
    { label: "Languages", items: ["PHP", "TypeScript", "JavaScript", "SQL", "HTML & CSS"] },
    { label: "Frameworks", items: ["Laravel", "Next.js", "React", "Node.js", "Express", "Tailwind CSS"] },
    { label: "Data", items: ["PostgreSQL", "ClickHouse", "MySQL", "Trino", "Spark", "HDFS", "Airflow", "MongoDB", "Prisma"] },
    { label: "Tools & cloud", items: ["AWS", "Google Cloud", "Docker", "Git", "Stripe", "Playwright", "Jira", "Linux"] },
  ],
  projects: [
    {
      title: "PayChase",
      meta: "Solo · Live SaaS",
      link: "paychase.com.au",
      tech: "Next.js, TypeScript, PostgreSQL, Prisma, Stripe, Resend, Twilio",
      bullets: [
        "Designed, built and launched an invoicing platform for small businesses: quotes, invoices, clients and expenses.",
        "Integrated Stripe Connect payments and subscription billing via webhooks, plus automated email and SMS reminders.",
        "Covered critical payment flows with Vitest unit/integration tests and Playwright end-to-end tests.",
      ],
    },
    {
      title: "Pet Social Sphere",
      meta: "Solo · Full-stack",
      tech: "React, TanStack Query, Node.js, Express, MongoDB, AWS S3",
      bullets: [
        "Built a social network for pet owners with pet profiles, posts, likes, comments, friends and groups.",
        "Developed a REST API with JWT auth and refresh tokens, email verification, password reset and S3 image uploads.",
      ],
    },
  ],
}
