export interface ReportData {
  plaque: string,
  route: LocationGoogle[],
  overSpeedingsTotal: number,
  passOverDangerZones: number,
  kmAcumulated: number,
  overSpeedingsXKmAcumulated: number,
  overSpeedings: ReportOverSpeeding[],
  dangerZones: ReportDangerZones[]
}

export interface ReportOverSpeeding {
  limit: number,
  data: ReportOverSpeedingData[]
}

export interface ReportDangerZones {
  criticalPoint: {
    location: LocationGoogle,
    radius: number
  },
  time: Date,
  address: string
  maxSpeed: number
  minDistance: number
  data: ReportDangerZonesData[],
  position: LocationGoogle
}

export interface ReportOverSpeedingData {
  id: string
  start: Date
  finish: Date
  maxSpeed: number
  address: string
  distance: number
  position: {
    start: LocationGoogle,
    finish: LocationGoogle
  }
}

export interface ReportDangerZonesData {
  time: Date
  speed: number
  distance: number
  position: LocationGoogle
}

export interface ReportOverSpeedingData {
  id: string
  start: Date
  finish: Date
  maxSpeed: number
  address: string
  distance: number
  position: {
    start: LocationGoogle,
    finish: LocationGoogle
  }
  route: LocationGoogle[]
}

export interface LocationGoogle {
  lat: number,
  lng: number
}

export interface DataReportPrint {
  resumo: {
    nomeArquivo: string
    data: string
    protocolo: string
    inicio: string
    termino: string
    placa: string
    imprudencias: {
      excessoVel: number
      zonPerig: number
      kmAc: number
      relacaoKmAc: number
    }
  }
  excessos?: { // todo deixar obrigatório
    inicio: string
    termino: string
    velMax: string
    endereco: string
    percurso: string
    map: any // todo coordenadas google maps ou api aplicada diretamente
  }[]
}
