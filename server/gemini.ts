import { GoogleGenAI } from "@google/genai";

const APOORVA_PORTFOLIO_SYSTEM_PROMPT = `You are "Apoorva AI" (also known as PyBot / Apoorva R's Intelligent Portfolio Assistant), an interactive, knowledgeable, and responsive representative for Apoorva R.

ABOUT APOORVA R:
- Title: Software Developer | Scalable Backend Engineer | MERN Stack Developer | Java & DSA Problem Solver | ML Enthusiast
- Contact: Phone: 9600096784 | Email: apoorvaanitha28@gmail.com
- LinkedIn: https://linkedin.com/in/apoorva-anitha
- GitHub: https://github.com/apoorva-anitha
- Professional Summary: Driven Software Developer with strong expertise in backend engineering, scalable architecture design, and data-driven problem solving. Achieved 6000+ LeetCode points and solved 2000+ Skillrack problems, demonstrating exceptional algorithmic and logical strength. Experienced in real-world development through internships, hackathons, and production-style projects. Passionate about building efficient systems, optimizing performance, and developing impactful software solutions.

TECHNICAL SKILLS:
- Languages: Java (5★ on HackerRank), Python (3★ on HackerRank), C, JavaScript
- Frontend: React.js, Tailwind CSS, HTML5/CSS3
- Backend: Node.js, Express.js, REST APIs, Authentication (JWT), Microservices
- Databases: MySQL, PostgreSQL, MongoDB (MERN Stack)
- Machine Learning & Data: Web scraping using Selenium, data preprocessing concepts, Pandas, NumPy
- Tools & Cloud: Git, GitHub, Linux Basics, AWS (Basics)

PROFESSIONAL EXPERIENCE:
1. Machine Learning Backend Intern — Astraalis (July - December 2025)
   - Worked on backend integration tasks for ML-based systems.
   - Focused on data handling and scalable service architecture.
   - Improved system reliability and backend efficiency.
2. Backend Developer Intern — CodeProt (January 2026 – March 2026)
   - Worked on backend development for a Learning Management System (LMS).
   - Developed APIs and backend functionalities for student and course management.
   - Collaborated with developers to improve scalability and system performance.
   - Worked with database integration and authentication modules.
3. Web Development Intern — DBaaS Company (July 2025)
   - Built and customized web applications.
   - Implemented backend logic and API integrations.
   - Delivered client-ready features in collaborative development cycles.

EDUCATION:
1. B.S. in Data Science (Dual Degree) — IIT Madras
   - Completed foundation level; currently in Diploma stage.
   - Scored 85% in IIT Programming Exam.
2. B.E. in Computer Science — St. Joseph's College of Engineering (2024 - 2028)
   - CGPA: 8.99

KEY ACHIEVEMENTS:
- 6000+ LeetCode points with long-term coding consistency.
- 2000+ Skillrack problems solved.
- Ranked 17th — CODEFEST 2025.
- HackerRank Badges: Java (5★ Gold), Python (3★).
- Strong optimization mindset focused on time & space complexity.

FEATURED PROJECTS:
1. LinkedIn for Sports (Smart India Hackathon — Internal Round Qualified):
   - Networking platform for athletes to create verified profiles, showcase achievements, and connect with scouts and sponsors. Built with MERN Stack (React, Node.js, Express.js, MongoDB).
2. Smart Blood Donation System (HackArena Finalist):
   - Automated donor-recipient matching system with proximity & blood compatibility dispatch logic, improving emergency response speed and blood inventory dispatch.
3. Crime & Traffic Hotspot Detection (Police Hackathon Top 100):
   - Analytical system for identifying crime & traffic hotspot clusters using Selenium web scraping, spatial clustering, and Python preprocessing.

YOUR ROLE & TONE:
- Be professional, polite, enthusiastic, concise, and helpful.
- When asked about Python or Java code, provide clean, idiomatic snippets.
- Direct recruiters or collaborators to her email (apoorvaanitha28@gmail.com) or phone (9600096784) and the on-page contact form.
- Use markdown formatting with clear headings, bullet points, and code blocks.`;

let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

export async function generateChatReply(
  userMessage: string,
  history: ChatMessage[] = []
): Promise<string> {
  const ai = getAi();

  if (!ai) {
    const lower = userMessage.toLowerCase();
    if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("phone")) {
      return `You can reach **Apoorva R** directly at:\n- 📧 **Email:** [apoorvaanitha28@gmail.com](mailto:apoorvaanitha28@gmail.com)\n- 📞 **Phone:** 9600096784\n- 💼 **LinkedIn:** [linkedin.com/in/apoorva-anitha](https://linkedin.com/in/apoorva-anitha)\n- 🐙 **GitHub:** [github.com/apoorva-anitha](https://github.com/apoorva-anitha)\n\nYou can also submit a message via the database contact form on this page!`;
    }
    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack") || lower.includes("java")) {
      return `**Apoorva R's Technical Stack:**\n- **Languages:** Java (5★ on HackerRank), Python (3★), C, JavaScript\n- **Frontend:** React.js, Tailwind CSS, HTML5/CSS3\n- **Backend:** Node.js, Express.js, REST APIs, JWT Authentication\n- **Databases:** MySQL, PostgreSQL, MongoDB (MERN Stack)\n- **ML & Data:** Selenium Web Scraping, Data Preprocessing\n- **Tools:** Git, GitHub, Linux Basics, AWS (Basics)`;
    }
    if (lower.includes("leetcode") || lower.includes("skillrack") || lower.includes("dsa") || lower.includes("achievement")) {
      return `**Key Achievements of Apoorva R:**\n- 🏆 **6000+ LeetCode Points** with rigorous consistency in Data Structures & Algorithms\n- 💡 **2000+ Skillrack problems** solved\n- 🎖️ **Ranked 17th** at CODEFEST 2025\n- ⭐ **HackerRank:** Java (5★ Gold), Python (3★)\n- 🎓 **85%** in IIT Madras Programming Exam & **8.99 CGPA** in B.E. Computer Science`;
    }
    if (lower.includes("experience") || lower.includes("intern") || lower.includes("astraalis") || lower.includes("codeprot")) {
      return `**Apoorva's Internship Experience:**\n1. **Backend Developer Intern — CodeProt** (Jan 2026 – Mar 2026): Developed APIs for a Learning Management System (LMS), student/course management, and authentication modules.\n2. **Machine Learning Backend Intern — Astraalis** (Jul – Dec 2025): Integrated ML backend services, scalable data pipelines, and system reliability.\n3. **Web Development Intern — DBaaS Company** (Jul 2025): Built web features, API integrations, and backend business logic.`;
    }
    if (lower.includes("project") || lower.includes("sport") || lower.includes("blood") || lower.includes("crime")) {
      return `**Featured Projects:**\n1. **LinkedIn for Sports** (SIH Internal Qualified): MERN stack athlete social platform connecting players with scouts.\n2. **Smart Blood Donation System** (HackArena Finalist): Automated proximity and ABO/Rh compatibility matching engine for emergency responses.\n3. **Crime & Traffic Hotspot Detection** (Police Hackathon Top 100): Selenium scraping & spatial clustering system for incident forecasting.`;
    }
    return `Hi! I'm Apoorva R's AI Assistant. Apoorva is a Software Developer specializing in Scalable Backend Engineering (Node.js/Express), MERN Stack, Java/DSA (6000+ LeetCode points), and Machine Learning. Feel free to ask about her internships at Astraalis & CodeProt, her hackathon projects, or her education at IIT Madras & St. Joseph's!`;
  }

  try {
    const contents: Array<{ role?: string; parts: Array<{ text: string }> }> = [];

    const recentHistory = history.slice(-6);
    for (const item of recentHistory) {
      contents.push({
        role: item.role === "assistant" || item.role === "model" ? "model" : "user",
        parts: [{ text: item.content }],
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction: APOORVA_PORTFOLIO_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "Thank you for inquiring! You can contact Apoorva R directly at apoorvaanitha28@gmail.com or 9600096784.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Thank you for asking! Apoorva R is a Software Developer skilled in Node.js, Express, React, Java DSA (6000+ LeetCode points), and ML systems. Reach her directly at apoorvaanitha28@gmail.com or 9600096784.";
  }
}
