import { NgModule }      from '@angular/core'
import { CommonModule }  from '@angular/common'

import { RouterModule } from '@angular/router'

import 'jquery.animate-number/jquery.animateNumber.js'
import 'jQuery-Mapael/js/jquery.mapael.js'
import 'jQuery-Mapael/js/maps/usa_states'
import 'bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.js'

import { Dashboard } from './dashboard.component.ts'
import { WidgetModule } from '../layout/widget/widget.module'

export const routes = [
  { path: '', component: Dashboard, pathMatch: 'full' }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    Dashboard
  ]
})
export default class DashboardModule {
  static routes = routes
}
