import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LayoutComponent } from './layout.component'
import { ClientModule } from './client/client.module'
import { EquipmentModule } from './equipment/equipment.module'
import { AuthGuard, RouteGuard } from '../../core'

const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', canActivate: [ RouteGuard ], loadChildren: () => System.import( './dashboard/dashboard.module' ) },
      { path: 'report', loadChildren: () => System.import( './report/report.module' ) },
      ...ClientModule.ROUTES,
      ...EquipmentModule.ROUTES
    ]
  }
]

@NgModule( {
  imports: [
    RouterModule,
    RouterModule.forChild( layoutRoutes )
  ],
  exports: [ RouterModule ]
})
export class LayoutRoutingModule { }
