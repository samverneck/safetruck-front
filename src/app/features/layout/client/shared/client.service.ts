import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

import { Client } from './models/Client'
import { AuthService, BaseService } from '../../../../core'

@Injectable()
export class ClientService extends BaseService<Client> {

  /**
   * Creates an instance of ClientService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf ClientService
   */
  constructor( http: Http, auth: AuthService ) {
    super( http, auth )
    super.setResource( 'clients' )
  }
}
