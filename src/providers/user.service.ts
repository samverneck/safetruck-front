import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { AuthService } from './auth.service'

const AUTH_URI = 'https://app.safetruck.com.br/api/v1/users'

@Injectable()
export class UserService {
  constructor(
    private http: Http,
    private authService: AuthService) {
  }

  getUsers(): Observable<any> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token })
    let options = new RequestOptions({ headers: headers })

    // get users from api
    return this.http.get(AUTH_URI, options)
          .map((response: Response) => response.json())
  }
}
