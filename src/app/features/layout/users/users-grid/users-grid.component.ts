
import { Component, EventEmitter, Output, Input } from '@angular/core'

import { fadeInOut } from '../../../../core'
import { UsersService, User } from '../shared'

@Component( {
  selector: 'users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: [ './users-grid.component.scss' ],
  animations: [ fadeInOut ]
})
export class UsersGridComponent {

  @Input() public data: User[]
  @Input() public title: string = 'Usuários'
  @Input() public readOnlyMode: boolean = true
  @Output() public onSelectUser: EventEmitter<User> = new EventEmitter()
  @Output() public onDeleteUser: EventEmitter<User> = new EventEmitter()

  public selectedUser: User | undefined

  /**
   * Creates an instance of UserTableComponent.
   * @param {UserService} userService
   *
   * @memberOf UserTableComponent
   */
  public constructor( public usersService: UsersService ) { }

  /**
   *
   *
   * @param {any} user
   *
   * @memberOf UserTableComponent
   */
  public delete( user: User ) {
    this.onDeleteUser.emit( user )
  }

  /**
   *
   *
   * @param {User} user
   *
   * @memberOf UserGridComponent
   */
  public select( user: User ) {
    this.selectedUser = user
    this.onSelectUser.emit( user )
  }

  /**
   *
   *
   *
   * @memberOf UserGridComponent
   */
  public unselect() {
    this.selectedUser = undefined
  }
}
