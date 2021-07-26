<template>
  <div class="request-setting">
    <h3>Request Setting</h3>
    <ul class="request-setting__params-list">
      <li class="request-setting__params-item"
          v-for="param in modelData.params"
          :key="param.name"
      >
        <label class="request-setting__params-label"
               v-if="param.type !== 'Filter'"
        >
          {{ param.name }}
          <input class="request-setting__params-input"
                 :type="param.type"
                 :value="dto[param]"
                 @input="event => setDtoParam(event, param)"
          >
        </label>
        <div class="request-setting__child-params-list" v-else>
          <span>{{ param.name }}</span>
          <button class="request-setting__button-add"
                  @click="addChild(param)"
          >+
          </button>
          <ul class="request-setting__params-list">
            <li class="request-setting__params-item"
                v-for="child in list(param)"
                :key="child.id"
            >
              <button class="request-setting__button-remove"
                      @click="removeChild(child)"
              >-
              </button>
              <request-setting-filter
                :filter="child"
                @filter-state="setFilterState"
              />
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <button
      @click="sendRequest"
    >Send Request
    </button>
    <result-view
      :result="result"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import ResultView from '@/components/ResultView'
import axios from 'axios'
import { CONFIG } from '@/config'
import RequestSettingFilter from '@/components/RequestSettingFilter'
import { FilterFactory } from '@/modules/Filter/FilterFactory'
import { FILTER_TYPE_FILTER, FILTER_TYPE_STOP_FILTER } from '@/modules/Filter/FILTER_TYPE'

const filterFactory = new FilterFactory()

export default Vue.extend({
  name: 'RequestSetting',
  components: {
    RequestSettingFilter,
    ResultView
  },
  data () {
    return {
      dto: {},
      result: '',
      modelData: {},
      filterList: [],
      stopFilterList: []
    }
  },
  props: {
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
  watch: {
    selectedRequest: function (newValue) {
      this.modelData = newValue
      newValue.params.forEach(param => {
        if (param.type === 'Filter') {
          this.modelData[param.name] = []
        } else {
          if (param.type === 'text') {
            this.dto[param.name] = ''
          }
          if (param.type === 'checkbox') {
            this.dto[param.name] = false
          }
        }
      })
    }
  },
  methods: {
    list (param) {
      switch (param.name) {
        case FILTER_TYPE_FILTER: return this.filterList
        case FILTER_TYPE_STOP_FILTER: return this.stopFilterList
        default: return this.filterList
      }
    },
    async sendRequest () {
      const host = CONFIG.domain || window.location.origin
      try {
        this.result = await axios.post(
          `${host}${this.selectedRequest.url}`,
          this.prepareDto()
        )
      } catch (error) {
        this.result = error
      }
    },
    prepareDto () {
      this.dto.filter = this.modelData.filter?.map(filter => {
        return {
          keyword: filter.keyword,
          enabled: filter.enabled
        }
      })
      this.dto.stopfilter = this.modelData.stopfilter?.map(filter => {
        return {
          keyword: filter.keyword,
          enabled: filter.enabled
        }
      })
      return this.dto
    },
    addChild (param) {
      if (param.name === FILTER_TYPE_FILTER) {
        this.filterList.push(filterFactory.create(FILTER_TYPE_FILTER))
      }
      if (param.name === FILTER_TYPE_STOP_FILTER) {
        this.stopFilterList.push(filterFactory.create(FILTER_TYPE_STOP_FILTER))
      }
    },
    removeChild (child) {
      if (child.type === FILTER_TYPE_FILTER) {
        this.filterList = this.filterList.filter(item => item.id !== child.id)
        this.modelData[child.type] = this.modelData[child.type].filter(item => item.id !== child.id)
      }
      if (child.type === FILTER_TYPE_STOP_FILTER) {
        this.stopFilterList = this.stopFilterList.filter(item => item.id !== child.id)
        this.modelData[child.type] = this.modelData[child.type].filter(item => item.id !== child.id)
      }
    },
    setDtoParam (event, param) {
      this.dto[param.name] = event.target.value
    },
    setFilterState (filterState) {
      const filter = this.modelData[filterState.type].find(item => item.id === filterState.id)
      if (filter) {
        this.modelData[filterState.type] = this.modelData[filterState.type].filter(item => item.id !== filterState.id)
      }
      this.modelData[filterState.type].push(filterState)
    }
  }
})
</script>
