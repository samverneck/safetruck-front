import { Directive, ElementRef, Input } from '@angular/core'
declare var jQuery: any
declare var Dropzone: any

@Directive ({
  selector: '[dropzone]'
})

export class DropzoneModule {
  $el: any

  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement)
  }

  ngOnInit(): void {
    let dropzone = new Dropzone(this.$el[0], {})
  }

}
