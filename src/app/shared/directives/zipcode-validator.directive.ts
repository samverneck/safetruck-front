import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function validateZipCode( control: AbstractControl ) {

  if ( !control.value ) { return null }

  let ZIPCODE_REGEXP = /^\d{2}\.\d{3}-\d{3}$/

  return ZIPCODE_REGEXP.test( control.value ) ? null : {
    zipcode: {
      valid: false
    }
  }
}

@Directive( {
  selector: '[zipcode][ngModel]',
  providers: [ { provide: NG_VALIDATORS, useValue: validateZipCode, multi: true }]
})
export class ZipCodeValidatorDirective { }
