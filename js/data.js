// ============================================================
//  DATA.JS  — Your Portfolio Content Configuration
//  ✏️  Edit ONLY this file to update all portfolio content.
//  No other files need to be touched for content changes!
// ============================================================

const PORTFOLIO_DATA = {

  // ──────────────────────────────────────────────────────────
  //  PERSONAL INFORMATION
  // ──────────────────────────────────────────────────────────
  personal: {
    name:         "Tanmoy Barua",
    title:        "Web developer Developer",
    bio:          "I'm a web developer developer with a passion for crafting elegant digital experiences. My journey started with curiosity and evolved into building impactful, production-ready applications.",

    location:     "chittagong, Bangladesh",
    email:        "mbarua047@gmail.com",
    resumeUrl:    "./assets/resume.pdf",   // ← drop your resume PDF in /assets
    profileImage: "./assets/profile.jpg", // ← drop your photo in /assets
    // Words that cycle in the hero typing animation
    roles: [
      "Full Stack Developer",
      "UI/UX Enthusiast",
      "Problem Solver",
      "Open Source Contributor",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  SOCIAL LINKS  (replace # with your real URLs)
  // ──────────────────────────────────────────────────────────
  social: {
    github:   "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter:  "https://twitter.com/yourusername",
    email:    "mailto:your.email@example.com",
  },

  // ──────────────────────────────────────────────────────────
  //  HERO STATS
  // ──────────────────────────────────────────────────────────
  stats: [
    { number: "3+", label: "Projects Built"    },
    { number: "1+",  label: "Years Experience"  },
    { number: "5+",  label: "Happy Clients"     },
  ],

  // ──────────────────────────────────────────────────────────
  //  SKILLS / TECH STACK
  //  Each skill shows an emoji icon and a label.
  // ──────────────────────────────────────────────────────────
  skills: [
    { name: "HTML5",       icon: "🌐" },
    { name: "CSS",        icon: "🎨" },
    { name: "JavaScript",  icon: "⚡" },
    { name: "Bootstrap",   icon: "🅱️" },
    { name: "MongoDB",     icon: "🍃" },
    { name: "MySQL",       icon: "🗄️" },
    { name: "Git",         icon: "📦" },
    { name: "GitHub",      icon: "🐙" },
    { name: "Figma",       icon: "🖌️" },
   
  ],

  // ──────────────────────────────────────────────────────────
  //  PROJECTS
  //  tags control the filter buttons:
  //    "frontend" | "backend" | "fullstack"
  //  Set image to null to show the emoji placeholder instead.
  // ──────────────────────────────────────────────────────────
  projects: [
    {
      id: 1,
      title:        "VELVORA",
      description:  "An e-commerce sit built using HTML, CSS and Bootstrap skills — responsive, clean and playful.",
      image:      "./assets/project1.png",
      tags:         ["frontend"],
      technologies: ["HTML", "CSS", "Bootstrap"],
      liveUrl:      "https://stately-chaja-5df7b3.netlify.app/",
      githubUrl:    "#",
    },
    // {
    //   id: 2,
    //   title:        "POS System",
    //   description:  "A Point-of-Sale web app featuring product management, a dynamic cart, sales tracking and a polished checkout flow.",
    //   image:         "./assets/project2.png",
    //   emoji:        "🛒",
    //   tags:         ["frontend"],
    //   technologies: ["HTML", "CSS", "Bootstrap"],
    //   liveUrl:      "#",
    //   githubUrl:    "#",
    // },
    // {
    //   id: 3,
    //   title:        "Portfolio Website",
    //   description:  "This very portfolio — fully custom, dark/light mode, animated hero, project filters, and a working contact form.",
    //   image:        null,
    //   emoji:        "💼",
    //   tags:         ["frontend"],
    //   technologies: ["HTML", "CSS", "JavaScript"],
    //   liveUrl:      "#",
    //   githubUrl:    "#",
    // },
    // {
    //   id: 4,
    //   title:        "Next Project",
    //   description:  "Something exciting is in the works. Stay tuned — a full-stack application with a React frontend and Node.js backend.",
    //   image:        null,
    //   emoji:        "🚀",
    //   tags:         ["fullstack"],
    //   technologies: ["React", "Node.js", "MongoDB"],
    //   liveUrl:      "#",
    //   githubUrl:    "#",
    // },
  ],

  // ──────────────────────────────────────────────────────────
  //  WORK EXPERIENCE  (newest first)
  // ──────────────────────────────────────────────────────────
  experience: [
  
    {
      title:       "Junior Web Developer",
      company:     "Freelance",
      period:      "2025 – present",
      description: "Deliver responsive websites for small businesses using HTML, CSS, Bootstrap, and JavaScript. Focused on clean design and performance.",
    },
  ],

  // ──────────────────────────────────────────────────────────
  //  EDUCATION  (newest first)
  // ──────────────────────────────────────────────────────────
  education: [
    {
      degree:      "Bachelor of Science – Computer Science and engineering",
      school:      "East Delta University",
      period:      "2024– Present",
      description: "Core focus on software engineering, algorithms, data structures and web development. Competed in hackathons.",
    },
  ],
};
