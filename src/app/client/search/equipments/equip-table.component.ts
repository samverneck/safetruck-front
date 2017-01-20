import {
  Component, ViewEncapsulation,
  trigger, style, transition,
  animate, Input
} from '@angular/core'

@Component({
  selector: 'equipment-table',
  templateUrl: './equip-table.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./equip-table.styles.scss'],
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
  @Input() data: Array<any>
}
