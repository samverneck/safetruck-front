import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { BaseModel } from './models/BaseModel'
import { AuthService } from './auth.service'

@Injectable()
export class BaseService<T extends BaseModel> {

  public requestOptions: RequestOptions
  public resource: string

  /**
   * Creates an instance of BaseService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf BaseService
   */
  constructor( public http: Http, public auth: AuthService ) {
    this.requestOptions = this.auth.getRequestOptions()
  }

  /**
   *
   *
   * @param {string} resource
   *
   * @memberOf BaseService
   */
  public setResource( resource: string ): void {
    this.resource = resource
  }

  /**
   *
   *
   * @param {T} model
   * @returns {Observable<T>}
   *
   * @memberOf BaseService
   */
  public save( model: T ): Observable<T> {
    if ( model.id ) {
      return this.update( model )
    }
    return this.create( model )
  }

  /**
   *
   *
   * @param {T} model
   * @returns {Observable<T>}
   *
   * @memberOf BaseService
   */
  public create( model: T ): Observable<T> {
    return this.http
      .post( `${API_URL}/${this.resource}`, model, this.requestOptions )
      .map( this.extractData )
      .catch( this.handleError )
  }

  /**
   *
   *
   * @param {T} model
   * @returns {Observable<T>}
   *
   * @memberOf BaseService
   */
  public update( model: T ): Observable<T> {
    return this.http
      .put( `${API_URL}/${this.resource}/${model.id}`, model, this.requestOptions )
      .map( this.extractData )
      .catch( this.handleError )
  }

  /**
   *
   *
   * @param {T} model
   * @returns {Observable<T>}
   *
   * @memberOf BaseService
   */
  public delete( model: T ): Observable<T> {
    return this.http
      .delete( `${API_URL}/${this.resource}/${model.id}`, this.requestOptions )
      .map( this.extractData )
      .catch( this.handleError )
  }

  /**
   *
   *
   * @returns {Observable<T[]>}
   *
   * @memberOf BaseService
   */
  public getAll(): Observable<T[]> {
    return this.http
      .get( `${API_URL}/${this.resource}`, this.requestOptions )
      .map( this.extractData )
      .catch( this.handleError )
  }

  /**
   *
   *
   * @param {any} id
   * @returns {Observable<T>}
   *
   * @memberOf BaseService
   */
  public getById( id ): Observable<T> {
    return this.http
      .get( `${API_URL}/${this.resource}/${id}`, this.requestOptions )
      .map( this.extractData )
      .catch( this.handleError )
  }

  /**
   *
   *
   * @param {Response} res
   * @returns
   *
   * @memberOf BaseService
   */
  public extractData( res: Response ) {
    let body = res.json()
    return body
  }

  /**
   *
   *
   * @param {Response} res
   * @returns
   *
   * @memberOf BaseService
   */
  public extractDataHtml( res: Response ) {
    let body = res.text()
    return body
  }

  /**
   *
   *
   * @param {(Response | any)} error
   * @returns
   *
   * @memberOf BaseService
   */
  public handleError( error: Response | any ) {
    let errMsg: string
    if ( error instanceof Response ) {
      const body = error.json() || ''
      errMsg = body.message || JSON.stringify( body )
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    return Observable.throw( errMsg )
  }
}
