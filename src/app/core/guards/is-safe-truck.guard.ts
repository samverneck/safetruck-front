import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

import { AuthService } from '../auth.service'

@Injectable()
export class IsSafeTruckGuard implements CanActivate {

  /**
   * Creates an instance of RouteGuard.
   * @param {Router} router
   * @param {AuthService} auth
   *
   * @memberOf RouteGuard
   */
  constructor( private router: Router, private auth: AuthService ) { }

  /**
   *
   *
   * @returns {boolean}
   *
   * @memberOf RouteGuard
   */
  public canActivate(): boolean {
    if ( this.auth.user().isSafeTruck ) {
      return true
    }
    this.router.navigate( [ '/error' ] )
    return false
  }
}
