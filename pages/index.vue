<script setup lang="ts">
import { ref } from "vue";

const { currentChatMessages, addMessage, createNewMessage } = useChat();

const userInput = ref("");
const responseError = ref("");
const isSubmitting = ref(false);

const postMessage = async () => {
  if (!userInput.value) return;

  isSubmitting.value = true;

  const newUserMessage = createNewMessage("user", userInput.value);

  try {
    const response = await $fetch("/api/chat", {
      method: "POST",
      body: newUserMessage.value,
    });

    if (response.message) {
      addMessage(newUserMessage.value);
      userInput.value = "";
      isSubmitting.value = false;
      getChatCompletion();
    }
  } catch (error) {
    console.error(error);
    const e = error as Error;
    responseError.value = `An error occurred: ${e.message}`;
  }
};

const getChatCompletion = async () => {
  responseError.value = "";
  let connectionOpen = false;

  const assistantEventSource = new EventSource(`/api/chat`);

  const cleanup = () => {
    assistantEventSource.close();
  };

  assistantEventSource.onopen = () => {
    connectionOpen = true;
  };

  const newMessage = createNewMessage("assistant", "");

  addMessage(newMessage.value);

  assistantEventSource.onmessage = async (event) => {
    const dataWithNewlines = event.data.replace(/\\n/g, "\n");

    newMessage.value.content += dataWithNewlines;
  };

  assistantEventSource.onerror = (event) => {
    if (connectionOpen) {
      connectionOpen = false;
    } else {
      responseError.value = "An error occurred with the connection.";
    }
    cleanup();
  };
};
</script>

<template>
  <div class="mx-auto w-full p-4 md:max-w-[800px] h-full flex flex-col">
    <div class="flex-1 overflow-auto">
      <ChatMessageCard
        v-for="message in currentChatMessages"
        :key="message.content.slice(0, 10)"
        :message="message"
      />
      <div
        v-if="responseError.length"
        class="m-5 p-5 bg-red-100/50 text-red-400 rounded-md"
      >
        There was an error: {{ responseError }}
      </div>
    </div>
    <form @submit.prevent="postMessage" class="flex items-center relative mt-4">
      <textarea
        v-model="userInput"
        class="w-full p-2 border border-slate-300 rounded-md pr-16"
        placeholder="Type your message here..."
        aria-label="Type your message here..."
      >
      </textarea>
      <button
        type="submit"
        class="bg-teal-400 rounded-md max-width-[200px] py-2 px-2 absolute right-2 bottom-2 flex justify-center items-center disabled:bg-slate-100"
        :disabled="!userInput.length || isSubmitting"
      >
        <LucideSend class="w-6 h-6" />
      </button>
    </form>
  </div>
</template>
