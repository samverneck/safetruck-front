import { IBaseModel } from './IBaseModel'

export interface IContact extends IBaseModel {
  responsible: string,
  phone: string,
  email: string
}
