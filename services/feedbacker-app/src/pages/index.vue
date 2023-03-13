<script setup lang="ts">
import { onMounted } from 'vue'
import Contact from '~/components/Home/Contact.vue'
import Footer from '~/components/Home/Footer.vue'
import Header from '~/components/Home/Header.vue'
import { LOCAL_STORAGE_TOKEN_NAME } from '~/lib/contants'


const router = useRouter()

function handleLogin () {
  throw '#TODO IMPLEMENT'
}

function handleAccountCreate () {
  throw '#TODO IMPLEMENT'
}

onMounted(() => {
  /* REVIEW if this is security */
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
  if (token) {
    router.push({ name: 'Feedbacks' })
  }
})
</script>


<template>
  <div>
    <Header @create-account="handleAccountCreate" @login="handleLogin" />
    <Contact />
    <Footer />
  </div>
</template>

