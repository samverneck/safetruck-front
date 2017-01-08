import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { AuthService } from './auth.service'
import { IReportData } from './../interfaces/IReport'

@Injectable()
export class ReportService {

  headerOptions: RequestOptions

  constructor(private http: Http, private auth: AuthService) {
    this.headerOptions = this.auth.getHeaders()
  }

  getReport(plaque: string, start, finish): Observable<IReportData> {
    return this.http
      .get(`${API_URL}report?plaque=${plaque}&&dtIni=${start}&dtEnd=finish`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getPlaques(): Observable<any> {
    console.log(API_URL)
    return this.http
      .get(`${API_URL}/equipments`, this.headerOptions)
      .map(data => {
        return data.json()
          .filter(equip => equip.install)
          .map(equip => equip.install.plaque)
      })
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
