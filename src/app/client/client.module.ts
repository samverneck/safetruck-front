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
import { ClientPage } from './register/client.component'
import { ClientTable } from './register/table/table.component'
import { SearchClientsPage } from './search/search-clients.component'
import { EquipmentTable } from './search/equipments/equip-table.component'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: ClientPage},
  {path: 'search', component: SearchClientsPage},
  {path: 'view/:id', component: ClientPage}
]

@NgModule({
  declarations: [
    ClientPage,
    ClientTable,
    SearchClientsPage,
    EquipmentTable,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class ClientModule {
  static routes = routes
}
