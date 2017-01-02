import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'search-client-table',
  templateUrl: './client-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./client-table.styles.scss']
})

export class SearchClientTable {

  @Input() data: any[] // = PEOPLE

  constructor() {
    console.log('SearchClientTable')
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
