export function wait (timeMs: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMs)
  })
}
