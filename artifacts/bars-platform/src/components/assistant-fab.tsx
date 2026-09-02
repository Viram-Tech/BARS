import { MessageCircle } from '@/components/hugeicons';

export function AssistantFab({ onClick, hidden }: { onClick: () => void; hidden?: boolean }) {
  if (hidden) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="button-assistant-fab"
      aria-label="Ask BARS"
      title="Ask BARS (⌘ K)"
      className="focus-ring fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all hover:border-secondary/50 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={22} strokeWidth={1.8} className="text-secondary" />
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary" />
      </span>
    </button>
  );
}
