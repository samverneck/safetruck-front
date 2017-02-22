import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ClientComponent } from './client.component'
import { ClientRegisterComponent } from './client-register/client-register.component'
import { ClientSearchComponent } from './client-search/client-search.component'

export const clientRoutes: Routes = [{
  path: 'clients',
  component: ClientComponent,
  children: [
    { path: '', redirectTo: 'register' },
    { path: 'register', component: ClientRegisterComponent },
    { path: 'search', component: ClientSearchComponent },
    { path: 'view/:id', component: ClientRegisterComponent }
  ]
}]

@NgModule({
  imports: [
    RouterModule
    // RouterModule.forChild(clientRoutes)
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
