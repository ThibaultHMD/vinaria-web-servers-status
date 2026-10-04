import { ref, onUnmounted } from 'vue'
import { useServicesList } from './useServicesList'
import { useMinecraftServer } from './useMinecraftServer'

export function useServicesManager() {
    const { services } = useServicesList()
    const { fetchServer } = useMinecraftServer()

    const monitoredServices = ref([])
    const loading = ref(false)

    const REFRESH_INTERVAL = 30
    const countdown = ref(REFRESH_INTERVAL)
    let timerInterval = null

    async function checkAllServices() {
        loading.value = true

        const promises = services.value.map(async (service) => {
            let statusResult = null

            if (service.type === 'minecraft') {
                statusResult = await fetchServer(service.target)
            } else {
                // Emplacement réservé pour les futurs types (http, discord, etc.)
                statusResult = {
                    status: 'unknown',
                    lastChecked: new Date().toLocaleTimeString(),
                    details: null
                }
            }

            return {
                ...service,
                ...statusResult
            }
        })

        monitoredServices.value = await Promise.all(promises)
        loading.value = false

        countdown.value = REFRESH_INTERVAL
    }

    function startPolling() {
        stopPolling()
        countdown.value = REFRESH_INTERVAL

        timerInterval = setInterval(() => {
            countdown.value--
            if (countdown.value <= 0) {
                checkAllServices()
            }
        }, 1000)
    }

    function stopPolling() {
        if (timerInterval) clearInterval(timerInterval)
    }

    onUnmounted(() => {
        stopPolling()
    })

    return {
        monitoredServices,
        loading,
        countdown,
        checkAllServices,
        startPolling,
        stopPolling
    }
}