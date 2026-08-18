import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Terminal,
  Phone,
  Database,
  Heart,
  Sparkles,
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData.ts";

interface FooterProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenChat }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          {/* Brand & Pitch */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Software Developer & Scalable Backend Engineer specializing in Node.js, Express, React,
              Java DSA (6000+ LeetCode points), and Machine Learning.
            </p>
            <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Express Backend Active &bull; Persistent DB Connected</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2.5">
              <div className="font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Navigation
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About & Achievements
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-white transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-white transition-colors">
                    Skills & Tech
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-white transition-colors">
                    Education
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="font-semibold text-slate-200 uppercase tracking-wider font-mono">
                Interactive
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button
                    onClick={onOpenChat}
                    className="hover:text-indigo-300 transition-colors text-left cursor-pointer"
                  >
                    Ask AI Assistant
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenResume}
                    className="hover:text-indigo-300 transition-colors text-left cursor-pointer"
                  >
                    View Official Resume
                  </button>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact Database
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials & Top Button */}
          <div className="md:col-span-3 space-y-4 md:text-right">
            <div className="flex md:justify-end gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors cursor-pointer"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Designed & Built for Apoorva R with React 19, Tailwind, Express & AI.
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Contact:</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              {PERSONAL_INFO.email}
            </a>
            <span>&bull;</span>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {PERSONAL_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
