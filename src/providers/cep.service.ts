import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class CepService {
  data: any
  constructor(private http: Http) {
    this.data = null
  }

  getAddress(cep: string): Observable<any> {

    return this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body
  }
}
