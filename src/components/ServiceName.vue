<script setup>
const serviceName = import.meta.env.VITE_SERVICE_NAME || "Minecraft Server"
const serverIp = import.meta.env.VITE_SERVER_IP || "127.0.0.1"
</script>

<template>
  <div class="bg-color-red flex items-center gap-6">
    <h1 class="m-0 text-3xl font-semibold text-[var(--text-h)]">
      {{ serviceName }}
    </h1>
    <p class="m-0 text-xs font-mono text-[var(--text)]">
      {{ serverIp }}
    </p>
  </div>
</template>