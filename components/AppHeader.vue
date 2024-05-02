<script setup lang="ts">
import { useChat } from "../composables/useChat";

const { startNewChat } = useChat();
</script>

<template>
  <header
    class="w-full px-4 py-2 border-b-2 border flex items-center justify-between h-[10%]"
  >
    <h1 class="text-lg text-slate-900">Streaming Chat Example ✨</h1>
    <nav>
      <button
        @click="startNewChat"
        class="border border-teal-400 rounded-md max-width-[200px] py-2 px-4 text-slate-900"
      >
        New chat
      </button>
    </nav>
  </header>
</template>
