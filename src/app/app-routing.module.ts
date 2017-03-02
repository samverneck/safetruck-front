import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ErrorComponent } from './features/error/error.component'

// Se o usuário estiver logado ele será redirecionado
// para o dashboard, senão para tela de login
let redirect: string = 'auth'
if ( localStorage.getItem( 'currentUser' ) ) {
  redirect = 'app'
}
export const ROUTES: Routes = [
  { path: '', redirectTo: redirect, pathMatch: 'full' },
  { path: 'app', loadChildren: () => System.import( './features/layout/layout.module' ) },
  { path: 'auth', loadChildren: () => System.import( './features/auth/auth.module' ) },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
]

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule( {
  imports: [ // import Angular's modules
    RouterModule,
    RouterModule.forRoot( ROUTES, { useHash: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
