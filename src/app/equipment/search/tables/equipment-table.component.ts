import { Component, Input, ViewEncapsulation } from '@angular/core'


import { Equipment } from '../../../../models/Equipment'
import { EquipmentType } from '../../../../interfaces/IEquipment'
import { Orientation, VehicleType } from '../../../../interfaces/IEquipmentInstall'


@Component({
  selector: 'search-equipment-table',
  templateUrl: './equipment-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./equipment-table.styles.scss']
})

export class SearchEquipmentTable {

  @Input() data: Equipment[]

  types = EquipmentType

  orientations = Orientation
  vehicleTypes = VehicleType

  constructor() {}

}
