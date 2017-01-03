import { IBaseModel } from './IBaseModel'

export interface IEquipment extends IBaseModel {
  code: string,
  plaque: string,
  bucket: string,
  vehicleType: EquipmentType,
  equipmentType: EquipmentType,
  orientation: Orientation,
  installation: Date,
  tachographAlteration: Date
}

export enum VehicleType {
  CAR,
  BUS,
  TRUCK,
  OTHERS
}

export enum EquipmentType {
  CXP,
  NZP,
  CENTRAL
}

export enum Orientation {
  YZX,
  XYZ,
  ZYX
}
