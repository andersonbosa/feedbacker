// https://nuxt.com/docs/getting-started/state-management

export const useCounter = () => useState<number>('counter', () => 0)

export const useColor = () => useState<string>('color', () => 'pink')

