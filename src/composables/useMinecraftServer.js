import { ref } from 'vue'

export function useMinecraftServer() {
    const loading = ref(false)
    const error = ref(null)

    /**
     * Transforme le JSON brut de l'API en contrat de données universel
     */
    function formatData(rawData, target) {
        if (!rawData || !rawData.online) {
            return {
                target,
                status: 'down',
                lastChecked: new Date().toLocaleTimeString(),
                details: null
            }
        }

        const software = rawData.software || 'Inconnu'

        // Détection basique des proxys connus
        const isProxy = ['velocity', 'bungeecord', 'waterfall', 'velocityproxy'].some(p =>
            software.toLowerCase().includes(p)
        )

        return {
            target,
            status: 'up',
            lastChecked: new Date().toLocaleTimeString(),
            details: {
                version: rawData.version || 'Inconnue',
                software,
                isProxy,
                players: {
                    online: rawData.players?.online ?? 0,
                    max: rawData.players?.max ?? 0
                },
                motd: rawData.motd?.clean?.join(' ') || ''
            }
        }
    }

    /**
     * Interroge l'API pour un serveur donné
     */
    async function fetchServer(target) {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`https://api.mcsrvstat.us/3/${target}`)
            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`)

            const rawData = await response.json()
            return formatData(rawData, target)
        } catch (err) {
            error.value = err.message || 'API inaccessible'
            return {
                target,
                status: 'error',
                lastChecked: new Date().toLocaleTimeString(),
                details: null
            }
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        fetchServer
    }
}