import {
  Component, ViewEncapsulation,
  trigger, style, transition,
  animate, EventEmitter,
  Output, Input
} from '@angular/core'

import { ClientService } from '../../../../providers/client.service'
import { IClient } from '../../../../interfaces/IClient'

declare var $: any

@Component({
  selector: 'client-table',
  templateUrl: './table.template.html',
  encapsulation: ViewEncapsulation.None,
  providers: [ClientService],
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
export class ClientTableComponent {

  @Input() public data: IClient[]
  @Output() public clientSelected: EventEmitter<IClient> = new EventEmitter()
  @Output() public deleteClient: EventEmitter<IClient> = new EventEmitter()

  public searchText: string

  /**
   * Creates an instance of ClientTableComponent.
   * @param {ClientService} clientService
   *
   * @memberOf ClientTableComponent
   */
  public constructor(public clientService: ClientService) {
    console.log(this.data)
  }

  /**
   *
   *
   * @param {any} client
   *
   * @memberOf ClientTableComponent
   */
  public delete(client: IClient) {
    this.deleteClient.emit(client)
  }

  /**
   *
   *
   * @param {any} element
   * @param {any} client
   *
   * @memberOf ClientTableComponent
   */
  public selected(element, client: IClient) {
    this.clientSelected.emit(client)
    this.toggleSelected(element)
  }

  /**
   *
   *
   * @param {any} element
   *
   * @memberOf ClientTableComponent
   */
  public toggleSelected(element) {
    let td = $(element.target.parentElement)
    let table = td.parent()
    table.children().removeClass('selected')
    td.toggleClass('selected')
  }
}
