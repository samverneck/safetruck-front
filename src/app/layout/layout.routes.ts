import { Routes, RouterModule } from '@angular/router'
import { LayoutComponent } from './layout.component'
import { AuthGuard } from './../../guards/auth.guard'
import { RouteGuard } from './../../guards/route.guard'

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', canActivate: [RouteGuard], loadChildren: () => System.import('../dashboard/dashboard.module') },
      { path: 'client', canActivate: [RouteGuard], loadChildren: () => System.import('../client/client.module') },
      { path: 'equipment', canActivate: [RouteGuard], loadChildren: () => System.import('../equipment/equipment.module') },
      { path: 'report', loadChildren: () => System.import('../report/report.module') }
    ]
  }
]

export const ROUTES = RouterModule.forChild(routes)
