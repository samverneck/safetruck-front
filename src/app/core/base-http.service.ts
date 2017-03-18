import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {
  Http,
  Response,
  Request,
  RequestOptions,
  ConnectionBackend,
  RequestOptionsArgs
} from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class BaseHttp extends Http {

  /**
   * Creates an instance of AppHttp.
   *
   * @param {ConnectionBackend} backend
   * @param {RequestOptions} defaultOptions
   */
  constructor( private router: Router, backend: ConnectionBackend, defaultOptions: RequestOptions ) {
    super( backend, defaultOptions )
  }

  /**
   *
   *
   * @param {(string | Request)} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   */
  public request( url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
    return this.intercept( super.request( url, options ) )
  }

  /**
   *
   *
   * @private
   * @param {Observable<Response>} observable
   * @param {number} [timeout=5000]
   * @returns {Observable<Response>}
   *
   * @memberOf BaseHttp
   */
  private intercept( observable: Observable<Response>, timeout = 2 ): Observable<Response> {
    return observable
      .catch(( error, source ) => this.handleError( error ) )
      .finally<Response>(() => console.log( 'finally' ) )
  }

  /**
   *
   *
   * @private
   * @param {*} error
   */
  private handleError( error: any ) {
    if ( error.status === 401 && !error.url.includes( error.url, 'login' ) ) {
      this.router.navigate( [ '/auth/login' ] )
      return Observable.empty()
    }

    let errorMsg: string
    if ( error instanceof Response ) {
      const body = error.json() || ''
      errorMsg = body.message || JSON.stringify( body )
    } else {
      errorMsg = ( error.message ) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    }
    console.error( `handleError: ${errorMsg}` )
    return Observable.throw( errorMsg )
  }
}
