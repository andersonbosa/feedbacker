
// Define the interfaces
export interface LabelsInterface {
  [key: string]: string
}

export interface ColorValuesInterface {
  text: string
  bg: string
}

export interface ColorsInterface {
  [key: string]: ColorValuesInterface
}

export interface FilterInterface {
  label: string
  amount: number
  color?: ColorValuesInterface
  active?: boolean
  type?: string
}

export interface SummaryInterface {
  [key: string]: any
}
