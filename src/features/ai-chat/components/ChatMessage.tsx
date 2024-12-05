import React from 'react';
import { Bot, User } from 'lucide-react';

interface Props {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatMessage({ message, isBot, timestamp }: Props) {
  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`flex gap-3 max-w-[80%] ${
          isBot ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>
        <div>
          <div
            className={`p-3 rounded-lg ${
              isBot
                ? 'bg-blue-50 text-gray-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="whitespace-pre-wrap">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}