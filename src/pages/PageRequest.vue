<template>
  <section class="page page--request">
    <request-list
      :request-list="requestList"
      :selected-request="selectedRequest"
      @set-request="setRequest"
    />
    <request-setting
      :selected-request="selectedRequest"
    />
  </section>
</template>

<script>
import Vue from 'vue'
import RequestList from '@/components/RequestList'
import { REQUEST_LIST } from '@/config/REQUEST_LIST'
import RequestSetting from '@/components/RequestSetting'

export default Vue.extend({
  name: 'PageRequest',
  components: {
    RequestSetting,
    RequestList
  },
  data () {
    return {
      requestList: REQUEST_LIST,
      selectedRequest: {}
    }
  },
  methods: {
    setRequest (request) {
      this.selectedRequest = request
    }
  }
})
</script>
