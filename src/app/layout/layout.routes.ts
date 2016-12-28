import { Routes, RouterModule }  from '@angular/router'
import { Layout } from './layout.component'
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'clients', loadChildren: () => System.import('../client/client.module') },
    { path: 'equipament', loadChildren: () => System.import('../client/client.module') }
  ]}
]

export const ROUTES = RouterModule.forChild(routes)
