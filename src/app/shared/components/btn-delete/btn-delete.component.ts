import { Component, Output, EventEmitter } from '@angular/core'

@Component( {
  selector: 'btn-delete',
  template: `
      <button class="btn btn-xs mb-xs btn-danger" (click)="onClick()">
          <i class="glyphicon glyphicon-trash"></i>
      </button>
  `,
  styles: [ `
    .btn-danger {
        background-color: #a2342d;
        border-color: #a2342d
    }
  `]
})
export class BtnDeleteComponent {
  @Output() public click = new EventEmitter<any>()

  /**
   *
   *
   *
   * @memberOf BtnDeleteComponent
   */
  public onClick(): void {
    this.click.emit()
  }
}
