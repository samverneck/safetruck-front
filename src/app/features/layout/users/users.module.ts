import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// modules
import { SharedModule } from '../../../shared/shared.module'
import { UsersRoutingModule } from './users-routing.module'

// components
import { UsersComponent } from './users.component'
import { UsersFormComponent } from './users-form/users-form.component'
import { UsersGridComponent } from './users-grid/users-grid.component'
import { UsersRegisterComponent } from './users-register/users-register.component'

import { UsersService, SearchPipe } from './shared'

@NgModule( {
  imports: [ SharedModule, UsersRoutingModule ],
  declarations: [
    UsersComponent,
    UsersFormComponent,
    UsersRegisterComponent,
    UsersGridComponent,
    SearchPipe
  ],
  providers: [
    UsersService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export default class UsersModule { }
