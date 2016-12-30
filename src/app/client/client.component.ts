import { Component, ViewEncapsulation } from '@angular/core'
declare var Messenger

@Component({
  selector: 'client',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './client.template.html',
  styleUrls: ['./client.styles.scss', '../scss/notifications.scss']
})

export class ClientPage {

  constructor() {}

  saveCLient() {
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    }

    Messenger().post({
      message: 'Cliente cadastrado com sucesso!',
      showCloseButton: true,
      type: 'success'
    })
  }

}
