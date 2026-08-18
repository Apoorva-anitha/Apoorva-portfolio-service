import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.tsx";
import { Hero } from "./components/Hero.tsx";
import { About } from "./components/About.tsx";
import { Experience } from "./components/Experience.tsx";
import { Projects } from "./components/Projects.tsx";
import { Skills } from "./components/Skills.tsx";
import { Education } from "./components/Education.tsx";
import { ContactSection } from "./components/ContactSection.tsx";
import { AIChatbot } from "./components/AIChatbot.tsx";
import { ResumeModal } from "./components/ResumeModal.tsx";
import { MessagesViewerModal } from "./components/MessagesViewerModal.tsx";
import { Footer } from "./components/Footer.tsx";

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messagesViewerOpen, setMessagesViewerOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    // Check backend health on initial load
    fetch("/api/health")
      .then((res) => {
        if (res.ok) setServerStatus("online");
        else setServerStatus("offline");
      })
      .catch(() => setServerStatus("offline"));

    // Track project view in database analytics
    fetch("/api/track/projectViews", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-200 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenChat={() => setChatOpen(true)}
        onOpenMessagesViewer={() => setMessagesViewerOpen(true)}
        serverStatus={serverStatus}
      />

      {/* Main Page Content */}
      <main id="main-content">
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenChat={() => setChatOpen(true)}
        />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <ContactSection
          onOpenMessagesViewer={() => setMessagesViewerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setResumeOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* Interactive Modals and AI Floating Assistant */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <MessagesViewerModal
        isOpen={messagesViewerOpen}
        onClose={() => setMessagesViewerOpen(false)}
      />

      <AIChatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpen={() => setChatOpen(true)}
      />
    </div>
  );
}
