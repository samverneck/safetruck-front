import { Directive } from '@angular/core'
import { AbstractControl, NG_VALIDATORS } from '@angular/forms'

/** A hero's name can't match the given regular expression */
export function validateDate( control: AbstractControl ) {

  if ( !control.value ) { return null }

  const value = control.value.toString().replace( /_/g, '' )
  // verificando data
  const [ , day, month, year ] = value.match( /(\d{2})\/(\d{2})\/(\d{4})/ ) || [ 0, 0, 0, 0 ]

  return !/Invalid|NaN/.test( new Date( `${month}/${day}/${year}` ).toString() ) ? null : {
    date: { valid: false }
  }
}

@Directive( {
  selector: '[date][ngModel]',
  providers: [ { provide: NG_VALIDATORS, useValue: validateDate, multi: true }]
} )
export class DateValidatorDirective { }
