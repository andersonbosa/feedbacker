import { createApp } from 'vue'
import App from './App.vue'
import { setup } from './utils/bootstrap'
import Playground from './views/Playground/index.vue'

import '@/assets/css/fonts.css'
import '@/assets/css/tailwind.css'
import 'animate.css'

setup({
  onProduction: () => {
    createApp(App).mount('#app')
  },
  onDevelopment: () => {
    createApp(Playground).mount('#app')
  }
})
