import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { IBaseModel } from './../interfaces/IBaseModel'
import { AuthService } from './auth.service'

@Injectable()
export class BaseService {
  headerOptions: RequestOptions

  constructor(private http: Http, private auth: AuthService) {
    this.headerOptions = this.auth.getHeaders()
  }

  save<T>(model: IBaseModel): Observable<IBaseModel> {
    if (model.id) {
      return this.update(model)
    }
    return this.create(model)
  }

  create<T>(model: T): Observable<T> {
    return this.http
      .post(`${API_URL}/clients`, model, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  update<T>(model: IBaseModel): Observable<IBaseModel> {
    return this.http
      .put(`${API_URL}/clients/${model.id}`, model, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  delete<T>(model: IBaseModel): Observable<IBaseModel> {
    return this.http
      .delete(`${API_URL}/clients/${model.id}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getAll<T>(): Observable<T[]> {
    return this.http
      .get(`${API_URL}/clients`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body
  }

  private handleError (error: Response | any) {
    let errMsg: string
    if (error instanceof Response) {
      const body = error.json() || ''
      const err = body.message || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} - ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    return Observable.throw(errMsg)
  }
}
