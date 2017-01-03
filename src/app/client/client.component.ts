import { Component, ViewEncapsulation } from '@angular/core'

declare var Messenger
import { ClientService } from './../../providers/client.service'
import { IClient } from './../../interfaces/IClient'
import { IContact } from './../../interfaces/IContact'
import { IAddress } from './../../interfaces/IAddress'

@Component({
  selector: 'client',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './client.template.html',
  styleUrls: ['./client.styles.scss', '../scss/notifications.scss'],
  providers: [ClientService]
})

export class ClientPage {

  constructor(public clientService: ClientService) {}

  saveCLient() {
    let data = this.serializeObject($('#clientForm'))
    let address: IAddress = {
      address: data['address'],
      district: data['district'],
      city: data['city'],
      state: data['state'],
      zipcode: data['zipcode'],
      complement: data['complement']
    }

    let contact: IContact = {
      responsible: data['responsible'],
      phone: data['phone'],
      email: data['email']
    }

    let client: IClient = {
      companyName: data['company-name'],
      tradingName: data['trading-name'],
      market: data['market'],
      shareDangerousPoints: data['danger-points'],
      address: address,
      contact: contact
    }

    this.clientService.create(client).subscribe({
      next: (response) => {
        console.info(response)
        let msg = {
          text: 'Cliente cadastrado com sucesso!',
          type: 'success'
        }
        this.showMessages(msg)
      },
      error: (err) => {
        console.error(err)
        let msg = {
          text: 'Ocorreu um erro ao cadastrar o cliente',
          type: 'error'
        }
        this.showMessages(msg)
      },
      complete: () => {
        // Limpar formulário
      }
    })
  }

  serializeObject(form) {
    let obj = {}
    let data = $(form).serializeArray()
    data.map((input) => {
      if (obj[input.name] !== undefined) {
        if (!obj[input.name].push) {
          obj[input.name] = [obj[input.name]]
        }
        obj[input.name].push(input.value || '')
      } else {
        obj[input.name] = input.value || ''
      }
    })
    return obj
  }

  showMessages(msg) {
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    }
    Messenger().post({
      message: msg.text,
      showCloseButton: true,
      type: msg.type
    })
  }

}
