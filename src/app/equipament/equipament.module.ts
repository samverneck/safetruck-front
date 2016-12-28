import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'

// libs
import 'messenger/build/js/messenger.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'

import { Autosize } from 'angular2-autosize'

export const routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  {path: 'register', component: ClientPage},
  {path: 'table', component: ClientTable}
]

@NgModule({
  declarations: [
    Autosize,

  ],
  imports: [
    CommonModule,
    FormsModule,
    WidgetModule,
    UtilsModule,
    RouterModule.forChild(routes),
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export default class ClientModule {
  static routes = routes
}
