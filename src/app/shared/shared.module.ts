import 'jquery-slimscroll'

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { TooltipModule } from 'ng2-bootstrap'
import { DataTableModule } from 'angular2-datatable'
import { Ng2TableModule } from 'ng2-table'

import { CheckAllDirective } from './check-all.directive'
import { ProgressAnimateDirective } from './progress-animate.directive'
import { WidgetDirective } from './widget.directive'

import { SearchFieldComponent } from './components/search-field/search-field.component'

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
    SearchFieldComponent
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

    SearchFieldComponent
  ]
})
export class SharedModule {
}
