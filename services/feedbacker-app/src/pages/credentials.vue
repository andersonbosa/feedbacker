<script setup lang="ts">
import HeaderLogged from '~/components/Feedbacks/HeaderLogged.vue'
import { useGlobalStore } from '~/stores/global'
import pallet from '~/config/palette.mjs'
import { useUserStore } from '~/stores/userStore'
import services from '~/utils/services'

const globalState = useGlobalStore()
const userState = useUserStore()

function handleError (error: any) {
  globalState.isLoading = false
  globalState.hasErrors = !!error
}

async function handleGenerateApikey () {
  try {
    globalState.isLoading = true
    const { data } = await services.users.generateApikey()

    useUser().store.setApiKey(data.apiKey)
    globalState.isLoading = false
  } catch (error) {
    handleError(error)
  }
}

async function handleCopy () {
  useNotification().toast.clear()

  try {
    await navigator.clipboard.writeText(useUser().store.user.apiKey)
    useNotification().toast.success('Copiado!')
  } catch (error) {
    handleError(error)
  }
}

/* TOFIX doença da entidade HTML está bugada */
</script>

<template>
  <div>
    <div class="flex justify-center w-full h-28 bg-brand-main">
      <HeaderLogged />
    </div>

    <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
      <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
      <p class="text-lg text-center text-gray-800 font-regular">
        Guia de instalação e geração de suas credenciais
      </p>
    </div>

    <div class="flex justify-center w-full h-full">
      <div class="flex flex-col w-4/5 max-w-6xl py-10">
        <h1 class="text-3xl font-black text-brand-darkgray">
          Instalação e configuração
        </h1>
        <p class="mt-10 text-lg text-gray-800 font-regular">
          Este aqui é a sua chave de api
        </p>

        <content-loader v-if="globalState.isLoading" class="rounded" width="600px" height="50px" />
        <div v-else class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2">
          <span v-if="globalState.hasErrors">Erro ao carregar a apikey</span>
          <span v-else id="apikey">
            {{ useUser().store.user.apiKey }}
          </span>
          <div class="flex ml-20 mr-5" v-if="!globalState.hasErrors">
            <icon @click="handleCopy" name="copy" :color="pallet.brand.graydark" size="24" class="cursor-pointer" />
            <icon id="generate-apikey" @click="handleGenerateApikey" name="loading" :color="pallet.brand.graydark"
              size="24" class="cursor-pointer ml-3" />
          </div>
        </div>

        <p class="mt-5 text-lg text-gray-800 font-regular">
          Coloque o script abaixo no seu site para começar a receber feedbacks
        </p>

        <content-loader v-if="globalState.isLoading" class="rounded" width="600px" height="50px" />
        <div v-else class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
          <span v-if="globalState.hasErrors">Erro ao carregar o script</span>
          <pre v-else>
      &lt;script&gt;
        defer
        async
        onload="init('{{ useUser().store.user.apiKey }}')"
        src="https://andersonbosa-feedbacker-widget.netlify.app/init.js"
      &lt;/script&gt;
                </pre>
        </div>
      </div>
    </div>
  </div>
</template>
