import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Creates an instance of AuthGuard.
   * @param {Router} router
   *
   * @memberOf AuthGuard
   */
  constructor( private router: Router ) { }

  /**
   *
   *
   * @returns
   *
   * @memberOf AuthGuard
   */
  public canActivate() {
    if ( localStorage.getItem( 'currentUser' ) ) {
      // logged in so return true
      return true
    }

    // not logged in so redirect to login page
    this.router.navigate( [ '/auth/login' ] )
    return false
  }
}
