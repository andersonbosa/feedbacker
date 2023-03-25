<script setup lang="ts">
import { useField } from 'vee-validate'
import { useGlobalStore } from '~/stores/global'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '~/utils/validators'

/* NOTE useModalStore or useModal should standardize these states e just receive events? */

const globalStore = useGlobalStore()

const { value: emailValue, errorMessage: emailErrorMessage } = useField(
  'email',
  validateEmptyAndEmail
)

const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
  'password',
  validateEmptyAndLength3
)

async function handleSubmit () {
  try {
    // useNotification().toast.clear()
    globalStore.isLoading = true

    const loginPayload = {
      email: globalStore.email.value,
      password: globalStore.password.value,
    }

    // TODO
    const { data, errors } = await useAuth().loginHandler(loginPayload)
    console.log(data)
    console.log(errors)
    //////////////////////////////// NOTE CONTINUE HERE
    // if (!errors) {
    //   authorizeUser(data.userToken)
    //   globalStore.isLoading = false
    //   return
    // }
    // FIXME: security issue: it leads to user enumeration
    // if (errors.status === 404) {
    //   useNotification().toast.error('E-mail não encontrado')
    // }
    // if (errors.status === 400) {
    //   useNotification().toast.error('Ocorreu um erro ao fazer o login')
    // }
    // FIXMEND


    globalStore.isLoading = false
  } catch (error) {
    globalStore.isLoading = false
    globalStore.hasErrors = !!error
    useNotification().toast.error('Ocorreu um erro ao fazer o login')
    // throw error
  }
}

async function handleModalClose () {
  useModal().close()
}


function setupLoginModalState () {
  const componentInitialState = {
    hasErrors: false,
    isLoading: false,
    email: {
      value: emailValue,
      errorMessage: emailErrorMessage,
    },
    password: {
      value: passwordValue,
      errorMessage: passwordErrorMessage,
    },
  }

  Object.assign(globalStore, componentInitialState)
}

onMounted(() => {
  setupLoginModalState()
})
</script>

<template>
  <div>
    <div class="flex justify-between" id="modal-login">
      <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

      <button id="modal-close" @click="handleModalClose" class="text-4xl text-gray-600 focus:outline-none">
        &times;
      </button>
    </div>

    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input id="email-field" v-model="globalStore.email.value" type="email" :class="{
            'border-brand-danger': !!globalStore.email.errorMessage,
          }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder="jane.dae@gmail.com" />
          <span id="email-error" v-if="!!globalStore.email.errorMessage" class="block font-medium text-brand-danger">
            {{ globalStore.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-lg font-medium text-gray-800">Senha</span>
          <input id="password-field" v-model="globalStore.password.value" type="password" :class="{
            'border-brand-danger': !!globalStore.password.errorMessage,
          }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder="your@email.com" />
          <span v-if="!!globalStore.password.errorMessage" class="block font-medium text-brand-danger">
            {{ globalStore.password.errorMessage }}
          </span>
        </label>

        <button id="submit-button" :disabled="globalStore.isLoading" type="submit" :class="{
          'opacity-50': globalStore.isLoading,
        }"
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">
          <icon v-if="globalStore.isLoading" name="loading" class="animate-spin" />
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
