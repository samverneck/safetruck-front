import { Component, Input } from '@angular/core'
import { VehicleType } from '../../../interfaces/IEquipmentInstall'

export enum EVechicleType {
  'Carro' = parseInt(VehicleType.CAR.toString(), 10),
  'Ônibus' = parseInt(VehicleType.BUS.toString(), 10),
  'Caminhão' = parseInt(VehicleType.TRUCK.toString(), 10),
  'Outros' = parseInt(VehicleType.OTHERS.toString(), 10)
}

@Component({
  selector: 'equipment-vehicle-type-select',
  providers: [],
  templateUrl: './equipment-enums.html'
})
export class EquipmentVehicleTypeSelectComponent {
  @Input() name: any
  @Input() disabled: any
  @Input() validation: any

  type = EVechicleType
}
