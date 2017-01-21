export interface IReportData {
    plaque: string,
    route: ILocationGoogle[],
    overSpeedingsTotal: number,
    passOverDangerZones: number,
    kmAcumulated: number,
    overSpeedingsXKmAcumulated: number,
    overSpeedings: IReportOverSpeeding[],
    dangerZones: IReportDangerZones[]
}

export interface IReportOverSpeeding {
    limit: number,
    data: IReportOverSpeedingData[]
}

export interface IReportDangerZones {
    criticalPoint: {
        location: ILocationGoogle,
        radius: number
    },
    time: Date,
    address: string
    maxSpeed: number
    minDistance: number
    data: IReportDangerZonesData[],

    position: ILocationGoogle
}

export interface IReportOverSpeedingData {
    id: string
    start: Date
    finish: Date
    maxSpeed: number
    address: string
    distance: number
    position: {
        start: ILocationGoogle,
        finish: ILocationGoogle
    }
}

export interface IReportDangerZonesData {
    time: Date
    speed: number
    distance: number
    position: ILocationGoogle
}

export interface IReportOverSpeedingData {
    id: string
    start: Date
    finish: Date
    maxSpeed: number
    address: string
    distance: number
    position: {
        start: ILocationGoogle,
        finish: ILocationGoogle
    }
    route: ILocationGoogle[]
}
export interface ILocationGoogle {
    lat: number,
    lng: number
}
