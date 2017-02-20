import { IEquipmentInstall } from './IEquipmentInstall'
import { IBaseModel } from './IBaseModel'

export interface IEquipment extends IBaseModel {
  code: string,
  type: EquipmentType,
  install?: IEquipmentInstall
}

export enum EquipmentType {
  CXP,
  NZP,
  CENTRAL
}
