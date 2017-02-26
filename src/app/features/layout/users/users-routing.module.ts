import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { UsersComponent } from './users.component'
import { UsersRegisterComponent } from './users-register/users-register.component'
import { UsersSearchComponent } from './users-search/users-search.component'

export const usersRoutes: Routes = [ {
  path: '',
  component: UsersComponent,
  children: [
    { path: '', redirectTo: 'register' },
    { path: 'register', component: UsersRegisterComponent },
    { path: 'search', component: UsersSearchComponent }
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
