import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CheckAllDirective } from './directives/check-all.directive'
import { ProgressAnimateDirective } from './directives/progress-animate.directive'
import { DataTableModule } from 'angular2-datatable'

@NgModule({
  declarations: [
    CheckAllDirective,
    ProgressAnimateDirective
  ],
  exports: [
    CheckAllDirective,
    DataTableModule,
    ProgressAnimateDirective
  ],
  imports: [
    CommonModule,
    DataTableModule
  ]
})
export class UtilsModule {
}
