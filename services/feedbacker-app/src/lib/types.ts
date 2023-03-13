// Define the interfaces
// import type { Middleware } from '@nuxt/types'

export interface UserInitialState {
  currentUser: {
    name?: string
  }
}

/* ======================================= */

export interface LabelsInterface {
  [key: string]: string
}

export interface IColorValues {
  text: string
  bg: string
}

export interface IColors {
  [key: string]: IColorValues
}

export interface IFilter {
  label: string
  amount: number
  color?: IColorValues
  active?: boolean
  type?: string
}

export interface ISummary {
  [key: string]: any
}
