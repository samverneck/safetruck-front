import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

import { AuthService } from '../auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Creates an instance of AuthGuard.
   * @param {Router} router
   *
   * @memberOf AuthGuard
   */
  constructor( private authService: AuthService, private router: Router ) { }

  /**
   *
   *
   * @returns
   *
   * @memberOf AuthGuard
   */
  public canActivate() {
    if ( this.authService.user() ) {
      return true
    }
    // not logged in so redirect to login page
    this.router.navigate( [ '/auth/login' ] )
    return false
  }
}
