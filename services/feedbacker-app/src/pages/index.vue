<script setup lang="ts">
import Contact from '~/components/Home/Contact.vue'
import Footer from '~/components/Home/Footer.vue'
import Header from '~/components/Home/Header.vue'

const modal = useModal()

/* TODO função deve usar modal.open passando configuração desejada */
// TODO factory method to create required modal state configuration
function handleAccountLoginModal () {
  console.log(' 🟡 handleAccountLoginModal',)
  modal.open(modal.configs.createLoginModal())
}

/* TODO função deve usar modal.open passando configuração desejada */
// TODO factory method to create required modal state configuration
function handleAccountCreateModal () {
  console.log(' 🟣 handleAccountCreateModal',)
  modal.open(modal.configs.createSignUpModal())
}
</script>


<template>
  <div id="index_page">
    <Header @create-account="handleAccountCreateModal" @login="handleAccountLoginModal" />
    <Contact />
    <Footer />
  </div>
</template>


<style scoped lang="postcss"></style> */
