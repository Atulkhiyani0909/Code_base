export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string
}

export type Language = 'en' | 'es' | 'fr' | 'de';
export type Theme = 'light' | 'dark' | 'system';