import { Component, Input } from '@angular/core'

import { fadeInOut } from '../../../../../core'
import { EquipmentType, Equipment, Orientation, VehicleType } from '../../../equipment/shared'

@Component( {
  selector: 'equipment-grid',
  templateUrl: './equipment-grid.component.html',
  styleUrls: [ './equipment-grid.component.scss' ],
  animations: [ fadeInOut ]
})
export class EquipmentGridComponent {

  @Input() public data: Equipment[]
  @Input() public title: string = 'Relação de Equipamentos'
  public equipmentTypes = EquipmentType
  public orientations = Orientation
  public vehicleTypes = VehicleType
}
