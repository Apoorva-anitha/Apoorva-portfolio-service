import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  addMessage,
  getMessages,
  deleteMessage,
  toggleMessageRead,
  incrementStat,
  getStats,
} from "./server/db.ts";
import { generateChatReply } from "./server/gemini.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "Apoorva Portfolio Backend API",
    });
  });

  // Contact form submission -> saves to database
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message, service } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          error: "Name, email, and message are required fields.",
        });
      }

      // Basic email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Please provide a valid email address.",
        });
      }

      const savedMessage = addMessage({
        name: String(name).trim(),
        email: String(email).trim(),
        subject: subject ? String(subject).trim() : "Portfolio Contact Submission",
        message: String(message).trim(),
        service: service ? String(service).trim() : "General Inquiry",
      });

      console.log(`[DB] New contact message recorded from: ${savedMessage.email}`);

      return res.status(201).json({
        success: true,
        message: "Your message has been delivered and stored successfully!",
        data: savedMessage,
      });
    } catch (err: any) {
      console.error("Error saving contact message:", err);
      return res.status(500).json({
        error: "Internal server error while processing your message.",
      });
    }
  });

  // Get all contact messages stored in database (for interactive visitor messages & admin view)
  app.get("/api/contact/messages", (_req, res) => {
    try {
      const messages = getMessages();
      return res.json({
        success: true,
        count: messages.length,
        messages,
      });
    } catch (err: any) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Failed to retrieve messages." });
    }
  });

  // Toggle read status of a message
  app.patch("/api/contact/messages/:id/read", (req, res) => {
    try {
      const { id } = req.params;
      const updated = toggleMessageRead(id);
      if (!updated) {
        return res.status(404).json({ error: "Message not found." });
      }
      return res.json({ success: true, message: updated });
    } catch (err: any) {
      console.error("Error updating message status:", err);
      return res.status(500).json({ error: "Failed to update message status." });
    }
  });

  // Delete message
  app.delete("/api/contact/messages/:id", (req, res) => {
    try {
      const { id } = req.params;
      const deleted = deleteMessage(id);
      if (!deleted) {
        return res.status(404).json({ error: "Message not found." });
      }
      return res.json({ success: true, message: "Message deleted from database." });
    } catch (err: any) {
      console.error("Error deleting message:", err);
      return res.status(500).json({ error: "Failed to delete message." });
    }
  });

  // AI Chatbot endpoint (Gemini API with Python & Portfolio intelligence)
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message string is required." });
      }

      incrementStat("chatbotQueries");
      const reply = await generateChatReply(message, history || []);

      return res.json({
        success: true,
        reply,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error in chat endpoint:", err);
      return res.status(500).json({
        error: "Failed to generate chat response.",
        fallback: "Feel free to connect with Apoorva at apoorvaanitha28@gmail.com!",
      });
    }
  });

  // Track analytics (resume download, project views)
  app.post("/api/track/:stat", (req, res) => {
    try {
      const { stat } = req.params;
      if (
        stat === "resumeDownloads" ||
        stat === "projectViews" ||
        stat === "contactSubmissions" ||
        stat === "chatbotQueries"
      ) {
        const newValue = incrementStat(stat);
        return res.json({ success: true, stat, value: newValue });
      }
      return res.status(400).json({ error: "Invalid statistic key." });
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to increment stat." });
    }
  });

  // Get portfolio stats
  app.get("/api/stats", (_req, res) => {
    try {
      const stats = getStats();
      return res.json({ success: true, stats });
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to fetch stats." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Apoorva Portfolio Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
});
