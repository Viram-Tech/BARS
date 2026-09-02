import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

import { Shell } from '@/components/shell';
import { Assistant } from '@/components/assistant';
import Home from '@/pages/home';
import Repository from '@/pages/repository';
import Dashboard from '@/pages/dashboard';
import Directory from '@/pages/directory';
import DesignSystem from '@/pages/design-system';
import { LanguageProvider } from '@/lib/language-context';

const queryClient = new QueryClient();

function Router({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const [location] = useLocation();
  
  return (
    <ErrorBoundary resetKey={location}>
      <Shell onOpenAssistant={onOpenAssistant}>
        <Switch>
          <Route path="/" component={() => <Home onAsk={onOpenAssistant} />} />
          <Route path="/repository" component={Repository} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/directory" component={Directory} />
          <Route path="/design-system" component={DesignSystem} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </ErrorBoundary>
  );
}

function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { 
        event.preventDefault(); 
        setAssistantOpen(true); 
      }
      if (event.key === 'Escape') setAssistantOpen(false);
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Router onOpenAssistant={() => setAssistantOpen(true)} />
          <Assistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
