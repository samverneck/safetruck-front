export interface IEquipment {
  id: string,
  code: string,
  plaque: string,
  bucket: string,
  vehicleType: EquipmentType,
  equipmentType: EquipmentType,
  orientation: Orientation,
  instalation: Date,
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
