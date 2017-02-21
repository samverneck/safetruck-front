import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Ng2TableModule } from 'ng2-table'

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'

// libs
import 'jasny-bootstrap/js/inputmask.js'

import { SearchPipe } from './pipes/search-pipe'
import { ClientComponent } from './register/client.component'
import { ClientTableComponent } from './register/table/table.component'
import { SearchClientsComponent } from './search/search-clients.component'
import { EquipmentTableComponent } from './search/equipments/equip-table.component'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: ClientComponent},
  {path: 'search', component: SearchClientsComponent},
  {path: 'view/:id', component: ClientComponent}
]

@NgModule({
  declarations: [
    ClientComponent,
    ClientTableComponent,
    SearchClientsComponent,
    EquipmentTableComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class ClientModule {
  public static routes = routes
}
