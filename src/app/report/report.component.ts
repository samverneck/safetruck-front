import {
  Component, ViewEncapsulation, OnInit,
  trigger, transition, style, animate
} from '@angular/core'
import * as _ from 'lodash'
import * as moment from 'moment'

import { ReportService } from './../../providers/report.service'
import { IReportData } from './../../interfaces/IReport'
import { Messages } from './../../utils/Messages'

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
    // Obtém as placas cadastradas
    this.reportService.getPlaques().subscribe(plaques => {
      this.plaques = _.sortedUniq(plaques) as string[]
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

  /**
   * Exibe o relatório
   * @memberOf ReportPage
   */
  getReport(): void {
    // Obetém os valores do usuário
    let plaque = $('#plaque').val()
    let start = $('#start').val()
    let finish = $('#finish').val()
    // Validação
    if (!this.validate(plaque, start)) {
      return
    }
    // Se não for informada uma data fim, o dia atual é informado
    start = moment(start, 'DD/MM/YYYY').toISOString()
    finish
      ? moment(finish, 'DD/MM/YYYY').toISOString()
      : moment().toISOString()
    // Chamada do serviço
    this.reportService.getReport(plaque, start, finish).subscribe(report => {
      this.report = report
    })
  }

  /**
   * Faz a validação dos campos do formulário
   * @param {string} plaque
   * @param {string} start
   * @returns {boolean}
   * @memberOf ReportPage
   */
  validate(plaque: string, start: string): boolean {
    // Remove a classe de erro
    this.removeErrorClass()
    // Valida se a placa foi informada
    if (!plaque) {
      $(`[name="plaque"]`).addClass('error')
      this.messages.showNotification('Você deve selecionar uma placa.', 'error')
      return false
    }
    // Valida se a data inicial foi informada
    if (!start) {
      $(`[name="start"]`).addClass('error')
      this.messages.showNotification('Você deve selecionar uma data de início.', 'error')
      return false
    }
    // Verifica se a data informada é válida
    if (!moment(start, 'DD/MM/YYYY').isValid() || moment(start, 'DD/MM/YYYY').isAfter(moment())) {
      $(`[name="start"]`).addClass('error')
      this.messages.showNotification('A data de ínicio não é válida', 'error')
      return false
    }

    return true
  }

  /**
   * Remove a classe de erro dos elementos obrigatórios
   * @memberOf ReportPage
   */
  removeErrorClass(): void {
    $(`[name="plaque"]`).removeClass('error')
    $(`[name="start"]`).removeClass('error')
  }

  print() {
    window.print()
  }
}
