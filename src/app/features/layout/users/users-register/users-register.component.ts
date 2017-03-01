import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import * as _ from 'lodash'

import { MessagesService } from '../../../../core'
import { UsersService, User } from '../shared'
// import { UsersGridComponent } from '../users-grid/users-grid.component'

@Component( {
  templateUrl: 'users-register.component.html',
  encapsulation: ViewEncapsulation.None
} )
export class UsersRegisterComponent implements OnInit {

  // @ViewChild( UsersGridComponent ) public usersGrid: UsersGridComponent
  public users: User[]
  public selectedUser: User = this.newUser()

  /**
   * Creates an instance of UserRegisterComponent.
   * @param {UsersService} userService
   * @param {MessagesService} messages
   *
   * @memberOf UserRegisterComponent
   */
  constructor(
    private userService: UsersService,
    private messages: MessagesService ) { }

  /**
   *
   *
   *
   * @memberOf UserComponent
   */
  public ngOnInit(): void {
    this.getAllUsers()
  }

  /**
   * Obtém a lista de users
   * @memberOf UserPage
   */
  public getAllUsers(): void {
    this.userService.getAll().subscribe( users => this.users = users, error => this.handleError( error ) )
  }

  /**
   * Cria ou atualiza um user
   * @returns
   * @memberOf UserPage
   */
  public saveUser( user: User ) {

    const onSuccess = response => {
      this.messages.showAlert( user.id ? 'Atualizado' : 'Cadastrado', 'O usuário foi salvo com sucesso.', 'success' )
    }

    const onError = error => {
      this.messages.showAlert( 'Erro', `Não foi possível salvar o usuário: ${error}`, 'error' )
    }

    const onComplete = () => {
      this.getAllUsers()
    }

    this.userService.save( user ).subscribe( onSuccess, onError, onComplete )
  }

  /**
   * Deleta um user
   * @param {IUser} user
   * @memberOf UserPage
   */
  public deleteUser( user: User ) {
    swal( {
      title: 'Deletar Usuário',
      text: `Tem certeza que deseja deletar o usuário ${user.name}?`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    } ).then(() => {
      this.userService.delete( user ).subscribe( {
        next: ( resp ) => {
          this.getAllUsers()
          swal(
            'Deletado!',
            `O usuário ${user.name} foi deletado com sucesso.`,
            'success'
          )
        },
        error: ( err ) => {
          swal(
            'Erro!',
            `Ocorreu um erro ao deletar o usuário. ${err}`,
            'error'
          )
        }
      } )
    } ).catch(( err ) => err )
  }

  /**
   *
   *
   * @param {User} user
   *
   * @memberOf UserRegisterComponent
   */
  public selectUser( user: User ) {
    this.selectedUser = _.merge( {}, user )
  }

  /**
   *
   *
   *
   * @memberOf UserRegisterComponent
   */
  public cancel() {
    this.selectedUser = this.newUser()
    // this.usersGrid.unselect()
    this.messages.showNotification( 'Edição cancelada', 'success' )
  }

  /**
   *
   *
   * @returns {User}
   *
   * @memberOf UserRegisterComponent
   */
  public newUser(): User {
    return { isAdmin: false } as User
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
