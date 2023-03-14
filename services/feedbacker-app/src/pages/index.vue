<script setup lang="ts">
import { onMounted } from 'vue'
import Contact from '~/components/Home/Contact.vue'
import Footer from '~/components/Home/Footer.vue'
import Header from '~/components/Home/Header.vue'
import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'
import services from '~/utils/services/index'

function handleLogin (evt: any) {
  console.log(' 🔴🔴🔴🔴🔴 handleLogin', evt)
  // const modal = useModal()
  // modal.open({
  //   component: 'ModalLogin'
  // })

  throw '#TODO IMPLEMENT'
}

function handleAccountCreate () {
  // const modal = useModal()
  // modal.open({
  //   component: 'ModalAccountCreate'
  // })
  throw '#TODO IMPLEMENT'
}

async function validateUserAuthentication () {
  /* REVIEW if this is security */
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
  const { data } = await services.users.getMe()
  console.log(' 🟡 validateUserAuthentication', token, data)
  // if (data) {
  //   // navigateTo('/feedbacks')
  //   // return
  //   throw 'to implement'
  // }
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

