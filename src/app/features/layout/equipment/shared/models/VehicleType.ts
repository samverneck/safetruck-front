export enum VehicleType {
  CAR,
  BUS,
  TRUCK,
  OTHERS
}

export enum EVechicleType {
  'Carro' = parseInt(VehicleType.CAR.toString(), 10),
  'Ônibus' = parseInt(VehicleType.BUS.toString(), 10),
  'Caminhão' = parseInt(VehicleType.TRUCK.toString(), 10),
  'Outros' = parseInt(VehicleType.OTHERS.toString(), 10)
}
