import { Routes, RouterModule }  from '@angular/router'
import { Layout } from './layout.component'
import { AuthGuard } from './../../guards/auth.guard'


const routes: Routes = [
  { path: '', component: Layout, canActivate: [AuthGuard] , children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'client', loadChildren: () => System.import('../client/client.module') },
    { path: 'equipment', loadChildren: () => System.import('../equipment/equipment.module') },
    { path: 'report', loadChildren: () => System.import('../report/report.module') }
  ]}
]

export const ROUTES = RouterModule.forChild(routes)
