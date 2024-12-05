import React from 'react';
import { Bot, XCircle, Loader2 } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { useChat } from './hooks/useChat';
import { formatYouTubeUrl } from '../../services/utils/youtube';

interface Props {
  videoId?: string;
}

export default function AIChatPanel({ videoId }: Props) {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();

  const handleSendMessage = (message: string) => {
    if (videoId) {
      const videoUrl = formatYouTubeUrl(videoId);
      sendMessage(message, videoUrl);
    } else {
      sendMessage(message);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold dark:text-white">AI Learning Assistant</h3>
          {videoId && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (Video Context Enabled)
            </span>
          )}
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <Bot className="w-12 h-12 mb-4 text-blue-500" />
            <p className="text-lg font-medium mb-2">How can I help you?</p>
            <p className="text-sm">
              {videoId 
                ? "Ask me anything about the video or your learning journey"
                : "Ask me anything about your learning journey"}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder={videoId ? "Ask about the video..." : "Ask a question..."}
        />
      </div>
    </div>
  );
}