/* ══════════════════════════════════════════════════
   PORTFOLIO DATA — Snehasish Bhattacharjee
   GitHub: snehasish-bhattacharjee123
══════════════════════════════════════════════════ */

// ── PERSONAL INFO ──────────────────────────────
export const PERSONAL = {
  name:       'Snehasish Bhattacharjee',
  nameShort:  'S.B.',
  title:      'Full-Stack Software Engineer',
  subtitle:   'Software Engineer · Kolkata, India',
  location:   'Kolkata, West Bengal, India',
  email:      'snehasish.bhattacharjee123@gmail.com',
  github:     'https://github.com/snehasish-bhattacharjee123',
  linkedin:   'https://linkedin.com/in/snehasish-bhattacharjee',
  hashnode:   '',
  tagline:    'Turning ideas into real, working products — one line of code at a time.',
  bio: [
    `I'm Snehasish, a passionate Software Engineer from Kolkata, India 🇮🇳 who loves turning ideas into real, working products. I enjoy building full-stack web applications that solve real problems.`,
    `My work spans across React, Node.js, and modern web technologies. I take pride in clean code, intuitive UX, and scalable architecture — from quick prototypes to production-ready apps.`,
    `When I'm not coding, I'm exploring new tools, contributing to open-source, and always looking for the next exciting challenge to sink my teeth into.`,
  ],
};

// ── SKILLS ────────────────────────────────────
export const SKILLS = {
  technical: [
    { category: 'Frontend',        items: ['React', 'Next.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend',         items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL'] },
    { category: 'Database',        items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Mongoose'] },
    { category: 'Testing & QA',    items: ['Cypress', 'Jest', 'Mocha', 'Test Automation'] },
    { category: 'Tools & DevOps',  items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman', 'Linux'] },
    { category: 'Languages',       items: ['JavaScript', 'TypeScript', 'Java', 'Python', 'SQL'] },
  ],
  nonTechnical: [
    'Problem Solving',
    'Technical Documentation',
    'System Design',
    'Agile / Scrum',
    'Cross-functional Collaboration',
    'Fast Prototyping',
    'Code Review',
    'Mentoring',
  ],
};

// ── PROJECTS ──────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    title:       'Cinex Platform',
    description: 'A full-featured cinema and movie streaming platform. Browse, discover, and manage movies with a modern React frontend and a robust Node.js backend. Features user auth, search, and rich movie data.',
    image:       '/images/projects/cinex.png',
    tags:        ['Web', 'Full-Stack', 'React'],
    type:        'web',
    langs:       ['React', 'Node.js', 'MongoDB', 'Express'],
    status:      'completed',
    github:      'https://github.com/snehasish-bhattacharjee123/Cinex-Platform',
    demo:        null,
    featured:    true,
  },
  {
    id: 2,
    title:       'E-Commerce Store',
    description: 'A complete e-commerce web application with product listing, cart management, user authentication, and order processing. Built with a full MERN stack, featuring a clean shopping experience.',
    image:       '/images/projects/ecommerce.png',
    tags:        ['Web', 'Full-Stack', 'MERN'],
    type:        'web',
    langs:       ['React', 'Node.js', 'MongoDB', 'Express'],
    status:      'completed',
    github:      'https://github.com/snehasish-bhattacharjee123/E-commerce',
    demo:        null,
    featured:    true,
  },
  {
    id: 3,
    title:       'Dermatology App',
    description: 'A healthcare-focused web application for dermatology services — allowing patients to browse conditions, book consultations, and interact with a clean medical interface. Built with accessibility in mind.',
    image:       '/images/projects/dermatology.png',
    tags:        ['Web', 'Healthcare', 'Full-Stack'],
    type:        'web',
    langs:       ['React', 'Node.js', 'MongoDB'],
    status:      'completed',
    github:      'https://github.com/snehasish-bhattacharjee123/Dermatology',
    demo:        null,
    featured:    true,
  },
  {
    id: 4,
    title:       'Video Meeting App',
    description: 'A real-time video conferencing web application powered by WebRTC. Supports multi-participant video calls, screen sharing, and live chat — built for seamless remote collaboration.',
    image:       '/images/projects/videomeeting.png',
    tags:        ['Web', 'Real-Time', 'WebRTC'],
    type:        'web',
    langs:       ['JavaScript', 'Node.js', 'WebRTC', 'Socket.io'],
    status:      'completed',
    github:      'https://github.com/snehasish-bhattacharjee123/video-meeting',
    demo:        null,
    featured:    false,
  },
  {
    id: 5,
    title:       'Scatch — Social Platform',
    description: 'A social media web application where users can share ideas, follow others, and interact through posts and comments. Features a real-time feed with Node.js and MongoDB.',
    image:       '/images/projects/scatch.png',
    tags:        ['Web', 'Social', 'Full-Stack'],
    type:        'web',
    langs:       ['Node.js', 'EJS', 'MongoDB', 'Express'],
    status:      'completed',
    github:      'https://github.com/snehasish-bhattacharjee123/Scatch',
    demo:        null,
    featured:    false,
  },
  {
    id: 6,
    title:       'Insurance Management System',
    description: 'A comprehensive insurance management web portal. Handles policy creation, claims processing, user management, and reporting — with a focus on clean UX and reliable backend logic.',
    image:       '/images/projects/insurance.png',
    tags:        ['Web', 'Enterprise', 'Full-Stack'],
    type:        'web',
    langs:       ['React', 'Node.js', 'MongoDB', 'Express'],
    status:      'completed',
    github:      'https://github.com/snehasish-bhattacharjee123/Insurance_Project',
    demo:        null,
    featured:    false,
  },
];

// ── RESEARCH ──────────────────────────────────
export const RESEARCH = [];

// ── ACADEMICS ─────────────────────────────────
export const ACADEMICS = {
  institutions: [
    {
      level:        'Bachelor of Technology (B.Tech)',
      institution:  'University / College — Kolkata',
      location:     'Kolkata, West Bengal',
      period:       '2020 – 2024',
      status:       'completed',
      cgpa:         'N/A',
      desc:         'Studied Computer Science and Engineering. Core subjects: Data Structures, Algorithms, Web Development, Database Management, Operating Systems, Networks.',
      logo:         '/images/academics/college.png',
    },
  ],
  certifications: [
    { title: 'Full-Stack Web Development',     issuer: 'Udemy',         date: '2023', link: '#', badge: '🌐' },
    { title: 'React — The Complete Guide',     issuer: 'Udemy',         date: '2023', link: '#', badge: '⚛️' },
    { title: 'Node.js Developer Course',       issuer: 'Udemy',         date: '2022', link: '#', badge: '🟢' },
    { title: 'MongoDB for Developers',         issuer: 'MongoDB Atlas',  date: '2022', link: '#', badge: '🍃' },
    { title: 'Cypress End-to-End Testing',     issuer: 'Cypress.io',    date: '2023', link: '#', badge: '🧪' },
  ],
};

// ── ACHIEVEMENTS ──────────────────────────────
export const ACHIEVEMENTS = {
  certificates: [
    {
      id: 1,
      title:   'GitHub Pull Shark Achievement',
      issuer:  'GitHub',
      date:    '2024',
      image:   '/images/certificates/pullshark.png',
      desc:    'Awarded the Pull Shark achievement on GitHub for consistently opening pull requests that get merged.',
      tags:    ['Open Source', 'GitHub', 'Collaboration'],
    },
    {
      id: 2,
      title:   'GitHub YOLO Achievement',
      issuer:  'GitHub',
      date:    '2024',
      image:   '/images/certificates/yolo.png',
      desc:    'Awarded the YOLO badge for merging a pull request without a code review.',
      tags:    ['GitHub', 'Open Source'],
    },
  ],
  hackathons: [],
};

// ── FEEDBACKS ─────────────────────────────────
export const FEEDBACKS = [
  {
    id: 1,
    name:      'Collaborator',
    role:      'Open Source Contributor',
    image:     '/images/feedbacks/person1.png',
    rating:    5,
    review:    'Snehasish writes clean, well-structured code and delivers features on time. His full-stack skills are impressive and his attention to UX detail makes the final product stand out.',
    skill_tag: 'React',
    productivity_boost: 45,
  },
];

// ── BLOGS ─────────────────────────────────────
export const BLOGS = [];
