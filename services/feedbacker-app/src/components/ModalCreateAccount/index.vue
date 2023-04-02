<template>
  <div class="flex justify-between" id="modal-create-account">
    <h1 class="text-4xl font-black text-gray-800">
      Crie uma conta
    </h1>

    <button @click="handleModalClose" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmitCreate">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input v-model="componentState.name.value" type="text" :class="{
          'border-brand-danger': !!componentState.name.errorMessage
        }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="Jone Doe" autofocus autocomplete name="name">
        <span v-if="!!componentState.name.errorMessage" class="block font-medium text-brand-danger">
          {{ componentState.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input v-model="componentState.email.value" type="email" :class="{
          'border-brand-danger': !!componentState.email.errorMessage
        }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="jane.dae@gmail.com" autofocus autocomplete name="email">
        <span v-if="!!componentState.email.errorMessage" class="block font-medium text-brand-danger">
          {{ componentState.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input v-model="componentState.password.value" type="password" :class="{
          'border-brand-danger': !!componentState.password.errorMessage
        }" class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="jane.dae@gmail.com" autofocus autocomplete name="password">
        <span v-if="!!componentState.password.errorMessage" class="block font-medium text-brand-danger">
          {{ componentState.password.errorMessage }}
        </span>
      </label>

      <button :disabled="global.isLoading" type="submit" :class="{
        'opacity-50': global.isLoading
      }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150">
        <icon v-if="global.isLoading" name="loading" class="animate-spin" />
        <span v-else>Criar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'
import { reactive } from 'vue'
import { useGlobalStore } from '~/stores/global'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '~/utils/validators'

const global = useGlobalStore()
const auth = useAuth()
const { toast } = useNotification()

const {
  value: nameValue,
  errorMessage: nameErrorMessage
} = useField('name', validateEmptyAndLength3)

const {
  value: emailValue,
  errorMessage: emailErrorMessage
} = useField('email', validateEmptyAndEmail)

const {
  value: passwordValue,
  errorMessage: passwordErrorMessage
} = useField('password', validateEmptyAndLength3)


const state = {
  hasErrors: false,
  isLoading: false,
  name: {
    value: nameValue,
    errorMessage: nameErrorMessage
  },
  email: {
    value: emailValue,
    errorMessage: emailErrorMessage
  },
  password: {
    value: passwordValue,
    errorMessage: passwordErrorMessage
  }
}

// const componentState = reactive(state)
const componentState = Object.assign(global, state)

async function handleModalClose () {
  useModal().close()
}

/*
  DONE 1) usuario foi criado?
  emite sucesso de criação
  tenta logar o usuário
  se logar,
    rotina de login

  DONE 2) existem erros?
    avisa equipe técnica
      loga no console para evidência (melhoria: ser input automático)
    notifica usuário
*/
async function handleSubmitCreate () {
  try {
    global.isLoading = true

    const registerPayload = {
      name: componentState.name.value,
      email: componentState.email.value,
      password: componentState.password.value,
    }

    await auth.registerHandler(registerPayload)

    const loginPayload = {
      email: registerPayload.email,
      password: registerPayload.password,
    }

    await auth.loginHandler(loginPayload)

    global.isLoading = false

  } catch (error) {
    global.isLoading = false
    componentState.hasErrors = !!error
    toast.error('Ocorreu algum erro ao criar sua conta. A equipe técnica já foi notificada!')
    throw Error(error)
  }
}
</script>
