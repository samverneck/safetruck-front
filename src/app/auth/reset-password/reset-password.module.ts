import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

import { ResetPassword } from './reset-password.component.ts'
import { WidgetModule } from '../../layout/widget/widget.module'

export const routes = [
  { path: '', component: ResetPassword, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    ResetPassword
  ]
})
export default class ResetPasswordModule {
  static routes = routes
}
