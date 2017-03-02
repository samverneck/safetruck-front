import { Component, ViewEncapsulation, OnInit } from '@angular/core'

import { fadeInOut } from '../../../../core'
import { EquipmentService, Equipment } from '../shared'

@Component( {
  selector: 'equipment-search',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './equipment-search.component.html',
  styleUrls: [ './equipment-search.component.scss' ],
  animations: [ fadeInOut ]
})
export class EquipmentSearchComponent implements OnInit {

  public equipments: Equipment[]

  /**
   * Creates an instance of EquipmentSearchComponent.
   * @param {EquipmentService} equip
   *
   * @memberOf EquipmentSearchComponent
   */
  constructor( public equipmentsService: EquipmentService ) { }

  /**
   *
   *
   *
   * @memberOf EquipmentSearchComponent
   */
  public ngOnInit(): void {
    this.search()
  }

  /**
   *
   *
   *
   * @memberOf EquipmentSearchComponent
   */
  public search() {
    this.equipmentsService.getAll().subscribe( equipments => this.equipments = equipments )
  }

}
