<template>
  <div id="header-logged" class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png" alt="logo" />
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li @click="goToCredentials"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Credenciais
        </li>
        <li @click="goToFeedbacks"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none">
          Feedbacks
        </li>
        <li id="logout-button" @click="handleLogout"
          class="px-6 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main focus:outline-none">
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'

const userStore = useUserStore()

const logoutLabel = useState<string>('logoutLabel', () => {
  if (!userStore.currentUser.name) {
    return 'Entrar'
  }

  return `${userStore.currentUser.name} (sair)`
})

function handleLogout () {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)

  userStore.cleanCurrentUser()
  goToHome()
}

const goToHome = () => navigateTo('/', { redirectCode: 301 })
const goToFeedbacks = () => navigateTo('/feedbacks', { redirectCode: 301 })
const goToCredentials = () => navigateTo('/credentials', { redirectCode: 301 })
</script>


