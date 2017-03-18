import { ViewChild, ElementRef, AfterViewInit, OnDestroy, Component, Output, EventEmitter, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { SetOptions } from 'eonasdan-bootstrap-datetimepicker'

// tslint:disable-next-line: no-empty
const noop = () => { }

const DATE_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent ),// tslint:disable-line:no-forward-ref
  multi: true
}

/**
 * refs:
 *  http://www.radzen.com/blog/jquery-plugins-and-angular/
 *  https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73#.55g66k7nx
 * @export
 * @class DatePickerComponent
 * @implements {ControlValueAccessor}
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
@Component( {
  selector: 'datepicker',
  template: `
     <div class="input-group date">
        <input type="text" class="form-control" #input [disabled]=disabled>
          <div class="input-group-addon">
            <span class="icon"><i class="fa fa-calendar"></i></span>
          </div>
      </div>
  `,
  providers: [ DATE_PICKER_VALUE_ACCESSOR ],
  styles: [ `
    :host {
      display:block;
      border-radius: 3px
    }
    :host /deep/ input:not([disabled]) {
      border-left: none;
    }
  `]
} )
export class DatePickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @ViewChild( 'input' ) public input: ElementRef
  @Output() public onChange = new EventEmitter<Date>()
  @Output() public onError = new EventEmitter<Date>()
  @Input() public options: SetOptions = {}
  @Input() public disabled: false

  private innerValue: Date | undefined
  private onTouchedCallback: () => void = noop
  private onChangeCallback: ( _: any ) => void = noop
  private get $datepicker() {
    return jQuery( this.input.nativeElement ).datetimepicker().data( 'DateTimePicker' )
  }
  private defaultOptions = {
    format: 'L HH:mm a',
    locale: 'pt-br',
    icons: {
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-arrow-up',
      down: 'fa fa-arrow-down'
    }
  }

  /**
   *
   *
   *
   * @memberOf DatePickerComponent
   */
  public ngAfterViewInit() {

    const options = Object.assign( {}, this.defaultOptions, this.options )

    jQuery( this.input.nativeElement )
      .datetimepicker( options ).on( 'dp.change', ( e ) => {
        const newValue: Date = e.date ? e.date.toDate() : undefined
        if ( newValue !== this.innerValue ) {
          this.innerValue = newValue
          this.onTouchedCallback()
          this.onChangeCallback( this.innerValue )
          this.onChange.emit( this.innerValue )
        }
      } )
      .on( 'dp.error', ( e ) => {
        this.$datepicker.clear()
        this.onError.emit( e.date.toDate() )
      } )
  }

  /**
   *
   *
   *
   * @memberOf DatePickerComponent
   */
  public ngOnDestroy() {
    this.$datepicker.destroy()
  }

  /**
   *
   *
   * @param {Date} date
   *
   * @memberOf DatePickerComponent
   */
  public writeValue( dateString: Date | string ) {
    if ( dateString ) {

      if ( typeof dateString === 'string' ) {
        const [ fullDate, day, month, year ] = dateString.match( /(\d{2})\/(\d{2})\/(\d{4})/ ) || [ 0, 0, 0, 0 ]
        dateString = new Date( fullDate ? `${month}/${day}/${year}` : dateString )
      }

      this.$datepicker.date( dateString ) // trigger on change event
    } else {
      this.$datepicker.clear()
    }
  }

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
}
