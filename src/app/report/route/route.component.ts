import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import * as _ from 'lodash'

declare var google: any

@Component({
  selector: 'route',
  templateUrl: 'route.template.html',
  styles: ['route.styles.scss']
})

export class RouteComponent implements OnInit {
  directionsService = new google.maps.DirectionsService()
  directionsDisplay = new google.maps.DirectionsRenderer()
  distance = new google.maps.DistanceMatrixService()

  @Input() locations: Array<any>

  constructor() { }

  ngOnInit() {
    this.createMap().subscribe(map => {
      this.directionsDisplay.setMap(map)
      this.displayRoute(this.directionsService, this.directionsDisplay)
      // Faz um resize quando o mapa estiver pronto
      google.maps.event.addListenerOnce(map, 'idle', () => {
        google.maps.event.trigger(map, 'resize')
      })
      // Dispara um evento para dar um resize no mapa
      map.addListener('resize', () => {
        let bounds = new google.maps.LatLngBounds()
        this.locations.map(wayPonts => {
          let latLng = new google.maps.LatLng(wayPonts.lat, wayPonts.lon)
          bounds.extend(latLng)
        })
        map.fitBounds(bounds)
        // let zoom = map.getZoom() - 1
        // map.setZoom(zoom)
      })
    })
  }

  /**
   * Exibe a rota
   * @method calculateAndDisplayRoute
   * @param {google.maps.DirectionsService()} directionsService
   * @param {google.maps.DirectionsRenderer()} directionsDisplay
   * @returns void
   */
  displayRoute(directionsService, directionsDisplay) {
    this.locations = [
      {lat: -22.7563763, lon: -47.1085346},
      {lat: -22.7605781, lon: -47.1077043},
      {lat: -22.7626678, lon: -47.1097066}
    ]
    // this.locations = _.take(this.locations, 20)
    console.log('Locations: ', this.locations)
    let waypts = this.locations.map((latLong) => {
      return { location: new google.maps.LatLng(latLong.lat, latLong.lon), stopover: true }
    })

    let origin = _.head(this.locations.map((latLong) => {
      return { lat: latLong.lat, lng: latLong.lon }
    }))

    let dest = _.last(this.locations.map((latLong) => {
      return { lat: latLong.lat, lng: latLong.lon }
    }))

    directionsService.route({
      origin: origin,
      destination: dest,
      waypoints: waypts.length > 2 ? _.initial(_.tail(waypts)) : [],
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response)
      } else {
        console.error('Directions request failed due to ' + status)
      }
    })
  }

  /**
   * Cria uma instância do mapa
   * @method createMap
   * @returns {Promise<google.maps.Map>}
   */
  public createMap(): Observable<any> {
    let mapObs = Observable.create((observable) => {
      let mapOptions = {
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      // Cria uma instância do mapa
      observable.next(new google.maps.Map(document.getElementById('route'), mapOptions))
    })

    return mapObs
  }
}
