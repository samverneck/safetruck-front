import { Component, Input } from '@angular/core'
import { Orientation } from '../shared'

@Component({
  selector: 'equipment-orientation-select',
  providers: [],
  templateUrl: './equipment-enums.html'
})
export class EquipmentOrientationSelectComponent {
  @Input() public name: any
  @Input() public disabled: any
  @Input() public validation: any
  public type = Orientation
}
