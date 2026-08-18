import React, { useState } from "react";
import {
  X,
  Download,
  Printer,
  Mail,
  Linkedin,
  Github,
  Phone,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, EDUCATION, ACHIEVEMENTS, SKILL_CATEGORIES } from "../data/portfolioData.ts";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await fetch("/api/track/resumeDownloads", { method: "POST" });
    } catch (e) {
      console.warn("Analytics ping failed:", e);
    }

    // Generate formatted markdown / text resume download matching the PDF verbatim
    const resumeText = `========================================================================
                               APOORVA R
 SOFTWARE DEVELOPER | SCALABLE BACKEND ENGINEER | MERN STACK DEVELOPER
              JAVA & DSA PROBLEM SOLVER | ML ENTHUSIAST
========================================================================
Contact: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

PROFESSIONAL SUMMARY
------------------------------------------------------------------------
${PERSONAL_INFO.bio}

TECHNICAL SKILLS
------------------------------------------------------------------------
Languages: Java, Python, C, JavaScript
Frontend: React.js
Backend: Node.js, Express.js, REST APIs
Databases: MySQL, PostgreSQL, MongoDB
Machine Learning Exposure: Web scraping using Selenium, data preprocessing concepts
Tools: Git, GitHub, Linux Basics, AWS (Basics)

PROFESSIONAL EXPERIENCE
------------------------------------------------------------------------
${EXPERIENCES.map(
  (exp) => `
* ${exp.role} — ${exp.company} (${exp.period})
${exp.description.map((d) => `  - ${d}`).join("\n")}
  Technologies: ${exp.skills.join(", ")}
`
).join("\n")}

EDUCATION
------------------------------------------------------------------------
* B.S. Data Science (Dual Degree) — IIT Madras
  Completed foundation level Currently Diploma | 85% in IIT Programming Exam

* B.E. Computer Science — St. Joseph's College of Engineering (2024 - 2028)
  CGPA: 8.99

ACHIEVEMENTS
------------------------------------------------------------------------
* 6000+ LeetCode points with long-term coding consistency
* 2000+ Skillrack problems solved
* Ranked 17th — CODEFEST 2025
* HackerRank — Java (5★), Python (3★)
* Strong optimization mindset focused on time & space complexity

PROJECTS
------------------------------------------------------------------------
* LinkedIn for Sports (Smart India Hackathon — Internal Round Qualified)
  Developed a networking platform for athletes to create profiles, showcase achievements, and connect with scouts.

* Smart Blood Donation System — HackArena Finalist
  Built an automated donor-recipient matching system improving emergency response speed and accuracy.

* Crime & Traffic Hotspot Detection — Police Hackathon Top 100
  Analytical system for identifying crime and traffic hotspot clusters to assist rapid response and urban resource allocation.
`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Apoorva_R_Resume_${new Date().getFullYear()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto text-left"
      onClick={onClose}
    >
      <div
        id="resume-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Toolbar Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {PERSONAL_INFO.name} &mdash; Official Resume
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Software Developer & Scalable Backend Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              id="download-resume-btn"
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-7 bg-slate-950 text-slate-200 font-sans text-sm leading-relaxed">
          {/* Header */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <div className="text-xs sm:text-sm font-semibold text-indigo-400 font-mono tracking-wide">
              {PERSONAL_INFO.tagline}
            </div>

            <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                {PERSONAL_INFO.phone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-indigo-400" />
                {PERSONAL_INFO.email}
              </span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-300 underline"
              >
                linkedin.com/in/apoorva-anitha
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-300 underline"
              >
                github.com/apoorva-anitha
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <strong className="text-white">Languages:</strong> Java, Python, C, JavaScript
              </div>
              <div>
                <strong className="text-white">Frontend:</strong> React.js
              </div>
              <div>
                <strong className="text-white">Backend:</strong> Node.js, Express.js, REST APIs
              </div>
              <div>
                <strong className="text-white">Databases:</strong> MySQL, PostgreSQL, MongoDB
              </div>
              <div>
                <strong className="text-white">Machine Learning Exposure:</strong> Web scraping using
                Selenium, data preprocessing concepts
              </div>
              <div>
                <strong className="text-white">Tools:</strong> Git, GitHub, Linux Basics, AWS (Basics)
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              Professional Experience
            </h2>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-white">{exp.role}</span> &mdash;{" "}
                    <span className="text-indigo-400 font-semibold">{exp.company}</span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">{exp.period}</span>
                </div>
                <ul className="space-y-1 pt-1">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">&bull;</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              Education
            </h2>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-0.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-white">{edu.degree} &mdash; {edu.institution}</span>
                  <span className="font-mono text-slate-500">{edu.period}</span>
                </div>
                {edu.focus && <div className="text-emerald-400 font-mono">{edu.focus}</div>}
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              Achievements
            </h2>
            <ul className="space-y-1 text-xs text-slate-300">
              {ACHIEVEMENTS.map((ach, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">&bull;</span>
                  <span>
                    <strong className="text-white">{ach.title}:</strong> {ach.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-indigo-400 border-b border-slate-800 pb-1">
              Key Projects
            </h2>
            {PROJECTS.map((project) => (
              <div key={project.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div className="font-bold text-white">
                    {project.title} &mdash;{" "}
                    <span className="text-indigo-400 font-normal">{project.period}</span>
                  </div>
                </div>
                <p className="text-slate-300">{project.description}</p>
                <div className="text-[11px] font-mono text-slate-400">
                  <strong className="text-slate-300">Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
