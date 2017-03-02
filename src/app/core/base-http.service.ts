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
   * @param {string} url
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   */
  public get( url: string, options?: RequestOptionsArgs ): Observable<Response> {
    return this.intercept( super.get( url, options ) )
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   */
  public post( url: string, body: any, options?: RequestOptionsArgs ): Observable<Response> {
    return this.intercept( super.post( url, body, options ), 15000 )
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {RequestOptionsArgs} [options]
   * @returns {Observable<Response>}
   *
   * @memberOf BaseHttp
   */
  public put( url: string, body: any, options?: RequestOptionsArgs ): Observable<Response> {
    return this.intercept( super.put( url, body, options ), 15000 )
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
  private intercept( observable: Observable<Response>, timeout = 5000 ): Observable<Response> {
    return observable
      .timeout( timeout )
      .retryWhen( attempts => this.retryWhen( attempts ) )
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

  /**
   *
   *
   * @private
   * @param {any} error
   * @returns {*}
   */
  private retryWhen( errors: Observable<Response> ): any {
    return errors.delay( 500 )
      .scan(( errorCount, error ) => {
        if ( errorCount >= 2 || ( error.status >= 400 && error.status < 500 ) ) {
          throw error
        }
        return errorCount + 1
      }, 0 )
  }
}
