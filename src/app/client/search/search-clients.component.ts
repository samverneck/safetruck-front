import { Component, ViewEncapsulation } from '@angular/core'
import * as $ from 'jquery'

import { IClient } from './../../../interfaces/IClient'
import { ClientService } from '../../../providers/client.service'

@Component({
  selector: 'search-clients',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-clients.template.html',
  styleUrls: ['./search-clients.styles.scss'],
  providers: [ClientService]
})

export class SearchClientsComponent {
  data: Array<IClient>
  equips: Array<any>
  dataLoaded: boolean

  constructor(public clientService: ClientService) {
    this.clientService.getAll().subscribe({
      next: resp => {
        this.data = resp
        this.dataLoaded = true
      },
      error: console.error
    })
  }

  selected(row, client) {
    this.equips = client.equipments
    this.toggleSelected(row)
  }

  toggleSelected(row) {
    let td = $(row.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }
}
