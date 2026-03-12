import { Timestamp } from 'firebase/firestore';

export interface Memo {
  id: string;
  title: string;
  content: string;
  userId: string;
  timestamp: Timestamp;
}