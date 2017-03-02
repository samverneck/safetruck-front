import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { DashboardRoutingModule } from './dashboard-routing.module'
import { SharedModule } from '../../../shared/shared.module'

// components
import { DashboardComponent } from './dashboard.component'

@NgModule( {
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
} )
export default class DashboardModule { }
