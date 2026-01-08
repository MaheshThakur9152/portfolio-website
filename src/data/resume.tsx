import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Mahesh Thakur",
  initials: "MT",
  url: "https://maheshthakur.io",
  location: "Mumbai, Maharashtra, India",
  locationLink: "https://www.google.com/maps/place/Mumbai,+Maharashtra,+India",
  description:
    "Software Engineer turned Builder. I love building things and helping people. Very active on GitHub.",
  summary:
    "I’m currently a student pursuing [Information Technology](#education), passionate about building products and learning by doing. Along the way, I’ve participated in [4 hackathons](#hackathons) and became a finalist in all of them, driven by curiosity and problem-solving. I actively build and share my work through my [YouTube channel](https://www.youtube.com/@MaheshThakur-dev), where I document projects, development learnings, and experiments as I grow as a developer.",
  avatarUrl: "/mahesh.webp",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "TailwindCSS",
    "Postgres",
    "Docker",
    "CI/CD",
    "Java",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "Maheshthakurharishankar@gmail.com",
    tel: "+91 7208126866",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MaheshThakur9152",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mahesh-thakur-a63304352/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/MaheshThakurdev",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@MaheshThakur-dev",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
      {
      company: "Ambeservices",
      href: "https://ambeservices.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/ambeservices.png",
      start: "August 2025",
      end: "Dec 2025",
      description:
        "Architected and developed the company’s internal attendance and billing management platform as a solo intern, building the complete MVP end-to-end. Successfully deployed it into production, where it is actively used by 75+ employees daily.",
    },
    {
      company: "Cosinv AI",
      href: "https://cosniv.com",
      badges: [],
      location: "Remote",
      title: "Ai Developement Intern",
      logoUrl: "/cosniv.webp",
      start: "March 2025",
      end: "July 2025",
      description:
        "Trained production-grade AI models and maintained a structured organization knowledge base to continuously enhance system intelligence. Designed automated data pipelines and evaluation frameworks to benchmark performance. Monitored and analyzed model outputs to improve accuracy and reliability. Collaborated across teams to deploy scalable AI features into real-world applications.",
    },
     {
      company: "Innobharat",
      badges: [],
      href: "https://innobharat.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/innobharat.jpeg",
      start: "Dec 2024",
      end: "Feb 2025",
      description:
        "Implemented scalable frontend and backend features as a Full Stack Engineer with a strong primary focus on frontend development, building high-performance user interfaces, application logic, and platform integrations. Developed automation tools, optimized application workflows, and contributed to system reliability and deployment processes to support large-scale development environments and ensure efficient, production-ready application delivery.",
    },
     ],
  education: [
    {
      school: "Atharva College of Engineering",
      href: "https://atharvacoe.ac.in",
      degree: "Bachelor's of Enginnerning Information Technology (BE)",
      logoUrl: "/atharva-logo.png",
      start: "2024",
      end: "2028",
    },
    {
      school: "Pace Jr Science College",
      href: "https://pacejrsciencecollege.edu.in",
      degree: "Higher Secondary Certificate (HSC)",
      logoUrl: "/Pace.jpeg",
      start: "2022",
      end: "2024",
    },
    {
      school: "Holy Infant High School",
      href: "https://holyinfanthighschool.in",
      degree: "Secondary School Certificate (SSC)",
      logoUrl: "/Holy-infant.jpeg",
      start: "2010",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "Ambe Service Website",
      href: "https://ambeservice.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "I worked as a frontend developer, focusing on building clean, high-performance interfaces with strong UI/UX and SEO foundations. This helped improve user engagement, accessibility, and overall visibility of the product.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://ambeservice.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://res.cloudinary.com/di9eeahdy/video/upload/v1767856820/untitled_kndwke.webm",
    },
    {
      title: "Cosinv Ai",
      href: "https://cosinv.com",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
      ],
      links: [
        {
          type: "Website",
          href: "https://cosinv.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://res.cloudinary.com/di9eeahdy/video/upload/v1767857140/untitled_v4lgqs.webm",
    },
    {
      title: "Sportify E-commerce",
      href: "https://sportify12345.vercel.app",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Built and maintained a high-performance web platform, crafting polished UI/UX and SEO-optimized frontend experiences while developing scalable backend services using Spring Boot.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Spring Boot",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://sportify12345.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://res.cloudinary.com/di9eeahdy/video/upload/v1767862597/Untitled_design_dchegz.mp4",
    },
    {
      title: "Admin Dashboard SaaS",
      href: "https://admin.ambeservice.com",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an internal management system as a solo intern, handling frontend, backend, and deployment, used daily by 75 company users.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://admin.ambeservice.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://res.cloudinary.com/di9eeahdy/video/upload/v1767863052/Untitled_design_1_ttjdri.mp4",
    },
  ],
  hackathons: [
    {
      title: "Ecell IITB Hackathon",
      dates: "January 23rd - 25th, 2025",
      location: "Mumbai, Maharashtra",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://res.cloudinary.com/di9eeahdy/image/upload/v1767806679/IIt_logo_lugvys.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "All India Ideathon",
      dates: "September 14th - 16th, 2018",
      location: "Delhi, India",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://res.cloudinary.com/di9eeahdy/image/upload/v1767851664/IIt-delhi_wejhwh.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Avinya Ideathon 2k25",
      dates: "May 31st, 2025",
      location: "Mumbai, Maharashtra",
      description:
        "Developed an application that recognizes American Sign Language hand gestures using a CNN, translating webcam-captured gestures into text for easier and more accessible communication.",
      icon: "public",
      image:
        "https://res.cloudinary.com/di9eeahdy/image/upload/v1767851833/Screenshot_from_2026-01-08_11-26-52_novbqf.png",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/MaheshThakur9152/Sign-Language-To-Audio-Converter.git",
        }
      ],
    },
    {
      title: "Techroove Hackathon",
      dates: "February 3rd - 4th, 2025",
      location: "Mumbai, Maharashtra",
      description:
        "Developed an application that recognizes American Sign Language hand gestures using a CNN, translating webcam-captured gestures into text for easier and more accessible communication.",
      image:
        "https://res.cloudinary.com/di9eeahdy/image/upload/v1767852169/Screenshot_from_2026-01-08_11-32-34_ippreq.png",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/MaheshThakur9152/Sign-Language-To-Audio-Converter.git",
        },
      ],
    },
      ],
} as const;
