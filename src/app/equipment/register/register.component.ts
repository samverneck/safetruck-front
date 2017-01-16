import { IEquipmentInstall } from './../../../interfaces/IEquipmentInstall';
import { Component, ViewEncapsulation, OnInit } from '@angular/core'

import { EquipmentService } from './../../../providers/equipment.service'
import { ClientService } from './../../../providers/client.service'
import { ValidationService } from './../../../providers/validation.service'
import { FormUtils } from './../../../utils/FormUtils'
import { Messages } from './../../../utils/Messages'
// Interfaces
import { IEquipment } from './../../../interfaces/IEquipment'

declare var $: any

@Component({
  selector: 'equipment-register',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './register.template.html',
  styleUrls: ['./register.styles.scss', '../../scss/notifications.scss'],
  providers: [EquipmentService, ValidationService, ClientService]
})

export class EquipmentRegisterPage implements OnInit {
  messages = new Messages()
  formUtils = new FormUtils()
  clients: Array<any>
  equipmentId: string

  constructor(
    public equipService: EquipmentService,
    public clientService: ClientService,
    public validation: ValidationService
  ) {
    this.clientService.getAll().subscribe(resp => {
      this.clients = resp
    })
  }

  ngOnInit(): void {
    $('.date').datepicker({
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
   * Criar ou altera um Equipamento
   * @returns
   * @memberOf EquipmentRegisterPage
   */
  saveEquipament() {
    // Validando...
    if (!this.validation.validateForm('#equipmentForm')) return
    // Obtendo os dados do formuulário
    let equipment: IEquipment = this.getFormData()
    // Fazendo o POST/PUT para api
    this.equipService.save(equipment).subscribe({
      next: (response) => {
        this.messages.showAlert(
          equipment.id ? 'Atualizado' : 'Cadastrado',
          equipment.id
            ? 'O equipamento foi atualizado com sucesso.'
            : 'O equipamento foi cadastrado com sucesso.',
          'success'
        )
        console.info(response)
      },
      error: (err) => {
        this.messages.showAlert(
          'Erro',
          equipment.id
            ? `Ocorreu um erro ao atualizar o equipamento. ${err}.`
            : `Ocorreu um erro ao cadastrar o equipamento. ${err}.`,
          'error'
        )
        console.error(err)
      },
      complete: () => {
        this.clearForm()
      }
    })
  }

  /**
   * Obtem os dados do form
   * @returns {IEquipment}
   * @memberOf EquipmentRegisterPage
   */
  getFormData(): IEquipment {
    let data = this.formUtils.serialize('#equipmentForm')
    let install: IEquipmentInstall = {
      vehicleType: data['vehicle'],
      plaque: data['plaque'],
      orientation: data['orientation'],
      clientId: data['client-id'],
      installation: data['installation'],
      admeasurement: data['admeasurement']
    }
    let equipment: IEquipment = {
      code: data['code'],
      type: data['equipment'],
      install: install
    }

    return equipment
  }

  toUpperPlaque() {
    $('[name="plaque"]').val($('[name="plaque"]').val().toUpperCase())
  }

  clearForm() {
    this.equipmentId = null
    this.formUtils.clear('#equipmentForm')
  }
}
