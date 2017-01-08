import { Injectable } from '@angular/core'
import { Http, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { AuthService } from './auth.service'

@Injectable()
export class UserService {
  headerOptions: RequestOptions
  constructor(
    private http: Http,
    private auth: AuthService
  ) {
    this.headerOptions = this.auth.getHeaders()
  }

  getUsers(): Observable<any> {
    // get users from api
    return this.http.get(`${API_URL}/users`, this.headerOptions)
        .map((response: Response) => response.json())
  }
}
