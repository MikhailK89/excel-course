import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import {isCell} from '@/components/table/table.functions'
import {matrix} from '@/components/table/table.functions'
import {nextSelector} from '@/components/table/table.functions'
import {parse} from '@core/parse'
import {defaultStyles} from '@/constants'
import {selectHandler} from '@/components/table/table.select'
import {isFormula} from '@core/parse'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })

    this.$prevCell = null
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.activateCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      this.selection.current
          .text(value)
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.current.focus()
      this.selection.applyStyle(value)

      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  sendCellData($cell) {
    this.$emit('table:select', $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles)) // currentStyles
  }

  deactivateCell($cell) {
    if (isFormula($cell.text())) {
      $cell.text(parse($cell.text()))
      const state = this.store.getState()
      const style = state.stylesState[$cell.id()]
      $cell.css(style)
    }
  }

  activateCell($cell, withSelection = true) {
    if (withSelection) {
      this.selection.select($cell)
    }

    if (this.$prevCell && this.$prevCell.id() === $cell.id()) {
      return null
    }

    if (this.$prevCell) {
      this.deactivateCell(this.$prevCell)
    }

    this.$prevCell = $cell

    this.sendCellData($cell)

    $cell.text($cell.data.value)
    $cell.focus()

    if (isFormula($cell.text())) {
      $cell.css({...defaultStyles})
    }
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error:', e.message)
    }
  }

  async selectTable(event) {
    try {
      const $cells = await selectHandler(this.$root, this.selection, event)
      if ($cells.length === 1) {
        this.activateCell($cells[0])
      } else {
        this.activateCell($cells[0], false)
      }
    } catch (e) {
      console.warn('Select error:', e.message)
    }
  }

  onMousedown(event) {
    const $target = $(event.target)

    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        if ($target.id() !== this.$prevCell.id()) {
          this.deactivateCell(this.$prevCell)
        }
        this.selectTable(event)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))

      this.activateCell($next)
    }

    if (event.key === 'Delete') {
      if (this.selection.removeContent()) {
        this.selection.applyStyle({...defaultStyles})

        this.$dispatch(actions.clearState({
          fields: ['dataState', 'stylesState'],
          group: this.selection.group
        }))
      }
    }
  }

  updateTextInStore(value) {
    this.selection.current
        .attr('data-value', value)

    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    const $target = $(event.target)
    if (isFormula($target.text())) {
      $target.css({...defaultStyles})
    }
    this.updateTextInStore($target.text())
  }
}
