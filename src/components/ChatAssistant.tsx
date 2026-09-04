import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageSquare, Send, X, Minimize2, Maximize2, Sparkles, RefreshCw, AlertCircle, ShieldAlert, Bot, User } from "lucide-react";
import { Language, ChatMessage } from "../types";
import { translations, QUICK_PROMPTS } from "../data/translations";

interface ChatAssistantProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  currentLang,
  isOpen,
  onClose,
  initialQuery,
  onClearInitialQuery,
}) => {
  const t = translations[currentLang].chat;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize initial greeting when language changes or messages are empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome-msg",
          role: "assistant",
          content: t.greeting,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, [currentLang]);

  // Handle incoming initial query triggered from outside (e.g. hero CTA or section buttons)
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
      onClearInitialQuery?.();
    }
  }, [initialQuery]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputValue).trim();
    if (!textToSend || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Append user message immediately
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!customText) setInputValue("");
    setIsLoading(true);

    try {
      // Call server-side proxy route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: textToSend,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            text: m.content,
          })),
          language: currentLang,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Server proxy error");
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || (currentLang === "fr" ? "Désolé, aucune réponse générée." : "I'm sorry, no response was generated."),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Chat assistant request failed:", err);
      const isFr = currentLang === "fr";
      const fallbackError = isFr
        ? (err.message || "Erreur de connexion au serveur proxy. Veuillez réessayer.")
        : (err.message || "Failed to reach the server proxy. Please try again.");
      
      setErrorMsg(fallbackError);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: isFr
            ? `⚠️ **Erreur** : ${fallbackError}`
            : `⚠️ **Notice** : ${fallbackError}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOffTopicWarning: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: "assistant",
        content: t.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setErrorMsg(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-200 flex flex-col bg-white shadow-2xl border border-slate-300 rounded-2xl overflow-hidden ${
        isExpanded
          ? "bottom-4 right-4 left-4 sm:left-auto sm:w-[650px] h-[85vh]"
          : "bottom-4 right-4 left-4 sm:left-auto sm:w-[420px] h-[580px] max-h-[90vh]"
      }`}
      role="dialog"
      aria-label={t.title}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white px-4 py-3 flex items-center justify-between shadow-xs select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-amber-300">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold tracking-tight">
                {t.title}
              </h2>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold">
                Gemini
              </span>
            </div>
            <p className="text-[11px] text-blue-200 font-normal">
              {t.badge}
            </p>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1 text-slate-300">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            title={t.clear}
            aria-label="Reset chat conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors hidden sm:block"
            title={isExpanded ? t.minimize : t.expand}
            aria-label="Toggle expanded chat window"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            title={t.close}
            aria-label="Close chat assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scoping Advisory Notice */}
      <div className="bg-amber-50/90 border-b border-amber-200 px-3 py-1.5 flex items-start gap-2 text-[11px] text-amber-900">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
        <span className="break-words">
          {currentLang === "en"
            ? "Scoped exclusively to: Visit Canada, Invest in Canada, & Canada-EU Partnership."
            : "Limité strictement à : Visiter le Canada, Investir au Canada & Partenariat Canada-UE."}
        </span>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-sm">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-2xs ${
                  isUser
                    ? "bg-blue-700 text-white rounded-tr-xs"
                    : msg.isOffTopicWarning
                    ? "bg-amber-50 border border-amber-200 text-amber-900 rounded-tl-xs"
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs"
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="text-sm prose prose-sm max-w-none text-slate-800 leading-relaxed break-words">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
                <span
                  className={`block text-[10px] mt-1.5 ${
                    isUser ? "text-blue-200 text-right" : "text-slate-400 text-left"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-500 italic bg-white p-3 rounded-2xl border border-slate-200 w-fit">
            <Bot className="w-4 h-4 text-blue-600 animate-spin" />
            <span>{t.thinking}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="bg-white border-t border-slate-200 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">
            <Sparkles className="w-3 h-3 text-amber-500 inline mr-0.5" />
            {currentLang === "en" ? "Suggestions:" : "Suggéré :"}
          </span>
          {QUICK_PROMPTS.slice(0, 4).map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(currentLang === "en" ? qp.promptEn : qp.promptFr)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[11px] transition-colors disabled:opacity-50"
            >
              {currentLang === "en" ? qp.labelEn : qp.labelFr}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t.inputPlaceholder}
          disabled={isLoading}
          className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 text-slate-900 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-blue-700 text-white shadow-xs transition-all active:scale-95 focus:outline-none"
          title={t.send}
          aria-label={t.send}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
