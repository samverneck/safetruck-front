import { AuthService } from './../providers/auth.service'
import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

@Injectable()
export class RouteGuard implements CanActivate {

  /**
   * Creates an instance of RouteGuard.
   * @param {Router} router
   * @param {AuthService} auth
   *
   * @memberOf RouteGuard
   */
  constructor(private router: Router, private auth: AuthService) { }

  /**
   *
   *
   * @returns {boolean}
   *
   * @memberOf RouteGuard
   */
  public canActivate(): boolean {
    if (this.auth.user().isAdmin) {
      return true
    }
    this.router.navigate(['/app/report'])
    return false
  }
}
