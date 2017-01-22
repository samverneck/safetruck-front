import {
  Component, ViewEncapsulation, OnInit,
  trigger, transition, style, animate
} from '@angular/core'
import * as _ from 'lodash'
import * as moment from 'moment'

import { ReportService } from './../../providers/report.service'
import { IReportData } from './../../interfaces/IReport'
import { Messages } from './../../utils/Messages'
import { Http } from '@angular/http'

declare var $: any

const DATE_FORMAT = 'DD/MM/YYYY h:mm A'

interface IDataReportPrint {
  resumo: {
    nomeArquivo: string
    data: string
    protocolo: string
    inicio: string
    termino: string
    placa: string
    imprudencias: {
      excessoVel: number
      zonPerig: number
      kmAc: number
      relacaoKmAc: number
    }
  }
  excessos?: { // todo deixar obrigatório
    inicio: string
    termino: string
    velMax: string
    endereco: string
    percurso: string
    map: any // todo coordenadas google maps ou api aplicada diretamente
  }[]
}

@Component({
  selector: 'report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.template.html',
  styleUrls: ['./report.styles.scss'],
  providers: [ReportService],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class ReportPage implements OnInit {
  report: IReportData
  plaques: string[]
  messages = new Messages()
  times: any
  showReports: boolean

  constructor(public reportService: ReportService, private http: Http) {
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
    this.showReports = false
    // Obetém os valores do usuário
    this.times = this.getInputs()
    // Validação
    if (!this.validate(this.times.plaque, this.times.start)) return
    // Obtendo as datas
    let dates = this.convertDateToISO(this.times.start, this.times.finish)
    this.reportService.getReport(this.times.plaque, dates.start, dates.finish)
      .subscribe(report => {
        this.report = report
        this.showReports = true
      })
  }

  /**
   * Obetem os valores dos imputs e padroniza
   * qualquer discrepância
   * @returns {{plaque: string, start: string, finish: string}}
   * @memberOf ReportPage
   */
  getInputs(): { plaque: string, start: string, finish: string } {
    let plaque = $('#plaque').val()
    let start = $('#start').val() + ' ' + $('#time-start').val() || moment().format('h:m A')
    let finish = $('#finish').val() + ' ' + $('#time-finish').val()

    if (!start || !moment(start, DATE_FORMAT).isValid()) {
      start = moment().subtract(1, 'hours').format(DATE_FORMAT)
    }

    if (!finish || !moment(finish, DATE_FORMAT).isValid()) {
      finish = moment().format(DATE_FORMAT)
    }

    return { plaque: plaque, start: start, finish: finish }
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

    return { start: start, finish: finish }
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

  print(): void {

    this.times = this.getInputs()
    // Validação
    if (!this.validate(this.times.plaque, this.times.start)) return
    // Obtendo as datas
    let dates = this.convertDateToISO(this.times.start, this.times.finish)
    this.reportService.getReportHtml(this.times.plaque, dates.start, dates.finish)
      .subscribe(html => {
        let popup: Window
        if (window) {
          if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            popup = window.open('', '_blank', 'width=1024,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no')
            this.checkPopup(popup).then(() => {
              popup.window.focus()
              popup.document.write(html)
              this.emitDataPopup(popup)
              popup.window.history.pushState('relatorio', 'Relatório de conduta', '/app/report')
              popup.onbeforeunload = function (event) {
                popup.close()
                return '.\n'
              }
              popup.onabort = function (event) {
                popup.document.close()
                popup.close()
              }
            })
          } else {
            popup = window.open('', '_blank', 'width=1024,height=600')
            this.checkPopup(popup).then(() => {
              popup.document.open()
              popup.document.write(html)
              this.emitDataPopup(popup)
              popup.window.history.pushState('relatorio', 'Relatório de conduta', '/app/report')
              popup.document.close()
            })
          }
        }
      },
      // Error
      () => {
        this.messages.showNotification('Ocorreu um erro inesperado.\nTente novamente mais tarde!', 'error')
      })
  }

  /**
   * Verifica o bloqueio de popup do navegador
   */
  private checkPopup(popup: Window): Promise<boolean> {
    // todo LINK PARA TUTORIAL DE COMO DESBLOQUEAR POPUPS OU ADICIONAR EXCEÇÕES
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!popup || popup.innerHeight <= 0) { // Popup bloqueado pelo navegador
          this.messages.showAlert('Bloqueio de popup', `Popup bloqueado pelo navegador, por favor habilite popups neste site para imprimir o relatório!
          <a href="https://www.google.com.br/webhp?sourceid=chrome-instant&rlz=1C5CHFA_enBR710BR710&ion=1&espv=2&ie=UTF-8#q=como%20desbloquear%20pop%20up" target="_blank">
          saiba como!</a>`, 'error')
          return reject(null)
        }
        return resolve(true)
      }, 250)
    })
  }

  /**
   * Função responsável por levar os dados necessários do relatório ao popup
   */
  private emitDataPopup(popup: Window): void {
    const $popup = $(popup)
    $popup.ready(() => {
      let app: IDataReportPrint = {
        resumo: {
          data: moment().subtract(1, 'hours').format(DATE_FORMAT).toString(),
          imprudencias: {
            excessoVel: this.report.overSpeedingsTotal || 0,
            kmAc: this.report.kmAcumulated || 0,
            relacaoKmAc: this.report.overSpeedingsXKmAcumulated || 0,
            zonPerig: this.report.passOverDangerZones || 0
          },
          inicio: this.times.start.toString(),
          termino: this.times.finish.toString(),
          nomeArquivo: 'Arquivo sem nome',
          placa: this.report.plaque,
          protocolo: Date.now().toString()
        }
      };
      (popup.window as any).app.resumo = app.resumo;
      (popup.window as any).readyToPrint = true
    })
  }
}
