import { Client } from '../../../client/shared'
import { Orientation } from './Orientation'
import { VehicleType } from './VehicleType'

export interface EquipmentInstall {
  client?: Client
  clientId: string
  plaque: string
  vehicleType: VehicleType
  orientation: Orientation
  installation: Date
  admeasurement: Date
}
