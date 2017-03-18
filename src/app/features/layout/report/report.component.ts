import { Component, ViewEncapsulation } from '@angular/core'
import * as moment from 'moment'

import { ReportService, ReportData, DataReportPrint, Filter } from './shared'
import { MessagesService, fadeInOut } from './../../../core'

const DATE_FORMAT = 'DD/MM/YYYY h:mm A'

@Component( {
  selector: 'report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.component.html',
  styleUrls: [ './report.component.scss' ],
  providers: [ ReportService ],
  animations: [ fadeInOut ]
} )
export class ReportComponent {

  public report: ReportData
  public filter: Filter = {} as Filter

  /**
   * Creates an instance of ReportComponent.
   * @param {ReportService} reportService
   * @param {MessagesService} messages
   *
   * @memberOf ReportComponent
   */
  constructor( private reportService: ReportService, private messages: MessagesService ) { }

  /**
   * Exibe o relatório
   *
   *
   * @memberOf ReportComponent
   */
  public getReport( filter: Filter ): void {
    this.report = undefined
    // Obtendo as datas
    this.reportService.generateReport( filter )
      .subscribe( report => {
        this.report = report
        this.filter = filter
      } )
  }

  /**
   *
   *
   *
   * @memberOf ReportComponent
   */
  public print(): void {

    this.reportService.getReportHtml( this.filter )
      .subscribe( html => {
        let popup: Window
        if ( window ) {
          if ( navigator.userAgent.toLowerCase().indexOf( 'chrome' ) > -1 ) {
            popup = window.open( '', '_blank', 'width=1024,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no' )
            this.checkPopup( popup ).then(() => {
              popup.window.focus()
              popup.document.write( html )
              this.emitDataPopup( popup )
              popup.window.history.pushState( 'relatorio', 'Relatório de conduta', '/app/report' )
              popup.onbeforeunload = function( event ) {
                popup.close()
                return '.\n'
              }
              popup.onabort = function( event ) {
                popup.document.close()
                popup.close()
              }
            } )
          } else {
            popup = window.open( '', '_blank', 'width=1024,height=600' )
            this.checkPopup( popup ).then(() => {
              popup.document.open()
              popup.document.write( html )
              this.emitDataPopup( popup )
              popup.window.history.pushState( 'relatorio', 'Relatório de conduta', '/app/report' )
              popup.document.close()
            } )
          }
        }
      },
      // Error
      () => {
        this.messages.showNotification( 'Ocorreu um erro inesperado.\nTente novamente mais tarde!', 'error' )
      } )
  }

  /**
   * Verifica o bloqueio de popup do navegador
   */
  private checkPopup( popup: Window ): Promise<boolean> {
    // todo LINK PARA TUTORIAL DE COMO DESBLOQUEAR POPUPS OU ADICIONAR EXCEÇÕES
    return new Promise(( resolve, reject ) => {
      setTimeout(() => {
        if ( !popup || popup.innerHeight <= 0 ) { // Popup bloqueado pelo navegador
          this.messages.showAlert( 'Bloqueio de popup', `Popup bloqueado pelo navegador, por favor habilite popups neste site para imprimir o relatório!
          <a href="https://www.google.com.br/webhp?sourceid=chrome-instant&rlz=1C5CHFA_enBR710BR710&ion=1&espv=2&ie=UTF-8#q=como%20desbloquear%20pop%20up" target="_blank">
          saiba como!</a>`, 'error' )
          return reject( null )
        }
        return resolve( true )
      }, 250 )
    } )
  }

  /**
   * Função responsável por levar os dados necessários do relatório ao popup
   */
  private emitDataPopup( popup: Window ): void {
    const $popup = $( popup )
    $popup.ready(() => {
      let app: DataReportPrint = {
        resumo: {
          data: moment().subtract( 1, 'hours' ).format( DATE_FORMAT ).toString(),
          imprudencias: {
            excessoVel: this.report.overSpeedingsTotal || 0,
            kmAc: this.report.kmAcumulated || 0,
            relacaoKmAc: this.report.overSpeedingsXKmAcumulated || 0,
            zonPerig: this.report.passOverDangerZones || 0
          },
          inicio: this.filter.start.toString(),
          termino: this.filter.finish.toString(),
          nomeArquivo: 'Arquivo sem nome',
          placa: this.report.plaque,
          protocolo: Date.now().toString()
        }
      };
      ( popup.window as any ).app.resumo = app.resumo;
      ( popup.window as any ).readyToPrint = true
    } )
  }
}
