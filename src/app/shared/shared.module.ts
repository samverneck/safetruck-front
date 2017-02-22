import 'jquery-slimscroll'

// 3td part
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TooltipModule } from 'ng2-bootstrap'
import { DataTableModule } from 'angular2-datatable'
import { Ng2TableModule } from 'ng2-table'

// directives
import { CheckAllDirective } from './directives/check-all.directive'
import { ProgressAnimateDirective } from './directives/progress-animate.directive'
import { WidgetDirective } from './directives/widget.directive'

// components
import { SearchFieldComponent } from './components/search-field/search-field.component'
import { SelectEnumComponent } from './components/select-enum/select-enum.component'

// pipes
import { KeysPipe } from './pipes/keys.pipe'

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    FormsModule,
    DataTableModule,
    Ng2TableModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    CheckAllDirective,
    ProgressAnimateDirective,
    WidgetDirective,
    SearchFieldComponent,
    SelectEnumComponent,
    KeysPipe
  ],
  exports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    DataTableModule,
    Ng2TableModule,

    CheckAllDirective,
    ProgressAnimateDirective,
    WidgetDirective,

    SearchFieldComponent,
    SelectEnumComponent,

    KeysPipe
  ]
})
export class SharedModule {
}
