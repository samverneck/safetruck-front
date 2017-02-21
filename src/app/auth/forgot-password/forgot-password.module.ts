import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

import { ForgotPasswordComponent } from './forgot-password.component'
import { WidgetModule } from '../../layout/widget/widget.module'

export const routes = [
  { path: '', component: ForgotPasswordComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    ForgotPasswordComponent
  ]
})
export default class ForgotPasswordModule {
  public static routes = routes
}
