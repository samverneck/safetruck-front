import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WidgetDirective } from './widget.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [WidgetDirective],
  exports: [WidgetDirective]
})
export class WidgetModule {
}
