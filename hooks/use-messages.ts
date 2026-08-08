import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getThreadsForUser, getThread, sendMessage, createThread } from "@/lib/mock-api/messages";

export function useThreadsForUser(userId: string | undefined, role: "customer" | "provider") {
  return useQuery({
    queryKey: ["threads", role, userId],
    queryFn: () => getThreadsForUser(userId!, role),
    enabled: !!userId,
  });
}

export function useThread(id: string | undefined) {
  return useQuery({ queryKey: ["thread", id], queryFn: () => getThread(id!), enabled: !!id, refetchInterval: false });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      threadId,
      ...payload
    }: {
      threadId: string;
      senderId: string;
      senderRole: "customer" | "provider";
      body: string;
    }) => sendMessage(threadId, payload),
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["thread", message.threadId] });
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
}

export function useCreateThread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createThread,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["threads"] }),
  });
}
