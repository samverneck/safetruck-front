export interface IEquipmentInstall {
  clientId: string
  plaque: string
  vehicleType: VehicleType
  orientation: Orientation
  installation: Date
  admeasurement: Date
}

export enum VehicleType {
  CAR,
  BUS,
  TRUCK,
  OTHERS
}

export enum Orientation {
  YZX,
  XYZ,
  ZYX
}
