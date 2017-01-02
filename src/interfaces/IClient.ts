import { IAddress } from './IAddress'
import { IContact } from './IContact'

export interface ICLient {
  id: string,
  companyName: string, // Razão social
  tradingName: string, // Nome Fantasia
  adress: IAddress,
  contact: IContact
}

export enum MarketType {
  TRANSPORT_COMPANY,
  INSURER,
  OTHERS
}

