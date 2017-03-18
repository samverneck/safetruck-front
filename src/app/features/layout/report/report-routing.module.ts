import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ReportComponent } from './report.component'

export const routes: Routes = [
  { path: '', component: ReportComponent }
]

@NgModule( {
  imports: [
    RouterModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class ReportRoutingModule { }
