import { Component, ViewEncapsulation } from '@angular/core'
declare var Messenger

@Component({
  selector: 'equipament-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.template.html',
  styleUrls: ['./register.styles.scss', '../../scss/notifications.scss']
})

export class EquipamentRegisterPage {
  date: Date
  datepickerOpts: any = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true,
    placeholder: 'Selecione',
    format: 'd/m/yyyy',
    language: 'pt-BR'
  }
  constructor() {
  }

  saveEquipament() {
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    }

    Messenger().post({
      message: 'Equipamento cadastrado com sucesso!',
      showCloseButton: true,
      type: 'success'
    })
  }

}
