import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Ng2TableModule } from 'ng2-table'

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'

// libs
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/inputmask.js'

export const routes = [
  {path: '', component: ''}
]

@NgModule({
  declarations: [
    //
  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class ClientModule {
  static routes = routes
}
