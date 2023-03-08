<script setup lang="ts">
import { onMounted } from 'vue'
import Contact from '~/components/Home/Contact.vue'
import Footer from '~/components/Home/Footer.vue'
import Header from '~/components/Home/Header.vue'


const router = useRouter()

function handleLogin () {
  throw '#TODO IMPLEMENT'
}

function handleAccountCreate () {
  throw '#TODO IMPLEMENT'
}

onMounted(() => {
  /* REVIEW if this is security */
  const token = window.localStorage.getItem('token')
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

