import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { IClient } from './../interfaces/IClient'

// Rest endpoint para clients
const CLIENTS_URI = 'https://jsonplaceholder.typicode.com/users'

@Injectable()
export class ClientService {
  data: any
  constructor(private http: Http) {
    this.data = null
  }

  save(client: IClient): Observable<any> {
    if (client.id) {
      return this.update(client)
    }
    return this.create(client)
  }

  create(client: IClient): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    return this.http
      .post(CLIENTS_URI, { client }, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  update(client: IClient): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    return this.http
      .put(CLIENTS_URI, { client }, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getClients(): Observable<any> {
    return this.http
      .get(CLIENTS_URI)
      .map(this.extractData)
      .catch(this.handleError)
  }


  private extractData(res: Response) {
    let body = res.json()
    return body
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string
    if (error instanceof Response) {
      const body = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    console.error(errMsg)
    return Observable.throw(errMsg)
  }
}
