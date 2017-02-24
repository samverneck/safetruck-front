import { Pipe, PipeTransform } from '@angular/core'
import { Equipment } from './models/Equipment'

@Pipe( { name: 'search' })
export class SearchPipe implements PipeTransform {

  /**
   *
   *
   * @param {any} value
   * @param {any} [args]
   * @returns {Array<IEquipment>}
   *
   * @memberOf SearchPipe
   */
  public transform( value, args?): Array<Equipment> {
    let searchText = new RegExp( args, 'ig' )
    if ( value ) {
      return value.filter(( equipment: Equipment ) => {
        if ( equipment.code || equipment.install.client.companyName ) {
          return equipment.code.search( searchText ) !== -1
            || equipment.install.client.alias.search( searchText ) !== -1
            || equipment.install.client.companyName.search( searchText ) !== -1
        }
      })
    }
  }
}
