import { Component, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { ValidationService } from '../../../providers/validation.service'
import { CepService } from '../../../providers/cep.service'
import { ClientService } from '../../../providers/client.service'
import { FormUtils } from '../../../utils/FormUtils'
import { Messages } from '../../../utils/Messages'
import { STATES } from '../../../utils/states.data'
// Interfaces
import { IClient } from '../../../interfaces/IClient'
import { IContact } from '../../../interfaces/IContact'
import { IAddress } from '../../../interfaces/IAddress'

declare var swal: any
declare var $: any

@Component({
  selector: 'client',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './client.template.html',
  styleUrls: ['./client.styles.scss'],
  providers: [ClientService, ValidationService, CepService]
})

export class ClientPage {
  clients: Array<IClient>
  showTable: boolean
  viewMode: boolean
  states: Array<{abbr: string, name: string}> = STATES
  message = new Messages()
  formUtils = new FormUtils
  private clientId: any

  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public validation: ValidationService,
    public cepService: CepService
  ) {
      if (window.location.href.split('/')[5] === 'view') {
        this.getClientData()
        this.showTable = false
        this.viewMode = true
      }
      if (window.location.href.split('/')[5] === 'register') {
        this.showTable = true
        this.viewMode = false
        this.clientService.getAll().subscribe({
          next: resp => this.clients = resp,
          error: console.error
        })
      }
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
      error: console.error
    })
  }

  /**
   * Cria ou atualiza um cliente
   * @returns
   * @memberOf ClientPage
   */
  saveClient() {
    // Validando...
    if (!this.validation.validateForm('#clientForm')) return
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
      },
      error: (err) => {
        this.updateClientsTable()
        this.message.showAlert(
          'Erro',
          client.id
            ? 'Ocorreu um erro ao atualizar o cliente. ' + err
            : 'Ocorreu um erro ao cadastrar o cliente. ' + err,
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
            `Ocorreu um erro ao deletar o cliente. ${err}`,
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
    cep = cep.replace(/\D/g, '')
    if (!cep) return
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
  loadClientData(client): void {
    this.clearForm()
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
   * Carrega os dados do cliente que através do parametro id
   * passado pela URL
   * @memberOf ClientPage
   */
  getClientData() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.clientService.getById(params['id']).subscribe({
          next: client => this.loadClientData(client),
          error: err => window.history.back()
        })
        return
      }
      window.history.back()
    })
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
