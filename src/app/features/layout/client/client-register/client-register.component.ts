import { Component, ViewEncapsulation, OnInit, AfterViewChecked, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgForm } from '@angular/forms'

import { ValidationService, CepService, MessagesService, FormService, STATES } from '../../../../core'

import {
  ClientService,
  Client
} from '../shared'

@Component({
  selector: 'client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientRegisterComponent implements OnInit, AfterViewChecked {

  @ViewChild('clientForm') public currentForm: NgForm
  public clientForm: NgForm
  public clients: Client[]
  public client: Client = { address: {}, contact: {} } as Client
  public viewMode: boolean
  public states: { abbr: string, name: string }[] = STATES
  public errors = {}
  public masks = {
    cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    zipcode: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    phone: (userInput) => {
      let numbers = userInput.match(/\d/g)
      let numberLength = 0
      if (numbers) {
        numberLength = numbers.join('').length
      }
      if (numberLength > 10) {
        return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      } else {
        return ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
    }
  }

  public validationMessages = {
    'companyName': {
      'required': 'Obrigatório'
    },
    'tradingName': {
      'required': 'Obrigatório'
    },
    'cnpj': {
      'required': 'Obrigatório'
    },
    'alias': {
      'required': 'Obrigatório'
    },
    'market': {
      'required': 'Obrigatório'
    },
    'address.zipcode': {
      'required': 'Obrigatório'
    },
    'address.address': {
      'required': 'Obrigatório'
    },
    'address.num': {
      'required': 'Obrigatório'
    },
    'address.district': {
      'required': 'Obrigatório'
    },
    'address.city': {
      'required': 'Obrigatório'
    },
    'address.state': {
      'required': 'Obrigatório'
    },
    'contact.responsible': {
      'required': 'Obrigatório'
    },
    'contact.phone': {
      'required': 'Obrigatório'
    },
    'contact.email': {
      'required': 'Obrigatório'
    }
  }


  /**
   * Creates an instance of ClientComponent.
   * @param {ActivatedRoute} route
   * @param {ClientService} clientService
   * @param {ValidationService} validation
   * @param {CepService} cepService
   *
   * @memberOf ClientComponent
   */
  constructor(
    private route: ActivatedRoute,
    public clientService: ClientService,
    public validation: ValidationService,
    public cepService: CepService,
    public messages: MessagesService,
    public formUtils: FormService
  ) { }

  /**
   *
   *
   *
   * @memberOf ClientComponent
   */
  public ngOnInit(): void {
    const id = this.route.snapshot.params['id']
    this.viewMode = !!id

    if (this.viewMode) {
      this.getClient(id)
    } else {
      this.getAllClients()
    }
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  public ngAfterViewChecked() {
    this.formChanged()
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  public formChanged() {
    if (this.currentForm === this.clientForm) { return }
    this.clientForm = this.currentForm
    this.clientForm.valueChanges.subscribe(() => this.updateErrors())
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  public updateErrors() {
    this.errors = this.validation.getFormErrors(this.clientForm, this.validationMessages)
  }

  /**
   * Obtém a lista de clientes
   * @memberOf ClientPage
   */
  public getAllClients(): void {
    this.clientService.getAll().subscribe({
      next: clients => this.clients = clients,
      error: error => this.handleError(error)
    })
  }

  /**
   * Cria ou atualiza um cliente
   * @returns
   * @memberOf ClientPage
   */
  public saveClient() {

    if (this.clientForm.invalid) {
      const validationMessage = this.validation.getValidationMessage(this.errors)
      this.messages.showNotification(validationMessage, 'error')
      return
    }

    const onSuccess = response => {
      this.messages.showAlert(this.client.id ? 'Atualizado' : 'Cadastrado', 'O cliente foi salvo com sucesso.', 'success')
      this.clearForm()
    }

    const onError = error => {
      this.messages.showAlert('Erro', `Não foi possível salvar o cliente: ${error}`, 'error')
    }

    const onComplete = () => {
      this.getAllClients()
    }

    this.clientService.save(this.client).subscribe({ next: onSuccess, error: onError, complete: onComplete })
  }

  /**
   * Deleta um cliente
   * @param {IClient} client
   * @memberOf ClientPage
   */
  public deleteClient(client: Client) {
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
          this.getAllClients()
          swal(
            'Deletado!',
            `O cliente ${client.tradingName} foi deletado com sucesso.`,
            'success'
          )
        },
        error: (err) => {
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
   * Obtém o endereço a partir do CEP digitado
   * @param {string} cep
   * @memberOf ClientPage
   */
  public getAddress(cep: string): void {
    cep = cep.replace(/\D/g, '')
    if (!cep) { return }

    this.cepService.getAddress(cep).subscribe({
      next: (address) => {
        if (address.erro) {
          this.messages.showNotification('CEP não encontrado ou inválido. Por favor informe o endereço manualmente.', 'error')
        } else {
          this.client.address = address
        }
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
  public fillAlias(): void {
    this.client.alias = this.client.alias || this.formUtils.slugger(this.client.tradingName)
  }

  /**
   * Carrega os dados do cliente que através do parametro id
   * passado pela URL
   * @memberOf ClientPage
   */
  public getClient(id: number) {
    this.clientService.getById(id).subscribe({
      next: client => this.client = client,
      error: error => this.handleError(error)
    })
  }

  /**
   *
   *
   * @param {Client} client
   *
   * @memberOf ClientRegisterComponent
   */
  public selectClient(client: Client) {
    this.client = $.extend(true, {}, client)
  }

  /**
   * Limpa os dados do formuário
   * @memberOf ClientPage
   */
  public clearForm(): void {
    this.client = { id: this.client.id, address: {}, contact: {} } as Client
  }

  /**
   *
   *
   * @private
   * @param {*} error
   *
   * @memberOf ClientRegisterComponent
   */
  private handleError(error: any): void {
    console.log(error)
  }
}
