// 3rd part
import 'jquery-slimscroll'
import { NgModule } from '@angular/core'

// modules
import { SharedModule } from '../../shared/shared.module'
import { LayoutRoutingModule } from './layout-routing.module'

// cmoponents
import { LayoutComponent } from './layout.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component'
import { NavbarComponent } from './shared/navbar/navbar.component'

// services
import { ClientService } from './client/shared'

@NgModule( {
  imports: [
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent
  ],
  providers: [
    ClientService // it's registered here because it is used by multiples child lazyloaded modules. So, only one ClientService instance is shared among them
  ]
})
export default class LayoutModule {
}
