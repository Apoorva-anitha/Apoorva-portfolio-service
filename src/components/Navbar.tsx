import React, { useState } from "react";
import {
  Code2,
  Terminal,
  FileText,
  MessageSquare,
  Sparkles,
  Menu,
  X,
  Database,
  Phone,
  Mail,
  Award,
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData.ts";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
  onOpenMessagesViewer: () => void;
  serverStatus: "checking" | "online" | "offline";
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenChat,
  onOpenMessagesViewer,
  serverStatus,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center space-x-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-bold text-white text-base tracking-tight group-hover:text-indigo-300 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    serverStatus === "online"
                      ? "bg-emerald-400 animate-pulse"
                      : serverStatus === "checking"
                      ? "bg-amber-400"
                      : "bg-rose-400"
                  }`}
                />
                <span className="hidden sm:inline">
                  {serverStatus === "online" ? "Backend API & DB Connected" : "Local Dev"}
                </span>
                <span className="sm:hidden">API Active</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-indigo-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Direct Phone / Contact Badge */}
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5"
              title="Call Apoorva R"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            {/* Inbound Submissions Viewer */}
            <button
              onClick={onOpenMessagesViewer}
              id="nav-db-inbox-btn"
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 hover:bg-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
              title="View Inbound Database Submissions"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden md:inline">DB Records</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenChat}
              id="nav-ai-chat-btn"
              className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-xs font-medium text-indigo-300 hover:text-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Chat</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              id="nav-resume-btn"
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-sm shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-1.5 rounded-lg bg-indigo-600 text-white text-xs"
              title="View Resume"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 text-left">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs font-medium text-indigo-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Ask Apoorva AI Assistant</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMessagesViewer();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4" />
              <span>Inbound Database Submissions</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
