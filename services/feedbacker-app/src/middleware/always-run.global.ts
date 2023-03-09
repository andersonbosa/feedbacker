/* Middleware demonstration */
export default defineNuxtRouteMiddleware(() => {
  console.log(`🔵 Running global middleware at: ${new Date().toISOString()}`)
})
