import React, { useState } from "react";
import {
  Code2,
  ExternalLink,
  Github,
  FolderGit2,
  Sparkles,
  Layers,
  CheckCircle2,
  X,
  Database,
  Terminal,
  Trophy,
} from "lucide-react";
import { PROJECTS } from "../data/portfolioData.ts";
import { Project } from "../types.ts";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#0b0f17] border-t border-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Hackathons & Production Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Production-style systems, hackathon finalists, and scalable platforms engineered with
            the MERN Stack, Python, and SQL databases.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:-translate-y-1"
            >
              {/* Card Header & Badge */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    <Code2 className="w-6 h-6" />
                  </div>
                  {project.badge && (
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
                      <Trophy className="w-3 h-3 text-amber-400" />
                      <span>{project.badge}</span>
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-indigo-400">{project.subtitle}</div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Highlights preview */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {project.highlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech Stack & Modal Trigger */}
              <div className="p-6 sm:p-7 pt-0 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-500 border border-slate-800">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>System Architecture & Code</span>
                    <span>&rarr;</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <div
          id="project-detail-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            id="project-detail-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                  {selectedProject.badge && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                      {selectedProject.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-indigo-400">
                  {selectedProject.subtitle}
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-left">
              {/* Detailed narrative */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Overview & Engineering Architecture
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Key Technical Highlights & Outcomes
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 text-indigo-300 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code Snippet Box */}
              {selectedProject.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{selectedProject.codeSnippet.filename}</span>
                    </span>
                    <span className="text-slate-500 uppercase">
                      {selectedProject.codeSnippet.language}
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                    <pre className="whitespace-pre">
                      <code>{selectedProject.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-500">
                Apoorva R &bull; {selectedProject.title}
              </div>
              <div className="flex items-center gap-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
