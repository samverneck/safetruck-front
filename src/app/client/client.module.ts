import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DataTableDirectives } from 'angular2-datatable/datatable'
import { Ng2TableModule } from 'ng2-table'
import {
  ButtonsModule,
  DropdownModule,
  PaginationModule,
  TooltipModule,
  AlertModule
} from 'ng2-bootstrap/ng2-bootstrap'

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'
import { JqSparklineModule } from '../components/sparkline/sparkline.module'

declare let global: any

// libs
let markdown = require('markdown').markdown
global.markdown = markdown
import 'messenger/build/js/messenger.js'
import 'bootstrap-markdown/js/bootstrap-markdown.js'
import 'bootstrap-select/dist/js/bootstrap-select.js'
import 'parsleyjs'
import 'bootstrap-application-wizard/src/bootstrap-wizard.js'
import 'twitter-bootstrap-wizard/jquery.bootstrap.wizard.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js'
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js'
import 'bootstrap-colorpicker'
import 'bootstrap-slider/dist/bootstrap-slider.js'
import 'dropzone/dist/dropzone.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'

import { Autosize } from 'angular2-autosize'
import { Select2Module } from 'ng2-select2'
/* tslint:disable */
import { BootstrapWizardModule } from '../components/wizard/wizard.module'
import { DropzoneModule } from '../components/dropzone/dropzone.directive'
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime'
/* tslint:enable */

import { SearchPipe } from './pipes/search-pipe'
import { ClientPage } from './client.component'
import { ClientTable } from './table.component'
// import { ClientTableModule } from './table.modules'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: ClientPage},
  {path: 'table', component: ClientTable}
]

@NgModule({
  declarations: [
    Autosize,
    ClientPage,
    ClientTable,
    DropzoneModule,
    DataTableDirectives,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    AlertModule,
    DropdownModule,
    WidgetModule,
    // ClientTableModule,
    BootstrapWizardModule,
    NKDatetimeModule,
    Select2Module,
    JqSparklineModule,
    ButtonsModule,
    PaginationModule,
    UtilsModule,
    Ng2TableModule,
    RouterModule.forChild(routes),
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export default class ClientModule {
  static routes = routes
}
