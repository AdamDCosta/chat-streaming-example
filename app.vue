<script setup lang="ts">
const message = ref("");
const responseError = ref("");

const markdown = useMarkdown();

const getChatCompletion = async () => {
  responseError.value = "";
  message.value = "";
  let connectionOpen = false;

  const assistantEventSource = new EventSource(`/api/chat`);

  const cleanup = () => {
    assistantEventSource.close();
  };

  assistantEventSource.onopen = () => {
    connectionOpen = true;
  };

  assistantEventSource.onmessage = async (event) => {
    const dataWithNewlines = event.data.replace(/\\n/g, "\n");

    message.value += dataWithNewlines;
  };

  assistantEventSource.onerror = (event) => {
    if (connectionOpen) {
      responseError.value = "The connection was closed by the server.";
    } else {
      responseError.value = "An error occurred with the connection.";
    }
    cleanup();
  };
};
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
