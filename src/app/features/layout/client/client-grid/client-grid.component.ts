import { Component, EventEmitter, Output, Input } from '@angular/core'

import { fadeInOut } from '../../../../core'
import { ClientService, Client } from '../shared'

@Component({
  selector: 'client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: ['./client-grid.component.scss'],
  animations: [fadeInOut]
})
export class ClientGridComponent {

  @Input() public data: Client[]
  @Input() public title: string = 'Clientes'
  @Input() public showDeleteButton: boolean = true
  @Output() public clientSelected: EventEmitter<Client> = new EventEmitter()
  @Output() public deleteClient: EventEmitter<Client> = new EventEmitter()

  /**
   * Creates an instance of ClientTableComponent.
   * @param {ClientService} clientService
   *
   * @memberOf ClientTableComponent
   */
  public constructor(public clientService: ClientService) {
    console.log(this.data)
  }

  /**
   *
   *
   * @param {any} client
   *
   * @memberOf ClientTableComponent
   */
  public delete(client: Client) {
    this.deleteClient.emit(client)
  }

  /**
   *
   *
   * @param {any} element
   * @param {any} client
   *
   * @memberOf ClientTableComponent
   */
  public selected(element, client: Client) {
    this.clientSelected.emit(client)
    this.toggleSelected(element)
  }

  /**
   *
   *
   * @param {any} element
   *
   * @memberOf ClientTableComponent
   */
  public toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }
}
