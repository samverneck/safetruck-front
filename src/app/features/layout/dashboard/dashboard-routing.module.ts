import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './dashboard.component'

export const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
]

@NgModule( {
  imports: [
    RouterModule,
    RouterModule.forChild( dashboardRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
