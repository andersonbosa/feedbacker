import { Store } from '@/store/index'

/* TOFIX
Uncaught SyntaxError: The requested module '/src/types/index.ts?t=1680527368794' does not provide an export named 'IStoreState' (at index.ts:1:10)
// import { IStoreState } from '@/types/index'
*/

export interface IStoreState {
  currentComponent: string
  feedbackType: string
  message: string
  apiKey: string
  fingerprint: string
  currentPage: string
}


export default function useStore (): IStoreState {
  return Store
}
