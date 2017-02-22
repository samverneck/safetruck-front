import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { AuthService } from './auth.service'
import { BaseService } from './base.service'
import { User } from './models/User'

@Injectable()
export class UserService extends BaseService<User> {

  /**
   * Creates an instance of UserService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf UserService
   */
  constructor(http: Http, auth: AuthService) {
    super(http, auth)
    super.setResource('me')
  }

  /**
   *
   *
   * @template T
   * @returns {Observable<any>}
   *
   * @memberOf UserService
   */
  public me(): Observable<User> {
    return this.http
      .get(`${API_URL}/${this.resource}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }
}
