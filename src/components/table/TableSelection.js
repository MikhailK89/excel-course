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
    $el.focus().addClass(TableSelection.classNames[0])
    this.group.push($el)
    this.current = $el
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

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
