<template>
  <section class="request-result">
    <h3>Result View</h3>
    <div>
      {{ result }}
    </div>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ResultView',
  props: {
    result: {
      type: String,
      default: ''
    }
  }
})
</script>
