import { Component, ViewEncapsulation } from '@angular/core'

import { ClientsService } from './../../../providers/clients.service'

@Component({
  selector: 'client-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ClientsService],
  styleUrls: ['./table.styles.scss']
})

export class ClientTable {

  clients: any[]

  constructor(public client: ClientsService) {}

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
