import type { Config } from 'tailwindcss'

import palette from './palette'

export default {
  content: [
    './src/**/*.{html,js,vue,jsx}'
  ],
  theme: {
    extend: {
      colors: palette
    },
  },
  plugins: [],
} satisfies Config
// } as Config
// https://tailwindcss.com/blog/tailwindcss-v3-3
// https://medium.com/@cefn/typescript-satisfies-6ba52e74cb2f
