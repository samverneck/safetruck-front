import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { BaseService } from './base.service'
import { AuthService } from './auth.service'

import { IBaseService } from './../interfaces/IBaseService'
import { IEquipment } from '../interfaces/IEquipment'

@Injectable()
export class EquipmentService extends BaseService<IEquipment> implements IBaseService {

  constructor(http: Http, auth: AuthService) {
    super(http, auth)
    super.setResource('equipments')
  }
}
