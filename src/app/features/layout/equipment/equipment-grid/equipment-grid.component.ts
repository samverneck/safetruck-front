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
  @Output() public onSelectEquipment: EventEmitter<Equipment> = new EventEmitter()
  @Output() public onDeleteEquipment: EventEmitter<Equipment> = new EventEmitter()

  public selectedEquipment: Equipment | undefined
  public types = EquipmentType

  /**
   * Creates an instance of EquipmentTableComponent.
   * @param {EquipmentService} equipmentService
   *
   * @memberOf EquipmentTableComponent
   */
  public constructor(public equipmentService: EquipmentService) {}

  /**
   *
   *
   * @param {any} equipment
   *
   * @memberOf EquipmentTableComponent
   */
  public delete(equipment: Equipment) {
    this.onDeleteEquipment.emit(equipment)
  }

  /**
   *
   *
   * @param {Equipment} equipment
   *
   * @memberOf EquipmentGridComponent
   */
  public selected(equipment: Equipment) {
    this.selectedEquipment = equipment
    this.onSelectEquipment.emit(equipment)
  }
}
