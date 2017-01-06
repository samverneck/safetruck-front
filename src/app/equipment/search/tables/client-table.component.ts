import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'search-client-table',
  templateUrl: './client-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./client-table.styles.scss']
})

export class SearchClientTable {

  @Input() data: any[]

  constructor() {}

}
