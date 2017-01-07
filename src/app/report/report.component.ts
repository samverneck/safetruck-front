import { Component, ViewEncapsulation } from '@angular/core'

import { ReportService } from './../../providers/report.service'
import { ValidationService } from './../../providers/validation.service'
import { FormUtils } from './../../utils/FormUtils'
import { Messages } from './../../utils/Messages'

declare var jQuery: any

@Component({
  selector: 'report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.template.html',
  styleUrls: ['./report.styles.scss', '../scss/notifications.scss'],
  providers: [ReportService]
})

export class ReportPage {
  constructor(public reportService: ReportService) {
    this.reportService.getReports().subscribe(data => {
      console.log(data)
    })
  }

  print() {
    window.print()
  }
}
