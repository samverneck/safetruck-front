import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'search-equipment-table',
  templateUrl: './equipment-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./equipment-table.styles.scss']
})

export class SearchEquipmentTable {

  @Input() data: any[]

  constructor() {
    console.log('SearchEquipmentTable')
  }

  selected(element, data) {
    this.toggleSelected(element)
  }

  toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }

}
