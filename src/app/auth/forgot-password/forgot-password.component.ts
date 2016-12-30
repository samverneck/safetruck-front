import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'forgot-password-page',
  styleUrls: [ './forgot-password.styles.scss' ],
  templateUrl: './forgot-password.template.html'
})

export class ForgotPassword {
  email: string
  constructor(public router: Router) {}

  sendEmail() {
    $('.alert').hide()
    if (/^[\w\.\-]{3,}\@[a-zA-Z0-9\.\-]{3,}\.[A-Za-z]{2,}$/.test(this.email)) {
      this.router.navigate(['/auth/reset-password'])
    } else {
      $('.alert').show('fast')
    }
  }

}
