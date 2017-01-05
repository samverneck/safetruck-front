import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

// Rest endpoint para clients
// tslint:disable-next-line:max-line-length
const REPORT_URI = 'https://gist.githubusercontent.com/Petronetto/6f6108605072163ba4d6551decb54eda/raw/c99de3de3a4f9539d2f3512c8f0e2065a152d26c/report.json'

@Injectable()
export class ReportService {

  constructor(private http: Http) {}

  getReports(): Observable<any> {
    return this.http
      .get(REPORT_URI)
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
