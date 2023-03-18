// https://nuxt.com/docs/guide/directory-structure/plugins
// https://github.com/yuyinws/steam-card/blob/master/plugins/vue-toastification.client.ts
// https://github.com/mirumirumi/template-nuxt3/blob/main/src/plugins/vue-toastification.ts

import type { PluginOptions } from "vue-toastification"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"


const toastOptions: PluginOptions = {
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.35,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  // @ts-ignores
  position: "top-right",
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, toastOptions)
})
