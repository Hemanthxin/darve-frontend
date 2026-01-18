
export enum UserRole {
  PRIEST = 'PRIEST',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER'
}

export enum PoojaStatus {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
  UNCLEAR = 'UNCLEAR',
  PENDING = 'PENDING'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  templeId: string;
}

export interface PoojaRecord {
  id: string;
  userId: string;
  userName: string;
  templeId: string;
  imageUrls: string[];
  date: string;
  uploadTime: string;
  status: PoojaStatus;
  confidenceScore: number;
  aiFeedback: string;
  timestamp: number;
}

export interface VerificationResult {
  status: PoojaStatus;
  confidenceScore: number;
  feedback: string;
}

export interface Notification {
  id: string;
  type: 'ALERT' | 'INFO';
  message: string;
  date: string;
  read: boolean;
}
