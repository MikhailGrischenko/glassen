export class Filter {
  id = 0
  keyword = ''
  enabled = false
  type = ''

  constructor (id, type) {
    this.id = id
    this.type = type
  }

  setKeyword (value) {
    this.keyword = value
  }

  setEnabled (value) {
    this.enabled = value
  }
}
