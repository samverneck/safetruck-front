import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'
import { Ng2TableModule } from 'ng2-table'

// libs
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime'
import 'messenger/build/js/messenger.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js'
import 'bootstrap-select/dist/js/bootstrap-select.js'

import { EquipmentRegisterPage } from './register/register.component'
import { EquipmentSearchPage } from './search/search.component'
import { SearchClientTable } from './search/tables/client-table.component'
import { SearchEquipmentTable } from './search/tables/equipment-table.component'
import { SearchPipe } from './search/pipes/search-pipe'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: EquipmentRegisterPage},
  {path: 'search', component: EquipmentSearchPage}
]

@NgModule({
  declarations: [
    EquipmentRegisterPage,
    EquipmentSearchPage,
    SearchClientTable,
    SearchEquipmentTable,
    SearchPipe
  ],
  imports: [
    Ng2TableModule,
    CommonModule,
    FormsModule,
    NKDatetimeModule,
    WidgetModule,
    UtilsModule,
    RouterModule.forChild(routes),
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export default class EquipmentModule {
  static routes = routes
}