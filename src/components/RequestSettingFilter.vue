<template>
  <div class="request-setting-filter">
    <ul class="request-setting__child-list">
      <li class="request-setting__child-item">
        <label class="request-setting__child-label">
          keyword
          <input class="request-setting__child-input"
                 type="text"
                 @input="setKeyword"
                 :value="filter.keyword"
          >
        </label>
      </li>
      <li class="request-setting__child-item">
        <label class="request-setting__child-label">
          enabled
          <input class="request-setting__child-input"
                 type="checkbox"
                 @input="setEnabled"
                 :value="filter.enabled"
          >
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { FilterFactory } from '@/modules/Filter/FilterFactory'
import { FILTER_TYPE_FILTER } from '@/modules/Filter/FILTER_TYPE'

const filterFactory = new FilterFactory()

export default Vue.extend({
  name: 'RequestSettingFilter',
  data () {
    return {
      filterData: {}
    }
  },
  props: {
    filter: {
      type: Object,
      default () {
        return filterFactory.create(FILTER_TYPE_FILTER)
      }
    }
  },
  mounted () {

  },
  methods: {
    setKeyword (event) {
      this.filter.setKeyword(event.target.value)
      this.upState()
    },
    setEnabled (event) {
      this.filter.setEnabled(event.target.checked)
      this.upState()
    },
    upState () {
      this.$emit('filter-state', this.filter)
    }
  }
})
</script>
