import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AlertModule, TooltipModule } from 'ng2-bootstrap/ng2-bootstrap'
import { ButtonsModule, DropdownModule, PaginationModule  } from 'ng2-bootstrap/ng2-bootstrap'
import { DataTableDirectives } from 'angular2-datatable/datatable'
import { Ng2TableModule } from 'ng2-table'

import { WidgetModule } from '../layout/widget/widget.module'
import { UtilsModule } from '../layout/utils/utils.module'
import { JqSparklineModule } from '../components/sparkline/sparkline.module'

import { ClientTable } from './table.component'

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    DataTableDirectives,
    ClientTable
  ],
  imports: [
    CommonModule,
    JqSparklineModule,
    FormsModule,
    AlertModule,
    TooltipModule,
    ButtonsModule,
    DropdownModule,
    PaginationModule,
    WidgetModule,
    UtilsModule,
    Ng2TableModule,
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClientTableModule {}
