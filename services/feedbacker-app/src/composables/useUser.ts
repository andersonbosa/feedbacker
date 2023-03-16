import { useUserStore } from '~/stores/userStore'

const useStore = useUserStore()

export default function useUser () {
  // console.log(' 🟢 useUser', useStore)

  return {
    store: useStore,
  }
}
