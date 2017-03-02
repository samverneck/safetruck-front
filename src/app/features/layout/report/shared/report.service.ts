import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { AuthService, BaseService } from '../../../../core'
import { Filter } from './models/Filter'
import { ReportData } from './models/Report'

@Injectable()
export class ReportService extends BaseService<ReportData> {

  /**
   * Creates an instance of ReportService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf ReportService
   */
  constructor( http: Http, auth: AuthService ) {
    super( http, auth )
    super.setResource( 'reports' )
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
  public generateReport( filter: Filter ): Observable<ReportData> {
    return this.http
      .get( `${API_URL}/report?plaque=${filter.plaque}&&dtIni=${filter.start}&dtEnd=${filter.finish}`, this.requestOptions )
      .map( this.extractData )
      .catch( this.handleError )
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
  public getReportHtml( filter: Filter ): Observable<string> {
    return this.http
      .get( `${API_URL}/report/printable?plaque=${filter.plaque}&&dtIni=${filter.start.toISOString()}&dtEnd=${filter.finish.toISOString()}`, this.requestOptions )
      .map( this.extractDataHtml )
      .catch( this.handleError )
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
      .get( `${API_URL}/equipments`, this.requestOptions )
      .map( data => {
        return data.json()
          .filter( equip => equip.install )
          .map( equip => equip.install.plaque )
      } )
      .catch( this.handleError )
  }
}
