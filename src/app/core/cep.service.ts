import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class CepService {

  public data: any

  /**
   * Creates an instance of CepService.
   * @param {Http} http
   *
   * @memberOf CepService
   */
  constructor( private http: Http ) {
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
  public getAddress( zipcode: string ): Observable<any> {
    let strippedZipcode = zipcode.replace( /\D/g, '' )
    if ( !strippedZipcode ) {
      return Observable.throw( 'CEP inválido para consulta' )
    }
    return this.http
      .get( `https://viacep.com.br/ws/${strippedZipcode}/json/` )
      .map(( res: Response ) => {
        let address = res.json()
        return address.erro ? address : {
          address: address.logradouro,
          zipcode: zipcode,
          city: address.localidade,
          district: address.bairro,
          complement: address.complemento,
          state: address.uf
        }
      } )
      .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) )
  }
}
