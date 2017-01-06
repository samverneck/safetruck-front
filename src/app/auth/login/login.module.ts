import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

import { Login } from './login.component.ts'
import { WidgetModule } from '../../layout/widget/widget.module'

export const routes = [
  { path: '', component: Login, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    Login
  ]
})
export default class LoginModule {
  static routes = routes
}
