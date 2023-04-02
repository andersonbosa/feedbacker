<script setup lang="ts">
import { SUMMARY_MAP_TREE } from '~/lib/contants'
import { IFilter } from '~/lib/types'
import { feedbacksStore } from '~/stores/feedbacks'
import { useGlobalStore } from '~/stores/global'
import services from '~/utils/services/index'

/* TOFIX falta comportamentos abaixo
atualizar lista dos feedbacks baseado no filtro selecionado
*/

const emit = defineEmits(['select'])
const feedbacksState = feedbacksStore()
const globalState = useGlobalStore()

function applyFiltersStructure (summary: any) {
  function parseFiltersStructures (
    parsedFilters: Array<IFilter>,
    summarySlug: any
  ) {
    const currentFilter: IFilter = {
      ...SUMMARY_MAP_TREE[summarySlug],
      amount: summary[summarySlug],
      type: summarySlug,
      active: false,
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

function updateFiltersBasedOnSelectedType (
  filters: IFilter[],
  selectedFilterType: string | undefined
): IFilter[] {
  if (!filters || !selectedFilterType) {
    throw new Error('oh no!')
  }

  const parseSelectedFilter = (filter: IFilter) => {
    if (filter.type === selectedFilterType) {
      return { ...filter, active: true }
    }

    return { ...filter, active: false }
  }

  return filters.map(parseSelectedFilter)
}

function triggerFilterSelect (type: string | undefined) {
  emit('select-filter', type)
}

function handleSelect (selectedFilter: IFilter) {
  if (globalState.isLoading) {
    // throw new Error('oh no! globalState.isLoading')
    return
  }

  feedbacksState.filters = updateFiltersBasedOnSelectedType(
    feedbacksState.filters,
    selectedFilter.type
  )

  triggerFilterSelect(selectedFilter.type) /* REVIEW */
}

async function setupInitialFilters () {
  try {
    const { data } = await services.feedbacks.getSummary()
    feedbacksState.filters = applyFiltersStructure(data)
    console.log('2', feedbacksState.filters)
  } catch (error) {
    /* TOFIX undefined */
    console.error(error)

    globalState.hasErrors = !!error

    const initialFiltersState = { all: 0, issue: 0, idea: 0, other: 0 }
    feedbacksState.filters = applyFiltersStructure(initialFiltersState)
  }
}

onMounted(() => {
  setupInitialFilters()
  console.log('1', feedbacksState.filters)
});


/* TOFIX
https://i.imgur.com/cQhg7Yr.png
a cor foi definida
mas não está exibindo a sinalização com a cor específicada
*/
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-regular text-brand-darkgray">Filtros</h1>

    <ul class="flex flex-col mt-3 list-none">
      <li v-for="filter in feedbacksState.filters" :key="filter.label" :class="{
        'bg-gray-200 bg-opacity-50': filter.active,
      }" @click="() => handleSelect(filter)"
        class="flex items-center justify-between px-4 py-1 rounded cursor-pointer">
        <div class="flex items-center">
          <span :class="filter.color.bg" class="inline-block w-2 h-2 mr-2 rounded-full" /> {{ filter.label }}
        </div>
        <span :class="filter.active ? filter.color.text : 'text-brand-graydark'" class="font-bold">
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>
