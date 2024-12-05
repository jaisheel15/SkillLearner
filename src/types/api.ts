export interface VideoTranscript {
  videoId: string;
  transcript: string;
  language: string;
}

export interface APIError {
  message: string;
  code?: string;
  status?: number;
}