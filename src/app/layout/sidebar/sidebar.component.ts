import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Location } from '@angular/common'

import { AppConfig } from '../../app.config'
import { AuthService } from './../../../providers/auth.service'

declare var jQuery: any

@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html'
})

export class SidebarComponent implements OnInit, AfterViewInit {

  public $el: any
  public config: any
  public router: Router
  public location: Location
  public canView: boolean

  /**
   * Creates an instance of SidebarComponent.
   * @param {AuthService} auth
   * @param {AppConfig} config
   * @param {ElementRef} el
   * @param {Router} router
   * @param {Location} location
   *
   * @memberOf SidebarComponent
   */
  constructor(private auth: AuthService, config: AppConfig, el: ElementRef, router: Router, location: Location) {
    this.$el = jQuery(el.nativeElement)
    this.config = config.getConfig()
    this.router = router
    this.location = location
    this.canView = this.checkUserPermissions()
  }

  /**
   *
   *
   *
   * @memberOf SidebarComponent
   */
  public ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this))
    this.initSidebarScroll()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location)
      }
    })
  }

  /**
   *
   *
   *
   * @memberOf SidebarComponent
   */
  public ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location)
  }

  /**
   *
   * Obtém os dados do usuário para saber se ele pode ver todos os menus
   *
   * @returns
   *
   * @memberOf SidebarComponent
   */
  public checkUserPermissions() {
    return this.auth.user().isAdmin || false
  }

  /**
   *
   *
   *
   * @memberOf SidebarComponent
   */
  public initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content')
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      })
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    })
  }

  /**
   *
   *
   * @param {any} location
   *
   * @memberOf SidebarComponent
   */
  public changeActiveNavigationItem(location): void {
    let $newActiveLink = this.$el.find('a[href="' + location.path().split('?')[0] + '"]')

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide')
    }
    this.$el.find('.sidebar-nav .active').removeClass('active')

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active')

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in').css('height', '')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed')
  }
}
