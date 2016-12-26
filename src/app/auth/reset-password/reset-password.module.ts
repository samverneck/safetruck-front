import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'

import 'jquery.animate-number/jquery.animateNumber.js'
import 'jQuery-Mapael/js/jquery.mapael.js'
import 'jQuery-Mapael/js/maps/usa_states'
import 'bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.js'

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
