import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { AuthService } from './auth.service'
import { API } from './../config/Config'
import { IEquipment } from './../interfaces/IEquipment'

@Injectable()
export class EquipmentService {

  headerOptions: RequestOptions

  constructor(private http: Http, private auth: AuthService) {
    this.headerOptions = this.auth.getHeaders()
  }

  save(equip: IEquipment): Observable<any> {
    if (equip.id) {
      return this.update(equip)
    }
    return this.create(equip)
  }

  create(equip: IEquipment): Observable<any> {
    return this.http
      .post(API + 'equipments', equip, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  update(equip: IEquipment): Observable<any> {
    return this.http
      .put(`${API}clients/${equip.id}`, equip, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  delete(equip: IEquipment): Observable<any> {
    return this.http
      .delete(`${API}clients/${equip.id}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getEquipments(): Observable<any> {
    return this.http
      .get(API + 'equipments', this.headerOptions)
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
    return Observable.throw(errMsg)
  }
}
