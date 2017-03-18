import { Injectable } from '@angular/core'

@Injectable()
export class FormService {
  /**
   *
   *
   * @param {string} formId
   * @returns
   *
   * @memberOf FormUtils
   */
  public serialize( formId: string ) {
    let form = $( formId )
    let obj = {}
    let data = $( form ).serializeArray()
    data.map(( input ) => {
      if ( obj[ input.name ] !== undefined ) {
        if ( !obj[ input.name ].push ) {
          obj[ input.name ] = [ obj[ input.name ] ]
        }
        obj[ input.name ].push( input.value || '' )
      } else {
        obj[ input.name ] = input.value || ''
      }
    } )

    return obj
  }

  /**
   *
   *
   * @param {any} text
   * @returns
   *
   * @memberOf FormUtils
   */
  public slugger( str: string ) {
    return ( str || '' ).toLowerCase()
      .replace( /[^\w\-]+/g, '' )       // Remove all non-word chars
      .replace( /\-\-+/g, '' )          // Remove multiple -
      .replace( /^-+/, '' )             // Trim - from start of text
      .replace( /-+$/, '' )             // Trim - from end of text
      .replace( /\s+/g, '' )            // Remove spaces
  }

  /**
   *
   *
   * @param {string} formId
   *
   * @memberOf FormUtils
   */
  public clear( formId: string ) {
    let form = $( formId )
    let el = form.serializeArray()
    form.trigger( 'reset' )
    el.map(( input ) => {
      $( `[name="${input.name}"]` ).removeClass( 'error' )
    } )
  }
}
