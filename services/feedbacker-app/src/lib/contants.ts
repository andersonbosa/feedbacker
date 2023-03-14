import { IFilter } from '~/lib/types'


export const LOCAL_STORAGE_TOKEN_NAME = 'token'


export interface SUMMARY_MAPPED {
  [key: string]: IFilter
}

export const SUMMARY_MAP_TREE: SUMMARY_MAPPED = {
  all: {
    label: 'Todos',
    color: {
      text: 'text-brand-info',
      bg: 'bg-brand-info'
    },
    amount: 0,
    active: false,
    type: undefined,
  },
  issue: {
    label: 'Problemas',
    color: {
      text: 'text-brand-danger',
      bg: 'bg-brand-danger'
    },
    amount: 0,
    active: false,
    type: undefined,
  },
  idea: {
    label: 'Ideias',
    color: {
      text: 'text-brand-warning',
      bg: 'bg-brand-warning'
    },
    amount: 0,
    active: false,
    type: undefined,
  },
  other: {
    label: 'Outros',
    color: {
      text: 'text-brand-graydark',
      bg: 'bg-brand-graydark'
    },
    amount: 0,
    active: false,
    type: undefined,
  },
}
