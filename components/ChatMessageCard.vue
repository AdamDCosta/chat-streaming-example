<script setup lang="ts">
import type { ChatMessage } from "../types/chat-types";
import { useMarkdown } from "../composables/useMarkdown";
import { computed } from "vue";

const props = defineProps<{ message: ChatMessage }>();

const markdown = useMarkdown();

const messageHeader = computed(() => {
  switch (props.message.role) {
    case "assistant":
      return "Assistant";
    case "user":
      return "You";
    default:
      return "System";
  }
});

const messageBgColor = computed(() => {
  if (props.message.role === "user") {
    return {
      card: "bg-teal-100",
      markdown: "prose-pre:bg-teal-300 prose-slate-900",
    };
  } else {
    return {
      card: "bg-slate-100",
      markdown: "prose-pre:bg-slate-300 prose-blue",
    };
  }
});
</script>

<template>
  <div
    class="m-5 p-5 rounded-md flex flex-col gap-2"
    :class="messageBgColor.card"
  >
    <header>
      <h2 class="font-semibold">{{ messageHeader }}</h2>
    </header>
    <div
      :key="message.content.slice(0, 10)"
      class="prose prose-md prose-pre:text-slate-800 text-sm"
      :class="messageBgColor.markdown"
      v-html="markdown.render(message.content)"
    ></div>
  </div>
</template>
