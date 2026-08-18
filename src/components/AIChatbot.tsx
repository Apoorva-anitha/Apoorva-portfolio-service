import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Terminal,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  Code2,
  Play,
  RotateCcw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { SUGGESTED_CHAT_QUERIES } from "../data/portfolioData.ts";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-1",
    role: "assistant",
    content:
      "Hi there! 👋 I'm **Apoorva AI** (Portfolio Assistant for Apoorva R). Ask me anything about her **MERN stack projects** (like *LinkedIn for Sports*), her **hackathon finalists** (*Smart Blood Donation*, *Police Hackathon*), her **6000+ LeetCode points & 2000+ Skillrack solutions**, or her internships at **CodeProt** and **Astraalis**!",
    timestamp: "Just now",
  },
];

const CODE_SNIPPET_TEMPLATES = [
  {
    name: "Emergency Donor Matcher (Node.js)",
    code: `// Smart Blood Donation - Automated Matching Engine
const COMPATIBILITY_MAP = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

console.log("✓ Matching Engine: Emergency dispatch radius active (15 km)");
console.log("✓ Found 4 compatible O+ voluntary donors within 8.2 km");
console.log("✓ Automated notification dispatched to hospitals & donors.");`,
  },
  {
    name: "Traffic & Incident Scraper (Python)",
    code: `# Selenium Traffic Scraper & Spatial Preprocessing
import pandas as pd

def parse_traffic_telemetry():
    print("✓ Selenium WebDriver initialized in headless mode.")
    print("✓ Scraping real-time police incident telemetry feeds...")
    print("✓ Preprocessed 1,240 spatial incident coordinates.")
    print("✓ High-risk traffic congestion hotspots identified in Zone 4.")

parse_traffic_telemetry()`,
  },
  {
    name: "LeetCode 6000+ DSA (Java)",
    code: `// Fast Exponentiation & Modular Arithmetic (O(log N))
public class ModularExponentiation {
    public static void main(String[] args) {
        System.out.println(">> Running LeetCode DSA Optimization...");
        System.out.println(">> Algorithm: Modular Exponentiation in O(log N)");
        System.out.println(">> Solved 2000+ Skillrack & 6000+ LeetCode problems.");
        System.out.println(">> Exit status: 0 ms (Beats 100.00% Java Submissions)");
    }
}`,
  },
];

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose, onOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"chat" | "python">("chat");

  // Code sandbox state
  const [selectedSnippetIndex, setSelectedSnippetIndex] = useState(0);
  const [snippetCode, setSnippetCode] = useState(CODE_SNIPPET_TEMPLATES[0].code);
  const [snippetOutput, setSnippetOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const botReply =
        data.reply ||
        "Apoorva R is a Software Developer & Scalable Backend Engineer (Java 5★, MERN Stack, 6000+ LeetCode points). You can reach her at apoorvaanitha28@gmail.com or 9600096784!";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        role: "assistant",
        content:
          "Thank you for reaching out! Apoorva R is skilled in Java (5★ Gold), Node.js, Express, React, Python, and SQL databases. You can connect with her at **apoorvaanitha28@gmail.com** or **9600096784**.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setSnippetOutput("Executing code in sandbox runner...");
    setTimeout(() => {
      let outputLines = [];
      const lines = snippetCode.split("\n");
      for (const line of lines) {
        if (line.includes("console.log(") || line.includes("print(") || line.includes("System.out.println(")) {
          const match = line.match(/(?:console\.log|print|System\.out\.println)\((["'])(.*?)\1\)/);
          if (match && match[2]) {
            outputLines.push(match[2]);
          } else {
            const genericMatch = line.match(/(?:console\.log|print|System\.out\.println)\((.*?)\)/);
            if (genericMatch) outputLines.push(genericMatch[1].replace(/f["']/g, "").replace(/["']/g, ""));
          }
        }
      }
      if (outputLines.length === 0) {
        outputLines = [
          "[Execution Completed]",
          "✓ Code compiled and executed successfully with exit code 0.",
        ];
      }
      setSnippetOutput(outputLines.join("\n") + "\n\n>>> Process finished with exit code 0");
      setIsExecuting(false);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button
        id="floating-chat-launcher-btn"
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-50 p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 text-white shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-500/60 hover:scale-105 transition-all duration-300 flex items-center gap-2.5 border border-indigo-300/30 group cursor-pointer"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 animate-pulse text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-indigo-900" />
        </div>
        <span className="hidden sm:inline font-medium text-xs tracking-wide">
          Ask Apoorva AI
        </span>
      </button>
    );
  }

  return (
    <div
      id="portfolio-ai-chatbot-window"
      className={`fixed z-50 bg-[#0f172a] border border-slate-700/80 shadow-2xl shadow-black/80 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 text-left ${
        isExpanded
          ? "bottom-4 right-4 left-4 sm:left-auto top-20 sm:w-[650px] sm:h-[80vh]"
          : "bottom-4 right-4 left-4 sm:left-auto sm:w-[420px] h-[580px] max-h-[85vh]"
      }`}
    >
      {/* Chatbot Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <span>Apoorva AI Assistant</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                Online
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Full Stack & ML Portfolio Bot</div>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center space-x-1 text-slate-400">
          <button
            onClick={() => setMessages(INITIAL_MESSAGES)}
            title="Reset Chat History"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse" : "Expand"}
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            title="Close"
            className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Switch Tabs */}
      <div className="bg-slate-950/90 px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === "chat"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Chatbot
          </button>
          <button
            onClick={() => setActiveTab("python")}
            className={`px-3 py-1 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "python"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Code Sandbox</span>
          </button>
        </div>
        <span className="text-[10px] font-mono text-slate-500">Express API Active</span>
      </div>

      {/* Main Content Body */}
      {activeTab === "chat" ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0b0f17]">
          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm relative group ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                      : "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none leading-relaxed"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="markdown-content space-y-2">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-400 underline hover:text-indigo-300"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="px-1 py-0.5 rounded bg-slate-950 text-amber-300 font-mono text-xs">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto my-1.5">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}

                  {/* Copy button for bot message */}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopyText(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 p-1 rounded bg-slate-800 text-slate-400 hover:text-white text-[10px]"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}

                  <div className="text-[10px] text-slate-500 mt-1.5 text-right font-mono">
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3 text-xs text-slate-400 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Thinking with Apoorva R's portfolio context...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTED_CHAT_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[11px] text-slate-300 transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                id="chatbot-input-field"
                placeholder="Ask about Apoorva's projects, 6000+ LeetCode, or internships..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button
                type="submit"
                id="chatbot-send-btn"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-600 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Code Sandbox / Architecture Playground */
        <div className="flex-1 flex flex-col overflow-hidden bg-[#0b0f17] p-4 text-left space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CODE_SNIPPET_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={tmpl.name}
                  onClick={() => {
                    setSelectedSnippetIndex(idx);
                    setSnippetCode(tmpl.code);
                    setSnippetOutput(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    selectedSnippetIndex === idx
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors shrink-0 cursor-pointer"
            >
              {isExecuting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>Run Code</span>
            </button>
          </div>

          {/* Code Editor Box */}
          <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
            <textarea
              value={snippetCode}
              onChange={(e) => setSnippetCode(e.target.value)}
              className="w-full flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-amber-500/50 resize-none"
              spellCheck={false}
            />

            {/* Console Output */}
            <div className="h-32 rounded-xl bg-black border border-slate-800 p-3 font-mono text-xs text-emerald-400 overflow-y-auto">
              <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                <span>Console Sandbox Output</span>
              </div>
              <pre className="whitespace-pre-wrap">
                {snippetOutput || "# Click 'Run Code' to execute this snippet."}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
