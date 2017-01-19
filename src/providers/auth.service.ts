import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class AuthService {
    public token: string

    constructor(private http: Http) {
      // set token if saved in local storage
      let currentUser = JSON.parse(localStorage.getItem('currentUser'))
      this.token = currentUser && currentUser.token
    }

    login(email: string, password: string): Observable<boolean> {
      let headers = new Headers({ 'Content-Type': 'application/json' })
      let options = new RequestOptions({ headers: headers })

      return this.http.post(`${API_URL}/login`, { email: email, password: password }, options)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json()
          console.log(token)

          if (token) {
            // set token property
            this.token = token
            // store email and jwt token in local storage to
            // keep user logged in between page refreshes
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ email: email, token: token })
            )

            // return true to indicate successful login
            return true
            } else {
              // return false to indicate failed login
              return false
            }
          })
    }

    logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null
      localStorage.removeItem('currentUser')
      localStorage.removeItem('userData')
    }

    getHeaders() {
      let authToken = this.user().token
      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', authToken)

      return new RequestOptions({ headers: headers })
    }

    user() {
      return localStorage.getItem('currentUser')
        ? JSON.parse(localStorage.getItem('currentUser'))
        : false
    }

}
