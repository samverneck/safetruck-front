import { Component, ViewEncapsulation } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'

declare var $: any
declare var swal: any

@Component({
  selector: 'forgot-password',
  styleUrls: ['./forgot-password.styles.scss'],
  templateUrl: './forgot-password.template.html',
  encapsulation: ViewEncapsulation.None
})

export class ForgotPasswordComponent {
  email: string
  errorMsg: string
  constructor(private http: Http) { }

  sendEmail() {
    $('.alert').hide()
    if (this.validateEMail(this.email)) {
      this.requestTokenByEmail({ email: this.email })
        .then(res => {
          swal(
            'E-mail enviado',
            'Em instantes você receberá um email com as informações para alteração da sua senha',
            'success'
          )
        })
        .catch(error => {
          console.log(error)
          this.errorMsg = 'O email informado não está cadastrado.'
          $('.alert').show('fast')
        })
    } else {
      this.errorMsg = 'O email informado não é um endereço de e-mail válido'
      $('.alert').show('fast')
    }
  }

  requestTokenByEmail(params) {
    return this.http
      .post(`${API_URL}/forgot`, params)
      .toPromise()
  }

  getTokenInfo(token) {
    return this.http
      .get(`${API_URL}/forgot/${token}`)
      .toPromise()
  }

  validateEMail(email) {
    return /^[\w\.\-]{3,}\@[a-zA-Z0-9\.\-]{3,}\.[A-Za-z]{2,}$/.test(email)
  }

}
