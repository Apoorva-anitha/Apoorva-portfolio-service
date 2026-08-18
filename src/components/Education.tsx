import React from "react";
import { GraduationCap, Award, MapPin, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { EDUCATION } from "../data/portfolioData.ts";

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-950/60 border-t border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Excellence & Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education & Academic Credentials
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Rigorous dual-track education in Computer Science and Data Science from premier institutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-lg space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
                    {edu.period}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                  <div className="text-sm font-semibold text-indigo-400 mt-0.5">{edu.degree}</div>
                  {edu.focus && (
                    <div className="text-xs text-emerald-400 font-mono mt-1">{edu.focus}</div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {edu.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                {edu.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
