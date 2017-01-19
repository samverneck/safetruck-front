import { AuthService } from './../providers/auth.service'
import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

declare var $: any

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate(): boolean {
    if (this.auth.user().isAdmin) {
      return true
    }
    this.router.navigate(['/app/report'])
    return false
  }
}
