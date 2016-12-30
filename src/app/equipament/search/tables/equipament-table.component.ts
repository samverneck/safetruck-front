import { Component, ViewEncapsulation } from '@angular/core'
declare var jQuery: any

const EQUIP = [
    {
    '_id': '5863f8c82cda47cf16cb1b46',
    'index': 0,
    'guid': '28bfce74-7782-444f-878d-a1a74e2c8ef4',
    'name': 'Floyd Wallace',
    'email': 'floydwallace@savvy.com',
    'phone': '+55 (988) 567-2940',
    'address': '419 Newport Street, Carlos, Connecticut, 9647'
  }
]

@Component({
  selector: '[search-equipament-table]',
  templateUrl: './equipament-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./equipament-table.styles.scss']
})

export class SearchEquipamentTable {

  data: any[]

  constructor() {}

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
