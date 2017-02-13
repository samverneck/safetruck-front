import { IBaseModel } from '../interfaces/IBaseModel'
import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { AuthService } from './auth.service'
import { IBaseService } from './../interfaces/IBaseService'

@Injectable()
export class BaseService<T extends IBaseModel> implements IBaseService {
  headerOptions: RequestOptions
  resource: string

  constructor(public http: Http, public auth: AuthService) {
    this.headerOptions = this.auth.getHeaders()
  }

  public setResource(resource: string): void {
    this.resource = resource
  }

  public save(model: T): Observable<T> {
    if (model.id) {
      return this.update(model)
    }
    return this.create(model)
  }

  public create(model: T): Observable<T> {
    return this.http
      .post(`${API_URL}/${this.resource}`, model, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public update(model: T): Observable<T> {
    return this.http
      .put(`${API_URL}/${this.resource}/${model.id}`, model, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public delete(model: T): Observable<T> {
    return this.http
      .delete(`${API_URL}/${this.resource}/${model.id}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public getAll(): Observable<T[]> {
    return this.http
      .get(`${API_URL}/${this.resource}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public getById(id): Observable<T> {
    return this.http
      .get(`${API_URL}/${this.resource}/${id}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public extractData(res: Response) {
    let body = res.json()
    return body
  }

  public extractDataHtml(res: Response) {
    let body = res.text()
    return body
  }

  public handleError (error: Response | any) {
    let errMsg: string
    if (error instanceof Response) {
      const body = error.json() || ''
      errMsg = body.message || JSON.stringify(body)
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    return Observable.throw(errMsg)
  }
}
