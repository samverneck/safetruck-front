import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { LoginService }  from '../../providers/login.service'

@Component({
  selector: 'auth',
  styleUrls: [ './auth.style.scss' ],
  templateUrl: './auth.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'auth-page app'
  }
})

export class Auth {

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
