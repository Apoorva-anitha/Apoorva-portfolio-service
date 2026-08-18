import fs from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  service?: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioStats {
  resumeDownloads: number;
  contactSubmissions: number;
  chatbotQueries: number;
  projectViews: number;
}

export interface DatabaseSchema {
  messages: ContactMessage[];
  stats: PortfolioStats;
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "portfolio_database.json");

// Default initial state
const defaultData: DatabaseSchema = {
  messages: [
    {
      id: "msg-demo-1",
      name: "Alex Rivera",
      email: "alex.tech@example.com",
      subject: "Exciting Full Stack / AI Opportunity",
      message: "Hi Apoorva! Saw your impressive RAG LangChain project with Pinecone and your C++ interpreter. We'd love to chat about an engineer opening on our team.",
      service: "Full-Time Role",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      read: true,
    },
    {
      id: "msg-demo-2",
      name: "Sarah Chen",
      email: "sarah.c@innovate.dev",
      subject: "Collaboration on Django & Next.js Project",
      message: "Hello Apoorva, loved your clean architecture in Polypinion! Would you be open for a short tech consult?",
      service: "Consulting / Contract",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      read: false,
    }
  ],
  stats: {
    resumeDownloads: 48,
    contactSubmissions: 26,
    chatbotQueries: 112,
    projectViews: 384,
  },
};

function ensureDbExists() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

export function readDb(): DatabaseSchema {
  ensureDbExists();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error("Error reading database file, using default data:", err);
    return defaultData;
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbExists();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to database file:", err);
  }
}

export function addMessage(entry: Omit<ContactMessage, "id" | "createdAt" | "read">): ContactMessage {
  const db = readDb();
  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...entry,
    createdAt: new Date().toISOString(),
    read: false,
  };
  db.messages.unshift(newMessage);
  db.stats.contactSubmissions += 1;
  writeDb(db);
  return newMessage;
}

export function getMessages(): ContactMessage[] {
  const db = readDb();
  return db.messages;
}

export function deleteMessage(id: string): boolean {
  const db = readDb();
  const index = db.messages.findIndex((m) => m.id === id);
  if (index === -1) return false;
  db.messages.splice(index, 1);
  writeDb(db);
  return true;
}

export function toggleMessageRead(id: string): ContactMessage | null {
  const db = readDb();
  const msg = db.messages.find((m) => m.id === id);
  if (!msg) return null;
  msg.read = !msg.read;
  writeDb(db);
  return msg;
}

export function incrementStat(key: keyof PortfolioStats): number {
  const db = readDb();
  if (typeof db.stats[key] === "number") {
    db.stats[key] += 1;
    writeDb(db);
    return db.stats[key];
  }
  return 0;
}

export function getStats(): PortfolioStats {
  const db = readDb();
  return db.stats;
}
