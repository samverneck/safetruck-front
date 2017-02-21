import { IContact } from './../interfaces/IContact'
import { IAddress } from './../interfaces/IAddress'
import { MarketType } from './../interfaces/IClient'

export class Client {
  // tslint:disable:no-unused-variable
  public id: string
  public companyName: string // Razão social
  public tradingName: string // Nome Fantasia
  public adress: IAddress
  public contact: IContact
  public market: MarketType
  public shareDangerousPoints: boolean
}
