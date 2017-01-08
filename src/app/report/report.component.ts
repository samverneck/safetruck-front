import {
  Component, ViewEncapsulation, OnInit,
  trigger, transition, style, animate
} from '@angular/core'

import { ReportService } from './../../providers/report.service'
import { IReportData } from './../../interfaces/IReport'
import { Messages } from './../../utils/Messages'

import * as _ from 'lodash'
import * as moment from 'moment'

declare var jQuery: any

@Component({
  selector: 'report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.template.html',
  styleUrls: ['./report.styles.scss', '../scss/notifications.scss'],
  providers: [ReportService],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity: 0}),
        animate(200, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
})

export class ReportPage implements OnInit {
  report: IReportData
  plaques: string[]
  messages = new Messages()

  constructor(public reportService: ReportService) {
    this.reportService.getPlaques().subscribe(plaques => {
      this.plaques = _.sortedUniq(plaques) as string[]
      console.log(this.plaques)
    })
  }

  ngOnInit(): void {
    jQuery('.date').datepicker({
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    })
  }

  getReport(){
    let plaque = $('#plaque').val()
    let start = $('#start').val()
    let finish = $('#finish').val()

    if (!this.validate(plaque, start)) {
      return
    }

    start = moment(start, 'DD/MM/YYYY').toISOString()
    finish
      ? moment(finish, 'DD/MM/YYYY').toISOString()
      : moment().toISOString()

    this.reportService.getReport(plaque, start, finish).subscribe(report => {
      this.report = report
    })
  }

  validate(plaque, start) {
    this.removeErrorClass()
    if (!plaque) {
      $(`[name="plaque"]`).addClass('error')
      this.messages.showNotification('Você deve selecionar uma placa.', 'error')
      return false
    }

    if (!start) {
      $(`[name="start"]`).addClass('error')
      this.messages.showNotification('Você deve selecionar uma data de início.', 'error')
      return false
    }

    if (!moment(start, 'DD/MM/YYYY').isValid() || moment(start, 'DD/MM/YYYY').isAfter(moment())) {
      $(`[name="start"]`).addClass('error')
      this.messages.showNotification('A data de ínicio não é válida', 'error')
      return false
    }

    return true
  }

  removeErrorClass() {
    $(`[name="plaque"]`).removeClass('error')
    $(`[name="start"]`).removeClass('error')
  }

  print() {
    window.print()
  }
}
