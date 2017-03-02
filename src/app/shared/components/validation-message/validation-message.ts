
import { Component, Input } from '@angular/core'
@Component( {
  selector: 'validation-message',
  providers: [],
  templateUrl: './validation-message.html'
})
export class ValidationMessageComponent {
  @Input() public error: any
}
