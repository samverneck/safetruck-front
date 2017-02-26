import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

import { User } from './models/User'
import { AuthService, BaseService } from '../../../../core'

@Injectable()
export class UsersService extends BaseService<User> {

  /**
   * Creates an instance of UserService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf UserService
   */
  constructor( http: Http, auth: AuthService ) {
    super( http, auth )
    super.setResource( 'users' )
  }
}
