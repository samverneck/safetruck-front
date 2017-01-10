import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

import { ForgotPassword } from './forgot-password.component.ts'
import { WidgetModule } from '../../layout/widget/widget.module'

export const routes = [
  { path: '', component: ForgotPassword, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    ForgotPassword
  ]
})
export default class ForgotPasswordModule {
  static routes = routes
}
