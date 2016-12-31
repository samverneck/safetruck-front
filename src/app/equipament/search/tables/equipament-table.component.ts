import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'search-equipament-table',
  templateUrl: './equipament-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./equipament-table.styles.scss']
})

export class SearchEquipamentTable {

  @Input() data: any[]

  constructor() {
    console.log('SearchEquipamentTable')
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
