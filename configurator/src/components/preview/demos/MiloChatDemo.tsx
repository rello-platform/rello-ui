import { useState } from "react";

export function MiloChatDemo() {
  const [messages, setMessages] = useState([
    { from: "milo", text: "Good morning! You have 3 hot leads to follow up with today. Want me to pull up their details?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const responses = [
    "Sarah Johnson has a score of 92 and was last contacted 2 hours ago. She's interested in properties in the $400K–$500K range in South Jordan.",
    "Based on current market data, the median home price in South Jordan is $465,000 — up 3.2% from last month. Inventory is tight at 1.8 months.",
    "I'd recommend scheduling a showing this week. Her pre-approval is good through April 15th. Want me to draft a text message?",
    "Done! I've queued a follow-up text for Sarah. It will send at 9:00 AM tomorrow. Anything else?",
  ];

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const responseIdx = (messages.length - 1) % responses.length;
      setMessages((prev) => [...prev, { from: "milo", text: responses[responseIdx] }]);
    }, 1200);
  };

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center gap-3">
        <img src="/api/assets/file/assets/milo/milo-small.svg" alt="Milo" className="size-8 rounded-full object-cover" />
        <div>
          <span className="text-sm font-medium text-[var(--neutral-700)]">Milo</span>
          <span className="text-[10px] text-[var(--neutral-400)] ml-1.5">Your Smart Assistant</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-56 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            {msg.from === "milo" && (
              <img src="/api/assets/file/assets/milo/milo-head.svg" alt="Milo" className="size-6 rounded-full object-cover mr-2 mt-1 shrink-0" />
            )}
            <div
              className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${msg.from === "user" ? "bg-[var(--neutral-100)] text-[var(--foreground)]" : "bg-[var(--brand-primary-light)] text-[var(--foreground)]"}`}
              style={{ animation: "msg-in 200ms ease-out both" }}
            >
              <style>{`@keyframes msg-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-center gap-2">
            <img src="/api/assets/file/assets/milo/milo-head.svg" alt="Milo" className="size-6 rounded-full object-cover shrink-0" />
            <div className="bg-[var(--brand-primary-light)] px-4 py-2 rounded-lg flex gap-1">
              <span className="size-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="size-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="size-1.5 rounded-full bg-[var(--brand-primary)] animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
        {["Show hot leads", "Market update", "Schedule showing"].map((chip) => (
          <button
            key={chip}
            onClick={() => { setInput(chip); }}
            className="px-2.5 py-1 text-[10px] rounded-full border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[var(--neutral-100)] flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask Milo anything..."
          className="flex-1 h-9 rounded-md border border-[var(--neutral-200)] bg-white px-3 text-sm outline-none focus:border-[var(--brand-primary)] placeholder:text-[var(--neutral-400)]"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="px-4 h-9 rounded-md bg-[var(--brand-primary)] text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  );
}
