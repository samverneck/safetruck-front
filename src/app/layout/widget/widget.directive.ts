import { Directive, ElementRef, OnInit } from '@angular/core'
declare var jQuery: any

@Directive({
  selector: '[widget]'
})

export class WidgetDirective implements OnInit {
  public $el: any

  /**
   * Creates an instance of WidgetDirective.
   * @param {ElementRef} el
   *
   * @memberOf WidgetDirective
   */
  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement)
    jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body'

    /*
     When widget is closed remove its parent if it is .col-*
     */
    jQuery(document).on('close.widgster', (e) => {
      let $colWrap = jQuery(e.target)
        .closest('.content > .row > [class*="col-"]:not(.widget-container)')

      // remove colWrap only if there are no more widgets inside
      if (!$colWrap.find('.widget').not(e.target).length) {
        $colWrap.remove()
      }
    })
  }

  /**
   *
   *
   *
   * @memberOf WidgetDirective
   */
  public ngOnInit(): void {
    this.$el.widgster()
  }
}
