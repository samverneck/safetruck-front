import { Injectable } from '@angular/core'

declare let jQuery: any

@Injectable()
export class AppConfig {
  public config = {
    name: 'SafeTruck',
    title: 'Painel de Controle | SafeTruck',
    version: '0.0.1',
    /**
     * Whether to print and alert some log information
     */
    debug: true,
    /**
     * In-app constants
     */
    settings: {
      colors: {
        'white': '#fff',
        'black': '#000',
        'gray-light': '#999',
        'gray-lighter': '#eee',
        'gray': '#666',
        'gray-dark': '#343434',
        'gray-darker': '#222',
        'gray-semi-light': '#777',
        'gray-semi-lighter': '#ddd',
        'brand-primary': '#5d8fc2',
        'brand-success': '#64bd63',
        'brand-warning': '#f0b518',
        'brand-danger': '#dd5826',
        'brand-info': '#5dc4bf'
      },
      screens: {
        'xs-max': 543,
        'sm-min': 544,
        'sm-max': 767,
        'md-min': 768,
        'md-max': 991,
        'lg-min': 992,
        'lg-max': 1199,
        'xl-min': 1200
      },
      navCollapseTimeout: 2500
    },

    /**
     * Application state. May be changed when using.
     * Synced to Local Storage
     */
    state: {
      /**
       * whether navigation is static (prevent automatic collapsing)
       */
      'nav-static': false
    }
  }

  private screenSizeCallbacks = {
    xs: { enter: [], exit: [] },
    sm: { enter: [], exit: [] },
    md: { enter: [], exit: [] },
    lg: { enter: [], exit: [] },
    xl: { enter: [], exit: [] }
  }

  /**
   * Creates an instance of AppConfig.
   *
   * @memberOf AppConfig
   */
  constructor() {
    this.initResizeEvent()
    this.initOnScreenSizeCallbacks()
  }

  /**
   *
   *
   * @param {any} size
   * @returns {boolean}
   *
   * @memberOf AppConfig
   */
  public isScreen( size ): boolean {
    let screenPx = window.innerWidth
    return ( screenPx >= this.config.settings.screens[ size + '-min' ] || size === 'xs' )
      && ( screenPx <= this.config.settings.screens[ size + '-max' ] || size === 'xl' )
  }

  /**
   *
   *
   * @returns {string}
   *
   * @memberOf AppConfig
   */
  public getScreenSize(): string {
    let screenPx = window.innerWidth
    if ( screenPx <= this.config.settings.screens[ 'xs-max' ] ) { return 'xs' }
    if ( ( screenPx >= this.config.settings.screens[ 'sm-min' ] )
      && ( screenPx <= this.config.settings.screens[ 'sm-max' ] ) ) { return 'sm' }
    if ( ( screenPx >= this.config.settings.screens[ 'md-min' ] )
      && ( screenPx <= this.config.settings.screens[ 'md-max' ] ) ) { return 'md' }
    if ( ( screenPx >= this.config.settings.screens[ 'lg-min' ] )
      && ( screenPx <= this.config.settings.screens[ 'lg-max' ] ) ) { return 'lg' }
    if ( screenPx >= this.config.settings.screens[ 'xl-min' ] ) { return 'xl' }
  }

  /**
   *
   *
   * @param {any} size
   * @param {any} fn
   * @param {any} onEnter
   *
   * @memberOf AppConfig
   */
  public onScreenSize( size, fn, /* Boolean= */ onEnter ): void {
    onEnter = typeof onEnter !== 'undefined' ? onEnter : true
    if ( typeof size === 'object' ) {
      for ( let i = 0; i < size.length; i++ ) {
        this.screenSizeCallbacks[ size[ i ] ][ onEnter ? 'enter' : 'exit' ].push( fn )
      }
    } else {
      this.screenSizeCallbacks[ size ][ onEnter ? 'enter' : 'exit' ].push( fn )
    }

  }

  /**
   *
   *
   * @param {any} color
   * @param {any} ratio
   * @param {any} darker
   * @returns {string}
   *
   * @memberOf AppConfig
   */
  public changeColor( color, ratio, darker ): string {
    let pad = function( num, totalChars ): number {
      let padVal = '0'
      num = num + ''
      while ( num.length < totalChars ) {
        num = padVal + num
      }
      return num
    }
    // Trim trailing/leading whitespace
    color = color.replace( /^\s*|\s*$/, '' )

    // Expand three-digit hex
    color = color.replace( /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3' )

    // Calculate ratio
    let difference = Math.round( ratio * 256 ) * ( darker ? -1 : 1 )

    // Determine if input is RGB(A)
    let rgb = color.match( new RegExp( `^rgba?\\(\\s*
      '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])
      '\\s*,\\s*
      '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])
      '\\s*,\\s*
      '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])
      '(?:\\s*,\\s*
      '(0|1|0?\\.\\d+))?
      '\\s*\\)$`
      , 'i' ) )

    let alpha = !!rgb && rgb[ 4 ] !== null ? rgb[ 4 ] : null

    // Convert hex to decimal
    let decimal = rgb ? [ rgb[ 1 ], rgb[ 2 ], rgb[ 3 ] ] : color.replace(
      /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
      function(): string {
        return parseInt( arguments[ 1 ], 16 ) + ',' +
          parseInt( arguments[ 2 ], 16 ) + ',' +
          parseInt( arguments[ 3 ], 16 )
      }
    ).split( /,/ )

    // Return RGB(A)
    return rgb ?
      'rgb' + ( alpha !== null ? 'a' : '' ) + '(' +
      Math[ darker ? 'max' : 'min' ](
        parseInt( decimal[ 0 ], 10 ) + difference, darker ? 0 : 255
      ) + ', ' +
      Math[ darker ? 'max' : 'min' ](
        parseInt( decimal[ 1 ], 10 ) + difference, darker ? 0 : 255
      ) + ', ' +
      Math[ darker ? 'max' : 'min' ](
        parseInt( decimal[ 2 ], 10 ) + difference, darker ? 0 : 255
      ) +
      ( alpha !== null ? ', ' + alpha : '' ) +
      ')' :
      // Return hex
      [
        '#',
        pad( Math[ darker ? 'max' : 'min' ](
          parseInt( decimal[ 0 ], 10 ) + difference, darker ? 0 : 255
        ).toString( 16 ), 2 ),
        pad( Math[ darker ? 'max' : 'min' ](
          parseInt( decimal[ 1 ], 10 ) + difference, darker ? 0 : 255
        ).toString( 16 ), 2 ),
        pad( Math[ darker ? 'max' : 'min' ](
          parseInt( decimal[ 2 ], 10 ) + difference, darker ? 0 : 255
        ).toString( 16 ), 2 )
      ].join( '' )
  }

  /**
   *
   *
   * @param {any} color
   * @param {any} ratio
   * @returns {*}
   *
   * @memberOf AppConfig
   */
  public lightenColor( color, ratio ): any {
    return this.changeColor( color, ratio, false )
  }

  /**
   *
   *
   * @param {any} color
   * @param {any} ratio
   * @returns {*}
   *
   * @memberOf AppConfig
   */
  public darkenColor( color, ratio ): any {
    return this.changeColor( color, ratio, true )
  }

  /**
   *
   *
   * @param {any} array
   * @returns {*}
   *
   * @memberOf AppConfig
   */
  public max( array ): any {
    return Math.max.apply( null, array )
  }

  /**
   *
   *
   * @param {any} array
   * @returns {*}
   *
   * @memberOf AppConfig
   */
  public min( array ): any {
    return Math.min.apply( null, array )
  }

  /**
   *
   *
   * @returns {Object}
   *
   * @memberOf AppConfig
   */
  public getConfig(): Object {
    return this.config
  }

  /***************************************** Private members *****************************************/

  /**
   *
   *
   * @private
   *
   * @memberOf AppConfig
   */
  private initResizeEvent(): void {
    let resizeTimeout

    jQuery( window ).on( 'resize', () => {
      clearTimeout( resizeTimeout )
      resizeTimeout = setTimeout(() => {
        jQuery( window ).trigger( 'sn:resize' )
      }, 100 )
    })
  }

  /**
   *
   *
   * @private
   *
   * @memberOf AppConfig
   */
  private initOnScreenSizeCallbacks(): void {
    let resizeTimeout
    let prevSize = this.getScreenSize()

    jQuery( window ).resize(() => {
      clearTimeout( resizeTimeout )
      resizeTimeout = setTimeout(() => {
        let size = this.getScreenSize()
        if ( size !== prevSize ) { // run only if something changed
          // run exit callbacks first
          this.screenSizeCallbacks[ prevSize ].exit.forEach(( fn ) => {
            fn( size, prevSize )
          })
          // run enter callbacks then
          this.screenSizeCallbacks[ size ].enter.forEach(( fn ) => {
            fn( size, prevSize )
          })
          console.log( 'screen changed. new: ' + size + ', old: ' + prevSize )
        }
        prevSize = size
      }, 100 )
    })
  }
}
