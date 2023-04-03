// https://nuxt.com/docs/getting-started/state-management

export const useStates = () => {
  console.log(' 🗽 useStates')
  const useCounter = () => useState<number>('counter', () => 0)
  const useColor = () => useState<string>('color', () => 'pink')

  return {
    useCounter,
    useColor
  }
}

