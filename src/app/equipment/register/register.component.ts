import { Component, ViewEncapsulation } from '@angular/core'

declare var Messenger
import { ICLient } from './../../../interfaces/IClient'

@Component({
  selector: 'equipment-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.template.html',
  styleUrls: ['./register.styles.scss', '../../scss/notifications.scss']
})

export class EquipmentRegisterPage {
  client: ICLient
  code: string
  plaque: string


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
