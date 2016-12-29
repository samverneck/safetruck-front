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

declare let global: any

// libs
let markdown = require('markdown').markdown
global.markdown = markdown
import 'messenger/build/js/messenger.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'

import { Select2Module } from 'ng2-select2'
import { SearchPipe } from './pipes/search-pipe'
import { ClientPage } from './client.component'
import { ClientTable } from './table/table.component'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: ClientPage},
  {path: 'table', component: ClientTable}
]

@NgModule({
  declarations: [
    ClientPage,
    ClientTable,
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
    Select2Module,
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
