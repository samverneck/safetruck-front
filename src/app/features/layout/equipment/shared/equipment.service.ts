import { Http } from '@angular/http'
import { Injectable } from '@angular/core'

import { BaseService, AuthService } from '../../../../core'
import { Equipment } from './models/Equipment'

@Injectable()
export class EquipmentService extends BaseService<Equipment> {

  /**
   * Creates an instance of EquipmentService.
   * @param {Http} http
   * @param {AuthService} auth
   *
   * @memberOf EquipmentService
   */
  constructor( http: Http, auth: AuthService ) {
    super( http, auth )
    super.setResource( 'equipments' )
  }
}
