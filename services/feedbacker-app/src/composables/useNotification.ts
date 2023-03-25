import { useToast } from 'vue-toastification'


export default function useNotification () {
  console.log('🟢 useNotification')

  return {
    toast: useToast()
  }
}
