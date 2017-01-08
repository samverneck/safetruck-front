import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { AuthService } from './auth.service'
import { IClient } from './../interfaces/IClient'

@Injectable()
export class ClientService {
  headerOptions: RequestOptions

  constructor(private http: Http, private auth: AuthService) {
    this.headerOptions = this.auth.getHeaders()
  }

  save(client: IClient): Observable<IClient> {
    if (client.id) {
      return this.update(client)
    }
    return this.create(client)
  }

  create(client: IClient): Observable<IClient> {
    return this.http
      .post(`${API_URL}/clients`, client, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  update(client: IClient): Observable<any> {
    return this.http
      .put(`${API_URL}/clients/${client.id}`, client, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  delete(client: IClient): Observable<any> {
    return this.http
      .delete(`${API_URL}/clients/${client.id}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getClients(): Observable<IClient[]> {
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
