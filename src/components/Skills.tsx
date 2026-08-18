import React from "react";
import {
  Code2,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  Sparkles,
} from "lucide-react";
import { SKILL_CATEGORIES } from "../data/portfolioData.ts";

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      case "Layout":
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case "Server":
        return <Server className="w-5 h-5 text-sky-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-amber-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      default:
        return <Wrench className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#0b0f17] border-t border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Technical Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Core programming languages, scalable backend frameworks, SQL/NoSQL databases, and ML
            telemetry tools in active use.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <h3 className="font-bold text-base text-white">{category.title}</h3>
                </div>

                {/* Skills list */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-200">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          {skill.tag && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                              {skill.tag}
                            </span>
                          )}
                          <span className="font-mono text-slate-400 text-[11px]">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                      {/* Bar indicator */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
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
