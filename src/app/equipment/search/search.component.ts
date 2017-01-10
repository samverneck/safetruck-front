import { Messages } from './../../../utils/Messages'
import { EquipmentService } from './../../../providers/equipment.service'
import {
  Component,
  ViewEncapsulation,
  trigger,
  style,
  transition,
  animate
} from '@angular/core'

import * as _ from 'lodash'

@Component({
  selector: 'equipment-search',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search.template.html',
  styleUrls: ['./search.styles.scss'],
  providers: [EquipmentService],
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

export class EquipmentSearchPage {
  searchText: string
  clients: any
  equipments: any[]
  msg = new Messages()
  constructor(public equip: EquipmentService) {}

  search() {
    if (!this.searchText) {
      this.msg.showNotification('Você deve informar ao menos um termo de pesquisa.', 'error')
      return
    }

    this.equip.getAll().subscribe(equips => {

      if (this.searchText && this.searchText.trim() !== '') {
        let code = equips.filter((eq) => {
          return (eq.code.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
        })

        let plaque = equips.filter((eq) => {
          return (eq.install.plaque.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
        })

        this.equipments = code.concat(plaque)
      }
    })
  }

}
