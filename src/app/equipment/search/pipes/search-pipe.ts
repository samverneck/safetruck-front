import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'SearchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig')
    if (value) {
      return value.filter(equip => {
        if (equip.name) {
          return equip.name.search(searchText) !== -1
        }
      })
    }
  }
}
