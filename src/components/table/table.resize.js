import {$} from '@core/dom'
import {removeTextSelection} from '@core/utils'

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    const mousemoveHandler = e => {
      if (type === 'col') {
        const delta = Math.floor(e.pageX - coords.right)
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = Math.floor(e.pageY - coords.bottom)
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
      removeTextSelection()
    }

    const mouseupHandler = () => {
      document.removeEventListener('mousemove', mousemoveHandler)
      document.removeEventListener('mouseup', mouseupHandler)

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
  })
}
