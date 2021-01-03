import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/Components/table/tablet.template'
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }


  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      event.preventDefault()
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.grtCoords()
      // eslint-disable-next-line max-len
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      const type = $resizer.data.resize
      const sideProp = type === 'col' ? 'bottom' : 'right'
      let val

      $resizer.css({
        opacity: 1,
        zIndex: 10,
        [sideProp]: '-5000px',
      })

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          val = coords.width + delta
          $resizer.css({right: -delta + 'px'})
        } else {
          const delta = e.pageY - coords.bottom
          val = coords.height + delta
          $resizer.css({bottom: -delta + 'px'})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        $resizer.css({opacity: 0,
          bottom: 0,
          right: 0,
        })
        if (type === 'col') {
          $parent.css({width: val + 'px'})
          cells.forEach(el => el.style.width = val + 'px')
        } else {
          $parent.css({height: val + 'px'})
        }
      }
    }
  }
}