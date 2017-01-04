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
    let part1 = cep.split('.')
    let part2 = part1[1].split('-')
    let formatedCep = `${part1[0]}${part2[0]}${part2[1]}`
    if (!formatedCep) {
      return
    }

    return this.http
      .get(`https://viacep.com.br/ws/${formatedCep}/json/`)
      .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body
  }
}




  // address: response.json().logradouro,
  // district: response.json().bairro,
  // city: response.json().localidade,
  // state: response.json().uf
