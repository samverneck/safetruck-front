import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { EquipmentRoutingModule, equipmentRoutes } from './equipment-routing.module'
import { SharedModule } from '../../../shared/shared.module'

// components
import { EquipmentComponent } from './equipment.component'
import { EquipmentGridComponent } from './equipment-grid/equipment-grid.component'
import { EquipmentRegisterComponent } from './equipment-register/equipment-register.component'
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component'
import { EquipmentTypeSelectComponent } from './equipment-enums/equipment-type.component'
import { EquipmentOrientationSelectComponent } from './equipment-enums/equipment-orientation.component'
import { EquipmentVehicleTypeSelectComponent } from './equipment-enums/equipment-vehicle-type.component'

// shared pipes and services
import { SearchPipe, EnumPipe, EquipmentService } from './shared'

// libs
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min.js'
import 'messenger/build/js/messenger.js'
import 'jasny-bootstrap/js/inputmask.js'

@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentGridComponent,
    EquipmentRegisterComponent,
    EquipmentSearchComponent,
    EquipmentTypeSelectComponent,
    EquipmentOrientationSelectComponent,
    EquipmentVehicleTypeSelectComponent,
    SearchPipe,
    EnumPipe
  ],
  imports: [
    SharedModule,
    EquipmentRoutingModule
  ],
  providers: [
    EquipmentService
  ],
  exports: [
    EquipmentGridComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EquipmentModule {
  public static ROUTES = equipmentRoutes
}
