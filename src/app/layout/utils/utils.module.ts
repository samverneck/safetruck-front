import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CheckAll } from './directives/check-all.directive'
import { ProgressAnimate } from './directives/progress-animate.directive'

@NgModule({
  declarations: [
    CheckAll,
    ProgressAnimate
  ],
  exports: [
    CheckAll,
    ProgressAnimate
  ],
  imports: [
    CommonModule
  ]
})
export class UtilsModule {
}
