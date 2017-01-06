import { Routes, RouterModule }  from '@angular/router'
import { Layout } from './layout.component'
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'client', loadChildren: () => System.import('../client/client.module') },
    { path: 'equipment', loadChildren: () => System.import('../equipment/equipment.module') },
    { path: 'report', loadChildren: () => System.import('../report/report.module') }
  ]}
]

export const ROUTES = RouterModule.forChild(routes)
