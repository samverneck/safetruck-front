import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'SearchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig')
    if (value) {
      return value.filter(client => {
        if (client.companyName) {
          return client.companyName.search(searchText) !== -1
        }
      })
    }
  }
}
