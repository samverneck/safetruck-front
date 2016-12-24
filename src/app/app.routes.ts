import { Routes } from '@angular/router'
import { ErrorComponent } from './error/error.component'

// TODO verificar aqui se o usuário está logado e redireciona-lo
export const ROUTES: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'app', loadChildren: () => System.import('./layout/layout.module') },
  { path: 'auth', loadChildren: () => System.import('./auth/auth.module') },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
]
