import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { ValidationService, MessagesService, FormService } from '../../../../core'
import { EquipmentService, Equipment, EquipmentInstall, Orientation, EVechicleType, EquipmentType } from '../shared'
import { ClientService, Client } from '../../client/shared'

@Component( {
  selector: 'equipment-register',
  templateUrl: './equipment-register.component.html',
  styleUrls: [ './equipment-register.component.scss', '../../../../scss/notifications.scss' ],
  encapsulation: ViewEncapsulation.None
})

export class EquipmentRegisterComponent implements OnInit {

  public equipments: Equipment[]
  public showTable: boolean = false
  public viewMode: boolean = false
  public clients: Client[]
  public equipmentId: string
  public types = {
    orientation: Orientation,
    vehicleType: EVechicleType,
    equipmentType: EquipmentType
  }

  /**
   * Creates an instance of EquipmentRegisterComponent.
   * @param {ActivatedRoute} route
   * @param {EquipmentService} equipService
   * @param {ClientService} clientService
   * @param {ValidationService} validation
   *
   * @memberOf EquipmentRegisterComponent
   */
  constructor( public route: ActivatedRoute,
    public equipmentService: EquipmentService,
    public clientService: ClientService,
    public validation: ValidationService,
    public messages: MessagesService,
    public formUtils: FormService ) { }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public ngOnInit(): void {

    this.clientService.getAll().subscribe( {
      next: clients => this.clients = clients,
      error: console.error
    })

    this.equipmentService.getAll().subscribe( {
      next: equipments => this.equipments = equipments,
      complete: () => { this.showTable = true },
      error: console.error
    })

    if ( window.location.href.split( '/' )[ 5 ] === 'view' ) {
      this.getClientData()
      this.showTable = false
      this.viewMode = true
    }
    if ( window.location.href.split( '/' )[ 5 ] === 'register' ) {
      this.showTable = true
      this.viewMode = false
      // this.clientService.getAll().subscribe({
      //   next: clients => this.clients = clients,
      //   error: console.error
      // })
    }

    $( '.date' ).datepicker( {
      autoclose: true,
      todayBtn: 'linked',
      todayHighlight: true,
      assumeNearbyYear: true,
      placeholder: 'Selecione',
      format: 'dd/mm/yyyy',
      language: 'pt-BR'
    })
  }

  /**
   * Carrega os dados do equipamento que através do parametro id
   * passado pela URL
   */
  public getClientData() {
    this.route.params.forEach(( params: Params ) => {
      if ( params[ 'id' ] !== undefined ) {
        this.equipmentService.getById( params[ 'id' ] ).subscribe( {
          next: ( equipment ) => this.loadEquipmentData( equipment ),
          error: error => {
            console.log( error )
            window.history.back()
          }
        })
        return
      }
      window.history.back()
    })
  }

  /**
   * Criar ou altera um Equipamento
   * @returns
   * @memberOf EquipmentRegisterPage
   */
  public saveEquipament() {
    // Validando...
    if ( !this.validation.validateForm( '#equipmentForm' ) ) { return }
    // Obtendo os dados do formuulário
    let equipment: Equipment = this.getFormData()
    // Fazendo o POST/PUT para api
    this.equipmentService.save( equipment ).subscribe( {
      next: ( response ) => {
        this.updateEquipmentsTable()
        this.messages.showAlert(
          equipment.id ? 'Atualizado' : 'Cadastrado',
          equipment.id
            ? 'O equipamento foi atualizado com sucesso.'
            : 'O equipamento foi cadastrado com sucesso.',
          'success'
        )
        // console.info(response)
      },
      error: ( err ) => {
        this.messages.showAlert(
          'Erro',
          equipment.id
            ? `Ocorreu um erro ao atualizar o equipamento. ${err}.`
            : `Ocorreu um erro ao cadastrar o equipamento. ${err}.`,
          'error'
        )
        console.error( err )
      },
      complete: () => {
        this.clearForm()
      }
    })
  }

  /**
   * Obtém a lista de equipamentos
   * @memberOf EquipmentRegisterPage
   */
  public updateEquipmentsTable(): void {
    this.showTable = false
    this.equipmentService.getAll().subscribe( {
      next: ( resp ) => {
        this.equipments = resp
        this.showTable = true
      },
      error: console.error
    })
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
    }).then(() => {
      this.equipmentService.delete( equipment ).subscribe( {
        next: ( resp ) => {
          this.updateEquipmentsTable()
          console.log( resp )
          swal(
            'Deletado!',
            `O cliente ${equipment.code} foi deletado com sucesso.`,
            'success'
          )
        },
        error: ( err ) => {
          console.error( err )
          swal(
            'Erro!',
            `Ocorreu um erro ao deletar o equipamento. ${err}`,
            'error'
          )
        }
      })
    }).catch(( err ) => err )
  }

  /**
   * Obtem os dados do form
   * @returns {Equipment}
   * @memberOf EquipmentRegisterPage
   */
  public getFormData(): Equipment {
    let data = this.formUtils.serialize( '#equipmentForm' )
    let install: EquipmentInstall = {
      vehicleType: data[ 'vehicle' ],
      plaque: data[ 'plaque' ],
      orientation: data[ 'orientation' ],
      clientId: data[ 'client-id' ],
      installation: data[ 'installation' ],
      admeasurement: data[ 'admeasurement' ]
    }
    let equipment: Equipment = {
      id: this.equipmentId ? this.equipmentId : null,
      code: data[ 'code' ],
      type: data[ 'equipment' ],
      install: install
    }

    return equipment
  }

  /**
   * Preenche os dados do formulário com os dados do equipamento clicado
   *
   * @param {Equipment} equipment
   *
   * @memberOf EquipmentRegisterComponent
   */
  public loadEquipmentData( equipment: Equipment ): void {
    this.clearForm()
    this.equipmentId = equipment.id
    $( '[name="code"]' ).val( equipment.code )
    $( '[name="plaque"]' ).val( equipment.install.plaque )
    $( '[name="vehicle"]' ).val( equipment.install.vehicleType )
    $( '[name="equipment"]' ).val( equipment.type )
    $( '[name="orientation"]' ).val( equipment.install.orientation )
    $( '[name="client-id"]' ).val( equipment.install.clientId )
    $( '[name="installation"]' ).val( equipment.install.installation )
    $( '[name="admeasurement"]' ).val( equipment.install.admeasurement )
    $( '[name="clientName"]' ).val( equipment.install.client.companyName )
  }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public toUpperPlaque() {
    $( '[name="plaque"]' ).val( $( '[name="plaque"]' ).val().toUpperCase() )
  }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public clearForm() {
    this.equipmentId = null
    this.formUtils.clear( '#equipmentForm' )
  }
}
