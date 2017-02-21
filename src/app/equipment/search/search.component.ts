import { IClient } from '../../../interfaces/IClient'
import { IEquipment } from '../../../interfaces/IEquipment'
import { Messages } from './../../../utils/Messages'
import * as _ from 'lodash'
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
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class EquipmentSearchComponent {

  public searchText: string
  public clients: IClient[]
  public equipments: IEquipment[]
  public msg = new Messages()

  /**
   * Creates an instance of EquipmentSearchComponent.
   * @param {EquipmentService} equip
   *
   * @memberOf EquipmentSearchComponent
   */
  constructor(public equip: EquipmentService) { }

  /**
   *
   *
   *
   * @memberOf EquipmentSearchComponent
   */
  public search() {
    this.equip.getAll().subscribe(equips => {
      if (!this.searchText) {
        this.equipments = equips
        return
      }
      let code = equips.filter((eq) => {
        return (eq.code.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
      })
      let plaque = equips.filter((eq) => {
        return (eq.install.plaque.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
      })
      this.equipments = _.unionBy(code.concat(plaque), 'id')
    })
  }

}
