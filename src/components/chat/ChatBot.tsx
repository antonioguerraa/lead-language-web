import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import type { Chat } from "@google/genai";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CHATBOT_SYSTEM_PROMPT } from "../../data/chatbot-system-prompt";
import ChatMessage from "./ChatMessage";

interface Message {
  role: "user" | "model";
  text: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
      <div className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
      <div className="h-2 w-2 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) return null;

  function getChat() {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: CHATBOT_SYSTEM_PROMPT,
        },
      });
    }
    return chatRef.current;
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "model",
          text: "Hola! Soy el asistente de Lead Language. Puedo ayudarte con cualquier pregunta sobre nuestro servicio de captación de alumnos para academias de idiomas. ¿Qué te gustaría saber?",
        },
      ]);
    }
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = getChat();
      const response = await chat.sendMessage({ message: userMessage });
      setMessages((prev) => [
        ...prev,
        { role: "model", text: response.text ?? "" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contacta con leadlanguage23@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 z-50 flex h-[70vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy/95 shadow-2xl backdrop-blur-md sm:h-[500px] sm:w-[360px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-navy-light px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="font-semibold text-text-primary">
                  Lead Language
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-text-muted transition-colors hover:bg-white/10 hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} role={msg.role} text={msg.text} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-text-muted backdrop-blur-sm outline-none transition-colors focus:border-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-xl bg-primary p-2.5 text-white transition-all hover:bg-primary-light disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-primary/40"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </>
  );
}
