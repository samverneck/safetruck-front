import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core'

declare var google: any

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'route',
  templateUrl: 'route.template.html',
  styleUrls: ['route.styles.scss']
})

export class RouteComponent implements OnInit {
  @Input() route: Array<any>

  constructor() { }

  ngOnInit() {
    this.initMap()
  }

  initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 0, lng: -20},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    })

    let flightPath = new google.maps.Polyline({
      path: this.route,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })

    flightPath.setMap(map)
  }
}
