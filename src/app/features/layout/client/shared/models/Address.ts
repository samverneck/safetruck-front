import { BaseModel } from '../../../../../core'

export interface Address extends BaseModel {
  address: string
  district: string
  city: string
  state: string
  zipcode: string
  num: number
  complement?: string
}
