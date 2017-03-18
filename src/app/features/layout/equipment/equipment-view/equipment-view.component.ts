import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { EquipmentService, Equipment } from '../shared'

@Component( {
  selector: 'equipment-view',
  templateUrl: 'equipment-view.component.html'
})
export class EquipmentViewComponent implements OnInit {

  public equipment: Equipment

  /**
   * Creates an instance of EquipmentViewComponent.
   * @param {ActivatedRoute} route
   * @param {EquipmentService} equipmentService
   *
   * @memberOf EquipmentViewComponent
   */
  constructor(
    public route: ActivatedRoute,
    public equipmentService: EquipmentService
  ) { }

  /**
   *
   *
   *
   * @memberOf EquipmentViewComponent
   */
  public ngOnInit(): void {
    this.getEquipment( this.route.snapshot.params[ 'id' ] )
  }

  /**
   * Carrega os dados do equipmente que através do parametro id
   * passado pela URL
   * @memberOf EquipmentPage
   */
  public getEquipment( id: number ) {
    this.equipmentService.getById( id ).subscribe( equipment => this.equipment = equipment, error => this.handleError( error ) )
  }

  /**
   *
   *
   * @private
   * @param {*} error
   *
   * @memberOf EquipmentViewComponent
   */
  private handleError( error: any ): void {
    console.error( error )
  }
}
