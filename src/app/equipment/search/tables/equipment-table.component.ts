import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'search-equipment-table',
  templateUrl: './equipment-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./equipment-table.styles.scss']
})

export class SearchEquipmentTable {

  @Input() data: any[]

  constructor() {}

}
