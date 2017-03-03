import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import * as decode from 'jwt-decode'

import { User } from '../features/layout/users/shared'

@Injectable()
export class AuthService {
  public token: string

  /**
   * Creates an instance of AuthService.
   * @param {Http} http
   *
   * @memberOf AuthService
   */
  constructor( private http: Http ) {
    // set token if saved in local storage
    let currentUser = JSON.parse( localStorage.getItem( 'currentUser' ) )
    this.token = currentUser && currentUser.token
  }

  /**
   *
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<boolean>}
   *
   * @memberOf AuthService
   */
  public login( email: string, password: string ): Observable<boolean> {
    let headers = new Headers( { 'Content-Type': 'application/json' } )
    let options = new RequestOptions( { headers: headers } )

    return this.http.post( `${API_URL}/login`, { email: email, password: password }, options )
      .map(( response: Response ) => {
        // login successful if there's a jwt token in the response
        let token = response.json()
        console.log( decode( token ) )

        if ( token ) {
          // set token property
          this.token = token
          // store email and jwt token in local storage to
          // keep user logged in between page refreshes
          localStorage.setItem( 'currentUser', JSON.stringify( { email: email, token: token } ) )

          // return true to indicate successful login
          return true
        } else {
          // return false to indicate failed login
          return false
        }
      } )
  }

  /**
   *
   *
   *
   * @memberOf AuthService
   */
  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null
    localStorage.removeItem( 'currentUser' )
    localStorage.removeItem( 'userData' )
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf AuthService
   */
  public getRequestOptions(): RequestOptions {
    let authToken = JSON.parse( localStorage.getItem( 'currentUser' ) ).token
    let headers = new Headers()
    headers.append( 'Content-Type', 'application/json' )
    headers.append( 'Authorization', authToken )

    return new RequestOptions( { headers: headers } )
  }

  /**
   *
   *
   * @returns
   *
   * @memberOf AuthService
   */
  public user(): User {
    const user: User = localStorage.getItem( 'currentUser' )
      ? decode( JSON.parse( localStorage.getItem( 'currentUser' ) ).token )
      : false
    return user
  }

}
