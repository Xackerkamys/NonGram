
// Shared Types (DTOs)

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  avatar?: string;
  username?: string;
  bio?: string;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: number;
  systemInstruction?: string; 
}

export type MessageType = 'text' | 'photo' | 'voice' | 'video_note' | 'file' | 'location' | 'sticker' | 'gif' | 'contact' | 'music' | 'poll';

export interface Message {
  id: string;
  text: string;
  type?: MessageType;
  mediaUrl?: string; // For photos, voice, video notes, stickers, gifs
  fileSize?: string; // For files
  fileName?: string; // For files
  duration?: number; // For voice/video (seconds)
  senderId: string;
  timestamp: number;
  status: 'pending' | 'sent' | 'read' | 'error';
  isEdited?: boolean;
  replyTo?: {
    id: string;
    text: string;
    senderName: string;
    type?: MessageType;
  };
}

export interface Chat {
  id: string;
  userId: string;
  user: User;
  messages: Message[];
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: number;
  isPinned?: boolean;
  isSavedMessages?: boolean;
  isGroup?: boolean;
}

export interface Call {
  id: string;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing';
  date: string;
  missed: boolean;
  duration?: number;
}

export interface AppSettings {
  messageTextSize: number; // 12 - 20
  messageCornerRadius: number; // 0 - 20
  wallpaper: string;
  // Persistence Preferences
  privacyLocked: boolean;
  privacyPhone: boolean;
  privacyLastSeen: boolean;
  notificationsChat: boolean;
  notificationsGroup: boolean;
  notificationsChannel: boolean;
  sound: boolean;
  vibration: boolean;
  autoDownloadWifi: boolean;
  autoDownloadCellular: boolean;
  powerSaving: boolean;
}

// Navigation View Types
export type ViewType = 
  | 'main' 
  | 'settings' 
  | 'contacts' 
  | 'calls' 
  | 'nearby' 
  | 'create_group' 
  | 'invite'
  | 'features';

// API Responses
export interface AuthResponse {
  token: string;
  user: UserProfile;
}
