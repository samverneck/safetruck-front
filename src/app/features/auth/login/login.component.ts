import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from './../../../core'

@Component( {
  selector: 'login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'login-page app'
  }
} )
export class LoginComponent {

  public email: string
  public pass: string

  /**
   * Creates an instance of LoginComponent.
   * @param {AuthService} auth
   * @param {Router} router
   *
   * @memberOf LoginComponent
   */
  public constructor( private auth: AuthService, private router: Router ) { }

  /**
   *
   *
   *
   * @memberOf LoginComponent
   */
  public authenticateUser() {
    $( '.alert' ).hide()
    this.auth.login( this.email, this.pass )
      .toPromise()
      .then( result => {
        if ( result === true ) {
          const redirectUrl = this.auth.user().isMainCompany ? '/app' : '/app/report'
          this.router.navigate( [ redirectUrl ] )
        } else {
          $( '.alert' ).show( 'fast' )
        }
      } )
      .catch( error => {
        console.log( error )
        $( '.alert' ).show( 'fast' )
      } )
  }
}
