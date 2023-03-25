// Define the interfaces

export interface UserInitialState {
  user: {
    name?: string
  }
}

/* ======================================= */

export interface LabelsInterface {
  [key: string]: string
}

export interface IFilterColor {
  text: string
  bg: string
}

export interface IFilter {
  label: string
  color: IFilterColor
  amount: number
  active?: boolean
  type?: string
}

export interface ISummary {
  [key: string]: any
}

/* ======================================= */

export interface PayloadGetAll {
  type?: string
  limit?: number
  offset?: number
}

/* ======================================= */

export interface LoginPayload {
  email: string,
  password: string
}

export interface RegisterPayload {
  name: string,
  email: string,
  password: string
}

export interface AuthResponse {
  data: any,
  errors: Error[]
}

export interface User {
  id: string
  name: string
  email: string
  apiKey: string
  createdAt: number
}
