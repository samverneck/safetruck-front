import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { EquipmentRoutingModule } from './equipment-routing.module'
import { SharedModule } from '../../../shared/shared.module'

// components
import { EquipmentComponent } from './equipment.component'
import { EquipmentGridComponent } from './equipment-grid/equipment-grid.component'
import { EquipmentRegisterComponent } from './equipment-register/equipment-register.component'
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component'
import { EquipmentViewComponent } from './equipment-view/equipment-view.component'
import { EquipmentFormComponent } from './equipment-form/equipment-form.component'

// shared pipes and services
import { SearchPipe, EquipmentService } from './shared'

@NgModule( {
  declarations: [
    EquipmentComponent,
    EquipmentGridComponent,
    EquipmentRegisterComponent,
    EquipmentSearchComponent,
    EquipmentFormComponent,
    EquipmentViewComponent,
    SearchPipe
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
} )
export default class EquipmentModule { }
