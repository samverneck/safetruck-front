import { Component, ViewEncapsulation, Input, OnInit, OnChanges } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as _ from 'lodash'
import * as moment from 'moment'

import { ReportOverSpeeding, ReportDangerZonesData } from '../shared'

@Component( {
  encapsulation: ViewEncapsulation.None,
  selector: 'vehicle-route',
  templateUrl: './vehicle-route.component.html',
  styleUrls: [ './vehicle-route.component.scss' ]
} )
export class VehicleRouteComponent implements OnInit, OnChanges {

  @Input() public route: any[]
  @Input() public times: any
  @Input() public overSpeedings: ReportOverSpeeding[]
  @Input() public dangerZones: ReportDangerZonesData[]

  /**
   *
   *
   *
   * @memberOf RouteComponent
   */
  public ngOnInit() {
    this.initMap()
  }

  /**
   *
   *
   *
   * @memberOf VehicleRouteComponent
   */
  public ngOnChanges() {
    console.log( 'changes' )
    this.initMap()
  }

  /**
   *
   *
   *
   * @memberOf RouteComponent
   */
  public initMap() {
    this.getMap().subscribe( map => {
      // Desenha a rota principal
      this.drawBaseRoute( map, this.route )
      // Adiciona os marcadores de Início e Fim
      this.drawStartAndFinish( {
        map: map,
        start: {
          date: this.times.start,
          latLng: _.head( this.route )
        },
        finish: {
          date: this.times.finish,
          latLng: _.last( this.route )
        }
      } )
      // Zonas perigosas
      this.dangerZones.map( dz => {
        this.drawDangerZonesPoints( map, dz )
      } )
      // Excessos de velocidade
      this.overSpeedings.map( overSpeeding => {
        overSpeeding.data.map( data => {
          this.drawOverSpeedingsRoute( map, data )
        } )
      } )
    } )
  }

  /**
   * Cria uma instancia do mapa
   * @returns {Observable <any>}
   * @memberOf RouteComponent
   */
  public getMap(): Observable<any> {
    let map$ = Observable.create( obs => {
      let map = new google.maps.Map( document.getElementById( 'map' ), {
        zoom: 3,
        center: { lat: 0, lng: -20 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } )
      obs.next( map )
    } )

    return map$
  }

  /**
   * Desenha a rota principal
   * @param {any} map
   * @param {any} route
   * @returns {void}
   * @memberOf RouteComponent
   */
  public drawBaseRoute( map, route ): void {
    let flightPath = new google.maps.Polyline( {
      path: route,
      geodesic: true,
      strokeColor: '#0000FF',
      strokeOpacity: 1.0,
      strokeWeight: 4
    } )
    let llbounds = new google.maps.LatLngBounds()
    flightPath.getPath().forEach(( e ) => {
      llbounds.extend( e )
    } )
    flightPath.setMap( map )
    // Centraliza o mapa na rota
    map.setCenter( llbounds.getCenter() )
    map.fitBounds( llbounds )
  }

  /**
   * Traça a rota com excesso de velocidade
   * e coloca um ícone no centro
   * @param {any} map
   * @param {any} data
   * @returns {void}
   * @memberOf RouteComponent
   */
  public drawOverSpeedingsRoute( map, data ): void {
    let line = new google.maps.Polyline( {
      path: data.route,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.6,
      strokeWeight: 6
    } )
    line.setMap( map )
    // Ícone
    let start = moment( data.start ).format( 'DD/MM/YYYY HH:mm:ss' )
    let finish = moment( data.finish ).format( 'DD/MM/YYYY HH:mm:ss' )
    let content = `
      <div id="content">
        <div id="siteNotice"></div>
        <h2 id="firstHeading" class="firstHeading">Alta Velocidade</h2>
        <div id="bodyContent">
          <p>Velocidade Máxima: <b>${data.maxSpeed}km/h</b></p>
          <p>Data e Hora de início: ${start}</p>
          <p>Data e Hora de Fim: ${finish}</p>
        </div>
      </div>
    `
    this.drawIcon( {
      map: map,
      icon: 'https://maps.google.com/mapfiles/ms/micons/caution.png',
      // Posiciona o ícone no meio da rota
      position: data.route[ Math.round(( data.route.length ) / 2 ) ],
      content: content
    } )
  }

  /**
   * Desenha o cículo e coloca os ícones
   * de Zona perigosa no mapa
   * @param {any} map
   * @param {any} data
   * @returns {void}
   * @memberOf RouteComponent
   */
  public drawDangerZonesPoints( map, data ): void {
    let date = moment( data.time ).format( 'DD/MM/YYYY HH:mm:ss' )
    let content = `
      <div id="content">
        <div id="siteNotice"></div>
        <h2 id="firstHeading" class="firstHeading">Zona Perigosa</h2>
        <div id="bodyContent">
          <p>Velocidade Máxima: <b>${data.maxSpeed}km/h</b></p>
          <p>Data e Hora: ${date}</p>
        </div>
      </div>
    `
    this.drawIcon( {
      map: map,
      icon: 'https://maps.google.com/mapfiles/kml/pal3/icon42.png',
      position: data.position,
      content: content
    } )
    new google.maps.Circle( {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.10,
      map: map,
      center: data.position,
      radius: 200
    } )
  }

  /**
   * Cria o ícone a janela de infomação ao clicar no ícone
   * @param {any} opt
   * @returns {void}
   * @memberOf RouteComponent
   */
  public drawIcon( opt ): void {
    let marker = new google.maps.Marker( {
      label: opt.label,
      icon: opt.icon,
      map: opt.map,
      position: opt.position
    } )

    let infoWin = new google.maps.InfoWindow( {
      content: opt.content,
      position: opt.position
    } )
    // Adiciona um envento que abre a info ao clicar
    marker.addListener( 'click', () => {
      infoWin.open( opt.map, marker )
    } )
  }

  /**
   * Adiconar um marcador
   * @param {any} map
   * @param {any} label
   * @param {any} latLng
   * @returns {void}
   * @memberOf RouteComponent
   */
  public drawStartAndFinish( opt ): void {
    let startMarker = moment( opt.start.date, 'DD/MM/YYYY h:mm A' ).format( 'DD/MM/YYYY HH:mm' )
    let startMarkerCtn = `
      <div id="content">
        <div id="siteNotice"></div>
        <h2 id="firstHeading" class="firstHeading">Início do relatório</h2>
        <div id="bodyContent">
          <p>Data e Hora de intício: ${startMarker}</p>
        </div>
      </div>
    `
    let finishMarker = moment( opt.finish.date, 'DD/MM/YYYY h:mm A' ).format( 'DD/MM/YYYY HH:mm' )
    let finishMarkerCtn = `
      <div id="content">
        <div id="siteNotice"></div>
        <h2 id="firstHeading" class="firstHeading">Fim do relatório</h2>
        <div id="bodyContent">
          <p>Data e Hora de intício: ${finishMarker}</p>
        </div>
      </div>
    `
    this.drawIcon( {
      map: opt.map,
      label: 'I',
      position: opt.start.latLng,
      content: startMarkerCtn
    } )
    this.drawIcon( {
      map: opt.map,
      label: 'F',
      position: opt.finish.latLng,
      content: finishMarkerCtn
    } )
  }

}
