<script setup lang="ts">

// <template>
//   <div class="flex justify-center w-full h-28 bg-brand-main">
//     <header-logged />
//   </div>

//   <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
//     <h1 class="text-4xl font-black text-center text-gray-800">
//       Credenciais
//     </h1>
//     <p class="text-lg text-center text-gray-800 font-regular">
//       Guia de instalação e geração de suas credenciais
//     </p>
//   </div>

//   <div class="flex justify-center w-full h-full">
//     <div class="flex flex-col w-4/5 max-w-6xl py-10">
//       <h1 class="text-3xl font-black text-brand-darkgray">
//         Instalação e configuração
//       </h1>
//       <p class="mt-10 text-lg text-gray-800 font-regular">
//         Este aqui é a sua chave de api
//       </p>

//       <content-loader v-if="store.Global.isLoading || globalStateisLoading" class="rounded" width="600px" height="50px" />
//       <div v-else class="flex py-3 pl-5 mt-2 rounded justify-between items-center bg-brand-gray w-full lg:w-1/2">
//         <span v-if="globalStatehasErrors">Erro ao carregar a apikey</span>
//         <span v-else id="apikey">{{ store.User.user.apiKey }}</span>
//         <div class="flex ml-20 mr-5" v-if="!globalStatehasErrors">
//           <icon @click="handleCopy" name="copy" :color="brandColors.graydark" size="24" class="cursor-pointer" />
//           <icon id="generate-apikey" @click="handleGenerateApikey" name="loading" :color="brandColors.graydark" size="24"
//             class="cursor-pointer ml-3" />
//         </div>
//       </div>

//       <p class="mt-5 text-lg text-gray-800 font-regular">
//         Coloque o script abaixo no seu site para começar a receber feedbacks
//       </p>

//       <content-loader v-if="store.Global.isLoading || globalStateisLoading" class="rounded" width="600px" height="50px" />
//       <div v-else class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
//         <span v-if="globalStatehasErrors">Erro ao carregar o script</span>
//         <pre v-else>
//     &lt;script
//       defer
//       async
//       onload="init('{{ store.User.user.apiKey }}')"
//       src="https://igorhalfeld-feedbacker-widget.netlify.app/init.js"
//     &gt;&lt;/script&gt;
//             </pre>
//       </div>
//     </div>
//   </div>
// </template>
</script>
