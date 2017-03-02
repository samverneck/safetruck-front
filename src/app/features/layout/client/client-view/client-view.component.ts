import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ClientService, Client } from '../shared'

@Component( {
  selector: 'client-view.html',
  templateUrl: 'client-view.component.html'
} )
export class ClientViewComponent implements OnInit {

  public client: Client

  /**
   * Creates an instance of ClientViewComponent.
   * @param {ActivatedRoute} route
   * @param {ClientService} clientService
   *
   * @memberOf ClientViewComponent
   */
  constructor(
    public route: ActivatedRoute,
    public clientService: ClientService
  ) { }

  /**
   *
   *
   *
   * @memberOf ClientViewComponent
   */
  public ngOnInit(): void {
    this.getClient( this.route.snapshot.params[ 'id' ] )
  }

  /**
   * Carrega os dados do cliente que através do parametro id
   * passado pela URL
   * @memberOf ClientPage
   */
  public getClient( id: number ) {
    this.clientService.getById( id ).subscribe( client => this.client = client, error => this.handleError( error ) )
  }

  /**
   *
   *
   * @private
   * @param {*} error
   *
   * @memberOf ClientViewComponent
   */
  private handleError( error: any ): void {
    console.error( error )
  }
}
