import { Component, Output, Input, EventEmitter } from '@angular/core'

@Component( {
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styles: [
    `.search-field {
      margin: 30px 0;
    }`
  ]
})
export class SearchFieldComponent {

  @Input() public placeholder: string = 'Pesquisar'
  @Output() public change: EventEmitter<string> = new EventEmitter()

  /**
   *
   *
   * @param {string} text
   *
   * @memberOf SearchFieldComponent
   */
  public update( text: string ) {
    this.change.emit( text )
  }
}
