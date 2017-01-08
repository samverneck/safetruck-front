import {
  Component, ViewEncapsulation,
  trigger, style, transition,
  animate, EventEmitter,
  Output, Input
} from '@angular/core'

import { ClientService } from './../../../providers/client.service'
import { IClient } from './../../../interfaces/IClient'

@Component({
  selector: 'client-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ClientService],
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

export class ClientTable {

  @Input() data: IClient[]
  @Output() clientSelected: EventEmitter<any> = new EventEmitter()
  @Output() deleteClient: EventEmitter<any> = new EventEmitter()

  constructor(public clientService: ClientService) {}

  delete(client) {
    this.deleteClient.emit(client)
  }

  selected(element, client) {
    this.clientSelected.emit(client)
    this.toggleSelected(element)
  }

  toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }

}
