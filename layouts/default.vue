<template>
  <div class="h-[100vh]">
    <AppHeader />
    <main
      class="w-full mx-auto flex flex-col gap-2 items-center justify-start p-4 h-[90%]"
    >
      <slot />
    </main>
  </div>
</template>
