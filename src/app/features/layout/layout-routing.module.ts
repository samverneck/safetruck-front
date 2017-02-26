import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LayoutComponent } from './layout.component'
import { AuthGuard, RouteGuard } from '../../core'

const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', canActivate: [ RouteGuard ], loadChildren: () => System.import( './dashboard/dashboard.module' ) },
      { path: 'clients', canActivate: [ RouteGuard ], loadChildren: () => System.import( './client/client.module' ) },
      { path: 'equipments', canActivate: [ RouteGuard ], loadChildren: () => System.import( './equipment/equipment.module' ) },
      { path: 'users', canActivate: [ RouteGuard ], loadChildren: () => System.import( './users/users.module' ) },
      { path: 'report', canActivate: [ RouteGuard ], loadChildren: () => System.import( './report/report.module' ) }
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
