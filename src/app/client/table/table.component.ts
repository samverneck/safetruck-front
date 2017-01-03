import { Component, ViewEncapsulation } from '@angular/core'

import { ClientService } from './../../../providers/client.service'
import { IClient } from './../../../interfaces/IClient'

@Component({
  selector: 'client-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ClientService],
  styleUrls: ['./table.styles.scss']
})

export class ClientTable {

  clients: IClient[]

  constructor(public client: ClientService) {}

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
