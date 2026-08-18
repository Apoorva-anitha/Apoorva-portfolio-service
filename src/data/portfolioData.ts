import { Project, ExperienceItem, SkillCategory, EducationItem, AchievementItem } from "../types.ts";

export const PERSONAL_INFO = {
  name: "Apoorva R",
  tagline: "Software Developer | Scalable Backend Engineer | MERN Stack Developer | Java & DSA Problem Solver | ML Enthusiast",
  subheading: "IIT Madras Data Science Dual Degree & St. Joseph's College of Engineering (CGPA 8.99) &bull; 6000+ LeetCode Points",
  bio: "Driven Software Developer with strong expertise in backend engineering, scalable architecture design, and data-driven problem solving. Achieved 6000+ LeetCode points and solved 2000+ Skillrack problems, demonstrating exceptional algorithmic and logical strength. Experienced in real-world development through internships, hackathons, and production-style projects. Passionate about building efficient systems, optimizing performance, and developing impactful software solutions.",
  phone: "9600096784",
  email: "apoorvaanitha28@gmail.com",
  linkedin: "https://linkedin.com/in/apoorva-anitha",
  github: "https://github.com/apoorva-anitha",
  portfolioUrl: "https://apoorva-portfolio-swart.vercel.app/",
  status: "Open to Software Engineering & Backend Roles",
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "6000+ LeetCode Points",
    description: "Long-term competitive coding consistency with deep mastery of Data Structures, Algorithms, and optimization.",
    metric: "6000+ Points",
    iconName: "Flame",
    tag: "DSA & Problem Solving",
  },
  {
    title: "2000+ Skillrack Problems Solved",
    description: "Extensive problem-solving track record demonstrating exceptional algorithmic depth and logical precision.",
    metric: "2000+ Solved",
    iconName: "Award",
    tag: "Algorithms",
  },
  {
    title: "Ranked 17th — CODEFEST 2025",
    description: "Secured 17th rank in prestigious collegiate coding competition against top student developers.",
    metric: "Rank 17",
    iconName: "Trophy",
    tag: "Competitive Programming",
  },
  {
    title: "HackerRank Gold Badges",
    description: "Achieved Java (5 Stars ★★★★★) and Python (3 Stars ★★★) domain certifications.",
    metric: "5★ Java / 3★ Python",
    iconName: "Star",
    tag: "Certifications",
  },
  {
    title: "85% in IIT Programming Exam",
    description: "High distinction score in rigorous programming examination for IIT Madras Data Science degree.",
    metric: "85% Score",
    iconName: "GraduationCap",
    tag: "IIT Madras",
  },
  {
    title: "8.99 CGPA Academic Excellence",
    description: "Consistently high academic standing in B.E. Computer Science at St. Joseph's College of Engineering.",
    metric: "8.99 CGPA",
    iconName: "BookOpen",
    tag: "Engineering",
  }
];

export const PROJECTS: Project[] = [
  {
    id: "linkedin-for-sports",
    title: "LinkedIn for Sports",
    subtitle: "Athlete Networking & Talent Scouting Platform",
    category: "Full Stack & Web",
    period: "Smart India Hackathon — Internal Round Qualified",
    badge: "Smart India Hackathon",
    description: "Developed a comprehensive networking platform for athletes to create verified profiles, showcase sporting achievements, and connect directly with scouts and sponsors.",
    longDescription: "Engineered a specialized MERN stack social platform tailored for sports ecosystems. Athletes can build structured sports portfolios, upload certified match statistics, and gain exposure to talent scouts. Built with React.js frontend, Node.js & Express.js REST APIs, and MongoDB for flexible athlete profile schemas with JWT authentication and role-based access control.",
    highlights: [
      "Qualified for Smart India Hackathon (SIH) Internal Round",
      "Architected responsive React.js UI with athlete statistics cards and media galleries",
      "Engineered secure Node.js/Express.js backend with JWT authentication and role separation (Athlete / Scout / Admin)",
      "Implemented search and filter algorithms to help scouts discover talents by sport, age, and metrics"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/apoorva-anitha",
    featured: true,
    imageAlt: "LinkedIn for Sports Platform Architecture",
    codeSnippet: {
      language: "javascript",
      filename: "athleteController.js",
      code: `// Express Athlete Discovery & Profile Controller
const Athlete = require('../models/Athlete');

exports.searchAthletes = async (req, res) => {
  try {
    const { sport, minRating, location, verified } = req.query;
    const filter = {};
    
    if (sport) filter.primarySport = new RegExp(sport, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (verified === 'true') filter.isVerified = true;
    if (minRating) filter.performanceScore = { $gte: Number(minRating) };

    const athletes = await Athlete.find(filter)
      .select('name primarySport achievements performanceScore location avatar')
      .sort({ performanceScore: -1 })
      .limit(50);

    return res.status(200).json({ success: true, count: athletes.length, data: athletes });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};`
    }
  },
  {
    id: "smart-blood-donation",
    title: "Smart Blood Donation System",
    subtitle: "Automated Emergency Donor-Recipient Matching",
    category: "Hackathon & Innovation",
    period: "HackArena Finalist",
    badge: "HackArena Finalist",
    description: "Built an automated donor-recipient matching system improving emergency medical response speed and blood inventory dispatch accuracy.",
    longDescription: "An emergency medical coordination platform that connects hospitals, emergency requestors, and voluntary blood donors. Utilizes geolocation radius algorithms and blood group compatibility logic to alert eligible nearby donors instantaneously during critical shortages, minimizing dispatch latency.",
    highlights: [
      "Selected as HackArena Finalist for impactful emergency response architecture",
      "Engineered donor matching engine using blood compatibility matrix (ABO and Rh factor)",
      "Developed proximity-based notification dispatch for urgent hospital requirements",
      "Designed clean PostgreSQL database schema to track donor eligibility intervals (90 days rule)"
    ],
    technologies: ["Node.js", "Express.js", "React.js", "PostgreSQL", "REST APIs", "Geolocation Matching", "JavaScript"],
    githubUrl: "https://github.com/apoorva-anitha",
    featured: true,
    imageAlt: "Smart Blood Donation Matching Flow",
    codeSnippet: {
      language: "javascript",
      filename: "donorMatcher.js",
      code: `// Compatibility & Proximity Dispatch Logic
const COMPATIBILITY_MAP = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

function findEligibleDonors(recipientBloodGroup, availableDonors, maxDistanceKm = 15) {
  return availableDonors.filter(donor => {
    const isCompatible = COMPATIBILITY_MAP[donor.bloodGroup]?.includes(recipientBloodGroup);
    const isEligibleDate = new Date() - new Date(donor.lastDonatedAt) >= (90 * 24 * 60 * 60 * 1000);
    const isNearby = donor.distanceKm <= maxDistanceKm;
    return isCompatible && isEligibleDate && isNearby && donor.status === 'AVAILABLE';
  });
}`
    }
  },
  {
    id: "crime-traffic-hotspots",
    title: "Crime & Traffic Hotspot Detection",
    subtitle: "Spatial Analytics & Incident Prediction System",
    category: "ML & Data Systems",
    period: "Police Hackathon Top 100",
    badge: "Police Hackathon Top 100",
    description: "Developed an analytical incident clustering and hotspot detection system to assist police patrol routing and municipal traffic optimization.",
    longDescription: "Developed for the Police Hackathon (ranking in Top 100), this system ingests spatial crime and traffic telemetry data, applies data preprocessing and clustering algorithms, and identifies high-risk zones. Enables proactive patrol deployment and congestion alleviation.",
    highlights: [
      "Ranked in the Top 100 at the Police Hackathon",
      "Applied Python data preprocessing, Selenium scraping for public traffic feeds, and spatial clustering",
      "Created backend REST services for incident ingestion and coordinate querying",
      "Integrated mapping dashboards displaying incident frequency density heatmaps"
    ],
    technologies: ["Python", "Selenium", "Pandas", "Flask/Node.js", "PostgreSQL / GIS", "Data Preprocessing", "REST APIs"],
    githubUrl: "https://github.com/apoorva-anitha",
    featured: true,
    imageAlt: "Crime & Traffic Hotspot System",
    codeSnippet: {
      language: "python",
      filename: "hotspot_clustering.py",
      code: `# Incident Density & Hotspot Scoring
import pandas as pd
import numpy as np

def calculate_hotspot_scores(incident_df, time_decay_factor=0.95):
    """
    Computes dynamic risk scores based on incident severity,
    temporal recency, and spatial density.
    """
    incident_df['recency_weight'] = np.exp(-time_decay_factor * incident_df['days_ago'])
    incident_df['weighted_score'] = incident_df['severity_multiplier'] * incident_df['recency_weight']
    
    hotspots = incident_df.groupby('zone_id').agg({
        'weighted_score': 'sum',
        'incident_id': 'count',
        'latitude': 'mean',
        'longitude': 'mean'
    }).rename(columns={'incident_id': 'incident_count'}).reset_index()
    
    return hotspots.sort_values(by='weighted_score', ascending=False)`
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-codeprot",
    role: "Backend Developer Intern",
    company: "CodeProt",
    period: "January 2026 – March 2026",
    type: "Internship",
    description: [
      "Worked on backend development for a comprehensive Learning Management System (LMS).",
      "Developed robust RESTful APIs and backend functionalities for student enrollment and course management workflows.",
      "Collaborated with core engineering team to optimize database queries and improve system performance under concurrent load.",
      "Implemented secure database integration and token-based authentication modules."
    ],
    skills: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "Authentication", "LMS Architecture"]
  },
  {
    id: "exp-astraalis",
    role: "Machine Learning Backend Intern",
    company: "Astraalis",
    period: "July – December 2025",
    type: "Internship",
    description: [
      "Worked on backend integration tasks for machine learning-based production systems.",
      "Focused on high-volume data handling, preprocessing pipelines, and scalable service architecture.",
      "Improved system reliability, error recovery, and backend efficiency across microservices."
    ],
    skills: ["Python", "Node.js", "ML Backend Integration", "Data Preprocessing", "Scalable Systems", "REST APIs"]
  },
  {
    id: "exp-dbaas",
    role: "Web Development Intern",
    company: "DBaaS Company",
    period: "July 2025",
    type: "Internship",
    description: [
      "Built and customized responsive web applications for client requirements.",
      "Implemented backend business logic, database operations, and API integrations.",
      "Delivered client-ready features in fast-paced collaborative development cycles."
    ],
    skills: ["JavaScript", "React.js", "Node.js", "Express.js", "MySQL / MongoDB", "API Integration"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Java", level: "Expert (5★)", percentage: 95, tag: "DSA & OOP" },
      { name: "Python", level: "Advanced (3★)", percentage: 90, tag: "ML & Backend" },
      { name: "JavaScript / TypeScript", level: "Advanced", percentage: 88, tag: "Full Stack" },
      { name: "C", level: "Proficient", percentage: 82, tag: "Core Systems" }
    ]
  },
  {
    title: "Backend Engineering",
    iconName: "Server",
    skills: [
      { name: "Node.js", level: "Advanced", percentage: 92, tag: "Runtime" },
      { name: "Express.js", level: "Advanced", percentage: 92, tag: "REST APIs" },
      { name: "RESTful API Architecture", level: "Expert", percentage: 94, tag: "Microservices" },
      { name: "Authentication & JWT", level: "Advanced", percentage: 88, tag: "Security" }
    ]
  },
  {
    title: "Frontend Development",
    iconName: "Layout",
    skills: [
      { name: "React.js", level: "Advanced", percentage: 90, tag: "MERN Stack" },
      { name: "Tailwind CSS", level: "Advanced", percentage: 88, tag: "Styling" },
      { name: "HTML5 & CSS3", level: "Expert", percentage: 92, tag: "Web" },
      { name: "State Management & Hooks", level: "Advanced", percentage: 88, tag: "React" }
    ]
  },
  {
    title: "Databases & Cloud",
    iconName: "Database",
    skills: [
      { name: "MySQL", level: "Advanced", percentage: 90, tag: "Relational" },
      { name: "PostgreSQL", level: "Advanced", percentage: 88, tag: "SQL" },
      { name: "MongoDB", level: "Advanced", percentage: 88, tag: "NoSQL / MERN" },
      { name: "AWS (Basics)", level: "Familiar", percentage: 70, tag: "Cloud" }
    ]
  },
  {
    title: "ML & Developer Tools",
    iconName: "BrainCircuit",
    skills: [
      { name: "Selenium (Web Scraping)", level: "Advanced", percentage: 86, tag: "Automation" },
      { name: "Data Preprocessing Concepts", level: "Advanced", percentage: 88, tag: "Data Science" },
      { name: "Git & GitHub", level: "Advanced", percentage: 92, tag: "Version Control" },
      { name: "Linux Basics", level: "Proficient", percentage: 80, tag: "OS & Shell" }
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "IIT Madras",
    degree: "B.S. in Data Science (Dual Degree)",
    focus: "Currently Diploma Level &bull; 85% in IIT Programming Exam",
    period: "Ongoing",
    details: [
      "Completed foundational level; currently pursuing Diploma coursework in Data Science and Machine Learning.",
      "Achieved 85% in the competitive IIT Programming Examination.",
      "Focus areas: Algorithmic thinking, data structures, data processing, statistical computing, and machine learning models."
    ],
    badges: ["IIT Madras", "Data Science", "85% Programming Exam", "Diploma Stage"]
  },
  {
    institution: "St. Joseph's College of Engineering",
    degree: "B.E. in Computer Science and Engineering",
    focus: "CGPA: 8.99",
    period: "2024 - 2028",
    details: [
      "Maintained an exceptional 8.99 CGPA across rigorous computer science curricula.",
      "Core coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Object Oriented Programming in Java, Computer Networks.",
      "Active participant in collegiate hackathons, competitive programming, and technical clubs."
    ],
    badges: ["B.E. Computer Science", "CGPA 8.99", "2024-2028", "Anna University Affiliated"]
  }
];

export const SUGGESTED_CHAT_QUERIES = [
  "Tell me about Apoorva's LinkedIn for Sports project",
  "What is Apoorva's experience at Astraalis & CodeProt?",
  "What are Apoorva's LeetCode & Skillrack achievements?",
  "Explain the Smart Blood Donation System architecture",
  "Show a Java / Python code snippet by Apoorva",
  "How can I contact Apoorva R?"
];
