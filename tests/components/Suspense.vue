<template>
  <div v-if="error">
    {{ error }}
  </div>
  <Suspense v-else>
    <template #default>
      <DefaultContent />
    </template>
    <template #fallback>
      <FallbackContent />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, h, onErrorCaptured, ref } from 'vue'

import { simulateDelay } from '../utils'

const DefaultContent = defineComponent({
  async setup() {
    await simulateDelay({ delayInMs: 100 })
    return {}
  },
  render() { return h('div', ['Default content', h('span', 'Nested default content')]) }
})
const FallbackContent = defineComponent({
  render() { return h('div', 'Fallback content') }
})

export default defineComponent({
  components: {
    DefaultContent,
    FallbackContent
  },

  setup() {
    const error = ref<string | null>(null)
    onErrorCaptured((e) => {
      const err = e as Error
      error.value = err.message
      return false
    })

    return { error }
  }
})
</script>
