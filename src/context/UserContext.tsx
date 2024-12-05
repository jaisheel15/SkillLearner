import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferences {
  name: string;
  avatar: string;
  theme: 'light' | 'dark' | 'system';
  lastVisited: string[];
  favoriteTopics: string[];
}

interface UserContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  name: 'Learner',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
  theme: 'system',
  lastVisited: [],
  favoriteTopics: [],
};

const UserContext = createContext<UserContextType>({
  preferences: defaultPreferences,
  updatePreferences: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  return (
    <UserContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);