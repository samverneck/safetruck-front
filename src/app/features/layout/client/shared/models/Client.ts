import { Contact } from './Contact'
import { Address } from './Address'
import { MarketType } from './MarketType'

export interface Client {
  // tslint:disable:no-unused-variable
  id: string
  companyName: string // Razão social
  tradingName: string // Nome Fantasia
  alias: string
  cnpj: string
  limit: string
  address: Address
  contact: Contact
  market: MarketType
  shareDangerousPoints: boolean
}
