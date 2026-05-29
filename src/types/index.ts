import { type IconType } from "react-icons";

export interface NavLink {
  key: "about" | "experience" | "work" | "blog" | "contact";
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export interface ExperienceMeta {
  id: string;
  logoUrl?: string;
}

export interface ExperienceEntry extends ExperienceMeta {
  company: string;
  role: string;
  dateRange: string;
  bullets: string[];
}

export interface Skill {
  name: string;
  icon: IconType;
}

export interface ProjectMeta {
  id: string;
  imageUrl: string;
  images?: string[];
  videoUrl?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Project extends ProjectMeta {
  title: string;
  role: string;
  description: string;
}

export interface BlogPostMeta {
  id: string;
  slug: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  title: string;
  excerpt: string;
  content: string;
  readingTime: string;
}

export interface PersonalContact {
  email: string;
  phone: string;
  resumeUrl: string;
}

export interface AboutDict {
  greeting: string;
  firstName: string;
  lastName: string;
  shortName: string;
  title: string;
  bio: string;
  location: string;
  status: string;
}

export interface UiDict {
  nav: Record<NavLink["key"], string>;
  buttons: {
    downloadCv: string;
    source: string;
    live: string;
    toggleMenu: string;
    toggleTheme: string;
    language: string;
  };
  skills: { heading: string; subtitle: string };
  footer: { rights: string };
  blog: { metaTitle: string; metaDescription: string };
}

export interface ExperienceDict {
  heading: string;
  items: ExperienceEntry[];
}

export interface WorkDict {
  heading: string;
  subtitle: string;
  items: Project[];
}

export interface BlogDict {
  heading: string;
  subtitle: string;
  viewAll: string;
  backToBlog: string;
  items: BlogPost[];
}

export interface ContactDict {
  heading: string;
  prompt: string;
  alsoFindMe: string;
}
