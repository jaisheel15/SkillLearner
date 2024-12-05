export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}