// Verified details go here. Leave private or unpublished values null.
// Only add public certificate or project links after the owner supplies them.
export interface Profile {
  name: string;
  role: string;
  institution: string;
  intro: string | null;
  thoughts: string | null;
  philosophy: string | null;
}

export interface ContactLinks {
  github: string;
  linkedin: string;
  email: string | null;
  instagram: string | null;
}

export type ChapterId = "education" | "skills" | "projects" | "courses" | "certificates";

export interface JournalEntry {
  title: string;
  description?: string;
  url?: `https://${string}`;
}

export interface GalleryImage {
  src: `/images/${string}`;
  title: string;
  alt: string;
}

export interface Portfolio {
  profile: Profile;
  links: ContactLinks;
  journal: Record<ChapterId, JournalEntry[]>;
  gallery: GalleryImage[];
}

export const portfolio: Portfolio = {
  profile: {
    name: "Abhijith SD",
    role: "CSE Engineering Student",
    institution: "UKFCET",
    intro: null, // Owner: add an introduction in your own words.
    thoughts: null, // Owner: describe your thoughts and vision.
    philosophy: null, // Owner: add your personal philosophy.
  },
  links: {
    github: "https://github.com/abh-11",
    linkedin: "https://www.linkedin.com/in/abhijith-sd-a92a37336/",
    email: null, // Owner: add the public address for the contact button.
    instagram: null, // Owner: add the full URL to your public profile.
  },
  journal: {
    education: [{ title: "Computer Science & Engineering", description: "UKFCET" }],
    skills: [], // Owner: add skills you want to share.
    projects: [], // Owner: add project titles, descriptions and public links.
    courses: [], // Owner: add completed courses and their providers.
    certificates: [], // Owner: add certificate titles and public Google Drive URLs.
  },
  // Site artwork. These are not presented as photographs taken by the owner.
  gallery: [
    { src: "/images/fern.webp", title: "Fern fronds", alt: "Dewdrops on overlapping green fern leaves" },
    { src: "/images/canopy.webp", title: "Under the canopy", alt: "Shafts of morning light falling through a conifer forest" },
    { src: "/images/moss.webp", title: "The forest floor", alt: "Orange-brown mushrooms growing on a moss-covered log" },
  ],
};
