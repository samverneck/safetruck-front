import { BaseModel } from '../../../../../core'
import { UserRole } from './UserRole'

export interface User extends BaseModel {
  name: string
  email: string
  type: UserRole
}
