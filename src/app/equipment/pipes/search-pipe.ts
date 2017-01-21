import { Pipe, PipeTransform } from '@angular/core'
import { IEquipment } from '../../../interfaces/IEquipment'

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe implements PipeTransform {
  transform(value, args?): Array<IEquipment> {
    let searchText = new RegExp(args, 'ig')
    if (value) {
      return value.filter((equipment: IEquipment) => {
        if (equipment.code || equipment.install.client.companyName) {
          return equipment.code.search(searchText) !== -1
            || equipment.install.client.alias.search(searchText) !== -1
            || equipment.install.client.companyName.search(searchText) !== -1
        }
      })
    }
  }
}
