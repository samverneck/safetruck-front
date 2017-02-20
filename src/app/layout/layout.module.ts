import 'jquery-slimscroll'

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap'

import { ROUTES } from './layout.routes'

import { LayoutComponent } from './layout.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  imports: [CommonModule, TooltipModule, ROUTES, FormsModule],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent
  ]
})
export default class LayoutModule {
}
