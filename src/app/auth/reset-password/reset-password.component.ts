import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService }  from '../../../providers/login.service'

@Component({
  selector: 'reset-password-page',
  styleUrls: [ './reset-password.styles.scss' ],
  templateUrl: './reset-password.template.html'
})

export class ResetPassword {

  constructor(public login: LoginService, public router: Router) {
    console.log('reset...')
  }

}
