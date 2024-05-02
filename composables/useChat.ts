import type { ChatMessage, Role } from "~/types/chat-types";

const currentChatMessages = ref<ChatMessage[]>([]);

export const useChat = () => {
  const addMessage = (message: ChatMessage) => {
    currentChatMessages.value.push(message);
  };

  const createNewMessage = (role: Role, content: string) => {
    const message = ref<ChatMessage>({
      role,
      content,
    });
    return message;
  };

  const startNewChat = () => {
    currentChatMessages.value = [];
  };

  return {
    currentChatMessages,
    addMessage,
    createNewMessage,
    startNewChat,
  };
};
