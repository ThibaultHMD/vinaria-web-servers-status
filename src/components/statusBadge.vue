<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: 'neutral' // 'success', 'danger', 'warning', 'info', 'neutral'
  },
  emoji: {
    type: String,
    default: ''
  }
})

// Dictionnaire TailwindCSS selon l'état
const variantClasses = computed(() => {
  const styles = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    neutral: 'bg-zinc-800 text-zinc-300 border-zinc-700'
  }

  return styles[props.variant] || styles.neutral
})
</script>

<template>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border"
        :class="variantClasses"
  >
    <span v-if="emoji" class="text-sm leading-none">{{ emoji }}</span>
    <slot />
  </span>
</template>