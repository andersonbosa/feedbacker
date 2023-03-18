// Define the interfaces

export interface UserInitialState {
  loggedUser: {
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
