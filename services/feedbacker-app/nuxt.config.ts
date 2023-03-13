//https://nuxt.com/docs/bridge/bridge-composition-api#userouter-and-useroute
// import { defineNuxtConfig } from '@nuxt/bridge'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "charset": "utf-8"
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ]
    }
  },


  // devServer:{
  //   port: process.env.PORT || 8080
  // },


  // https://nuxt.com/docs/api/configuration/nuxt-config#srcdir
  srcDir: 'src/',


  // https://nuxt.com/docs/api/configuration/nuxt-config#pages-1
  pages: true,


  // https://nuxt.com/docs/guide/directory-structure/components#custom-directories
  components: [
    '~/components',
  ],


  // https://nuxt.com/docs/guide/directory-structure/pages#router-options
  // ssr: false,
  // router: {
  //   options: {
  //     hashMode: true
  //   }
  // },


  modules: [
    // '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],


  // https://nuxt.com/docs/api/configuration/nuxt-config/#imports
  imports: {
    dirs: [
      '~/stores',
      // '~/utils/services' # BUGA
    ],
  },


  // https://nuxt.com/docs/api/configuration/nuxt-config#css
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css',
  ],


  // https://tailwindcss.nuxtjs.org/getting-started/options
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/config/tailwind.config',
    // viewer: true,
    exposeConfig: false // add '~tailwind.config` alias
  },


  // https://nuxt.com/docs/api/configuration/nuxt-config#postcss
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


  // Pinia customizations
  pinia: {
    autoImports: [
      // #NOTE make your life easier, but highlight errors...
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },


  // https://nuxt.com/docs/guide/going-further/runtime-config#exposing-runtime-config
  runtimeConfig: {
  },

  sourcemap: {
    server: true,
    client: true
  },

  // https://nuxt.com/docs/api/configuration/nuxt-config#debug
  debug: true,
  experimental: { writeEarlyHints: true }
})
