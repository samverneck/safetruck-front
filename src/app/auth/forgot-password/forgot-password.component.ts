import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService }  from '../../../providers/login.service'

@Component({
  selector: 'forgot-password-page',
  styleUrls: [ './forgot-password.styles.scss' ],
  templateUrl: './forgot-password.template.html'
})

export class ForgotPassword {

  constructor(public login: LoginService, public router: Router) {
    console.log('Forgot...')
  }

  sendEmail() {
    alert('E-mail enviado...')
  }

}
