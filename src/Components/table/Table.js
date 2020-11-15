import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/Components/table/tablet.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }
}