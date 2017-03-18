import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function validatePhone( control: AbstractControl ) {

  if ( !control.value ) { return null }

  let PHONE_REGEXP = /^\(\d{2}\)\s{1}\d{4,5}-\d{4}$/

  return PHONE_REGEXP.test( control.value ) ? null : {
    phone: {
      valid: false
    }
  }
}

@Directive( {
  selector: '[phone][ngModel]',
  providers: [ { provide: NG_VALIDATORS, useValue: validatePhone, multi: true }]
})
export class PhoneValidatorDirective { }
