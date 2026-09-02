import { type FormEvent, useState } from 'react';
import { Check, MessageCircle, Send, ShieldCheck, X, ArrowUpRight, ArrowRight } from '@/components/hugeicons';
import { Link } from 'wouter';

export function Assistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState('');
  
  const suggestions = [
    'What is a Safe System?', 
    'Show me school-zone evidence', 
    'Which states are improving?'
  ];
  
  const ask = (event?: FormEvent) => { 
    event?.preventDefault(); 
    if (question.trim()) { 
      setAsked(question.trim()); 
      setQuestion(''); 
    } 
  };
  
  if (!open) return null;
  
  return (
    <>
      <button 
        onClick={onClose} 
        data-testid="button-assistant-backdrop" 
        aria-label="Close Ask BARS" 
        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] transition-opacity animate-fade" 
      />
      <aside 
        role="dialog" 
        aria-label="Ask BARS assistant" 
        className="fixed bottom-0 right-0 z-50 flex h-[min(720px,100dvh)] w-full flex-col border-l border-border bg-card shadow-2xl sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[440px] sm:rounded-xl overflow-hidden animate-rise"
      >
        <div className="flex items-start justify-between border-b border-border bg-card p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-secondary text-secondary-foreground">
                <MessageCircle size={15} />
              </span>
              <span className="font-mono-ui text-xs tracking-[.12em] text-muted-foreground">ASK BARS</span>
            </div>
            <h2 className="mt-5 font-display text-3xl text-foreground">A grounded starting point.</h2>
          </div>
          <button
            onClick={onClose}
            data-testid="button-close-assistant"
            className="focus-ring p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={19} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="flex gap-4 rounded-md border border-border bg-muted/50 p-4">
            <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={19} />
            <p className="text-sm leading-relaxed text-muted-foreground">
              I can help you find your way through BARS&apos; evidence and people. I&apos;ll point to what we know, and say when we don&apos;t.
            </p>
          </div>
          
          {!asked && (
            <div className="mt-8 flex-1">
              <p className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground mb-4">Try asking</p>
              <div className="space-y-2">
                {suggestions.map((suggestion) => (
                  <button 
                    key={suggestion} 
                    onClick={() => { setQuestion(suggestion); setAsked(suggestion); }} 
                    data-testid={`button-assistant-suggestion-${suggestion.slice(0, 4).toLowerCase()}`} 
                    className="focus-ring flex w-full items-center justify-between rounded-md border border-border bg-background p-4 text-left text-sm font-semibold text-foreground transition-colors hover:border-secondary hover:text-secondary group"
                  >
                    <span>{suggestion}</span>
                    <ArrowUpRight size={15} className="text-muted-foreground group-hover:text-secondary transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {asked && (
            <div className="mt-8 space-y-6">
              <div className="ml-8 rounded-lg rounded-tr-none bg-muted px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm">
                {asked}
              </div>
              <div className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent text-accent-foreground shadow-sm">
                  <Check size={16} />
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-foreground bg-background border border-border p-4 rounded-lg rounded-tl-none shadow-sm">
                    A useful place to begin is the Safe System primer: it frames road death as preventable, while accounting for human error in the design of roads, vehicles, speeds, and response.
                  </p>
                  <Link 
                    href="/repository" 
                    onClick={onClose} 
                    data-testid="link-assistant-result" 
                    className="focus-ring mt-4 inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-primary transition-colors"
                  >
                    Open the related evidence <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={ask} className="border-t border-border bg-muted/30 p-4">
          <div className="flex items-center overflow-hidden rounded-md border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-1 transition-all">
            <label className="sr-only" htmlFor="assistant-question">Ask BARS a question</label>
            <input 
              id="assistant-question" 
              value={question} 
              onChange={(event) => setQuestion(event.target.value)} 
              data-testid="input-assistant-question" 
              placeholder="Ask about evidence, states, or practice..." 
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground" 
            />
            <button 
              type="submit" 
              disabled={!question.trim()} 
              data-testid="button-submit-assistant" 
              className="mr-1.5 flex h-9 w-9 items-center justify-center rounded-sm bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-30 disabled:hover:bg-secondary"
            >
              <Send size={15} className={question.trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
            </button>
          </div>
          <p className="mt-3 text-center font-mono-ui text-[9.5px] text-muted-foreground uppercase tracking-widest">
            Grounded mock / replace with API retrieval later
          </p>
        </form>
      </aside>
    </>
  );
}
