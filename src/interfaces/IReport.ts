import { ILocation } from './ILocation'
export interface IReportData {
  plaque: string,
  overSpeedingsTotal: number,
  passOverDangerZones: number,
  KmAcumulated: number,
  overSpeedingsXKmAcumulated: number,
  overSpeedings: IReportOverSpeeding[],
  dangerZones: IReportDangerZonesData[]
}

export interface IReportOverSpeeding {
  limit: number,
  data: IReportOverSpeedingData[]
}

export interface IReportOverSpeedingData {
  id: string
  start: Date
  finish: Date
  maxSpeed: number
  address: string
  distance: number
  position: {
    start: ILocation,
    finish: ILocation
  }
}

export interface IReportDangerZonesData {
  time: Date
  speed: number
  address: string
  distance: number
  position: {
    start: ILocation
    finish: ILocation
  }
}
