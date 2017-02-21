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

  public data: Array<IClient>
  public equips: Array<any>
  public dataLoaded: boolean
  public searchText: string

  /**
   * Creates an instance of SearchClientsComponent.
   * @param {ClientService} clientService
   *
   * @memberOf SearchClientsComponent
   */
  public constructor(public clientService: ClientService) {
    this.clientService.getAll().subscribe({
      next: resp => {
        this.data = resp
        this.dataLoaded = true
      },
      error: console.error
    })
  }

  /**
   *
   *
   * @param {any} row
   * @param {any} client
   *
   * @memberOf SearchClientsComponent
   */
  public selected(row, client) {
    this.equips = client.equipments
    this.toggleSelected(row)
  }

  /**
   *
   *
   * @param {any} row
   *
   * @memberOf SearchClientsComponent
   */
  public toggleSelected(row) {
    let td = $(row.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }
}
