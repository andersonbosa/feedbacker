<script setup lang="ts">
/* TOFIX efeitos visuais dos filtros não estão funcionando
https://i.imgur.com/3gJyGbF.png
 */
import { onErrorCaptured } from 'vue'

import { PayloadGetAll } from '~/lib/types'

import { feedbacksStore } from '~/stores/feedbacks'
import { useGlobalStore } from '~/stores/global'

import FeedbackCardLoading from '~/components/Feedbacks/FeedbackCard/Loading.vue'
import FeedbackCard from '~/components/Feedbacks/FeedbackCard/index.vue'
import Filters from '~/components/Feedbacks/Filters.vue'
import FiltersLoading from '~/components/Feedbacks/FiltersLoading.vue'
import HeaderLogged from '~/components/Feedbacks/HeaderLogged.vue'

import services from '~/utils/services'

const globalState = useGlobalStore()
const feedbacksState = feedbacksStore()

function handleErrors (error: any) {
  console.error(' 🔴 handleErrors !', error)

  globalState.isLoading = false
  feedbacksState.isLoadingFeedbacks = false
  feedbacksState.isLoadingMoreFeedback = false
  globalState.hasErrors = !!error
}

onErrorCaptured(handleErrors)

async function fetchFeedbacks () {
  try {
    globalState.isLoading = true

    // const data = { results: [], pagination: { limit: 5, offset: 0, total: 0 } } // NOTE mock
    const { data } = await services.feedbacks.getAll({
      ...feedbacksState.pagination,
      type: feedbacksState.currentFeedbackType,
    })

    feedbacksState.feedbacks = data.results
    feedbacksState.pagination = data.pagination

  } catch (error) {
    handleErrors(error)

  } finally {
    globalState.isLoading = false
  }
}


async function updateFeedbacksTypeFilter (type: string) {
  try {
    console.log(' 🔴 updateFeedbacksTypeFilter ', type)

    feedbacksState.currentFeedbackType = type
    feedbacksState.isLoadingFeedbacks = true
    feedbacksState.pagination.offset = 0
    feedbacksState.pagination.limit = 5

    const payload: PayloadGetAll = { type, ...feedbacksState.pagination }

    const { data } = await services.feedbacks.getAll(payload)

    feedbacksState.feedbacks = data.results
    feedbacksState.pagination = data.pagination
  } catch (error) {
    handleErrors(error)

  } finally {
    feedbacksState.isLoadingFeedbacks = false
  }
}

async function handleScroll () {
  const isBottomOfWindow =
    Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.scrollHeight

  if (globalState.isLoading || feedbacksState.isLoadingMoreFeedbacks) {
    return
  }

  if (!isBottomOfWindow) {
    return
  }

  if (feedbacksState.feedbacks.length >= feedbacksState.pagination.total) {
    return
  }

  try {
    console.log(' 🔴 handleScroll ', isBottomOfWindow)
    feedbacksState.isLoadingMoreFeedbacks = true

    // const data = { results: [], pagination: { limit: 5, offset: 0, total: 0 } } // NOTE mock
    const payload: PayloadGetAll = {
      ...feedbacksState.pagination,
      type: feedbacksState.currentFeedbackType,
      offset: feedbacksState.pagination.offset + 5,
    }
    const { data } = await services.feedbacks.getAll(payload)

    if (data.results?.length) {
      feedbacksState.feedbacks.push(...data.results)
    }

    feedbacksState.isLoadingMoreFeedbacks = false
    feedbacksState.pagination = data.pagination
  } catch (error) {
    feedbacksState.isLoadingMoreFeedbacks = false
    handleErrors(error)
  }
}

onMounted(() => {
  fetchFeedbacks()
  window.addEventListener('scroll', handleScroll, false)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, false)
})

</script>

<template>
  <div>
    <div class="flex justify-center w-full h-28 bg-brand-main">
      <HeaderLogged />
    </div>

    <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
      <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
      <p class="text-lg text-center text-gray-800 font-regular">
        Detalhes de todos os feedbacks recebidos.
      </p>
    </div>

    <div class="flex justify-center w-full pb-20">
      <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
        <div>
          <h1 class="text-3xl font-black text-brand-darkgray">Listagem</h1>

          <suspense>
            <template #default>
              <Filters @select-filter="updateFeedbacksTypeFilter"
                class="mt-8 animate__animated animate__fadeIn animate__faster" />
            </template>
            <template #fallback>
              <FiltersLoading id="filtersloading" class="mt-8" />
            </template>
          </suspense>
        </div>
        <div class="px-10 pt-20 col-span-3">
          <p v-if="!!globalState.hasErrors" class="text-lg text-center text-gray-800 font-regular">
            Aconteceu um erro ao carregar os feedbacks 🥺
          </p>
          <p v-if="
            !feedbacksState.feedbacks.length &&
            !globalState.isLoading &&
            !feedbacksState.isLoadingFeedbacks &&
            !globalState.hasErrors
          " class="text-lg text-center text-gray-800 font-regular">
            Ainda nenhum feedback recebido 🤓
          </p>

          <FeedbackCardLoading v-if="globalState.isLoading || feedbacksState.isLoadingFeedbacks" />
          <FeedbackCard v-else v-for="(feedback, index) in feedbacksState.feedbacks" :key="feedback.id"
            :is-opened="index === 0" :feedback="feedback" class="mb-8" />
          <FeedbackCardLoading v-if="feedbacksState.isLoadingMoreFeedbacks" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
#filters {
  border: 1px solid #0d4fae;
}

#filtersloading {
  border: 3px solid #d3ff23;
}
</style>
