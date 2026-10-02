<script setup>
const copyright = import.meta.env.VITE_COPYRIGHT || "Vakyum Studios"
const powered = import.meta.env.VITE_POWERED || "Vakyum Systems"
const poweredUrl = import.meta.env.VITE_POWERED_URL || "https://vakyum.fr"
</script>

<template>
  <footer class="flex flex-row justify-between items-center text-xs">
    <div>
      &copy; 2026 {{ copyright }}. Tous droits réservés.
    </div>
    <div>
      Propulsé par
      <a class="text-green-500 hover:text-green-700" :href="poweredUrl">
        {{ powered }}
      </a>.
    </div>
  </footer>
</template>

<style scoped>

</style>