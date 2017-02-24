import 'jquery-slimscroll'
import 'angular2-text-mask'

// 3td part
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TooltipModule } from 'ng2-bootstrap'
import { DataTableModule } from 'angular2-datatable'
import { Ng2TableModule } from 'ng2-table'
import { TextMaskModule } from 'angular2-text-mask'

// directives
import { CheckAllDirective } from './directives/check-all.directive'
import { ProgressAnimateDirective } from './directives/progress-animate.directive'
import { WidgetDirective } from './directives/widget.directive'
import { CnpjValidatorDirective } from './directives/cnpj-validator.directive'
import { ZipCodeValidatorDirective } from './directives/zipcode-validator.directive'
import { EmailValidatorDirective } from './directives/email-validator.directive'
import { PhoneValidatorDirective } from './directives/phone-validator.directive'
// components
import { SearchFieldComponent } from './components/search-field/search-field.component'
import { SelectEnumComponent } from './components/select-enum/select-enum.component'
import { ValidationMessageComponent } from './components/validation-message/validation-message'

// pipes
import { KeysPipe } from './pipes/keys.pipe'
import { SlugfyPipe } from './pipes/slugfy.pipe'

@NgModule( {
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    FormsModule,
    DataTableModule,
    Ng2TableModule,
    HttpModule,
    RouterModule,
    TextMaskModule
  ],
  declarations: [
    CheckAllDirective,
    ProgressAnimateDirective,
    WidgetDirective,
    CnpjValidatorDirective,
    ZipCodeValidatorDirective,
    EmailValidatorDirective,
    PhoneValidatorDirective,

    SearchFieldComponent,
    SelectEnumComponent,
    ValidationMessageComponent,

    KeysPipe,
    SlugfyPipe
  ],
  exports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    DataTableModule,
    Ng2TableModule,
    TextMaskModule,

    CheckAllDirective,
    ProgressAnimateDirective,
    WidgetDirective,
    CnpjValidatorDirective,
    ZipCodeValidatorDirective,
    EmailValidatorDirective,
    PhoneValidatorDirective,

    SearchFieldComponent,
    SelectEnumComponent,
    ValidationMessageComponent,

    KeysPipe,
    SlugfyPipe
  ]
})
export class SharedModule {
}
