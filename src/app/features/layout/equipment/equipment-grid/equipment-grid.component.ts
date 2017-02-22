import { Component, EventEmitter, Output, Input } from '@angular/core'

import { fadeInOut } from '../../../../core'
import { EquipmentService, Equipment, EquipmentType } from '../shared'

@Component({
  selector: 'equipment-grid',
  templateUrl: './equipment-grid.component.html',
  styleUrls: ['./equipment-grid.component.scss'],
  animations: [fadeInOut]
})
export class EquipmentGridComponent {

  @Input() public data: Equipment[]
  @Input() public title: string = 'Equipamentos'
  @Input() public showDeleteButton: boolean = true
  @Output() public equipmentSelected: EventEmitter<Equipment> = new EventEmitter()
  @Output() public deleteEquipment: EventEmitter<Equipment> = new EventEmitter()

  public types = EquipmentType

  /**
   * Creates an instance of EquipmentTableComponent.
   * @param {EquipmentService} equipmentService
   *
   * @memberOf EquipmentTableComponent
   */
  public constructor(public equipmentService: EquipmentService) {
    console.log(this.data)
  }

  /**
   *
   *
   * @param {any} equipment
   *
   * @memberOf EquipmentTableComponent
   */
  public delete(equipment: Equipment) {
    this.deleteEquipment.emit(equipment)
  }

  /**
   *
   *
   * @param {any} element
   * @param {any} equipment
   *
   * @memberOf EquipmentTableComponent
   */
  public selected(element, equipment: Equipment) {
    this.equipmentSelected.emit(equipment)
    this.toggleSelected(element)
  }

  /**
   *
   *
   * @param {any} element
   *
   * @memberOf EquipmentTableComponent
   */
  private toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }
}
