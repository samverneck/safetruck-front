import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map'

import { Messages } from './../utils/Messages'

@Injectable()
export class ValidationService {
  messages = new Messages()
  constructor() {}

  showNotification(input) {
    // exibe a mensagem de erro informando o campo
    if ($(`[name="${input.name}"]`).attr('validate')) {
      let field = $(`[name="${input.name}"]`).attr('validate')
      let notification = `O campo ${field} é obrigatório`
      this.messages.showNotification(notification, 'error')
    }
  }

  validateForm(formId: string) {
    let form = $(formId)
    let isValid: boolean = true
    let data = form.serializeArray()
    data.map((input) => {
      $(`[name="${input.name}"]`).removeClass('error')
      if (this.simpleValidation(input)) {
        isValid = false
        // adiciona a classe de erro ao input
        $(`[name="${input.name}"]`).addClass('error')
        this.showNotification(input)
      }
    })

    return isValid
  }

  simpleValidation(input) {
    if ($(`[name="${input.name}"]`).attr('validate')) {
      return input.value === ''
    }
  }

  validateCnpj(val) {
    // tslint:disable:no-shadowed-variable
    // tslint:disable:no-conditional-assignment
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
