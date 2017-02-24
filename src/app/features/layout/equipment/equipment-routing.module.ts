import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { EquipmentComponent } from './equipment.component'
import { EquipmentRegisterComponent } from './equipment-register/equipment-register.component'
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component'

export const equipmentRoutes: Routes = [ {
  path: '',
  component: EquipmentComponent,
  children: [
    { path: '', redirectTo: 'register' },
    { path: 'register', component: EquipmentRegisterComponent },
    { path: 'search', component: EquipmentSearchComponent },
    { path: 'view/:id', component: EquipmentRegisterComponent }
  ]
}]

@NgModule( {
  imports: [
    RouterModule,
    RouterModule.forChild( equipmentRoutes )
  ],
  exports: [ RouterModule ]
})
export class EquipmentRoutingModule { }
