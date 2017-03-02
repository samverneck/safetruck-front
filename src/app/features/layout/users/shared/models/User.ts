import { BaseModel } from '../../../../../core'
import { Client } from '../../../client/shared'

export interface User extends BaseModel {
  name: string
  email: string
  clientId: string
  client: Client
  username: string
  password: string
  newPassword?: string
  isAdmin: boolean
  isMainCompany: boolean
}
