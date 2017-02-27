import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { SharedModule } from '../../../shared/shared.module'
import { ReportRoutingModule } from './report-routing.module'

// components
import { ReportComponent } from './report.component'
import { OffensesListComponent } from './offenses-list/offenses-list.component'
import { VehicleRouteComponent } from './vehicle-route/vehicle-route.component'

// libs
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min.js'
import 'bootstrap-timepicker/js/bootstrap-timepicker.js'

@NgModule( {
  imports: [
    SharedModule,
    ReportRoutingModule
  ],
  declarations: [
    ReportComponent,
    VehicleRouteComponent,
    OffensesListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export default class ReportModule { }
