<script setup lang="ts">
import {
  LabelsInterface,
  IColors,
  ISummary,
  IFilter,
} from '~/lib/types'

import { useFeedbacks } from '~/stores/feedbacks'
import { useGlobal } from '~/stores/global'

// import services from '~~/src/utils/services/index.js' /* TODO implement services */


const feedbacksState = useFeedbacks()
const globalState = useGlobal()

// Assign types to the variables using the defined interfaces
const LABELS: LabelsInterface = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros',
}

const COLORS: IColors = {
  all: { text: 'text-brand-info', bg: 'bg-brand-info' },
  issue: { text: 'text-brand-danger', bg: 'bg-brand-danger' },
  idea: { text: 'text-brand-warning', bg: 'bg-brand-warning' },
  other: { text: 'text-brand-graydark', bg: 'bg-brand-graydark' },
}


function applyFiltersStructure (summary: ISummary) {
  return Object.keys(summary).reduce((acc: Array<IFilter>, cur) => {
    const currentFilter: IFilter = {
      label: LABELS[cur],
      color: COLORS[cur],
      amount: summary[cur],
    }

    if (cur === 'all') {
      currentFilter.active = true
    } else {
      currentFilter.type = cur
    }

    return [...acc, currentFilter]
  }, [])
}

function handleSelect ({ type }: string) {
  if (globalState.isLoading) {
    return
  }

  globalState.filters = globalState.filters.map((filter) => {
    if (filter.type === type) {
      return { ...filter, active: true }
    }

    return { ...filter, active: false }
  })

  // emit('select', type) // TODO implement emit
}

// export default {
//   async setup (_, { emit }) {
//     const store = useSomeStore('Global')
//     const state = reactive({
//       hasError: false,
//       filters: [
//         { label: null, amount: null }
//       ]
//     })

try {
  /* #TODO #TOFIX IMPEDITIVO filtros não aparecem por não haver "summarys"  */
  // const { data } = await services.feedbacks.getSummary()
  const data = {}
  globalState.filters = applyFiltersStructure(data)
} catch (error) {
  feedbacksState.hasError = !!error
  globalState.filters = applyFiltersStructure({
    all: 0,
    issue: 0,
    idea: 0,
    other: 0,
  })
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">Filtros</h1>

    <ul class="flex flex-col mt-3 list-none">
      <li v-for="filter in globalState.filters" :key="filter.label" @click="() => handleSelect(filter)" :class="{
        'bg-gray-200 bg-opacity-50': filter.active,
      }" class="flex items-center justify-between px-4 py-1 rounded cursor-pointer">
        <div class="flex items-center">
          <span />
          <span :class="filter.color?.bg" class="inline-block w-2 h-2 mr-2 rounded-full">
            {{ filter.label }}
          </span>
        </div>
        <span>
          <span :class="filter.active ? filter.color.text : 'text-brand-graydark'" class="font-bold">
            {{ filter.amount }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>
