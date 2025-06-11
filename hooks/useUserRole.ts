import { useEffect, useState } from 'react'
import { getItem } from '@/store/asyncStorage'

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function fetchRole() {
      const storedRole = await getItem('role')
      const storedUserId= await getItem('user_id')
      if (mounted) {
        setRole(storedRole)
        setUserId(storedUserId)
        setLoading(false)
      }
    }
    fetchRole()
    return () => {
      mounted = false
    }
  }, [])

  return { userId, role, loading }
}
