import { Routes, RouterModule }  from '@angular/router'
import { Layout } from './layout.component'
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: () => System.import('../dashboard/dashboard.module') },
    { path: 'forms', loadChildren: () => System.import('../forms/forms.module') },
    { path: 'clients', loadChildren: () => System.import('../client/client.module') }
  ]}
]

export const ROUTES = RouterModule.forChild(routes)
