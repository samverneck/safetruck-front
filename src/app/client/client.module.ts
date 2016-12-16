import { NgModule }      from '@angular/core'
import { CommonModule }  from '@angular/common'

import { RouterModule } from '@angular/router'
import { ClientPage } from './client.component.ts'

export const routes = [
  { path: '', component: ClientPage, pathMatch: 'full' }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ ClientPage ]
})
export default class ClientModule {
  static routes = routes
}
