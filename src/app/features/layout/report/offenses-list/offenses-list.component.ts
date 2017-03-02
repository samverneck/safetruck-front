import { Component, Input } from '@angular/core'
import * as moment from 'moment'

import { ReportData } from '../shared'

@Component( {
  selector: 'offenses-list',
  templateUrl: 'offenses-list.component.html',
  styles: [ 'offenses-list.component.scss' ]
} )
export class OffensesListComponent {

  @Input() public data: ReportData
  @Input() public reportTimes: string

  public protocol = Date.now()

  /**
   *
   *
   * @param {any} date
   * @returns
   *
   * @memberOf PrintComponent
   */
  public formatDate( date ) {
    return moment( date ).format( 'DD/MM/YYYY HH:mm:ss' )
  }

  /**
   *
   *
   * @param {any} start
   * @param {any} finish
   * @returns
   *
   * @memberOf PrintComponent
   */
  public getOverSpeedingImg( start, finish ) {
    let api: string = 'https://maps.googleapis.com/maps/api/staticmap?'
    let key: string = `&key=${GOOGLE_MAPS_API_KEY}`
    let size: string = '&size=275x135'
    let labelStart: string = `&markers=color:green%7Clabel:I%7C${start.lat},${start.lng}`
    let labelFinish: string = `&markers=color:red%7Clabel:F%7C${finish.lat},${finish.lng}`

    return api + size + labelStart + labelFinish + key
  }

  /**
   *
   *
   * @param {any} s
   * @param {any} f
   * @returns
   *
   * @memberOf PrintComponent
   */
  public getOverSpeedingLink( s, f ) {
    return `https://www.google.com/maps?&z=12&saddr=${s.lat},${s.lng}&daddr=${f.lat},${f.lng}&dirflg=h`
  }

  /**
   *
   *
   * @param {any} position
   * @returns
   *
   * @memberOf PrintComponent
   */
  public getDangerZoneImg( position ) {
    let api: string = 'https://maps.googleapis.com/maps/api/staticmap?'
    let key: string = `&key=${GOOGLE_MAPS_API_KEY}`
    let size: string = '&size=275x135'
    let icon: string = 'http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=caution%257Cff0000%7C'
    let latLon: string = `&markers=icon:${icon}${position.lat},${position.lng}`

    return api + size + latLon + key
  }

  /**
   *
   *
   * @param {any} location
   * @returns
   *
   * @memberOf PrintComponent
   */
  public getDangerZoneLink( location ) {
    return `https://www.google.com/maps?&z=12&q=${location.lat},${location.lng}`
  }
}
