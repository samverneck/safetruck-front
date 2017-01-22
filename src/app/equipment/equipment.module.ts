import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'
import { Ng2TableModule } from 'ng2-table'

// libs
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min.js'
import 'messenger/build/js/messenger.js'
import 'jasny-bootstrap/js/inputmask.js'

import { EquipmentTable } from './table/table.component'
import { EquipmentRegisterPage } from './register/register.component'
import { EquipmentSearchPage } from './search/search.component'
import { EquipmentTypeSelectComponent } from './equipment-enums/equipment-type.component'
import { EquipmentOrientationSelectComponent } from './equipment-enums/equipment-orientation-component'
import { EquipmentVehicleTypeSelectComponent } from './equipment-enums/equipment-vehicle-type-component'
import { SearchEquipmentTable } from './search/tables/equipment-table.component'
import { SearchPipe } from './pipes/search-pipe'
import { EnumPipe } from '../../pipes/enum-pipe'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: EquipmentRegisterPage},
  {path: 'search', component: EquipmentSearchPage},
  {path: 'view/:id', component: EquipmentRegisterPage}
]

@NgModule({
  declarations: [
    EquipmentRegisterPage,
    EquipmentSearchPage,
    SearchEquipmentTable,
    EquipmentTypeSelectComponent,
    EquipmentOrientationSelectComponent,
    EquipmentVehicleTypeSelectComponent,
    SearchPipe,
    EquipmentTable,
    EnumPipe
  ],
  imports: [
    Ng2TableModule,
    CommonModule,
    FormsModule,
    WidgetModule,
    UtilsModule,
    RouterModule.forChild(routes),
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export default class EquipmentModule {
  static routes = routes
}
