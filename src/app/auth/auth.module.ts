import { Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'

import { ROUTES } from './auth.routes'

import { AuthComponent } from './auth.component'

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ROUTES
  ]
})
export default class AuthModule {
  constructor(private router: Router) {
    // Caso o usuário esteja logado, redireciona para o dashboard
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/app'])
      return
    }
  }
}
