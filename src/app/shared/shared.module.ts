import 'jquery-slimscroll'
import 'angular2-text-mask'

// 3td part
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TooltipModule } from 'ng2-bootstrap'
import { DataTableModule } from 'angular2-datatable'
import { Ng2TableModule } from 'ng2-table'
import { TextMaskModule } from 'angular2-text-mask'
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb'

// directives
import { CheckAllDirective } from './directives/check-all.directive'
import { ProgressAnimateDirective } from './directives/progress-animate.directive'
import { WidgetDirective } from './directives/widget.directive'
import { CnpjValidatorDirective } from './directives/cnpj-validator.directive'
import { ZipCodeValidatorDirective } from './directives/zipcode-validator.directive'
import { EmailValidatorDirective } from './directives/email-validator.directive'
import { PhoneValidatorDirective } from './directives/phone-validator.directive'
import { DateValidatorDirective } from './directives/datebr-validator.directive'

// components
import { SearchFieldComponent } from './components/search-field/search-field.component'
import { SelectEnumComponent } from './components/select-enum/select-enum.component'
import { ValidationMessageComponent } from './components/validation-message/validation-message'
import { PanelComponent } from './components/panel/panel.component'
import { BtnDeleteComponent } from './components/btn-delete/btn-delete.component'
import { DatePickerComponent } from './components/datepicker/datepicker.component'

// pipes
import { KeysPipe } from './pipes/keys.pipe'
import { SlugfyPipe } from './pipes/slugfy.pipe'

@NgModule( {
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    Ng2BreadcrumbModule.forRoot(),
    FormsModule,
    DataTableModule,
    Ng2TableModule,
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
    DateValidatorDirective,
    DatePickerComponent,

    BtnDeleteComponent,
    SearchFieldComponent,
    SelectEnumComponent,
    ValidationMessageComponent,
    PanelComponent,

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
    Ng2BreadcrumbModule,

    CheckAllDirective,
    ProgressAnimateDirective,
    WidgetDirective,
    CnpjValidatorDirective,
    ZipCodeValidatorDirective,
    EmailValidatorDirective,
    PhoneValidatorDirective,
    DateValidatorDirective,

    BtnDeleteComponent,
    SearchFieldComponent,
    SelectEnumComponent,
    ValidationMessageComponent,
    PanelComponent,
    DatePickerComponent,

    KeysPipe,
    SlugfyPipe
  ]
} )
export class SharedModule {
}
