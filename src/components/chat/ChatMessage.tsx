interface ChatMessageProps {
  role: "user" | "model";
  text: string;
}

export default function ChatMessage({ role, text }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words ${
          isUser
            ? "bg-primary/25 border border-primary/40 text-text-primary"
            : "bg-white/10 border border-white/15 text-text-primary"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
