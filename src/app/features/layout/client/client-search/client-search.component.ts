import { Component, ViewEncapsulation, OnInit } from '@angular/core'

import { ClientService, Client } from '../shared'

@Component( {
  selector: 'client-search',
  templateUrl: './client-search.component.html',
  styleUrls: [ './client-search.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class ClientSearchComponent implements OnInit {

  public clients: Client[]
  public selectedClient: any | undefined

  /**
   * Creates an instance of SearchClientsComponent.
   * @param {ClientService} clientService
   *
   * @memberOf SearchClientsComponent
   */
  public constructor( public clientService: ClientService ) { }

  /**
   *
   *
   *
   * @memberOf ClientSearchComponent
   */
  public ngOnInit(): void {
    this.clientService.getAll().subscribe( resp => this.clients = resp, error => console.error( error ) )
  }

  /**
   *
   *
   * @param {Client} client
   *
   * @memberOf ClientSearchComponent
   */
  public selectClient( client ): void {
    this.selectedClient = client
  }
}
