import { Directive, ElementRef, OnInit } from '@angular/core'
declare var jQuery: any

@Directive({
  selector: '[check-all]'
})

export class CheckAllDirective implements OnInit {
  public $el: any

  /**
   * Creates an instance of CheckAllDirective.
   * @param {ElementRef} el
   *
   * @memberOf CheckAllDirective
   */
  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement)
  }

  /**
   *
   *
   *
   * @memberOf CheckAllDirective
   */
  public ngOnInit(): void {
    let $el = this.$el
    $el.on('click', function(): void {
      $el.closest('table').find('input[type=checkbox]')
        .not(this).prop('checked', jQuery(this).prop('checked'))
    })
  }
}
