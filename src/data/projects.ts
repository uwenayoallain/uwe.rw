import type { ImageMetadata } from "astro";

import recordsAppLight from "../assets/projects/the-records-app-light.png";
import recordsAppDark from "../assets/projects/the-records-app-dark.png";
import calculatorLight from "../assets/projects/simple-calculator-light.png";
import calculatorDark from "../assets/projects/simple-calculator-dark.png";

export interface Project {
  title: string;
  category: string;
  image: {
    light: ImageMetadata;
    dark: ImageMetadata;
  };
  year: string;
  slug: string;
  description: string;
  content?: string;
  technologies?: string[];
  role?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "The Records App",
    category: "Web Application",
    image: {
      light: recordsAppLight,
      dark: recordsAppDark,
    },
    year: "2025",
    slug: "the-records-app",
    description:
      "A comprehensive savings and records management application designed to help users track their financial progress.",
    content:
      "The Records App is a full-stack web application that allows users to manage their savings, track expenses, and visualize their financial data. It features secure authentication, real-time data updates, and an intuitive user interface.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    role: "Full-Stack Developer",
    liveUrl: "https://saving.uwe.rw",
    repoUrl: "https://github.com/uwenayoallain/therecordsapp",
  },
  {
    title: "Simple Calculator",
    category: "Tool / Utility",
    image: {
      light: calculatorLight,
      dark: calculatorDark,
    },
    year: "2025",
    slug: "simple-calculator",
    description:
      "A clean, modern, and efficient inline calculator for quick mathematical operations.",
    content:
      "This project provides a simple yet powerful calculator interface. It focuses on speed and usability, allowing users to perform calculations directly in the browser without any distractions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "Developer & Designer",
    liveUrl: "https://calc.uwe.rw",
    repoUrl: "https://github.com/uwenayoallain/simple-calculator",
  },
];
