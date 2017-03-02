import { BaseModel } from '../../../../../core'

export interface Contact extends BaseModel {
  responsible: string
  phone: string
  email: string
}
