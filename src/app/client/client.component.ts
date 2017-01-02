import { IClient } from './../../interfaces/ICliente'
import { Component, ViewEncapsulation } from '@angular/core'

declare var Messenger
import { ClientsService } from './../../providers/clients.service'

@Component({
  selector: 'client',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './client.template.html',
  styleUrls: ['./client.styles.scss', '../scss/notifications.scss'],
  providers: [ClientsService]
})

export class ClientPage {

  constructor(public clientService: ClientsService) {}

  saveCLient() {
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top messenger-on-right'
    }

    let client = {
      razaoSocial: 'Juliano Petronetto',
      nomeFantasia: 'xDevel Sistemas',
      cnpj: '25.148.247/0001-80',
      endereco: {
        logradouro: 'Rua Professor Nelson Abel de Almeida, 63',
        bairro: 'Maria Ortiz',
        cidade: 'Vitória',
        cep: '29.072-220'
      }
    }
    this.clientService.create(client).subscribe({
      next: (response) => {
        console.info(response.json())
        Messenger().post({
          message: 'Cliente cadastrado com sucesso!',
          showCloseButton: true,
          type: 'success'
        })
      },
      error: (err) => {
        console.error(err)
        Messenger().post({
          message: 'Erro ao cadastrar Cliente. Tente novamente mais tarde.',
          showCloseButton: true,
          type: 'error'
        })
      },
      complete: () => {
        // Limpar formulário
      }
    })


  }

}
