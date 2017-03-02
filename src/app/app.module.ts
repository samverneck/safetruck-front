import { NgModule, ApplicationRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

// modules
import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module'
import { AppStateService, StoreType } from './core'

// components
import { AppComponent } from './app.component'
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr'
import { Autosize } from 'angular2-autosize'
import { ErrorComponent } from './features/error/error.component'

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule( {
  imports: [ // import Angular's modules
    BrowserModule,
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    Autosize
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {

  /**StoreType
   * Creates an instance of AppModule.
   * @param {ApplicationRef} appRef
   * @param {AppState} appState
   *
   * @memberOf AppModule
   */
  constructor( public appRef: ApplicationRef, public appState: AppStateService ) { }

  /**
   *
   *
   * @param {StoreType} store
   *
   * @memberOf AppModule
   */
  public hmrOnInit( store: StoreType ) {
    if ( !store || !store.state ) { return }
    console.log( 'HMR store', JSON.stringify( store, null, 2 ) )
    // set state
    this.appState.state = store.state
    // set input values
    if ( 'restoreInputValues' in store ) {
      let restoreInputValues = store.restoreInputValues
      setTimeout( restoreInputValues )
    }

    this.appRef.tick()
    delete store.state
    delete store.restoreInputValues
  }

  /**
   *
   *
   * @param {StoreType} store
   *
   * @memberOf AppModule
   */
  public hmrOnDestroy( store: StoreType ) {
    const cmpLocation = this.appRef.components.map( cmp => cmp.location.nativeElement )
    // save state
    const state = this.appState.state
    store.state = state
    // recreate root elements
    store.disposeOldHosts = createNewHosts( cmpLocation )
    // save input values
    store.restoreInputValues = createInputTransfer()
    // remove styles
    removeNgStyles()
  }

  /**
   *
   *
   * @param {StoreType} store
   *
   * @memberOf AppModule
   */
  public hmrAfterDestroy( store: StoreType ) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts
  }

}
