<script setup lang="ts">
// import { onMounted } from 'vue'
import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'
import Contact from '~/components/Home/Contact.vue'
import Footer from '~/components/Home/Footer.vue'
import Header from '~/components/Home/Header.vue'
// import ModalAccountCreate from '~/components/ModalCreateAccount/index.vue'
// import ModalLogin from '~/components/ModalLogin/index.vue'

import services from '~/utils/services/index'
import { useUserStore } from '~/stores/userStore'

const modal = useModal()
const userStore = useUserStore()

function handleLogin (evt: any) {
  console.log(' 🔴 handleLogin', evt)
  modal.open({
    component: 'ModalLogin'
  })
}

function handleAccountCreate (evt: any) {
  console.log(' 🔴 handleAccountCreate', evt)
  modal.open({
    component: 'ModalAccountCreate'
  })
}

async function validateUserAuthentication () {
  /* REVIEW if this is security */
  const { data: userData } = await services.users.getMe()

  console.log(' 🟡 validateUserAuthentication', userData, userStore)
  if (userData.id) {
    userStore.setCurrentUser(userData)
    navigateTo('/feedbacks')
    //   return
    //   // throw 'to implement'
  }
}

onMounted(() => {
  validateUserAuthentication()
})
</script>


<template>
  <div>
    <Header @create-account="handleAccountCreate" @login="handleLogin" />
    <Contact />
    <Footer />
  </div>
</template>

