import { Directive, ElementRef, OnInit } from '@angular/core'

@Directive( { selector: '[progress-animate]' })
export class ProgressAnimateDirective implements OnInit {
  public $el: any

  constructor( el: ElementRef ) {
    this.$el = $( el.nativeElement )
  }

  /**
   *
   *
   *
   * @memberOf ProgressAnimateDirective
   */
  public ngOnInit(): void {

    let width = this.$el.data( 'width' )
    let $bar = this.$el

    $bar.css( 'opacity', 0 )
    setTimeout(() => {
      $bar.css( {
        transition: 'none',
        width: 0,
        opacity: 1
      })
      setTimeout(() => {
        $bar.css( 'transition', '' ).css( 'width', width )
      })
    })
  }
}
