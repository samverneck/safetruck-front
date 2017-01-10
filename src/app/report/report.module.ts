import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Ng2TableModule } from 'ng2-table'
import { TimepickerModule } from 'ng2-bootstrap';

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'
import { ReportPage } from './report.component'
import { PrintComponent } from './print/print.component'
import { RouteComponent } from './route/route.component'

// libs
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min.js'
import 'bootstrap-timepicker/js/bootstrap-timepicker.js'

export const routes = [
  {path: '', component: ReportPage}
]

@NgModule({
  declarations: [
    ReportPage,
    RouteComponent,
    PrintComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
    TimepickerModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class ReportModule {
  static routes = routes
}
