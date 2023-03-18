// https://nuxt.com/docs/guide/directory-structure/plugins
// https://github.com/yuyinws/steam-card/blob/master/plugins/vue-toastification.client.ts
// https://github.com/mirumirumi/template-nuxt3/blob/main/src/plugins/vue-toastification.ts

import type { PluginOptions } from "vue-toastification"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

// const toastOptions: PluginOptions = {
//   closeButton: "button",
//   closeOnClick: false,
//   draggable: false,
//   draggablePercent: 0.4,
//   hideProgressBar: true,
//   icon: false,
//   maxToasts: 8,
//   newestOnTop: true,
//   pauseOnFocusLoss: false,
//   pauseOnHover: true,
//   // @ts-ignores
//   position: "bottom-center",
//   rtl: false,
//   showCloseButtonOnHover: true,
//   timeout: 3211,
//   // timeout: false,
// }

const toastOptions: PluginOptions = {
  timeout: 2954,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.35,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
  // @ts-ignores
  position: "top-right",
}

export default defineNuxtPlugin((nuxtApp) => {
  console.log(' 😀 Toast', Toast)

  nuxtApp.vueApp.use(Toast, toastOptions)
})
