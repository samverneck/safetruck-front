import { Component, ViewEncapsulation } from '@angular/core'

import { ValidationService } from './../../providers/validation.service'
import { CepService } from './../../providers/cep.service'
import { ClientService } from './../../providers/client.service'
import { FormUtils } from './../../utils/FormUtils'
import { Messages } from './../../utils/Messages'
import { STATES } from '../../utils/states.data'
import { IClient } from './../../interfaces/IClient'
import { IContact } from './../../interfaces/IContact'
import { IAddress } from './../../interfaces/IAddress'


@Component({
  selector: 'client',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './client.template.html',
  styleUrls: ['./client.styles.scss', '../scss/notifications.scss'],
  providers: [ClientService, ValidationService, CepService]
})

export class ClientPage {
  message = new Messages()
  formUtils = new FormUtils
  states: Array<any> = STATES
  private clientId: any
  constructor(
    public clientService: ClientService,
    public validation: ValidationService,
    public cepService: CepService
  ) {}

  saveCLient() {
    if (!this.validation.validateForm('#clientForm')) {
      return false
    }

    let data = this.formUtils.serialize('#clientForm')

    let address: IAddress = {
      address: data['address'],
      num: data['num'],
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
      id: this.clientId ? this.clientId : null,
      companyName: data['company-name'],
      tradingName: data['trading-name'],
      market: data['market'],
      shareDangerousPoints: data['danger-points'],
      address: address,
      contact: contact
    }

    this.clientService.save(client).subscribe({
      next: (response) => {
        this.message.showAlert(
          client.id ? 'Atualizado' : 'Cadastrado',
          client.id
            ? 'O cliente foi atualizado com sucesso.'
            : 'O cliente foi cadastrado com sucesso.',
          'success'
        )
        console.info(response)
      },
      error: (err) => {
        this.message.showAlert(
          'Erro',
          client.id
            ? 'Ocorreu algum erro ao atualizar o cliente. Tente novamente mais tarde.'
            : 'Ocorreu algum erro ao cadastrar o cliente. Tente novamente mais tarde.',
          'error'
        )
        console.error(err)
      },
      complete: () => {
        this.clearForm()
      }
    })
  }

  getCep(cep) {
    this.cepService.getAddress(cep).subscribe({
      next: (resp) => {
        if (resp.erro) {
          this.message.showNotification(
            'CEP não encontrado ou inválido. Por favor informe o endereço manualmente.',
            'error'
          )
          return
        }
        $('[name="address"]').val(resp.logradouro)
        $('[name="district"]').val(resp.bairro)
        $('[name="city"]').val(resp.localidade)
        $('[name="state"]').val(resp.uf)
        $('[name="num"]').focus()
      },
      error: (err) => {
        console.error('Erro ao obter CEP:', err)
      }
    })
  }

  clientDidSelected(client) {
    let getRandomInt = () => {
      let resp = Math.floor(Math.random() + 0.2)
      console.log(resp)
      return resp
    }
    this.clientId = client.id
    $('[name="company-name"]').val(client.name)
    $('[name="trading-name"]').val(client.username)
    $('[name="cnpj"]').val(client.phone)
    $('[name="address"]').val(client.address.street)
    $('[name="zipcode"]').val(client.address.zipcode)
    $('[name="city"]').val(client.address.city)
    $('[name="responsible"]').val(client.name)
    $('[name="email"]').val(client.email)
    $('[name="phone"]').val(client.phone)
    getRandomInt()
      ? $('[name="danger-points"]').prop('checked', true)
      : $('[name="danger-points"]').prop('checked', false)
  }

  clearForm() {
    this.clientId = null
    this.formUtils.clear('#clientForm')
  }
}
