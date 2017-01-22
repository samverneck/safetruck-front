import { IClient } from '../interfaces/IClient';
import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { BaseService } from './base.service'
import { AuthService } from './auth.service'

import { IBaseService } from './../interfaces/IBaseService'

@Injectable()
export class ClientService extends BaseService<IClient> implements IBaseService {

  constructor(http: Http, auth: AuthService) {
    super.setResource('clients')
    super(http, auth)
  }
}
