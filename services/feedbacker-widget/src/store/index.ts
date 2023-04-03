// import { IStoreState } from '@/types/index'
import { reactive, readonly } from 'vue'

interface IStoreState {
  currentComponent: string
  feedbackType: string
  message: string
  apiKey: string
  fingerprint: string
  currentPage: string
}

const initialState: IStoreState = {
  currentComponent: 'SelectFeedbackType',
  message: '',
  feedbackType: '',
  fingerprint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<IStoreState>({ ...initialState })

export const Store = readonly(state)

export function setCurrentComponent (component: string): void {
  state.currentComponent = component
}

export function setMessage (message: string): void {
  state.message = message
}

export function setFeedbackType (type: string): void {
  state.feedbackType = type
}

export function setCurrentPage (page: string): void {
  state.currentPage = page
}

export function setApiKey (apiKey: string): void {
  state.apiKey = apiKey
}

export function setFingerprint (fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function resetStore (): void {
  setCurrentComponent(initialState.currentComponent)
  setMessage(initialState.message)
  setFeedbackType(initialState.feedbackType)
  setCurrentPage(initialState.currentPage)
  setApiKey(initialState.apiKey)
  setFingerprint(initialState.fingerprint)
}
