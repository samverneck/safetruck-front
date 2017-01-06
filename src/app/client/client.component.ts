import { Component, ViewEncapsulation } from '@angular/core'

import { ValidationService } from './../../providers/validation.service'
import { CepService } from './../../providers/cep.service'
import { ClientService } from './../../providers/client.service'
import { FormUtils } from './../../utils/FormUtils'
import { Messages } from './../../utils/Messages'
import { STATES } from '../../utils/states.data'
// Interfaces
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
      cnpj: data['cnpj'],
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
        console.log('Resposta: ', response)
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

  getAddress(cep) {
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

  /**
   * Preenche os dados do formulário com os dados do cliente clicado
   * @param {any} client
   * @memberOf ClientPage
   */
  clientDidSelected(client): void {
    this.clientId = client.id
    $('[name="company-name"]').val(client.companyName)
    $('[name="trading-name"]').val(client.tradingName)
    $('[name="cnpj"]').val(client.cnpj)
    $('[name="zipcode"]').val(client.address.zipcode)
    $('[name="address"]').val(client.address.address)
    $('[name="num"]').val(client.address.num)
    $('[name="district"]').val(client.address.district)
    $('[name="city"]').val(client.address.city)
    $('[name="state"]').val(client.address.state)
    $('[name="complement"]').val(client.address.complement)
    $('[name="responsible"]').val(client.contact.responsible)
    $('[name="email"]').val(client.contact.email)
    $('[name="phone"]').val(client.contact.phone)
    $('[name="market"]').val(client.market)
    client.shareDangerousPoints
      ? $('[name="danger-points"]').prop('checked', true)
      : $('[name="danger-points"]').prop('checked', false)
  }

  clearForm() {
    this.clientId = null
    $('tbody').children().removeClass('selected')
    this.formUtils.clear('#clientForm')
  }
}
