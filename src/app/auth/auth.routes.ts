import { Routes, RouterModule }  from '@angular/router'
import { Auth } from './auth.component'
/* tslint:disable:max-line-length */
const routes: Routes = [
  { path: '', component: Auth, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => System.import('./login/login.module.ts') },
    { path: 'forgot-password', loadChildren: () => System.import('./forgot-password/forgot-password.module.ts') },
    { path: 'reset-password', loadChildren: () => System.import('./reset-password/reset-password.module.ts') }
  ]}
]

export const ROUTES = RouterModule.forChild(routes)
