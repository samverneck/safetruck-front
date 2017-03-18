import { Component, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

// tslint:disable-next-line: no-empty
const noop = () => { }

@Component( {
  selector: 'select-enum',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEnumComponent ), // tslint:disable-line:no-forward-ref
      multi: true
    }
  ],
  templateUrl: './select-enum.component.html',
  styles: [ `
    :host {
      display:block;
      border-radius: 3px
    }
    :host /deep/ select:not([disabled]) {
      border-left: none;
    }
  `]
})
export class SelectEnumComponent implements ControlValueAccessor {
  @Input() public disabled: boolean
  @Input() public validation: boolean
  @Input() public enumType: any

  private innerValue: number | undefined
  private onTouchedCallback: () => void = noop
  private onChangeCallback: ( _: any ) => void = noop

  /**
   *
   *
   * @param {*} fn
   *
   * @memberOf SelectEnumComponent
   */
  public registerOnChange( fn: any ) {
    this.onChangeCallback = fn
  }

  /**
   *
   *
   * @param {*} fn
   *
   * @memberOf SelectEnumComponent
   */
  public registerOnTouched( fn: any ) {
    this.onTouchedCallback = fn
  }

  /**
   *
   *
   * @type {*}
   * @memberOf SelectEnumComponent
   */
  public get value(): any {
    return this.innerValue
  };

  /**
   *
   *
   *
   * @memberOf SelectEnumComponent
   */
  public set value( value: any ) {
    if ( value !== this.innerValue ) {
      this.innerValue = value
      this.onChangeCallback( value )
    }
  }

  public onBlur() {
    this.onTouchedCallback()
  }

  /**
   *
   *
   * @param {*} value
   *
   * @memberOf SelectEnumComponent
   */
  public writeValue( value: any ) {
    if ( value !== undefined ) {
      this.value = value
    }
  }
}
