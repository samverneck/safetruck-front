import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { AuthService } from './auth.service'
import { BaseService } from './base.service'
import { IBaseService } from './../interfaces/IBaseService'

@Injectable()
export class UserService extends BaseService implements IBaseService {

  constructor(http: Http, auth: AuthService) {
    super.setResource('me')
    super(http, auth)
  }

  public me<T>(): Observable<any> {
    return this.http
      .get(`${API_URL}/${this.resource}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }
}
