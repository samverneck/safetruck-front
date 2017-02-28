import { BaseModel } from '../../../../../core'
import { UserRole } from './UserRole'
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
  type: UserRole
}
