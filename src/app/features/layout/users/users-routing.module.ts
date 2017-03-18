import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UsersComponent } from './users.component'
import { UsersRegisterComponent } from './users-register/users-register.component'

export const usersRoutes: Routes = [ {
  path: '',
  component: UsersComponent,
  children: [
    { path: '', redirectTo: 'register' },
    { path: 'register', component: UsersRegisterComponent }
  ]
}]

@NgModule( {
  imports: [
    RouterModule,
    RouterModule.forChild( usersRoutes )
  ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }
