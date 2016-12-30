import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CheckAll } from './directives/check-all.directive'
import { ProgressAnimate } from './directives/progress-animate.directive'
import { DataTableDirectives } from 'angular2-datatable/datatable'

@NgModule({
  declarations: [
    CheckAll,
    DataTableDirectives,
    ProgressAnimate
  ],
  exports: [
    CheckAll,
    DataTableDirectives,
    ProgressAnimate
  ],
  imports: [
    CommonModule
  ]
})
export class UtilsModule {
}
