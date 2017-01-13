import { Component, OnInit, Input } from '@angular/core'
import * as moment from 'moment'

import { IReportData } from './../../../interfaces/IReport'

@Component({
  selector: 'print-page',
  templateUrl: 'print.template.html',
  styles: ['print.styles.scss']
})
export class PrintComponent implements OnInit {
  @Input() data: IReportData
  @Input() reportTimes: string

  protocol = Date.now()

  constructor() { }

  ngOnInit() { }

  formatDate(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss')
  }

  getOverSpeedingImg(start, finish) {
    let api: string = 'https://maps.googleapis.com/maps/api/staticmap?'
    let key: string = '&key=AIzaSyCTyVqtTUEU9_G20pWMkmEo7b2vQe87M4k'
    let size: string = '&size=275x135'
    let labelStart: string = `&markers=color:green%7Clabel:I%7C${start.lat},${start.lng}`
    let labelFinish: string = `&markers=color:red%7Clabel:F%7C${finish.lat},${finish.lng}`

    return api + size  + labelStart + labelFinish + key
  }

  getOverSpeedingLink(s, f) {
    return `https://www.google.com/maps?&z=12&saddr=${s.lat},${s.lng}&daddr=${f.lat},${f.lng}&dirflg=h`
  }

  getDangerZoneImg(position) {
    let api: string = 'https://maps.googleapis.com/maps/api/staticmap?'
    let key: string = '&key=AIzaSyCTyVqtTUEU9_G20pWMkmEo7b2vQe87M4k'
    let size: string = '&size=275x135'
    let icon: string = 'http://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=caution%257Cff0000%7C'
    let latLon: string = `&markers=icon:${icon}${position.lat},${position.lng}`

    return api + size  + latLon + key
  }

   getDangerZoneLink(location) {
    return `https://www.google.com/maps?&z=12&q=${location.lat},${location.lng}`
  }
}
