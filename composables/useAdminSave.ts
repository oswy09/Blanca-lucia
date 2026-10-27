export function useAdminSave() {
  const router = useRouter()

  async function adminPost(url: string, body: unknown) {
    try {
      await $fetch(url, { method: 'POST', body })
      return true
    } catch (e: any) {
      const status = e?.statusCode || e?.status || e?.response?.status
      if (status === 401) {
        await router.push('/admin')
        return false
      }
      throw e
    }
  }

  return { adminPost }
}
