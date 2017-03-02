import { Injectable } from '@angular/core'

// tslint:disable:forin
import 'messenger/build/js/messenger.js'

type AlertType = 'warning' | 'error' | 'success' | 'info' | 'question'

@Injectable()
export class MessagesService {
  /**
   * Exibe as notificações
   * @param {string} message
   * @param {string} [type]
   *
   * @memberOf Messages
   */
  public showNotification( message: string, type?: string ) {
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    }

    Messenger().post( {
      message: message,
      type: type,
      showCloseButton: true,
      maxMessages: 100
    })
  }

  /**
   * Exibe um alerta (SweerAlert)
   * @param {string} title
   * @param {string} [text]
   * @param {AlertType} [type]
   * @param {Object} [options]
   *
   * @memberOf Messages
   */
  public showAlert( title: string, text?: string, type?: AlertType, options?: Object ) {
    let alertOptions = {
      title: title,
      text: text || '',
      type: type || ''
    }
    // inclui em alertOption as demais opções em options
    for ( let key in options ) {
      alertOptions[ key ] = options[ key ]
    }
    swal( alertOptions ).catch(( err ) => err )
  }

}
