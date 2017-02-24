import { Component, Input } from '@angular/core'
@Component( {
  selector: 'select-enum',
  providers: [],
  templateUrl: './select-enum.component.html'
})
export class SelectEnumComponent {
  @Input() public name: string
  @Input() public disabled: boolean
  @Input() public validation: boolean
  @Input() public enumType: any
}
