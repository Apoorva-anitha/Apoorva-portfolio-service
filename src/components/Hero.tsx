import React, { useState } from "react";
import {
  Code2,
  Terminal,
  FileText,
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Database,
  Server,
  Layers,
} from "lucide-react";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../data/portfolioData.ts";

interface HeroProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenChat }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<"dsa" | "backend" | "ml">("backend");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-900 bg-gradient-to-b from-[#0b0f17] via-[#0d131f] to-[#0b0f17]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & Credentials */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Status & Credential Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{PERSONAL_INFO.status}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>6000+ LeetCode Points &bull; 2000+ Skillrack</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-indigo-300/90 font-medium font-mono leading-relaxed">
                Software Developer | Scalable Backend Engineer | MERN Stack Developer | Java & DSA Problem Solver | ML Enthusiast
              </p>
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="text-lg font-bold text-amber-400 font-mono">6000+</div>
                <div className="text-[11px] text-slate-400">LeetCode Points</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="text-lg font-bold text-indigo-400 font-mono">2000+</div>
                <div className="text-[11px] text-slate-400">Skillrack Solved</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="text-lg font-bold text-emerald-400 font-mono">8.99</div>
                <div className="text-[11px] text-slate-400">CGPA (B.E. CSE)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <div className="text-lg font-bold text-sky-400 font-mono">IIT Madras</div>
                <div className="text-[11px] text-slate-400">B.S. Data Science</div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium text-sm transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View Full Resume</span>
              </button>

              <button
                onClick={onOpenChat}
                className="px-5 py-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 font-medium text-sm transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Ask AI Assistant</span>
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code & Architecture Terminal */}
          <div className="lg:col-span-5 text-left">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Window Bar */}
              <div className="px-4 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">apoorva-dev-workstation</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setActiveCodeTab("backend")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                      activeCodeTab === "backend"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    server.js
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("dsa")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                      activeCodeTab === "dsa"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    DSA.java
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("ml")}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                      activeCodeTab === "ml"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    scraper.py
                  </button>
                </div>
              </div>

              {/* Code Snippet Body */}
              <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed bg-[#0a0e17]">
                {activeCodeTab === "backend" && (
                  <pre>
                    <code>
                      <span className="text-slate-500">// Scalable Express Backend API & DB Route</span>
                      {"\n"}
                      <span className="text-purple-400">const</span> express ={" "}
                      <span className="text-sky-300">require</span>(
                      <span className="text-emerald-300">'express'</span>);
                      {"\n"}
                      <span className="text-purple-400">const</span> router = express.
                      <span className="text-yellow-300">Router</span>();
                      {"\n"}
                      <span className="text-purple-400">const</span> {"{"} matchDonors {"}"} ={" "}
                      <span className="text-sky-300">require</span>(
                      <span className="text-emerald-300">'../services/matcher'</span>);
                      {"\n\n"}
                      <span className="text-slate-500">// Emergency Donor Dispatch Endpoint</span>
                      {"\n"}
                      router.<span className="text-yellow-300">post</span>(
                      <span className="text-emerald-300">'/emergency/dispatch'</span>,{" "}
                      <span className="text-purple-400">async</span> (req, res) =&gt; {"{"}
                      {"\n"}  <span className="text-purple-400">const</span> {"{"} bloodGroup, lat, lng {"}"} = req.body;
                      {"\n"}  <span className="text-purple-400">const</span> nearby = <span className="text-purple-400">await</span> matchDonors(bloodGroup, lat, lng);
                      {"\n"}  <span className="text-purple-400">return</span> res.<span className="text-yellow-300">status</span>(200).<span className="text-yellow-300">json</span>({"{"}
                      {"\n"}    status: <span className="text-emerald-300">'DISPATCHED'</span>,
                      {"\n"}    eligibleCount: nearby.length
                      {"\n"}  {"}"});
                      {"\n"}{"}"});
                    </code>
                  </pre>
                )}

                {activeCodeTab === "dsa" && (
                  <pre>
                    <code>
                      <span className="text-slate-500">// 6000+ LeetCode DSA Optimization (Time: O(log N))</span>
                      {"\n"}
                      <span className="text-purple-400">public class</span>{" "}
                      <span className="text-yellow-300">OptimalSearch</span> {"{"}
                      {"\n"}  <span className="text-purple-400">public int</span>{" "}
                      <span className="text-yellow-300">findPeakElement</span>(<span className="text-purple-400">int</span>[] nums) {"{"}
                      {"\n"}    <span className="text-purple-400">int</span> low = 0, high = nums.length - 1;
                      {"\n"}    <span className="text-purple-400">while</span> (low &lt; high) {"{"}
                      {"\n"}      <span className="text-purple-400">int</span> mid = low + (high - low) / 2;
                      {"\n"}      <span className="text-purple-400">if</span> (nums[mid] &gt; nums[mid + 1]) high = mid;
                      {"\n"}      <span className="text-purple-400">else</span> low = mid + 1;
                      {"\n"}    {"}"}
                      {"\n"}    <span className="text-purple-400">return</span> low;
                      {"\n"}  {"}"}
                      {"\n"}{"}"}
                    </code>
                  </pre>
                )}

                {activeCodeTab === "ml" && (
                  <pre>
                    <code>
                      <span className="text-slate-500"># Selenium Web Scraping & Data Cleaning Pipeline</span>
                      {"\n"}
                      <span className="text-purple-400">from</span> selenium <span className="text-purple-400">import</span> webdriver
                      {"\n"}
                      <span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd
                      {"\n\n"}
                      <span className="text-purple-400">def</span> <span className="text-yellow-300">scrape_traffic_telemetry</span>(zone_url):
                      {"\n"}    driver = webdriver.Chrome(options=opts)
                      {"\n"}    driver.get(zone_url)
                      {"\n"}    raw_data = driver.find_elements(By.CLASS_NAME, <span className="text-emerald-300">"incident-log"</span>)
                      {"\n"}    df = pd.DataFrame([e.text <span className="text-purple-400">for</span> e <span className="text-purple-400">in</span> raw_data])
                      {"\n"}    <span className="text-purple-400">return</span> clean_and_normalize(df)
                    </code>
                  </pre>
                )}
              </div>

              {/* Status bar */}
              <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tests Passing: 100%</span>
                </span>
                <span className="text-indigo-400">HackerRank 5★ Java</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
