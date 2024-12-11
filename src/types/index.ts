export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  visibility: 'public' | 'private';
}

export interface ServiceDay {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'fixed' | 'available' | 'pending_exchange';
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface ExchangeRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromServiceDayId: string;
  toServiceDayId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'exchange_request' | 'exchange_response';
  content: string;
  read: boolean;
  createdAt: string;
  relatedId?: string;
}