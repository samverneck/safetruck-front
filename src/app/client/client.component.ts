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

declare var swal: any
declare var $: any

@Component({
  selector: 'client',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './client.template.html',
  styleUrls: ['./client.styles.scss', '../scss/notifications.scss'],
  providers: [ClientService, ValidationService, CepService]
})

export class ClientPage {
  clients: Array<any>
  showTable: boolean = true
  message = new Messages()
  formUtils = new FormUtils
  states: Array<any> = STATES
  private clientId: any

  constructor(
    public clientService: ClientService,
    public validation: ValidationService,
    public cepService: CepService
  ) {
      this.clientService.getAll().subscribe({
        next: (resp) => this.clients = resp,
        error: (err) => console.error(err)
      })
  }

  /**
   * Obtém a lista de clientes
   * @memberOf ClientPage
   */
  updateClientsTable(): void {
    this.showTable = false
    this.clientService.getAll().subscribe({
      next: (resp) => {
        this.clients = resp
        this.showTable = true
      },
      error: (err) => {
        console.error(err)
        this.showTable = true
      }
    })
  }

  /**
   * Cria ou atualiza um cliente
   * @returns
   * @memberOf ClientPage
   */
  saveClient() {
    // Validando...
    if (!this.validation.validateForm('#clientForm')) {
      return false
    }
    // Obtendo dados do formulário
    let client: IClient = this.getFormData()
    // Fazendo POST/PUT para a apai
    this.clientService.save(client).subscribe({
      next: (response) => {
        this.updateClientsTable()
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
        this.updateClientsTable()
        this.message.showAlert(
          'Erro',
          client.id
            ? 'Ocorreu algum erro ao atualizar o cliente. Tente novamente mais tarde.'
            : 'Ocorreu algum erro ao cadastrar o cliente. Tente novamente mais tarde.',
          'error'
        )
        console.error('Erro: ', err)
      },
      complete: () => {
        this.clearForm()
      }
    })
  }

  /**
   * Deleta um cliente
   * @param {IClient} client
   * @memberOf ClientPage
   */
  deleteClient(client: IClient) {
    swal({
      title: 'Deletar cliente',
      text: `Tem certeza que deseja deletar o cliente ${client.tradingName}?`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(() => {
      this.clientService.delete(client).subscribe({
        next: (resp) => {
          this.updateClientsTable()
          console.log(resp)
          swal(
            'Deletado!',
            `O cliente ${client.tradingName} foi deletado com sucesso.`,
            'success'
          )
        },
        error: (err) => {
          console.error(err)
          swal(
            'Erro!',
            'Ocorreu um erro ao deletar o cliente. Tente novamente mais tarde.',
            'error'
          )
        }
      })
    }).catch((err) => err)

  }

  /**
   * Obtém os dados do formulário e faz um parse
   * @returns {IClient}
   * @memberOf ClientPage
   */
  getFormData(): IClient {
    // Obtendo os dados do formuário
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
      alias: data['alias'],
      cnpj: data['cnpj'],
      market: data['market'],
      limit: data['limit'],
      shareDangerousPoints: data['danger-points'] || false,
      address: address,
      contact: contact
    }

    return client
  }

  /**
   * Obtém o endereço a partir do CEP digitado
   * @param {string} cep
   * @memberOf ClientPage
   */
  getAddress(cep: string): void {
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
   * Cria o Alias a partir do Nome Fantasia
   * @memberOf ClientPage
   */
  slugify(): void {
    let alias = $('[name="alias"]')
    if (!alias.val()) {
      let tradingName = $('[name="trading-name"]').val()
      let slug = this.formUtils.slugfy(tradingName)
      alias.val(slug)
    }
  }

  /**
   * Preenche os dados do formulário com os dados do cliente clicado
   * @param {any} client
   * @memberOf ClientPage
   */
  clientSelected(client): void {
    this.clientId = client.id
    $('[name="company-name"]').val(client.companyName)
    $('[name="trading-name"]').val(client.tradingName)
    $('[name="alias"]').val(client.alias)
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
    $('[name="limit"]').val(client.limit)
    client.shareDangerousPoints
      ? $('[name="danger-points"]').prop('checked', true)
      : $('[name="danger-points"]').prop('checked', false)
  }

  /**
   * Limpa os dados do formuário
   * @memberOf ClientPage
   */
  clearForm(): void {
    this.clientId = null
    $('tbody').children().removeClass('selected')
    this.formUtils.clear('#clientForm')
  }
}
