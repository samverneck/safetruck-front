import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map'

import { Messages } from './../utils/Messages'
declare var $: any

@Injectable()
export class ValidationService {

  public messages = new Messages()

  /**
   *
   *
   * @param {any} input
   * @param {any} [customMsg]
   *
   * @memberOf ValidationService
   */
  public showNotification(input, customMsg?) {
    // exibe a mensagem de erro informando o campo
    if ($(`[name="${input.name}"]`).attr('validate')) {
      let field = $(`[name="${input.name}"]`).attr('validate')
      let notification = `O campo ${field} é obrigatório`
      if (customMsg) {
        notification = customMsg
      }
      this.messages.showNotification(notification, 'error')
    }
  }

  /**
   *
   *
   * @param {any} name
   *
   * @memberOf ValidationService
   */
  public addErrorClass(name) {
    $(`[name="${name}"]`).addClass('error')
  }

  /**
   *
   *
   * @param {any} name
   *
   * @memberOf ValidationService
   */
  public removeErrorClass(name) {
    $(`[name="${name}"]`).removeClass('error')
  }

  /**
   *
   *
   * @param {string} formId
   * @returns
   *
   * @memberOf ValidationService
   */
  public validateForm(formId: string) {
    let form = $(formId)
    let isValid: boolean = true
    let data = form.serializeArray()

    let errors = []
    data.map((input) => {
      this.removeErrorClass(input.name)
      if (this.isInvalidCommon(input)) {
        this.addErrorClass(input.name)
        errors.unshift({ input: input, customMsg: null })
        isValid = false
      }
      if (this.isInvalidadeDate(input)) {
        let field = $(`[name="${input.name}"]`).attr('validate')
        this.addErrorClass(input.name)
        errors.unshift({ input: input, customMsg: `A data informada em ${field} não é válida` })
        isValid = false
      }
    })

    // exibe os alertas
    errors.map(err => {
      this.showNotification(err.input, err.customMsg)
    })

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
  public isInvalidCommon(input) {
    if ($(`[name="${input.name}"]`).attr('validate')) {
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
  public isInvalidadeDate(input) {
    // tslint:disable:max-line-length
    if (input.name === 'installation') {
      return !/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(input.value)
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
  public isValidCnpj(val) {
    // tslint:disable:no-shadowed-variable
    // tslint:disable:no-conditional-assignment
    // tslint:disable:curly
    // tslint:disable:one-variable-per-declaration
    // tslint:disable:no-constant-condition
    let b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let c, n
    if ((c = c.replace(/[^\d]/g, '')).length !== 14)
      return false
    if (/0{14}/.test(c))
      return false
    for (let i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if (c[12] !== (((n %= 11) < 2) ? 0 : 11 - n))
      return false
    for (let i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if (c[13] !== (((n %= 11) < 2) ? 0 : 11 - n))
      return false
    return true
  }
}
