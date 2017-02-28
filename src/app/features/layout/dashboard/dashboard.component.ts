import { Component } from '@angular/core'

@Component( {
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styles: [ `
     :host /deep/ panel-header h3{
       font-size: 1.55rem;
    }
  `]
})
export class DashboardComponent {
}
