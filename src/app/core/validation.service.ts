import { Injectable } from '@angular/core'
import { NgForm } from '@angular/forms'

import { MessagesService } from './messages.service'

@Injectable()
export class ValidationService {

  /**
   * Creates an instance of ValidationService.
   * @param {MessagesService} privateMessages
   *
   * @memberOf ValidationService
   */
  constructor( private messages: MessagesService ) { }

  /**
   *
   *
   * @param {any} input
   * @param {any} [customMsg]
   *
   * @memberOf ValidationService
   */
  public showNotification( input, customMsg?) {
    // exibe a mensagem de erro informando o campo
    if ( $( `[name="${input.name}"]` ).attr( 'validate' ) ) {
      let field = $( `[name="${input.name}"]` ).attr( 'validate' )
      let notification = `O campo ${field} é obrigatório`
      if ( customMsg ) {
        notification = customMsg
      }
      this.messages.showNotification( notification, 'error' )
    }
  }

  /**
   *
   *
   * @param {any} name
   *
   * @memberOf ValidationService
   */
  public addErrorClass( name ) {
    $( `[name="${name}"]` ).addClass( 'error' )
  }

  /**
   *
   *
   * @param {any} name
   *
   * @memberOf ValidationService
   */
  public removeErrorClass( name ) {
    $( `[name="${name}"]` ).removeClass( 'error' )
  }

  /**
   *
   *
   * @param {string} formId
   * @returns
   *
   * @memberOf ValidationService
   */
  public validateForm( formId: string ) {
    let form = $( formId )
    let isValid: boolean = true
    let data = form.serializeArray()

    let errors = []
    data.map(( input ) => {
      this.removeErrorClass( input.name )
      if ( this.isInvalidCommon( input ) ) {
        this.addErrorClass( input.name )
        errors.unshift( { input: input, customMsg: null } )
        isValid = false
      }
      if ( this.isInvalidadeDate( input ) ) {
        let field = $( `[name="${input.name}"]` ).attr( 'validate' )
        this.addErrorClass( input.name )
        errors.unshift( { input: input, customMsg: `A data informada em ${field} não é válida` } )
        isValid = false
      }
    } )

    // exibe os alertas
    errors.map( err => {
      this.showNotification( err.input, err.customMsg )
    } )

    return isValid
  }

  /**
   *
   *
   * @param {any} input
   * @returns
   *
   * @memberOf ValidationService
   */
  public isInvalidCommon( input ) {
    if ( $( `[name="${input.name}"]` ).attr( 'validate' ) ) {
      return input.value === ''
    }

    return false
  }

  /**
   *
   *
   * @param {any} input
   * @returns
   *
   * @memberOf ValidationService
   */
  public isInvalidadeDate( input ) {
    // tslint:disable:max-line-length
    if ( input.name === 'installation' ) {
      return !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test( input.value )
    }

    return false
  }

  /**
   *
   *
   * @param {any} val
   * @returns
   *
   * @memberOf ValidationService
   */
  public isValidCnpj( cnpj ) {
    // tslint:disable:no-shadowed-variable
    // tslint:disable:no-conditional-assignment
    // tslint:disable:curly
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:no-constant-condition
    cnpj = cnpj.replace( /[^\d]+/g, '' )

    if ( cnpj === '' ) return false

    if ( cnpj.length !== 14 )
      return false

    // Elimina CNPJs invalidos conhecidos
    if ( cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999' )
      return false

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring( 0, tamanho )
    let digitos = cnpj.substring( tamanho )
    let soma = 0
    let pos = tamanho - 7
    for ( let i = tamanho; i >= 1; i-- ) {
      soma += numeros.charAt( tamanho - i ) * pos--
      if ( pos < 2 )
        pos = 9
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if ( resultado !== digitos.charAt( 0 ) )
      return false

    tamanho = tamanho + 1
    numeros = cnpj.substring( 0, tamanho )
    soma = 0
    pos = tamanho - 7
    for ( let i = tamanho; i >= 1; i-- ) {
      soma += numeros.charAt( tamanho - i ) * pos--
      if ( pos < 2 )
        pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
    if ( resultado !== digitos.charAt( 1 ) )
      return false

    return true
  }

  /**
   *
   *
   * @param {FormGroup} form
   * @param {*} validationMessages
   * @param {*} [data]
   * @returns
   *
   * @memberOf ClientRegisterComponent
   */
  public getFormErrors( ngForm: NgForm, validationMessages: any ) {
    if ( !ngForm ) {
      return
    }
    const form = ngForm.form

    // build form errors Object from validationMessages Object (same structure)
    let errors = Object.assign( {}, ...Object.keys( validationMessages ).map( key => ( { [ key ]: '' } ) ) )

    for ( const field in errors ) {
      const control = form.controls[ field ]
      if ( control && control.dirty && !control.valid ) {
        const messages = validationMessages[ field ]
        for ( const key in control.errors ) {
          errors[ field ] += `${messages[ key ]} `
        }
      }
    }

    return errors
  }

  /**
   *
   *
   * @returns {string}
   *
   * @memberOf ClientRegisterComponent
   */
  public getValidationMessage( errors ): string {
    return Object.keys( errors ).map( key => {
      const error = errors[ key ]
      if ( error ) {
        return `- ${error}`
      }
    } ).join( '<br>' )
  }
}
