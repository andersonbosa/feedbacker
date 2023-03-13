<script setup lang="ts">
import Filters from '~/components/Feedbacks/Filters.vue';
console.log('😀 src/pages/feedbacks.vue');

import HeaderLogged from '~/components/Feedbacks/HeaderLogged.vue'
// import services from '~/utils/services/index'

const globalState = useGlobal();
const feedbacksState = useFeedbacks();

function handleErrors(error) {
  globalState.isLoading = false;

  feedbacksState.isLoadingFeedbacks = false;
  feedbacksState.isLoadingMoreFeedback = false;
  feedbacksState.hasError = !!error;
  console.log('891726398712638971629837619287369187262763891276');
}

async function fetchFeedbacks() {
  try {
    globalState.isLoading = true;

    // const { data } = await services.feedbacks.getAll({
    //   ...feedbacksState.pagination,
    //   type: feedbacksState.currentFeedbackType
    // })
    const data = { results: [], pagination: { limit: 5, offset: 0, total: 0 } }; // NOTE mock

    feedbacksState.feedbacks = data.results;
    feedbacksState.pagination = data.pagination;

    globalState.isLoading = false;
  } catch (error) {
    handleErrors(error);
  }
}

async function changeFeedbacksType(type) {
  try {
    feedbacksState.isLoadingFeedbacks = true;
    feedbacksState.pagination.offset = 0;
    feedbacksState.pagination.limit = 5;
    feedbacksState.currentFeedbackType = type;

    // const { data } = await services.feedbacks.getAll({
    //   type,
    //   ...feedbacksState.pagination
    // })
    const data = { results: [], pagination: { limit: 5, offset: 0, total: 0 } }; // NOTE mock

    feedbacksState.feedbacks = data.results;
    feedbacksState.pagination = data.pagination;
    feedbacksState.isLoadingFeedbacks = false;
  } catch (error) {
    handleErrors(error);
  }
}

async function handleScroll() {
  const isBottomOfWindow =
    Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
    document.documentElement.scrollHeight;

  if (globalState.isLoading || feedbacksState.isLoadingMoreFeedbacks) return;
  if (!isBottomOfWindow) return;
  if (feedbacksState.feedbacks.length >= feedbacksState.pagination.total)
    return;

  try {
    feedbacksState.isLoadingMoreFeedbacks = true;
    // const { data } = await services.feedbacks.getAll({
    //   ...feedbacksState.pagination,
    //   type: feedbacksState.currentFeedbackType,
    //   offset: (feedbacksState.pagination.offset + 5)
    // })
    const data = { results: [], pagination: { limit: 5, offset: 0, total: 0 } }; // NOTE mock

    if (data.results.length) {
      feedbacksState.feedbacks.push(...data.results);
    }

    feedbacksState.isLoadingMoreFeedbacks = false;
    feedbacksState.pagination = data.pagination;
  } catch (error) {
    feedbacksState.isLoadingMoreFeedbacks = false;
    handleErrors(error);
  }
}

onMounted(() => {
  fetchFeedbacks();
  window.addEventListener('scroll', handleScroll, false);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, false);
});
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
              <filters
                @select="changeFeedbacksType"
                class="mt-8 animate__animated animate__fadeIn animate__faster"
              />
            </template>
            <template #fallback>
              <filters-loading class="mt-8" />
            </template>
          </suspense>
        </div>
        <div class="px-10 pt-20 col-span-3">
          <p
            v-if="feedbacksState.hasError"
            class="text-lg text-center text-gray-800 font-regular"
          >
            Aconteceu um erro ao carregar os feedbacks 🥺
          </p>
          <p
            v-if="
              !feedbacksState.feedbacks.length &&
              !globalState.isLoading &&
              !feedbacksState.isLoadingFeedbacks &&
              !feedbacksState.hasError
            "
            class="text-lg text-center text-gray-800 font-regular"
          >
            Ainda nenhum feedback recebido 🤓
          </p>

          <feedback-card-loading
            v-if="globalState.isLoading || feedbacksState.isLoadingFeedbacks"
          />
          <feedback-card
            v-else
            v-for="(feedback, index) in feedbacksState.feedbacks"
            :key="feedback.id"
            :is-opened="index === 0"
            :feedback="feedback"
            class="mb-8"
          />
          <feedback-card-loading v-if="feedbacksState.isLoadingMoreFeedbacks" />
        </div>
      </div>
    </div>
  </div>
</template>
