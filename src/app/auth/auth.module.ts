import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { Auth } from './auth.component'

export const routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: Auth, pathMatch: 'full' },
  { path: 'forgot', component: Auth, name: 'forgot' },
  { path: 'reset', component: Auth, name: 'reset' }
]

@NgModule({
  declarations: [
    Auth
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export default class LoginModule {
  static routes = routes
}
