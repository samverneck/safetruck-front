import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import * as _ from 'lodash'

import { fadeInOut } from '../../../../core'
import { EquipmentService, Equipment } from '../shared'
import { Client } from '../../client/shared'

@Component({
  selector: 'equipment-search',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss'],
  animations: [fadeInOut]
})
export class EquipmentSearchComponent implements OnInit {

  public searchText: string
  public clients: Client[]
  public equipments: Equipment[]

  /**
   * Creates an instance of EquipmentSearchComponent.
   * @param {EquipmentService} equip
   *
   * @memberOf EquipmentSearchComponent
   */
  constructor(public equipmentsService: EquipmentService) { }

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
    this.equipmentsService.getAll().subscribe(equips => {
      if (!this.searchText) {
        this.equipments = equips
        return
      }
      let code = equips.filter((eq) => {
        return (eq.code.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
      })
      let plaque = equips.filter((eq) => {
        return (eq.install.plaque.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
      })
      this.equipments = _.unionBy(code.concat(plaque), 'id')
    })
  }

}
