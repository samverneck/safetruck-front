import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { LoginComponent } from './login.component'
import { WidgetModule } from '../../layout/widget/widget.module'

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  declarations: [
    LoginComponent
  ]
})
export default class LoginModule {
  public static routes = routes
}
