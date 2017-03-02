import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from './auth.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { LoginComponent } from './login/login.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forgot/:token', component: ForgotPasswordComponent },
      { path: 'confirmation/:token', component: ResetPasswordComponent },
      { path: 'forgot', component: ForgotPasswordComponent }
    ]
  }
]

@NgModule( {
  imports: [
    RouterModule,
    RouterModule.forChild( authRoutes )
  ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
