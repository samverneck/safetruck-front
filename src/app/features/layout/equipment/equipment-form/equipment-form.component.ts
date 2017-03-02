import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewChecked } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ValidationService } from '../../../../core'
import { Equipment, Orientation, EVechicleType, EquipmentType } from '../shared'
import { ClientService, Client } from '../../client/shared'

@Component( {
  selector: 'equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: [ './equipment-form.component.scss' ]
} )

export class EquipmentFormComponent implements OnInit, AfterViewChecked {

  @Output() public onSubmit = new EventEmitter<Equipment>()
  @Output() public onCancel = new EventEmitter<any>()
  @Input() public equipment: Equipment
  @Input() public readOnlyMode: boolean = false

  @ViewChild( 'equipmentForm' ) public currentForm: NgForm
  public equipmentForm: NgForm
  public errors = {}
  public clients: Client[]
  public types = {
    orientation: Orientation,
    vehicleType: EVechicleType,
    equipmentType: EquipmentType
  }
  public masks = {
    plaque: [ /[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, /\d/, /\d/, /\d/, /\d/ ],
    date: [ /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/ ]
  }
  public validationMessages = {
    'code': {
      'required': 'Obrigatório',
      'minlength': 'Mínimo 64'
    },
    'type': {
      'required': 'Obrigatório'
    },
    'install.clientId': {
      'required': 'Obrigatório'
    },
    'install.plaque': {
      'required': 'Obrigatório',
      'pattern': 'Placa inválida'
    },
    'install.vehicleType': {
      'required': 'Obrigatório'
    },
    'install.orientation': {
      'required': 'Obrigatório'
    },
    'install.installation': {
      'required': 'Obrigatório',
      'date': 'dd/mm/aaaa'
    },
    'install.admeasurement': {
      'required': 'Obrigatório',
      'date': 'dd/mm/aaaa'
    }
  }

  /**
   * Creates an instance of EquipmentFormComponent.
   * @param {ClientService} clientService
   * @param {ValidationService} validation
   *
   * @memberOf EquipmentFormComponent
   */
  constructor( public clientService: ClientService, public validation: ValidationService ) { }

  /**
   *
   *
   *
   * @memberOf EquipmentRegisterComponent
   */
  public ngOnInit(): void {
    this.clientService.getAll().subscribe( clients => this.clients = clients, error => this.handleError( error ) )
  }

  /**
   *
   *
   *
   * @memberOf EquipmentFormComponent
   */
  public onSubmitClick() {
    if ( this.equipmentForm.form.valid ) {
      this.onSubmit.emit( this.equipment )
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
   * @memberOf ClientFormComponent
   */
  public onCancelClick() {
    this.equipmentForm.reset()
    this.onCancel.emit()
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  private formChanged() {
    if ( this.currentForm === this.equipmentForm ) { return }
    this.equipmentForm = this.currentForm
    if ( this.equipmentForm ) {
      this.equipmentForm.valueChanges.subscribe(() => this.updateErrors() )
    }
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  private updateErrors() {
    this.errors = this.validation.getFormErrors( this.equipmentForm, this.validationMessages )
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
