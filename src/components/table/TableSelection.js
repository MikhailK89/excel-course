import {isFormula} from '@core/parse'

export class TableSelection {
  static classNames = [
    'selected-full',
    'selected-top',
    'selected-bottom',
    'selected-left',
    'selected-right'
  ]

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    $el.addClass(TableSelection.classNames[0])
  }

  clear() {
    this.group.forEach($el => {
      TableSelection.classNames.forEach(cls => {
        $el.removeClass(cls)
      })
    })
    this.group = []
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.current = $group[0]

    const firstElem = this.group[0].id(true)
    const lastElem = this.group[this.group.length - 1].id(true)

    this.group.forEach($el => {
      const row = $el.id(true)['row']
      const col = $el.id(true)['col']

      if (row === firstElem.row) {
        $el.addClass(TableSelection.classNames[1])
      }
      if (row === lastElem.row) {
        $el.addClass(TableSelection.classNames[2])
      }
      if (col === firstElem.col) {
        $el.addClass(TableSelection.classNames[3])
      }
      if (col === lastElem.col) {
        $el.addClass(TableSelection.classNames[4])
      }
    })
  }

  removeContent() {
    if (this.group.length > 1) {
      this.group.forEach($el => {
        $el.clear()
        $el.attr('data-value', '')
      })
      return true
    }
    return false
  }

  applyStyle(style) {
    this.group.forEach($el => {
      if (!isFormula($el.text())) {
        $el.css(style)
      }
    })
  }
}
