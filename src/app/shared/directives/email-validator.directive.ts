import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function validateEmail( control: AbstractControl ) {

  if ( !control.value ) { return null }

  let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return EMAIL_REGEXP.test( control.value ) ? null : {
    email: {
      valid: false
    }
  }
}

@Directive( {
  selector: '[email][ngModel]',
  providers: [ { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }]
})
export class EmailValidatorDirective { }
