import { Routes } from '@angular/router'
import { ErrorComponent } from './error/error.component'

// Se o usuário estiver logado ele será redirecionado
// para o dashboard, senão para tela de login
let redirect: string = 'auth'
if (localStorage.getItem('currentUser')) {
  redirect = 'app'
}
export const ROUTES: Routes = [
  { path: '', redirectTo: redirect, pathMatch: 'full'},
  { path: 'app', loadChildren: () => System.import('./layout/layout.module') },
  { path: 'auth', loadChildren: () => System.import('./auth/auth.module') },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
]
