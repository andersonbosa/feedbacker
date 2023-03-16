<script setup lang="ts">
import Contact from '~/components/Home/Contact.vue'
import Footer from '~/components/Home/Footer.vue'
import Header from '~/components/Home/Header.vue'
import services from '~/utils/services/index'
// import { useModalStore } from '~/stores/modalStore'

// const modal = useModal()
// const modal = useModalStore()
const modal = useModal()
const user = useUser()


/* TODO função deve usar modal.open passando configuração desejada */
// TODO factory method to create required modal state configuration
function handleAccountLogin () {
  console.log(' 🟡 === handleAccountLogin',)
  modal.open(
    modal.configs.createLoginModal()
  )
}

/* TODO função deve usar modal.open passando configuração desejada */
// TODO factory method to create required modal state configuration
function handleAccountCreate () {
  console.log(' 🟣 === handleAccountCreate',)
  modal.open(
    modal.configs.createSignUpModal()
  )
}

async function tryAuthUserByLocalStorageToken () {
  const { data: userData } = await services.users.getMe()

  if (userData.id) {
    user.store.setCurrentUser(userData)
    return navigateTo('/feedbacks')
  }
}

onMounted(() => {
  tryAuthUserByLocalStorageToken()
})
</script>


<template>
  <div>
    <Header @create-account="handleAccountCreate" @login="handleAccountLogin" />
    <Contact />
    <Footer />
  </div>
</template>

