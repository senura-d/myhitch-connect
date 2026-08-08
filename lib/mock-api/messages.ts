import { store, delay, nextId } from "./store";
import type { MessageThread, Message, MessageAttachment } from "@/types/message";

export async function getThreadsForUser(userId: string, role: "customer" | "provider"): Promise<MessageThread[]> {
  const threads = store.messageThreads.filter((t) => (role === "customer" ? t.customerId === userId : t.providerId === userId));
  return delay([...threads].sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt)));
}

export async function getThread(id: string): Promise<MessageThread | undefined> {
  return delay(store.messageThreads.find((t) => t.id === id));
}

export async function sendMessage(
  threadId: string,
  payload: { senderId: string; senderRole: "customer" | "provider"; body: string; attachments?: MessageAttachment[] }
): Promise<Message> {
  const thread = store.messageThreads.find((t) => t.id === threadId);
  if (!thread) throw new Error(`Thread ${threadId} not found`);
  const message: Message = {
    id: nextId("msg"),
    threadId,
    senderId: payload.senderId,
    senderRole: payload.senderRole,
    body: payload.body,
    attachments: payload.attachments,
    createdAt: new Date().toISOString(),
  };
  thread.messages.push(message);
  thread.lastMessageAt = message.createdAt;
  return delay(message, 350);
}

export async function createThread(payload: {
  customerId: string;
  providerId: string;
  listingId?: string;
  subject: string;
  firstMessage: { senderId: string; senderRole: "customer" | "provider"; body: string };
}): Promise<MessageThread> {
  const now = new Date().toISOString();
  const thread: MessageThread = {
    id: nextId("thread"),
    customerId: payload.customerId,
    providerId: payload.providerId,
    listingId: payload.listingId,
    subject: payload.subject,
    lastMessageAt: now,
    messages: [
      {
        id: nextId("msg"),
        threadId: "",
        senderId: payload.firstMessage.senderId,
        senderRole: payload.firstMessage.senderRole,
        body: payload.firstMessage.body,
        createdAt: now,
      },
    ],
  };
  thread.messages[0].threadId = thread.id;
  store.messageThreads.push(thread);
  return delay(thread, 400);
}
