import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ROUTES } from './auth.routes'

import { Auth } from './auth.component'

@NgModule({
  declarations: [
    Auth,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ROUTES
  ]
})
export default class AuthModule { }
