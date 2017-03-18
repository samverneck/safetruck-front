import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core'
import * as _ from 'lodash'

import { MessagesService } from '../../../../core'
import { EquipmentService, Equipment } from '../shared'
import { EquipmentGridComponent } from '../equipment-grid/equipment-grid.component'

@Component( {
  selector: 'equipment-register',
  templateUrl: './equipment-register.component.html',
  styleUrls: [ './equipment-register.component.scss' ],
  encapsulation: ViewEncapsulation.None
} )

export class EquipmentRegisterComponent implements OnInit {

  @ViewChild( EquipmentGridComponent ) public equipmentGrid: EquipmentGridComponent
  public equipments: Equipment[]
  public equipment: Equipment = this.newEquipment()
  /**
   * Creates an instance of EquipmentRegisterComponent.
   * @param {ActivatedRoute} route
   * @param {EquipmentService} equipService
   * @param {ClientService} clientService
   * @param {ValidationService} validation
   *
   * @memberOf EquipmentRegisterComponent
   */
  constructor( public equipmentService: EquipmentService, public messages: MessagesService ) { }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public ngOnInit(): void {
    this.getAllEquipments()
  }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public getAllEquipments(): void {
    this.equipmentService.getAll().subscribe( equipments => this.equipments = equipments, error => this.handleError( error ) )
  }

  /**
   * Criar ou altera um Equipamento
   * @returns
   * @memberOf EquipmentRegisterPage
   */
  public saveEquipment( equipment: Equipment ) {

    const onSuccess = response => {
      this.messages.showAlert( equipment.id ? 'Atualizado' : 'Cadastrado', 'O equipamento foi salvo com sucesso.', 'success' )
    }

    const onError = error => {
      this.messages.showAlert( 'Erro', `Não foi possível salvar o equipamento: ${error}`, 'error' )
    }

    const onComplete = () => {
      this.getAllEquipments()
    }

    this.equipmentService.save( equipment ).subscribe( onSuccess, onError, onComplete )
  }

  /**
   * Deleta um equipamento
   * @param {Equipment} equipment
   * @memberOf EquipmentRegisterPage
   */
  public deleteEquipment( equipment: Equipment ) {
    swal( {
      title: 'Deletar equipamento',
      text: `Tem certeza que deseja deletar o equipamento ${equipment.code}?`,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    } ).then(() => {
      this.equipmentService.delete( equipment ).subscribe( {
        next: ( resp ) => {
          this.getAllEquipments()
          swal(
            'Deletado!',
            `O equipamento ${equipment.code} foi deletado com sucesso.`,
            'success'
          )
        },
        error: ( error ) => {
          swal(
            'Erro!',
            `Ocorreu um erro ao deletar o equipamento. ${error}`,
            'error'
          )
        }
      } )
    } ).catch(( err ) => err )
  }

  /**
   *
   *
   * @param {Equipment} client
   *
   * @memberOf EquipmentRegisterComponent
   */
  public selectEquipment( equipment: Equipment ) {
    this.equipment = _.merge( {}, equipment )
  }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public cancel() {
    this.equipment = this.newEquipment()
    this.equipmentGrid.unselect()
    this.messages.showNotification( 'Edição cancelada', 'success' )
  }

  /**
   *
   *
   * @returns {Equipment}
   *
   * @memberOf EquipmentRegisterComponent
   */
  public newEquipment(): Equipment {
    return { install: { plaque: '' } } as Equipment
  }

  /**
   *
   *
   * @private
   * @param {*} error
   *
   * @memberOf EquipmentRegisterComponent
   */
  private handleError( error: any ): void {
    console.error( error )
  }
}
