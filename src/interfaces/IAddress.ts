import { IBaseModel } from './IBaseModel'

export interface IAddress extends IBaseModel{
  address: string,
  district: string,
  city: string,
  state: string,
  zipcode: string,
  num: number,
  complement?: string
}
