<script setup lang="ts">

const useUserInput = useState('userInput', () => '')
const useResultOutput = useState('resultOutput', () => '')

const localState = useState('playground', () => ({}))

function handleSubmit () {
  console.log(
    '🔴🔴🔴🔴 handleSubmit',
    localState.value,
    useUserInput.value,
    useResultOutput.value,
  )
}

</script>

<template>
  <div class="w-full max-w-sm mx-auto mt-6">
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Input
        </label>
        <input v-model="useUserInput"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name" type="text" placeholder="Test input..." />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
          handleInput
        </button>
      </div>
    </form>

    <div class="bg-orange-100 border-t-4 border-orange-500 rounded-b text-orange-900 px-4 py-3 shadow-md mt-6">
      <p class="font-bold">Results:</p>
      <textarea disabled name="result" id="result_area" cols="30" rows="10">
                {{ useResultOutput }}
                </textarea>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
