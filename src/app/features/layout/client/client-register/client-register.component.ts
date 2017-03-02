import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core'
import * as _ from 'lodash'

import { MessagesService } from '../../../../core'
import { ClientService, Client } from '../shared'
import { ClientGridComponent } from '../client-grid/client-grid.component'

@Component( {
  selector: 'client-register',
  templateUrl: './client-register.component.html',
  styleUrls: [ './client-register.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class ClientRegisterComponent implements OnInit {

  @ViewChild( ClientGridComponent ) public clientGrid: ClientGridComponent
  public clients: Client[]
  public client: Client = this.newClient()

  /**
   * Creates an instance of ClientRegisterComponent.
   * @param {ClientService} clientService
   * @param {MessagesService} messages
   *
   * @memberOf ClientRegisterComponent
   */
  constructor( private clientService: ClientService, private messages: MessagesService ) { }

  /**
   *
   *
   *
   * @memberOf ClientComponent
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
   * Cria ou atualiza um cliente
   * @returns
   * @memberOf ClientPage
   */
  public saveClient( client: Client ) {

    const onSuccess = response => {
      this.messages.showAlert( client.id ? 'Atualizado' : 'Cadastrado', 'O cliente foi salvo com sucesso.', 'success' )
    }

    const onError = error => {
      this.messages.showAlert( 'Erro', `Não foi possível salvar o cliente: ${error}`, 'error' )
    }

    const onComplete = () => {
      this.getAllClients()
    }

    this.clientService.save( client ).subscribe( { next: onSuccess, error: onError, complete: onComplete })
  }

  /**
   * Deleta um cliente
   * @param {IClient} client
   * @memberOf ClientPage
   */
  public deleteClient( client: Client ) {
    swal( {
      title: 'Deletar cliente',
      text: `Tem certeza que deseja deletar o cliente ${client.tradingName}?`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(() => {
      this.clientService.delete( client ).subscribe( {
        next: ( resp ) => {
          this.getAllClients()
          swal(
            'Deletado!',
            `O cliente ${client.tradingName} foi deletado com sucesso.`,
            'success'
          )
        },
        error: ( err ) => {
          swal(
            'Erro!',
            `Ocorreu um erro ao deletar o cliente. ${err}`,
            'error'
          )
        }
      })
    }).catch(( err ) => err )
  }

  /**
   *
   *
   * @param {Client} client
   *
   * @memberOf ClientRegisterComponent
   */
  public selectClient( client: Client ) {
    this.client = _.merge( {}, client )
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  public cancel() {
    this.client = this.newClient()
    this.clientGrid.unselect()
    this.messages.showNotification( 'Edição cancelada', 'success' )
  }

  /**
   *
   *
   * @returns {Client}
   *
   * @memberOf ClientRegisterComponent
   */
  public newClient(): Client {
    return { address: {}, contact: {}, shareDangerousPoints: false } as Client
  }

  /**
   *
   *
   * @param {any} address
   *
   * @memberOf ClientRegisterComponent
   */
  public notifyZipCodeError( address ) {
    this.messages.showNotification( 'CEP não encontrado', 'error' )
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
