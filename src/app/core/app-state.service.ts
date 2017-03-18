import { Injectable } from '@angular/core'

export type InteralStateType = {
  [key: string]: any
}

export type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
}

@Injectable()
export class AppStateService {

  private internalState: InteralStateType = {}

  // already return a clone of the current state
  get state() {
    return this.internalState = this._clone(this.internalState)
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly')
  }

  /**
   *
   *
   * @param {*} [prop]
   * @returns
   *
   * @memberOf AppState
   */
  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state
    return state.hasOwnProperty(prop) ? state[prop] : state
  }

  /**
   *
   *
   * @param {string} prop
   * @param {*} value
   * @returns
   *
   * @memberOf AppState
   */
  public set(prop: string, value: any) {
    // internally mutate our state
    return this.internalState[prop] = value
  }

  /**
   *
   *
   * @private
   * @param {InteralStateType} object
   * @returns
   *
   * @memberOf AppState
   */
  private _clone(object: InteralStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object))
  }
}
