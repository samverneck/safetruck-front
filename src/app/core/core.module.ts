/* tslint:disable:member-ordering no-unused-variable */
import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
  HttpModule,
  XHRBackend,
  RequestOptions,
  Http
} from '@angular/http'

import { AuthService } from './auth.service'
import { ValidationService } from './validation.service'
import { CepService } from './cep.service'
import { IsMainCompanyGuard } from './guards/is-main-company.guard'
import { IsAdminGuard } from './guards/is-admin.guard'
import { AuthGuard } from './guards/auth.guard'
import { AppStateService } from './app-state.service'
import { AppConfig } from './app.config'
import { FormService } from './form.service'
import { MessagesService } from './messages.service'
import { ENV_PROVIDERS } from './environment'
import { APP_RESOLVER_PROVIDERS } from './app.resolver'
import { BaseHttp } from './base-http.service'

let httpProvider = {
  provide: Http,
  useFactory: ( router: Router, backend: XHRBackend, defaultOptions: RequestOptions ) => {
    return new BaseHttp( router, backend, defaultOptions )
  },
  deps: [ Router, XHRBackend, RequestOptions ]
}

@NgModule( {
  imports: [ CommonModule, HttpModule ],
  providers: [
    ...APP_RESOLVER_PROVIDERS,
    ...ENV_PROVIDERS,
    AppStateService,
    AuthService,
    ValidationService,
    CepService,
    IsMainCompanyGuard,
    IsAdminGuard,
    AuthGuard,
    AppConfig,
    FormService,
    MessagesService,
    httpProvider
  ]
} )
export class CoreModule {

  /**
   * Creates an instance of CoreModule.
   * @param {CoreModule} parentModule
   *
   * @memberOf CoreModule
   */
  constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
    if ( parentModule ) {
      throw new Error( 'CoreModule is already loaded. Import it in the AppModule only' )
    }
  }
}
