<script setup>
import Header from './components/Header.vue'
import Footer from "./components/Footer.vue"

import { onMounted, computed } from 'vue'
import { useServicesManager } from './composables/useServicesManager'
import ServiceRow from './components/serviceRow.vue'
import StatusBadge from './components/statusBadge.vue'

const {
  monitoredServices,
  loading,
  countdown,
  checkAllServices,
  startPolling
} = useServicesManager()

// Calculs pour le récapitulatif
const totalServices = computed(() => monitoredServices.value.length)
const onlineServices = computed(() => {
  return monitoredServices.value.filter(s => s.status === 'up').length
})

onMounted(() => {
  checkAllServices()
  startPolling()
})
</script>

<template>
  <div class="flex-1 flex flex-col justify-between">
    <section id="top">
      <Header />
    </section>

    <!-- Zone centrale alignée exactement sur px-[8%] comme le Header et Footer -->
    <main class="w-full px-[8%] py-6 space-y-6 flex-1">

      <!-- En-tête avec résumé & contrôle -->
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl backdrop-blur">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Supervision Dashboard</h1>
          <p class="text-xs text-zinc-400 mt-1">État des services en temps réel</p>
        </div>

        <div class="flex items-center gap-3">
          <StatusBadge
              :variant="onlineServices === totalServices ? 'success' : 'warning'"
              emoji="🟢"
          >
            {{ onlineServices }} / {{ totalServices }} en ligne
          </StatusBadge>

          <button
              @click="checkAllServices"
              :disabled="loading"
              class="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs font-semibold text-zinc-200 rounded-xl transition border border-zinc-700/50 disabled:opacity-50 cursor-pointer"
          >
            <i class="bi bi-arrow-clockwise text-sm" :class="{ 'animate-spin': loading }"></i>
            <span>{{ loading ? 'Actualisation...' : `${countdown}s` }}</span>
          </button>
        </div>
      </header>

      <!-- Liste des services -->
      <section class="space-y-3">
        <ServiceRow
            v-for="service in monitoredServices"
            :key="service.id"
            :service="service"
        />
      </section>

    </main>

    <section id="bottom">
      <Footer />
    </section>
  </div>
</template>