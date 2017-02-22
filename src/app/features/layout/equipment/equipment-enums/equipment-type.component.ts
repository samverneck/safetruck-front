import { Component, Input } from '@angular/core'
import { EquipmentType } from '../shared'

@Component({
  selector: 'equipment-type-select',
  providers: [],
  templateUrl: './equipment-enums.html'
})
export class EquipmentTypeSelectComponent {
  @Input() public name: any
  @Input() public disabled: any
  @Input() public validation: any
  public type = EquipmentType
}
