import { MessageCircle } from 'lucide-react';
import { ThemeToggle } from './UI/ThemeToggle';

interface HeaderProps {
  onSignOut: () => void;
}

export function Header({ onSignOut }: HeaderProps) {
  return (
    <header className="h-16 sticky top-0 z-30 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-indigo-600 dark:text-indigo-400 mr-2">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            ChatAssist
          </h1>
        </div>
        
        <div className="flex items-center">
          <ThemeToggle />
          <button
            onClick={onSignOut}
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}