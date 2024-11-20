import { ref } from 'vue'

export const useFetch = <T>() => {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const fetchData = async (url: string, options: RequestInit = {}) => {
    if (isLoading.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const result = await response.json()

      data.value = result

      console.log(result)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, fetchData }
}
