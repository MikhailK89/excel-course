import {$} from '@core/dom'
import {matrix} from '@/components/table/table.functions'

export function selectHandler($root, selection, event) {
  return new Promise(resolve => {
    const $current = $(event.target)
    let $target
    let $cells = [$current]
    let $prevCell = $current

    selection.select($current)

    const mousemoveHandler = e => {
      $target = $(document.elementFromPoint(e.clientX, e.clientY))

      if ($target.data.type === 'cell') {
        if ($target.id() !== $prevCell.id()) {
          if ($target.id() !== $current.id()) {
            $cells = matrix($target, $current)
                .map(id => $root.find(`[data-id="${id}"]`))
            selection.selectGroup($cells)
          } else {
            selection.select($current)
          }
          $prevCell = $target
        }
      }
    }

    const mouseupHandler = () => {
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)

      if (!$target) {
        resolve($cells)
      } else if ($current.id() === $target.id()) {
        resolve($cells)
      } else {
        resolve($cells)
      }
    }

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
  })
}
