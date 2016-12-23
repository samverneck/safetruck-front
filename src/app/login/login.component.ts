import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService }  from '../../providers/login.service'

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})

export class Login {

  user: string
  pass: string

  constructor(public login: LoginService, public router: Router) {}

  authenticateUser() {
    $('.alert').hide()
    if (this.login.authenticate(this.user, this.pass)) {
      this.router.navigate(['app'])

      return
    }

    $('.alert').show('fast')
  }
}
