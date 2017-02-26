import { Component, Output, Input, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core'
import { NgForm } from '@angular/forms'

import { ValidationService } from '../../../../core'
import { User } from '../shared'

@Component( {
  selector: 'users-form',
  templateUrl: 'users-form.component.html'
})
export class UsersFormComponent implements AfterViewChecked {
  @Output() public onSubmit = new EventEmitter<User>()
  @Output() public onCancel = new EventEmitter<any>()
  @Input() public user: User

  @ViewChild( 'userForm' ) public currentForm: NgForm
  public userForm: NgForm
  public errors = {}

  public validationMessages = {
    'name': {
      'required': 'Obrigatório',
      'minlength': 'Mínimo 6'
    },
    'role': {
      'required': 'Obrigatório'
    },
    'email': {
      'required': 'Obrigatório',
      'email': 'Email inválido'
    }
  }

  /**
   * Creates an instance of UsersFormComponent.
   *
   * @param {ValidationService} validation
   *
   * @memberOf UsersFormComponent
   */
  constructor( public validation: ValidationService ) { }

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
}
