import {
  Component, ViewEncapsulation, OnInit,
  trigger, transition, style, animate
} from '@angular/core'
import * as _ from 'lodash'
import * as moment from 'moment'

import { ReportService } from './../../providers/report.service'
import { IReportData } from './../../interfaces/IReport'
import { Messages } from './../../utils/Messages'

declare var $: any
const DATE_FORMAT = 'DD/MM/YYYY h:mm A'

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
  times: any

  constructor(public reportService: ReportService) {
    // Obtém as placas cadastradas
    this.reportService.getPlaques().subscribe(plaques => {
      this.plaques = _.sortedUniq(plaques) as string[]
    })
  }

  ngOnInit(): void {
    $('.date').datepicker({
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    })
    $('#time-start').timepicker()
    $('#time-finish').timepicker()
    $('#start, #finish').val(moment().format('DD/MM/YYYY'))
    $('#time-start').val(moment().subtract(1, 'hours').format('h:mm A'))
  }

  /**
   * Exibe o relatório
   * @memberOf ReportPage
   */
  getReport(): void {
    // Obetém os valores do usuário
    this.times = this.getInputs()
    // Validação
    if (!this.validate(this.times.plaque, this.times.start)) {
      return
    }
    let dates = this.convertDateToISO(this.times.start, this.times.finish)
    this.reportService.getReport(this.times.plaque, dates.start, dates.finish)
      .subscribe(report => {
        this.report = report
      })
  }

  /**
   * Obetem os valores dos imputs e padroniza
   * qualquer discrepância
   * @returns {{plaque: string, start: string, finish: string}}
   * @memberOf ReportPage
   */
  getInputs(): {plaque: string, start: string, finish: string} {
    let plaque = $('#plaque').val()
    let start = $('#start').val() + ' ' + $('#time-start').val() || moment().format('h:m A')
    let finish = $('#finish').val() + ' ' + $('#time-finish').val()

    if (!start || !moment(start, DATE_FORMAT).isValid()) {
      start = moment().subtract(1, 'hours').format(DATE_FORMAT)
    }

    if (!finish || !moment(finish, DATE_FORMAT).isValid()) {
      finish = moment().format(DATE_FORMAT)
    }

    return {plaque: plaque, start: start, finish: finish}
  }

  /**
   * Coverte a data para o formato ISO
   * @param {string} start
   * @param {string} finish
   * @returns
   * @memberOf ReportPage
   */
  convertDateToISO(start: string, finish: string) {
    // Se não for informada uma data fim, o dia atual é informado
    start = moment(start, DATE_FORMAT).toISOString()
    finish
      ? finish = moment(finish, DATE_FORMAT).toISOString()
      : finish = moment().toISOString()

    return {start: start, finish: finish}
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
      $('#start').addClass('error')
      $('#time-start').addClass('error')
      this.messages.showNotification('Você deve selecionar uma data de início.', 'error')
      return false
    }
    // Verifica se a data informada é válida
    if (!moment(start, DATE_FORMAT).isValid() || moment(start, DATE_FORMAT).isAfter(moment())) {
      $('#start').addClass('error')
      $('#time-start').addClass('error')
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
    $('#start').removeClass('error')
    $('time-start').removeClass('error')
  }
}
