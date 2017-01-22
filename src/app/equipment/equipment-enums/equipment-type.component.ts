import { Component, Input } from '@angular/core'
import { EquipmentType } from '../../../interfaces/IEquipment'

@Component({
  selector: 'equipment-type-select',
  providers: [],
  templateUrl: './equipment-enums.html'
})
export class EquipmentTypeSelectComponent {
  @Input() name: any
  type = EquipmentType

  @Input() disabled: any
  @Input() validation: any

}

