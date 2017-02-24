import { NgModule } from '@angular/core'
import { Router } from '@angular/router'

// modules
import { SharedModule } from '../../shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'

// components
import { AuthComponent } from './auth.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LoginComponent } from './login/login.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

@NgModule( {
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export default class AuthModule {

  /**
   * Creates an instance of AuthModule.
   * @param {Router} router
   *
   * @memberOf AuthModule
   */
  constructor( private router: Router ) {
    // Caso o usuário esteja logado, redireciona para o dashboard
    if ( localStorage.getItem( 'currentUser' ) ) {
      this.router.navigate( [ '/app' ] )
      return
    }
  }
}
