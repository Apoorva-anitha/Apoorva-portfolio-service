import React from "react";
import {
  BrainCircuit,
  Server,
  Flame,
  Award,
  Trophy,
  Star,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Code2,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../data/portfolioData.ts";

export const About: React.FC = () => {
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-5 h-5 text-amber-400" />;
      case "Award":
        return <Award className="w-5 h-5 text-indigo-400" />;
      case "Trophy":
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case "Star":
        return <Star className="w-5 h-5 text-emerald-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-slate-950/60 border-t border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Profile & Problem Solving</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me & Algorithmic Excellence
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Combining rigorous computer science fundamentals, extensive competitive problem-solving
            stamina, and production backend development experience.
          </p>
        </div>

        {/* Top 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Narrative Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-lg">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <span>Driven Software Developer</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Currently pursuing a dual degree: <strong>B.S. in Data Science</strong> at{" "}
                <span className="text-indigo-300 font-semibold">IIT Madras</span> (Diploma stage, 85% Programming Exam) and{" "}
                <strong>B.E. in Computer Science</strong> at{" "}
                <span className="text-emerald-300 font-semibold">St. Joseph's College of Engineering</span> (CGPA 8.99).
              </p>

              {/* Core Strengths Bullet Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Scalable Backend APIs (Node.js, Express, REST)</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>MERN Full Stack Web Development (React.js, MongoDB)</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Deep DSA Mastery (Java 5★, 6000+ LeetCode points)</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Data Preprocessing & Selenium Web Scraping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Focus Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Algorithmic & Logical Rigor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Proven long-term consistency with 6000+ LeetCode points and 2000+ Skillrack problems solved, focusing strictly on time & space complexity optimization.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Scalable Backend Engineering</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-world internship experience at CodeProt (LMS APIs) and Astraalis (ML backend integrations), designing robust services and database schemas.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Machine Learning & Automation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Building automated data ingestion pipelines using Selenium, Pandas, and coordinate clustering for hackathon-winning applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Achievements Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>Key Achievements & Milestones</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Competitive Highlights</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      {getAchievementIcon(item.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30">
                      {item.metric}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
