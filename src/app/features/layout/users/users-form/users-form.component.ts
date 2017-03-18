import { Component, Output, Input, EventEmitter, ViewChild, AfterViewChecked, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

import { ClientService, Client } from '../../client/shared'
import { ValidationService } from '../../../../core'
import { User } from '../shared'

@Component( {
  selector: 'users-form',
  templateUrl: 'users-form.component.html'
} )
export class UsersFormComponent implements OnInit, AfterViewChecked {
  @Output() public onSubmit = new EventEmitter<User>()
  @Output() public onCancel = new EventEmitter<any>()
  @Input() public user: User

  @ViewChild( 'userForm' ) public currentForm: NgForm
  public userForm: NgForm
  public errors = {}

  public clients: Client[]

  public validationMessages = {
    'name': {
      'required': 'Obrigatório',
      'minlength': 'Mínimo 6'
    },
    'email': {
      'required': 'Obrigatório',
      'email': 'Email inválido'
    },
    'clientId': {
      'required': 'Obrigatório'
    }
  }

  /**
   * Creates an instance of UsersFormComponent.
   *
   * @param {ValidationService} validation
   *
   * @memberOf UsersFormComponent
   */
  constructor( public validation: ValidationService, private clientService: ClientService ) { }

  /**
   *
   *
   *
   * @memberOf UsersFormComponent
   */
  public ngOnInit(): void {
    this.getAllClients()
  }

  /**
   * Obtém a lista de clientes
   * @memberOf ClientPage
   */
  public getAllClients(): void {
    this.clientService.getAll().subscribe( clients => this.clients = clients, error => this.handleError( error ) )
  }

  /**
   *
   *
   * @param {number} clientId
   *
   * @memberOf UsersFormComponent
   */
  public updateClient( clientId: number ) {
    this.user.client = this.clients.find( c => c.id === this.user.clientId )
  }

  /**
   *
   *
   *
   * @memberOf UserRegisterComponent
   */
  public ngAfterViewChecked() {
    this.formChanged()
  }

  /**
   *
   *
   *
   * @memberOf UsersFormComponent
   */
  public onSubmitClick() {
    if ( this.userForm.valid ) {
      this.user.username = this.user.username || this.user.email
      this.onSubmit.emit( this.user )
    }
  }

  /**
   *
   *
   *
   * @memberOf UsersFormComponent
   */
  public onCancelClick() {
    this.userForm.reset()
    this.onCancel.emit()
  }

  /**
   *
   *
   *
   * @memberOf UserRegisterComponent
   */
  private formChanged() {
    if ( this.currentForm === this.userForm ) { return }
    this.userForm = this.currentForm
    if ( this.userForm ) {
      this.userForm.valueChanges.subscribe(() => this.updateErrors() )
    }
  }

  /**
   *
   *
   *
   * @memberOf UserRegisterComponent
   */
  private updateErrors() {
    this.errors = this.validation.getFormErrors( this.userForm, this.validationMessages )
  }

  /**
   *
   *
   * @private
   * @param {*} error
   *
   * @memberOf UserRegisterComponent
   */
  private handleError( error: any ): void {
    console.error( error )
  }
}
