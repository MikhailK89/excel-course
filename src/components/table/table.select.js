import {$} from '@core/dom'
import {matrix} from '@/components/table/table.functions'

export function selectHandler($root, selection, event) {
  return new Promise(resolve => {
    const $current = $(event.target)
    let $target
    let $cells

    const mousemoveHandler = e => {
      $target = $(document.elementFromPoint(e.clientX, e.clientY))
      if ($target.data.type === 'cell' && $current.id() !== $target.id()) {
        $cells = matrix($target, $current)
            .map(id => $root.find(`[data-id="${id}"]`))
        selection.selectGroup($cells)
      } else if ($current.id() === $target.id()) {
        selection.select($current)
      }
    }

    const mouseupHandler = () => {
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)

      if (!$target) {
        resolve($current)
      } else if ($current.id() === $target.id()) {
        resolve($current)
      } else {
        resolve(null)
      }
    }

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
  })
}
