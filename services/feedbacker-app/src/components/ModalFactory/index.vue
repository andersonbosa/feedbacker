<script setup lang="ts">
console.log('EU SOU MODAL FACTORY');

const state = {
  email: {
    errorMessage: '',
    value: ''
  },
  hasErrors: false,
  isLoading: false,
  password: {
    errorMessage: '',
    value: ''
  }
}

function close () {
  console.log('f:close()')
}

function handleSubmit () {
  console.log('f:handleSubmit')
}

</script>

<template>
  <div>
    <div class="flex justify-between" id="modal-login">
      <h1 class="text-4xl font-black text-gray-800">
        Entre na sua conta
      </h1>

      <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
        &times;
      </button>
    </div>


    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input id="email-field" v-model="state.email.value" type="email" :class="{
            'border-brand-danger': !!state.email.errorMessage
          }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder="jane.dae@gmail.com">
          <span id="email-error" v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-lg font-medium text-gray-800">Senha</span>
          <input id="password-field" v-model="state.password.value" type="password" :class="{
            'border-brand-danger': !!state.password.errorMessage
          }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder="jane.dae@gmail.com">
          <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button id="submit-button" :disabled="state.isLoading" type="submit" :class="{
          'opacity-50': state.isLoading
        }"
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">
          <icon v-if="state.isLoading" name="loading" class="animate-spin" />
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>


<style lang="postcss" scoped></style>
