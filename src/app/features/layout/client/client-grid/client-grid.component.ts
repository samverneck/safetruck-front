import { Component, EventEmitter, Output, Input } from '@angular/core'

import { fadeInOut } from '../../../../core'
import { ClientService, Client } from '../shared'

@Component( {
  selector: 'client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: [ './client-grid.component.scss' ],
  animations: [ fadeInOut ]
} )
export class ClientGridComponent {

  @Input() public data: Client[]
  @Input() public title: string = 'Clientes'
  @Input() public readOnlyMode: boolean = false
  @Output() public onSelectClient: EventEmitter<Client> = new EventEmitter()
  @Output() public onDeleteClient: EventEmitter<Client> = new EventEmitter()

  public selectedClient: Client | undefined

  /**
   * Creates an instance of ClientTableComponent.
   * @param {ClientService} clientService
   *
   * @memberOf ClientTableComponent
   */
  public constructor( public clientService: ClientService ) { }

  /**
   *
   *
   * @param {any} client
   *
   * @memberOf ClientTableComponent
   */
  public delete( client: Client ) {
    this.onDeleteClient.emit( client )
  }

  /**
   *
   *
   * @param {Client} client
   *
   * @memberOf ClientGridComponent
   */
  public select( client: Client ) {
    this.selectedClient = client
    this.onSelectClient.emit( client )
  }

  /**
   *
   *
   *
   * @memberOf ClientGridComponent
   */
  public unselect() {
    this.selectedClient = undefined
  }
}
