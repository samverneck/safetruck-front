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
      return value.filter( client => client.name.search( searchText ) !== -1 || client.email.search( searchText ) !== -1 )
    }
  }
}
