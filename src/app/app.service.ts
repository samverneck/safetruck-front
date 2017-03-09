import { Injectable } from '@angular/core'

export type InteralStateType = {
  [ key: string ]: any
}

@Injectable()
export class AppState {

  private internalState: InteralStateType = {}

  // already return a clone of the current state
  get state() {
    return this.internalState = this.clone( this.internalState )
  }
  // never allow mutation
  set state( value ) {
    throw new Error( 'do not mutate the `.state` directly' )
  }

  public get( prop?: any ) {
    // use our state getter for the clone
    const state = this.state
    return state.hasOwnProperty( prop ) ? state[ prop ] : state
  }

  public set( prop: string, value: any ) {
    // internally mutate our state
    return this.internalState[ prop ] = value
  }

  private clone( object: InteralStateType ) {
    // simple object clone
    return JSON.parse( JSON.stringify( object ) )
  }
}
