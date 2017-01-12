import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { BaseService } from './base.service'
import { AuthService } from './auth.service'

import { IBaseService } from './../interfaces/IBaseService'

@Injectable()
export class EquipmentService extends BaseService implements IBaseService {

  constructor(http: Http, auth: AuthService) {
    super.setResource('equipments')
    super(http, auth)
  }
}
