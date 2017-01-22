import { Component, Input } from '@angular/core'
import { Orientation } from '../../../interfaces/IEquipmentInstall'
@Component({
  selector: 'equipment-orientation-select',
  providers: [],
  templateUrl: './equipment-enums.html'
})
export class EquipmentOrientationSelectComponent {
  @Input() name: any
  type = Orientation
  @Input() disabled: any
  @Input() validation: any

}
