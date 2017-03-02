import { Pipe, PipeTransform } from '@angular/core'
import { FormService } from '../../core/form.service'

@Pipe( { name: 'slugfy' })
export class SlugfyPipe implements PipeTransform {

  /**
   * Creates an instance of SlugifyPipe.
   * @param {any} FormService
   *
   * @memberOf SlugifyPipe
   */
  constructor( private utils: FormService ) { }

  /**
   *
   *
   * @param {any} value
   * @param {string[]} args
   * @returns {*}
   *
   * @memberOf EnumPipe
   */
  public transform( value ): any {
    if ( value ) {
      return this.utils.slugger( value )
    }
  }
}
