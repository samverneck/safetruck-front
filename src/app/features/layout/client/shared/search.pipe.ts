import { Pipe, PipeTransform } from '@angular/core'

@Pipe( { name: 'search' })
export class SearchPipe implements PipeTransform {

  /**
   *
   *
   * @param {any} value
   * @param {any} [args]
   * @returns {Array<any>}
   *
   * @memberOf SearchPipe
   */
  public transform( value, args?): Array<any> {
    let searchText = new RegExp( args, 'ig' )
    if ( value ) {
      return value.filter( client => {
        if ( client.companyName || client.cnpj ) {
          return client.companyName.search( searchText ) !== -1
            || client.cnpj.search( searchText ) !== -1
        }
      })
    }
  }
}
