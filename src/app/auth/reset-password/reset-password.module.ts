import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

import { ResetPasswordComponent } from './reset-password.component'
import { WidgetModule } from '../../layout/widget/widget.module'

export const routes = [
  { path: '', component: ResetPasswordComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    ResetPasswordComponent
  ]
})
export default class ResetPasswordModule {
  static routes = routes
}
