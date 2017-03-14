import { Component, ViewEncapsulation, AfterViewChecked, ViewChild, Input, Output, EventEmitter } from '@angular/core'
import { NgForm } from '@angular/forms'

import { ValidationService, CepService, FormService, STATES } from '../../../../core'
import { Client } from '../shared'

@Component( {
  selector: 'client-form',
  templateUrl: 'client-form.component.html',
  encapsulation: ViewEncapsulation.None
} )
export class ClientFormComponent implements AfterViewChecked {

  @Output() public onSubmit = new EventEmitter<Client>()
  @Output() public onZipCodeError = new EventEmitter<any>()
  @Output() public onZipCodeChanged = new EventEmitter<any>()
  @Output() public onCancel = new EventEmitter<any>()
  @Input() public client: Client
  @Input() public readOnlyMode: boolean = false

  @ViewChild( 'clientForm' ) public currentForm: NgForm
  public clientForm: NgForm
  public states: { abbr: string, name: string }[] = STATES
  public errors = {}
  public masks = {
    cnpj: [ /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/ ],
    zipcode: [ /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ],
    phone: ( userInput ) => {
      let numbers = userInput.match( /\d/g )
      let numberLength = 0
      if ( numbers ) {
        numberLength = numbers.join( '' ).length
      }
      if ( numberLength > 10 ) {
        return [ '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
      } else {
        return [ '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]
      }
    }
  }

  public validationMessages = {
    'companyName': {
      'required': 'Obrigatório',
      'minlength': 'Mínimo 3'
    },
    'tradingName': {
      'required': 'Obrigatório',
      'minlength': 'Mínimo 3'
    },
    'cnpj': {
      'required': 'Obrigatório',
      'cnpj': '00.000.000/0000.00'
    },
    'alias': {
      'required': 'Obrigatório', // só pode ter lowercase/letras e numeros
      'minlength': 'Mínimo 3',
      'maxlength': 'Máximo 56',
      'pattern': 'Alias inválido'
    },
    'market': {
      'required': 'Obrigatório'
    },
    'limit': {
      'required': 'Obrigatório'
    },
    'forwardAcceleration': {
      'required': 'Obrigatório'
    },
    'braking': {
      'required': 'Obrigatório'
    },
    'lateralAcceleration': {
      'required': 'Obrigatório'
    },
    'verticalAcceleration': {
      'required': 'Obrigatório'
    },
    'movingAverage': {
      'required': 'Obrigatório',
      'min': 'Mínimo 1'
    },
    'address.zipcode': {
      'required': 'Obrigatório',
      'zipcode': '00.000-000'
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
      'required': 'Obrigatório',
      'minlength': 'Mínimo 6'
    },
    'contact.phone': {
      'required': 'Obrigatório',
      'phone': '(00) 0000-0000'
    },
    'contact.email': {
      'required': 'Obrigatório',
      'email': 'Email inválido'
    }
  }

  /**
   * Creates an instance of ClientFormComponent.
   * @param {ValidationService} validation
   * @param {CepService} cepService
   * @param {FormService} formUtils
   *
   * @memberOf ClientFormComponent
   */
  constructor(
    public validation: ValidationService,
    public cepService: CepService,
    public formUtils: FormService
  ) { }

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
   * @memberOf ClientFormComponent
   */
  public onSubmitClick() {
    if ( this.clientForm.valid ) {
      this.onSubmit.emit( this.client )
    }
  }

  /**
   *
   *
   *
   * @memberOf ClientFormComponent
   */
  public onCancelClick() {
    this.clientForm.reset()
    this.onCancel.emit()
  }

  /**
   * Obtém o endereço a partir do CEP digitado
   * @param {string} cep
   * @memberOf ClientPage
   */
  public getAddress( zipcode: string ): void {
    this.cepService.getAddress( zipcode ).subscribe( address => {
      if ( address.erro ) {
        this.onZipCodeError.emit( address )
      } else {
        this.onZipCodeChanged.emit( address )
        this.client.address = address
      }
    },
      error => this.handleError( error ) )
  }

  /**
   * Cria o Alias a partir do Nome Fantasia
   * @memberOf ClientPage
   */
  public fillAlias(): void {
    this.client.alias = this.formUtils.slugger( this.client.alias || this.client.tradingName )
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  private formChanged() {
    if ( this.currentForm === this.clientForm ) { return }
    this.clientForm = this.currentForm
    if ( this.clientForm ) {
      this.clientForm.valueChanges.subscribe(() => this.updateErrors() )
    }
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  private updateErrors() {
    this.errors = this.validation.getFormErrors( this.clientForm, this.validationMessages )
  }

  /**
   *
   *
   * @private
   * @param {*} error
   *
   * @memberOf ClientRegisterComponent
   */
  private handleError( error: any ): void {
    console.error( error )
  }
}
