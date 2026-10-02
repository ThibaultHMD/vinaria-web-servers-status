<script setup>
const serviceName = import.meta.env.VITE_SERVICE_NAME || "Minecraft Server"
const serverIp = import.meta.env.VITE_SERVER_IP || "127.0.0.1"
</script>

<template>
  <div class="service-name">
    <h1>{{ serviceName }}</h1>
    <p>{{ serverIp }}</p>
  </div>
</template>

<style scoped>

.service-name {
  display: flex;
  gap: 28px;
  align-items: center;
}

h1 {
  font-size: 2rem;
}

p {
  font-size: 0.8rem;
}

</style>