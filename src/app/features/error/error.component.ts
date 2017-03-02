import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

@Component( {
  selector: 'error',
  styleUrls: [ './error.component.scss' ],
  templateUrl: './error.component.html',
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'error-page app'
  }
})
export class ErrorComponent {

  /**
   * Creates an instance of ErrorComponent.
   * @param {Router} router
   *
   * @memberOf ErrorComponent
   */
  constructor( private router: Router ) { }

  /**
   *
   *
   *
   * @memberOf ErrorComponent
   */
  public searchResult(): void {
    this.router.navigate( [ '/app', 'dashboard' ] )
  }
}
