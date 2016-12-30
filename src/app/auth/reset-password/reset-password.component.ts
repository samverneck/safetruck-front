import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'reset-password-page',
  styleUrls: [ './reset-password.styles.scss' ],
  templateUrl: './reset-password.template.html'
})

export class ResetPassword {

  constructor(public router: Router) {
    console.log('reset...')
  }

  resetPassword() {
    //
  }
}
