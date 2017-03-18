import { EquipmentInstall } from './EquipmentInstall'
import { BaseModel } from '../../../../../core'
import { EquipmentType } from './EquipmentType'

export interface Equipment extends BaseModel {
  code: string,
  type: EquipmentType,
  install?: EquipmentInstall
}
