<script setup lang="ts">
const props = defineProps({
  headerProps: Object,
})

const emit = defineEmits(['create-account', 'login'])

function triggerAccountCreate () {
  console.log(' 🟣 triggerAccountCreate',)
  // TODO factory method to create required modal state configuration
  emit('create-account', props)
}

function triggerAccountLogin () {
  console.log(' 🟡 triggerAccountLogin',)
  // TODO factory method to create required modal state configuration
  emit('login', props)
}
</script>


<template>
  <header class="header">

    <div class="header-group">

      <!-- header bar -->
      <div class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
        </div>

        <div class="flex">
          <button id="header-create-account-button" class="px-6 py-2 font-bold rounded-full text-white focus:outline-none"
            @click="triggerAccountCreate">
            Crie uma conta
          </button>
          <button id="header-login-button"
            class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
            @click="triggerAccountLogin">
            Entrar
          </button>
        </div>
      </div>

      <!-- banner -->
      <div class="flex flex-col mt-28 ">
        <h1 class="text-4xl font-black text-white text-shadow">
          Receba feedbacks <br>
          E faça seus clientes mais <br class="hidden lg:inline-block">
          felizes!
        </h1>
        <p class="text-lg font-medium text-white text-shadow">
          Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
          simples widget na página.
        </p>
        <div>
          <button @click="triggerAccountCreate" id="cta-create-account-button"
            class="px-6 py-2 mt-10 font-bold bg-white rounded-full text-brand-main focus:outline-none">
            Crie uma conta grátis
          </button>
        </div>
      </div>

    </div>

  </header>
</template>


<!--
FIXME The code below does not provide Highlight Syntax, and if it removes it does not break anything so it is without being used until a solution is found.
<style scoped lang="postcss"></style>
-->
<style scoped lang="postcss">
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

.header-group .text-shadow {
  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
}

@media (min-width: 640px) {
  .header-group {
    /* customer PNG Designed By agny_illustration from https://pngtree.com/freepng/customer-reviews-with-people-giving-star-ratings-on-a-mobile-phone-positive-feedback-satisfaction-review-rating-or-evaluation-concept-vector-illustration-in-flat-style_8644419.html?sol=downref&id=bef */
    background-image: url(~/assets/images/customer_reviews_banner.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
