export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderRole: "customer" | "provider";
  body: string;
  attachments?: MessageAttachment[];
  createdAt: string;
}

export interface MessageThread {
  id: string;
  customerId: string;
  providerId: string;
  listingId?: string;
  subject: string;
  lastMessageAt: string;
  messages: Message[];
}

export const MESSAGE_TEMPLATES: string[] = [
  "Hi, is this service available this week?",
  "Could you share more details about pricing?",
  "Thanks for your booking, we look forward to helping you.",
  "Running a few minutes late, on our way now.",
];
