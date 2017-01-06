import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { API } from './../config/Config'
import { IEquipment } from './../interfaces/IEquipment'

@Injectable()
export class EquipmentService {

  constructor(private http: Http) {}

  save(equip: IEquipment): Observable<any> {
    if (equip.id) {
      return this.update(equip)
    }
    return this.create(equip)
  }

  create(equip: IEquipment): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    return this.http
      .post(API + 'equipments', { equip }, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  update(equip: IEquipment): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    return this.http
      .put(API + 'equipments', { equip }, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getEquipments(): Observable<any> {
    return this.http
      .get(API + 'equipments')
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
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    console.error(errMsg)
    return Observable.throw(errMsg)
  }
}
