<script setup>
import { computed } from 'vue'
import StatusBadge from '../components/statusBadge.vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

// Bootstrap Icons pour le type de service à gauche
const serviceIcon = computed(() => {
  const icons = {
    minecraft: 'bi-controller',
    http: 'bi-globe',
    discord: 'bi-discord'
  }
  return icons[props.service.type] || 'bi-server'
})

// Variante de couleur pour le badge principal
const statusVariant = computed(() => {
  if (props.service.status === 'up') return 'success'
  if (props.service.status === 'down') return 'danger'
  return 'warning'
})
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition">

    <!-- Gauche : BOOTSTRAP ICON + Nom du service -->
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
        <i :class="['bi', serviceIcon, 'text-lg']"></i>
      </div>
      <div>
        <h3 class="font-semibold text-zinc-100 text-sm">{{ service.name }}</h3>
        <p class="text-xs text-zinc-400 font-mono">{{ service.target }}</p>
      </div>
    </div>

    <!-- Droite : BADGES D'ÉTAT AVEC ÉMOJIS -->
    <div class="flex items-center gap-2 flex-wrap justify-end">

      <!-- Badge de statut principal (En ligne / Hors ligne) -->
      <StatusBadge
          :variant="statusVariant"
          :emoji="service.status === 'up' ? '🟢' : '🔴'"
      >
        {{ service.status === 'up' ? 'Opérationnel' : 'Hors service' }}
      </StatusBadge>

      <!-- Badges spécifiques Minecraft (si en ligne) -->
      <template v-if="service.type === 'minecraft' && service.status === 'up' && service.details">

        <!-- Joueurs -->
        <StatusBadge variant="info" emoji="👥">
          {{ service.details.players.online }} / {{ service.details.players.max }}
        </StatusBadge>

        <!-- Moteur / Software -->
        <StatusBadge variant="neutral" emoji="⚙️">
          {{ service.details.software }}
        </StatusBadge>

        <!-- Proxy -->
        <StatusBadge v-if="service.details.isProxy" variant="warning" emoji="🔀">
          Proxy
        </StatusBadge>

        <!-- Version -->
        <StatusBadge variant="neutral" emoji="🏷️">
          {{ service.details.version }}
        </StatusBadge>
      </template>

    </div>
  </div>
</template>