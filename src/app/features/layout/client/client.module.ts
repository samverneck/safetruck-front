import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { ClientRoutingModule } from './client-routing.module'
import { SharedModule } from '../../../shared/shared.module'

// components
import { ClientComponent } from './client.component'
import { EquipmentGridComponent } from './client-search/equipment-grid/equipment-grid.component'
import { ClientFormComponent } from './client-form/client-form.component'
import { ClientRegisterComponent } from './client-register/client-register.component'
import { ClientGridComponent } from './client-grid/client-grid.component'
import { ClientSearchComponent } from './client-search/client-search.component'
import { ClientViewComponent } from './client-view/client-view.component'
import { SearchPipe } from './shared'

@NgModule( {
  imports: [
    SharedModule,
    ClientRoutingModule
  ],
  declarations: [
    ClientComponent,
    ClientFormComponent,
    ClientViewComponent,
    ClientRegisterComponent,
    ClientGridComponent,
    ClientSearchComponent,
    EquipmentGridComponent,
    SearchPipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export default class ClientModule { }
