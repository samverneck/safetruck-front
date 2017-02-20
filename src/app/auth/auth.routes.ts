import { Routes, RouterModule } from '@angular/router'

import { AuthComponent } from './auth.component'

/* tslint:disable:max-line-length */
const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', loadChildren: () => System.import('./login/login.module.ts') },
      { path: 'forgot/:token', loadChildren: () => System.import('./reset-password/reset-password.module.ts') },
      { path: 'confirmation/:token', loadChildren: () => System.import('./reset-password/reset-password.module.ts') },
      { path: 'forgot', loadChildren: () => System.import('./forgot-password/forgot-password.module.ts') }
    ]
  }
]

export const ROUTES = RouterModule.forChild(routes)
