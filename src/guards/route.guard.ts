import { Http } from '@angular/http'
import { AuthService } from './../providers/auth.service'
import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

declare var $: any

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(
    private router: Router,
    private http: Http,
    private auth: AuthService
  ) { }

  canActivate() {
    return this.http
      .get(`${API_URL}/me`, this.auth.getHeaders())
      .map(data => data.json())
      .toPromise()
      .then(userData => {
        if (userData.isAdmin) {
          return true
        }
        this.router.navigate(['/app/report'])

        return false
      })
      .catch(err => {
        console.error('Erro:', err)
        this.router.navigate(['/app/report'])

        return false
      })
  }
}
