import { useEffect, useState } from 'react'
import { getItem } from '@/store/asyncStorage'

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchRole() {
      while (mounted && (role === null || userId === null)) {
        const storedRole = await getItem('role')
        const storedUserId = await getItem('user_id')
        console.log(storedRole)
        console.log(storedUserId)
        if (storedRole !== null && storedUserId !== null) {
          if (!mounted) return
          setRole(storedRole)
          setUserId(storedUserId)
          setLoading(false)
          break
        }

        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    fetchRole()

    return () => {
      mounted = false
    }
  }, [])

  return { userId, role, loading }
}
