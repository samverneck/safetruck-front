import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { SharedModule } from '../../../shared/shared.module'
import { ReportRoutingModule } from './report-routing.module'

// components
import { ReportComponent } from './report.component'
import { ReportFilterComponent } from './report-filter/report-filter.component'
import { OffensesListComponent } from './offenses-list/offenses-list.component'
import { VehicleRouteComponent } from './vehicle-route/vehicle-route.component'

@NgModule( {
  imports: [
    SharedModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent,
    VehicleRouteComponent,
    OffensesListComponent,
    ReportFilterComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
} )
export default class ReportModule { }
