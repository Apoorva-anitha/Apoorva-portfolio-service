import React, { useState, useEffect } from "react";
import {
  Database,
  X,
  RefreshCw,
  Mail,
  Calendar,
  Trash2,
  CheckCircle,
  Clock,
  Search,
  Check,
} from "lucide-react";
import { StoredContactMessage } from "../types.ts";

interface MessagesViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagesViewerModal: React.FC<MessagesViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<StoredContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<StoredContactMessage | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact/messages");
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
        if (!selectedMessage && data.messages.length > 0) {
          setSelectedMessage(data.messages[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const handleToggleRead = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const res = await fetch(`/api/contact/messages/${id}/read`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, read: !prev.read } : null));
        }
      }
    } catch (err) {
      console.error("Failed to toggle read state:", err);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const res = await fetch(`/api/contact/messages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(messages.find((m) => m.id !== id) || null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  if (!isOpen) return null;

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      id="messages-viewer-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="messages-viewer-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-5xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight flex items-center gap-2">
                <span>Inbound Submissions & Database Log</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {messages.length} Records
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Persistent storage stored via Node / Express backend
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              disabled={isLoading}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Refresh database entries"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split view with list and detail */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-[#0b0f17]">
          {/* Left Column: Messages List */}
          <div className="md:col-span-5 border-r border-slate-800 flex flex-col h-full overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-slate-800 bg-slate-950/60">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inbound messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs font-mono">
                  No submissions match your query.
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      selectedMessage?.id === msg.id
                        ? "bg-indigo-950/50 border-l-2 border-indigo-500"
                        : "hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-xs text-white truncate">{msg.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {new Date(msg.createdAt).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium truncate mb-1">
                      {msg.subject || "(No Subject)"}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{msg.message}</div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/40">
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-1.5 py-0.2 rounded">
                        {msg.service || "General"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handleToggleRead(msg.id, e)}
                          title={msg.read ? "Mark as unread" : "Mark as read"}
                          className="p-1 rounded text-slate-500 hover:text-emerald-400 transition-colors"
                        >
                          <Check className={`w-3 h-3 ${msg.read ? "text-emerald-400" : ""}`} />
                        </button>
                        <button
                          onClick={(e) => handleDelete(msg.id, e)}
                          title="Delete message"
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Selected Message Detail */}
          <div className="md:col-span-7 flex flex-col h-full bg-[#0f172a] p-6 overflow-y-auto">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">{selectedMessage.subject}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="text-emerald-400 font-semibold">{selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                      <span>&bull;</span>
                      <span className="text-slate-500">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedMessage.id)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedMessage.read ? "Read" : "Mark Read"}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-xs font-mono text-rose-300 border border-rose-500/30 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-indigo-300">
                    Category: {selectedMessage.service || "General Inquiry"}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                    Record ID: {selectedMessage.id}
                  </span>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                    Message Content
                  </div>
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Direct Reply Link */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                      selectedMessage.subject || "Your message to Apoorva Parajuli"
                    )}`}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reply via Email ({selectedMessage.email})</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 space-y-2">
                <Database className="w-8 h-8 text-slate-600" />
                <p className="text-xs font-mono">Select a message to view the full details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
