import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles, Server } from "lucide-react";
import { EXPERIENCES } from "../data/portfolioData.ts";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-slate-950/60 border-t border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Work Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Internships & Engineering Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world development experience spanning Machine Learning backend systems, Learning
            Management System (LMS) APIs, and scalable web architecture.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Vertical timeline rule */}
          <div className="hidden sm:block absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-800" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative sm:pl-12 group">
              {/* Timeline marker */}
              <div className="hidden sm:flex absolute left-0 top-1.5 w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500/40 items-center justify-center group-hover:border-indigo-400 group-hover:scale-110 transition-all shadow-md">
                <div className="w-3 h-3 rounded-full bg-indigo-400" />
              </div>

              {/* Content Card */}
              <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 hover:border-indigo-500/40 transition-all shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-indigo-400">{exp.company}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-950 text-indigo-300 border border-slate-800">
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-2.5 pt-1">
                  {exp.description.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
