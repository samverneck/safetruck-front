import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class CepService {

  public data: any

  /**
   * Creates an instance of CepService.
   * @param {Http} http
   *
   * @memberOf CepService
   */
  constructor(private http: Http) {
    this.data = null
  }

  /**
   *
   *
   * @param {string} cep
   * @returns {Observable<any>}
   *
   * @memberOf CepService
   */
  public getAddress(cep: string): Observable<any> {

    return this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .map(this.extractData)
  }

  /**
   *
   *
   * @private
   * @param {Response} res
   * @returns
   *
   * @memberOf CepService
   */
  private extractData(res: Response) {
    let body = res.json()
    return body
  }
}
