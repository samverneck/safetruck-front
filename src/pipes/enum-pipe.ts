import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'keys'})
export class EnumPipe implements PipeTransform {

  /**
   *
   *
   * @param {any} value
   * @param {string[]} args
   * @returns {*}
   *
   * @memberOf EnumPipe
   */
  public transform(value, args: string[]): any {
    let keys = []
    for (let enumMember in value) {
      if (value.hasOwnProperty(enumMember)) {
        let isValueProperty = parseInt(enumMember, 10) >= 0
        if (isValueProperty) {
          keys.push({ key: enumMember, value: value[enumMember] })
          // Uncomment if you want log
          // console.log("enum member: ", value[enumMember]);
        }
      }
    }
    return keys
  }
}
