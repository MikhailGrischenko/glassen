export const REQUEST_LIST = [
  {
    name: 'GetSourcesFilters',
    url: '/thread/settings_filters_get',
    params: [
      {
        name: 'thread_id',
        type: 'text',
        require: true
      }
    ]
  },
  {
    name: 'SetSourcesFilters',
    url: '/thread/settings_filters',
    params: [
      {
        name: 'thread_id',
        type: 'text',
        require: true
      },
      {
        name: 'filter',
        type: 'Filter',
        require: true
      },
      {
        name: 'stopfilter',
        type: 'Filter',
        require: true
      }
    ]
  }
]
