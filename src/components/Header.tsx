import React from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Settings, Bell } from 'lucide-react';

export default function Header() {
  const { preferences } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={preferences.avatar}
                alt="User avatar"
                className="h-10 w-10 rounded-full ring-2 ring-primary/10"
              />
              <div>
                <p className="text-sm text-foreground-secondary">Welcome back,</p>
                <h2 className="text-lg font-bold text-primary">
                  {preferences.name}
                </h2>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-background-secondary"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-background-secondary"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-background-secondary"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}