<script setup lang="ts">
import { IFilter } from '~/lib/types'
import { SUMMARY_MAP_TREE } from '~/lib/contants'
import { useGlobal } from '~/stores/global'
import { useFeedbacks } from '~/stores/feedbacks'
import services from '~/utils/services/index'

/* TOFIX falta comportamentos abaixo
atualizar lista dos feedbacks baseado no filtro selecionado
*/

const feedbacksState = useFeedbacks()
const globalState = useGlobal()


function applyFiltersStructure (summary: any) {

  function parseFiltersStructures (parsedFilters: Array<IFilter>, summarySlug: any) {
    const currentFilter: IFilter = {
      ...SUMMARY_MAP_TREE[summarySlug],
      amount: summary[summarySlug],
      type: summarySlug,
      active: false
    }

    const isDefaultActive = summarySlug === 'all'
    if (isDefaultActive) {
      currentFilter.active = true
    } else {
      currentFilter.type = summarySlug
    }

    return [...parsedFilters, currentFilter]
  }

  return Object.keys(summary).reduce(parseFiltersStructures, [])
}


function updateFiltersBasedOnTypeSelect (filters: IFilter[], selectedFilterType: String): IFilter[] {
  return filters.map((filter) => {
    if (filter.type === selectedFilterType) {
      return { ...filter, active: true }
    }

    return { ...filter, active: false }
  })
}


function handleSelect (selectedFilter: IFilter) {
  console.log(' 🔴🔴🔴🔴🔴 handleSelect', selectedFilter.type)
  if (globalState.isLoading) {
    console.warn('globalState.isLoading')
    return
  }

  globalState.filters = updateFiltersBasedOnTypeSelect(globalState.filters, selectedFilter.type)
  // emit('select', type) // TODO implement emit
}

async function initializeFilters () {
  try {
    const { data } = await services.feedbacks.getSummary()
    globalState.filters = applyFiltersStructure(data)

  } catch (error) {
    /* TOFIX undefined */
    console.error(error)

    feedbacksState.hasError = !!error

    const initialFiltersState = { all: 0, issue: 0, idea: 0, other: 0, }
    globalState.filters = applyFiltersStructure(initialFiltersState)
  }
}

onMounted(() => {
  initializeFilters()
})
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">Filtros</h1>

    <ul class="flex flex-col mt-3 list-none">
      <li v-for="filter in globalState.filters" :key="filter.label" @click="() => handleSelect(filter)" :class="{
        'bg-gray-200 bg-opacity-50': filter.active,
      }" class="flex items-center justify-between px-4 py-1 rounded cursor-pointer">
        <div class="flex items-center">
          <span :class="filter.color?.bg" class="inline-block w-2 h-2 mr-2 rounded-full"></span>
          <!-- a cor não está funcionando -->
          {{ filter.label }}
        </div>
        <span>
          <span :class="filter.active ? filter.color.text : 'text-brand-graydark'" class="font-bold"></span>
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>
