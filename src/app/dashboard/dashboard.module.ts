import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'

import 'jquery.animate-number/jquery.animateNumber.js'

import { DashboardComponent } from './dashboard.component'
import { WidgetModule } from '../layout/widget/widget.module'

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export default class DashboardModule {
  static routes = routes
}
