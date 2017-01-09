import { EquipmentService } from './../../../providers/equipment.service'
import {
  Component,
  ViewEncapsulation,
  trigger,
  style,
  transition,
  animate
} from '@angular/core'

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
  equipments: any
  constructor(public equip: EquipmentService) {}

  search() {
    this.equip.getAll().subscribe(equips => {
      console.log(equips)
      this.equipments = equips

      let code = equips.filter((eq) => {
        return (eq.code.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
      })

    })
  }

}
