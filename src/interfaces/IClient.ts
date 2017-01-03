import { IAddress } from './IAddress'
import { IContact } from './IContact'

export interface IClient {
  // id: string,
  companyName: string, // Razão social
  tradingName: string, // Nome Fantasia
  address: IAddress,
  contact: IContact,
  market: MarketType,
  shareDangerousPoints: boolean
}

export enum MarketType {
  TRANSPORT_COMPANY,
  INSURER,
  OTHERS
}

