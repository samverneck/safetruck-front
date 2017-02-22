import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ReportData } from './models/Report'
import { AuthService, BaseService } from '../../../../core'

@Injectable()
export class ReportService extends BaseService<ReportData> {

  /**
   * Creates an instance of ReportService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf ReportService
   */
  constructor(http: Http, auth: AuthService) {
    super(http, auth)
    super.setResource('reports')
  }

  /**
   *
   *
   * @param {string} plaque
   * @param {any} start
   * @param {any} finish
   * @returns {Observable<IReportData>}
   *
   * @memberOf ReportService
   */
  public getReport(plaque: string, start, finish): Observable<ReportData> {
    return this.http
      .get(`${API_URL}/report?plaque=${plaque}&&dtIni=${start}&dtEnd=${finish}`, this.headerOptions)
      .map(this.extractData)
      .catch(this.handleError)
  }

  /**
   *
   *
   * @param {string} plaque
   * @param {any} start
   * @param {any} finish
   * @returns {Observable<string>}
   *
   * @memberOf ReportService
   */
  public getReportHtml(plaque: string, start, finish): Observable<string> {
    return this.http
      .get(`${API_URL}/report/printable?plaque=${plaque}&&dtIni=${start}&dtEnd=${finish}`, this.headerOptions)
      .map(this.extractDataHtml)
      .catch(this.handleError)
  }

  /**
   *
   *
   * @returns {Observable<any>}
   *
   * @memberOf ReportService
   */
  public getPlaques(): Observable<any> {
    return this.http
      .get(`${API_URL}/equipments`, this.headerOptions)
      .map(data => {
        return data.json()
          .filter(equip => equip.install)
          .map(equip => equip.install.plaque)
      })
      .catch(this.handleError)
  }
}
