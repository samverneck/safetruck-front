import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from './../../../providers/auth.service'
declare var $: any

@Component({
  selector: 'login',
  styleUrls: [ './login.styles.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})

export class Login {
  email: string
  pass: string
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  authenticateUser() {
    $('.alert').hide()
    this.auth.login(this.email, this.pass).subscribe(result => {
      if (result === true) {
        this.router.navigate(['/app'])
      } else {
        $('.alert').show('fast')
      }
    })
  }

}
