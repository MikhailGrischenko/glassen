import { Filter } from '@/modules/Filter/Filter'
import { FILTER_TYPE } from '@/modules/Filter/FILTER_TYPE'
import { v4 as uuid } from 'uuid'

export class FilterFactory {
  create (type) {
    if (FILTER_TYPE.includes(type)) {
      return new Filter(uuid(), type)
    } else {
      return new Error('invalid filter type')
    }
  }
}
