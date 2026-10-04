import { ref, computed } from 'vue'
import rawServices from '../config/services.json'

export function useServicesList() {
    const services = ref(rawServices)

    const minecraftServices = computed(() => {
        return services.value.filter(s => s.type === 'minecraft')
    })

    const httpServices = computed(() => {
        return services.value.filter(s => s.type === 'http')
    })

    return {
        services,
        minecraftServices,
        httpServices
    }
}