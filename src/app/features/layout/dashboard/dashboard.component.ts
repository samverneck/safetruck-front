import { Component } from '@angular/core'

import { AuthService } from '../../../core'

@Component( {
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styles: [ `
     :host /deep/ panel-header h3{
       font-size: 1.55rem;
    }
  `]
} )
export class DashboardComponent {
  constructor( private auth: AuthService ) { }

  public get user() {
    return this.auth.user()
  }
}
