import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

declare let global: any
// libs
let markdown = require('markdown').markdown
global.markdown = markdown
import 'bootstrap-markdown/js/bootstrap-markdown.js'
import 'bootstrap-select/dist/js/bootstrap-select.js'
import 'parsleyjs'
import 'bootstrap-application-wizard/src/bootstrap-wizard.js'
import 'twitter-bootstrap-wizard/jquery.bootstrap.wizard.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js'
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js'
import 'bootstrap-colorpicker'
import 'bootstrap-slider/dist/bootstrap-slider.js'
import 'dropzone/dist/dropzone.js'
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js'
import 'jasny-bootstrap/js/fileinput.js'
import 'jasny-bootstrap/js/inputmask.js'

import { TooltipModule, AlertModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap'
import { Autosize } from 'angular2-autosize'
import { Select2Module } from 'ng2-select2'
import { WidgetModule } from '../layout/widget/widget.module'
/* tslint:disable */
import { BootstrapWizardModule } from '../components/wizard/wizard.module'
import { DropzoneDemo } from '../components/dropzone/dropzone.directive'
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime'
/* tslint:enable */
import { Validation } from './validation/validation.component'

export const routes = [
  {path: '', redirectTo: 'elements', pathMatch: 'full'},
  {path: 'validation', component: Validation}
]

@NgModule({
  declarations: [
    Autosize,
    Validation,
    DropzoneDemo
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    AlertModule,
    DropdownModule,
    WidgetModule,
    BootstrapWizardModule,
    NKDatetimeModule,
    Select2Module,
    RouterModule.forChild(routes),
  ]
})
export default class FormModule {
  static routes = routes
}
