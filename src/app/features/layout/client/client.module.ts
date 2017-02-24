import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { ClientRoutingModule, clientRoutes } from './client-routing.module'
import { SharedModule } from '../../../shared/shared.module'
import { EquipmentModule } from '../equipment/equipment.module'

// components
import { ClientComponent } from './client.component'
import { ClientRegisterComponent } from './client-register/client-register.component'
import { ClientGridComponent } from './client-grid/client-grid.component'
import { ClientSearchComponent } from './client-search/client-search.component'
import { SearchPipe } from './shared'

// libs
import 'jasny-bootstrap/js/inputmask.js'

@NgModule( {
  imports: [
    SharedModule,
    EquipmentModule,
    ClientRoutingModule
  ],
  declarations: [
    ClientComponent,
    ClientRegisterComponent,
    ClientGridComponent,
    ClientSearchComponent,
    SearchPipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClientModule {
  public static ROUTES = clientRoutes
}
