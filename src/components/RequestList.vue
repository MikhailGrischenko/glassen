<template>
  <section class="request-list__wrapper">
    <h3>Request List</h3>
    <ul class="request-list">
      <li class="request-list__item"
          :class="selected(req)"
          v-for="req in requestList"
          :key="req.url"
          @click="selectRequest(req)"
      >
        {{ req.name }}
      </li>
    </ul>
  </section>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'RequestList',
  props: {
    requestList: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedRequest: {
      type: Object,
      default: () => {
        return {
          name: '',
          url: '',
          params: [],
          method: 'POST'
        }
      }
    }
  },
  mounted () {
    this.$emit('set-request', this.requestList[0])
  },
  methods: {
    selectRequest (req) {
      this.$emit('set-request', req)
    },
    selected (req) {
      return req.name === this.selectedRequest.name
        ? 'selected'
        : ''
    }
  }
})
</script>
