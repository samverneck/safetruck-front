import { IContact } from './../interfaces/IContact'
import { IAddress } from './../interfaces/IAddress'
import { MarketType } from './../interfaces/IClient'

export class Client {
  // tslint:disable:no-unused-variable
  id: string
  companyName: string // Razão social
  tradingName: string // Nome Fantasia
  adress: IAddress
  contact: IContact
  market: MarketType
  shareDangerousPoints: boolean
}
