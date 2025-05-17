import React from 'react';
import { ThemeToggle } from '../UI/ThemeToggle';

export function SettingsTab() {
  return (
    <div className="p-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">Theme</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Toggle between light and dark mode
            </span>
            <ThemeToggle />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Enable notifications
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">Text Size</h3>
          <div className="space-y-1">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Adjust chat text size
            </span>
            <input 
              type="range" 
              min="1" 
              max="3" 
              defaultValue="2"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Small</span>
              <span>Medium</span>
              <span>Large</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-slate-900 dark:text-slate-100">About</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Modern Chatbot UI v1.0<br />
            © 2025 Example Company
          </p>
        </div>
      </div>
    </div>
  );
}