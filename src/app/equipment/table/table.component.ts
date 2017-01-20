import {
  Component, ViewEncapsulation,
  trigger, style, transition,
  animate, EventEmitter,
  Output, Input
} from '@angular/core'

import { EquipmentService } from './../../../providers/equipment.service'
import { IEquipment } from './../../../interfaces/IEquipment'

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
        style({opacity: 0}),
        animate(200, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
})

export class EquipmentTable {

  @Input() data: IEquipment[]
  @Output() equipmentSelected: EventEmitter<any> = new EventEmitter()
  @Output() deleteEquipment: EventEmitter<any> = new EventEmitter()

  constructor(public equipmentService: EquipmentService) {
    console.log('iniciando')
  }

  delete(equipment) {
    this.deleteEquipment.emit(equipment)
  }

  selected(element, equipment) {
    this.equipmentSelected.emit(equipment)
    this.toggleSelected(element)
  }

  toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }

}
