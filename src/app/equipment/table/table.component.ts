import {
  Component, ViewEncapsulation,
  trigger, style, transition,
  animate, EventEmitter,
  Output, Input
} from '@angular/core'

import { EquipmentService } from './../../../providers/equipment.service'
import { IEquipment, EquipmentType } from './../../../interfaces/IEquipment'

declare var $: any

@Component({
  selector: 'equipment-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [EquipmentService],
  styleUrls: ['./table.styles.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EquipmentTableComponent {

  @Input() public data: IEquipment[]
  @Output() public equipmentSelected: EventEmitter<any> = new EventEmitter()
  @Output() public deleteEquipment: EventEmitter<any> = new EventEmitter()

  public searchText: string
  public types = EquipmentType

  /**
   * Creates an instance of EquipmentTableComponent.
   * @param {EquipmentService} equipmentService
   *
   * @memberOf EquipmentTableComponent
   */
  public constructor(public equipmentService: EquipmentService) {
    console.log(this.data)
  }

  /**
   *
   *
   * @param {any} equipment
   *
   * @memberOf EquipmentTableComponent
   */
  public delete(equipment) {
    this.deleteEquipment.emit(equipment)
  }

  /**
   *
   *
   * @param {any} element
   * @param {any} equipment
   *
   * @memberOf EquipmentTableComponent
   */
  public selected(element, equipment) {
    this.equipmentSelected.emit(equipment)
    this.toggleSelected(element)
  }

  /**
   *
   *
   * @param {any} element
   *
   * @memberOf EquipmentTableComponent
   */
  public toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }
}
