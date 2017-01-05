import { Component, ViewEncapsulation } from '@angular/core'

import { ValidationService } from './../../providers/validation.service'
import { FormUtils } from './../../utils/FormUtils'
import { Messages } from './../../utils/Messages'

@Component({
  selector: 'report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.template.html',
  styleUrls: ['./report.styles.scss', '../scss/notifications.scss']
})

export class ReportPage {
  constructor() {}

}
