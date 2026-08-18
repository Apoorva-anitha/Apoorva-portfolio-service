import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Github,
  Phone,
  Clock,
  Sparkles,
  Database,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "../data/portfolioData.ts";
import { StoredContactMessage } from "../types.ts";

interface ContactSectionProps {
  onOpenMessagesViewer: () => void;
  onMessageSent?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenMessagesViewer,
  onMessageSent,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service: "Software Engineering Role (Full-Time / Intern)",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSavedMessage, setLastSavedMessage] = useState<StoredContactMessage | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message to the backend database.");
      }

      setStatus("success");
      setLastSavedMessage(data.data);
      setFormData({
        name: "",
        email: "",
        subject: "",
        service: "Software Engineering Role (Full-Time / Intern)",
        message: "",
      });

      // Confetti burst
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
      });

      if (onMessageSent) {
        onMessageSent();
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please reach out via email or phone directly.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0b0f17] relative border-t border-slate-900 text-left">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono text-indigo-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Backend Database Integration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in discussing software engineering opportunities, backend development roles,
            or project collaborations? Send a note directly to my backend database.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Database Status */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Contact Details</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  I am actively seeking software development & backend engineering roles. Reach out
                  directly via email, phone, or LinkedIn!
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400">Direct Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400">Phone Contact</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400">Status & Availability</div>
                    <div className="text-sm font-semibold text-white">
                      Open for Full-time Roles, Internships & Collaborations
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Backend Database Live Status Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-300 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Node.js / Express DB Storage</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Submissions via this form are persistently logged into the server database. Recruiter
                and visitor messages can be audited using the submission inspector.
              </p>
              <button
                type="button"
                id="view-inbox-database-btn"
                onClick={onOpenMessagesViewer}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-emerald-300 hover:text-emerald-200 transition-colors flex items-center justify-center gap-2"
              >
                <Database className="w-3.5 h-3.5" />
                <span>View Database Inbound Logs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-5" id="portfolio-contact-form">
                {/* Form Status Messages */}
                {status === "success" && (
                  <div
                    id="contact-success-banner"
                    className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-start gap-3 text-emerald-300 text-sm animate-in fade-in"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-200">
                        Message Sent & Database Record Saved!
                      </div>
                      <div className="text-xs text-emerald-300/80 mt-1">
                        Thank you for reaching out! Your message was written to the server database
                        (Record ID: {lastSavedMessage?.id || "saved"}).
                      </div>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div
                    id="contact-error-banner"
                    className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-start gap-3 text-rose-300 text-sm animate-in fade-in"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-rose-200">Submission Error</div>
                      <div className="text-xs text-rose-300/80 mt-1">{errorMessage}</div>
                    </div>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono"
                    >
                      Your Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      required
                      placeholder="e.g. Rahul Sharma / Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono"
                    >
                      Email Address <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Role / Inquiry Category & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono"
                    >
                      Inquiry Category
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    >
                      <option value="Software Engineering Role (Full-Time / Intern)">
                        Software Engineer (Full-Time / Intern)
                      </option>
                      <option value="Backend Developer (Node / Express / SQL)">
                        Backend Developer (Node.js / Express / SQL)
                      </option>
                      <option value="MERN Stack Web Project">MERN Stack Web Project</option>
                      <option value="Machine Learning & Data Preprocessing">
                        ML & Data Preprocessing
                      </option>
                      <option value="Networking & Tech Discussion">
                        Tech Networking & Mentorship
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono"
                    >
                      Subject Line
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      placeholder="e.g. SDE Backend Role at TechCorp"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono"
                  >
                    Your Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Hi Apoorva, we reviewed your profile and projects (LinkedIn for Sports / Smart Blood Donation) and would love to connect..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>POST /api/contact &bull; Persistent DB</span>
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/60 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Writing to Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
