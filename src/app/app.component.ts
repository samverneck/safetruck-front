/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core'

import { AppStateService } from './core'

/*
 * App Component
 * Top Level Component
 */
@Component( {
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss'
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  constructor( public appState: AppStateService ) { }

  /**
   *
   *
   *
   * @memberOf AppComponent
   */
  public ngOnInit() {
    // console.log('Initial App State', this.appState.state)
  }
}
