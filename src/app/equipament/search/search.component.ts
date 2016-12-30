import {
  Component,
  ViewEncapsulation,
  trigger,
  style,
  transition,
  animate
} from '@angular/core'

@Component({
  selector: 'equipament-search',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search.template.html',
  styleUrls: ['./search.styles.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition('* => void', [
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})

export class EquipamentSearchPage {
  results: any
  constructor() {}

  search() {
    this.results = [
      {
        '_id': '5863f8c82cda47cf16cb1b46',
        'index': 0,
        'guid': '28bfce74-7782-444f-878d-a1a74e2c8ef4',
        'name': 'Floyd Wallace',
        'email': 'floydwallace@savvy.com',
        'phone': '+55 (988) 567-2940',
        'address': '419 Newport Street, Carlos, Connecticut, 9647'
      },
      {
        '_id': '5863f8c8d064eac063e3ad4b',
        'index': 1,
        'guid': '1077d401-fef8-4b55-b26e-a22c38799d41',
        'name': 'Ferguson Mcintyre',
        'email': 'fergusonmcintyre@savvy.com',
        'phone': '+55 (999) 431-3177',
        'address': '838 Riverdale Avenue, Lumberton, Utah, 8908'
      }
    ]
  }

}
