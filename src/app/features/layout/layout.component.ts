import { Component, ViewEncapsulation, ElementRef, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb'
import { AppConfig } from '../../core'

@Component( {
  selector: 'layout',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './layout.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.nav-static]': 'config.state["nav-static"]',
    '[class.app]': 'true',
    id: 'app'
  }
})
export class LayoutComponent implements OnInit {

  public config: any
  public configFn: any
  public $sidebar: any

  /**
   * Creates an instance of LayoutComponent.
   *
   * @param {BreadcrumbService} breadcrumbService
   * @param {AppConfig} config
   * @param {ElementRef} el
   * @param {Router} router
   *
   * @memberOf LayoutComponent
   */
  constructor( private breadcrumbService: BreadcrumbService, config: AppConfig, private el: ElementRef, private router: Router ) {
    this.config = config.getConfig()
    this.configFn = config
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public ngOnInit(): void {

    this.configureBreadCrumb()

    if ( localStorage.getItem( 'nav-static' ) === 'true' ) {
      this.config.state[ 'nav-static' ] = true
    }

    let $el = $( this.el.nativeElement )
    this.$sidebar = $el.find( '[sidebar]' )

    $el.find( 'a[href="#"]' ).on( 'click', ( e ) => {
      e.preventDefault()
    })

    this.$sidebar.on( 'mouseenter', this.sidebarMouseEnter.bind( this ) )
    this.$sidebar.on( 'mouseleave', this.sidebarMouseLeave.bind( this ) )

    this.checkNavigationState()

    this.$sidebar.on( 'click', () => {
      if ( $( 'layout' ).is( '.nav-collapsed' ) ) {
        this.expandNavigation()
      }
    })

    this.router.events.subscribe(() => {
      this.collapseNavIfSmallScreen()
      window.scrollTo( 0, 0 )
    })

    if ( 'ontouchstart' in window ) {
      this.enableSwipeCollapsing()
    }

    this.$sidebar.find( '.collapse' ).on( 'show.bs.collapse', function( e ): void {
      // execute only if we're actually the .collapse element initiated event
      // return for bubbled events
      if ( e.target !== e.currentTarget ) { return }

      let $triggerLink = $( this ).prev( '[data-toggle=collapse]' )
      $( $triggerLink.data( 'parent' ) )
        .find( '.collapse.in' ).not( $( this ) ).collapse( 'hide' )
    })
      /* adding additional classes to navigation link li-parent
       for several purposes. see navigation styles */
      .on( 'show.bs.collapse', function( e ): void {
        // execute only if we're actually the .collapse element initiated event
        // return for bubbled events
        if ( e.target !== e.currentTarget ) { return }

        $( this ).closest( 'li' ).addClass( 'open' )
      }).on( 'hide.bs.collapse', function( e ): void {
        // execute only if we're actually the .collapse element initiated event
        // return for bubbled events
        if ( e.target !== e.currentTarget ) { return }

        $( this ).closest( 'li' ).removeClass( 'open' )
      })
  }

  /**
   *
   *
   * @param {any} state
   *
   * @memberOf LayoutComponent
   */
  public toggleSidebarListener( state ): void {
    let toggleNavigation = state === 'static'
      ? this.toggleNavigationState
      : this.toggleNavigationCollapseState
    toggleNavigation.apply( this )
    localStorage.setItem( 'nav-static', this.config.state[ 'nav-static' ] )
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public toggleNavigationState(): void {
    this.config.state[ 'nav-static' ] = !this.config.state[ 'nav-static' ]
    if ( !this.config.state[ 'nav-static' ] ) {
      this.collapseNavigation()
    }
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public expandNavigation(): void {
    // this method only makes sense for non-static navigation state
    if ( this.isNavigationStatic()
      && ( this.configFn.isScreen( 'lg' ) || this.configFn.isScreen( 'xl' ) ) ) { return }

    $( 'layout' ).removeClass( 'nav-collapsed' )
    this.$sidebar.find( '.active .active' ).closest( '.collapse' ).collapse( 'show' )
      .siblings( '[data-toggle=collapse]' ).removeClass( 'collapsed' )
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public collapseNavigation(): void {
    // this method only makes sense for non-static navigation state
    if ( this.isNavigationStatic()
      && ( this.configFn.isScreen( 'lg' ) || this.configFn.isScreen( 'xl' ) ) ) { return }

    $( 'layout' ).addClass( 'nav-collapsed' )
    this.$sidebar.find( '.collapse.in' ).collapse( 'hide' )
      .siblings( '[data-toggle=collapse]' ).addClass( 'collapsed' )
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public checkNavigationState(): void {
    if ( this.isNavigationStatic() ) {
      if ( this.configFn.isScreen( 'sm' )
        || this.configFn.isScreen( 'xs' ) || this.configFn.isScreen( 'md' ) ) {
        this.collapseNavigation()
      }
    } else {
      if ( this.configFn.isScreen( 'lg' ) || this.configFn.isScreen( 'xl' ) ) {
        setTimeout(() => {
          this.collapseNavigation()
        }, this.config.settings.navCollapseTimeout )
      } else {
        this.collapseNavigation()
      }
    }
  }

  /**
   *
   *
   * @returns {boolean}
   *
   * @memberOf LayoutComponent
   */
  public isNavigationStatic(): boolean {
    return this.config.state[ 'nav-static' ] === true
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public toggleNavigationCollapseState(): void {
    if ( $( 'layout' ).is( '.nav-collapsed' ) ) {
      this.expandNavigation()
    } else {
      this.collapseNavigation()
    }
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public enableSwipeCollapsing(): void {
    let swipe = new Hammer( document.getElementById( 'content-wrap' ) )
    let d = this

    swipe.on( 'swipeleft', () => {
      setTimeout(() => {
        if ( d.configFn.isScreen( 'md' ) ) { return }

        if ( !$( 'layout' ).is( '.nav-collapsed' ) ) {
          d.collapseNavigation()
        }
      })
    })

    swipe.on( 'swiperight', () => {
      if ( d.configFn.isScreen( 'md' ) ) { return }

      if ( $( 'layout' ).is( '.nav-collapsed' ) ) {
        d.expandNavigation()
      }
    })
  }

  /**
   *
   *
   *
   * @memberOf LayoutComponent
   */
  public collapseNavIfSmallScreen(): void {
    if ( this.configFn.isScreen( 'xs' )
      || this.configFn.isScreen( 'sm' ) || this.configFn.isScreen( 'md' ) ) {
      this.collapseNavigation()
    }
  }

  /**************************************** private *****************************************/
  /**
   *
   *
   * @private
   *
   * @memberOf LayoutComponent
   */
  private sidebarMouseEnter(): void {
    if ( this.configFn.isScreen( 'lg' ) || this.configFn.isScreen( 'xl' ) ) {
      this.expandNavigation()
    }
  }

  /**
   *
   *
   * @private
   *
   * @memberOf LayoutComponent
   */
  private sidebarMouseLeave(): void {
    if ( this.configFn.isScreen( 'lg' ) || this.configFn.isScreen( 'xl' ) ) {
      this.collapseNavigation()
    }
  }

  /**
   *
   *
   * @private
   *
   * @memberOf LayoutComponent
   */
  private configureBreadCrumb() {
    this.breadcrumbService.addFriendlyNameForRoute( '/app', 'Safe Truck' )
    this.breadcrumbService.addFriendlyNameForRoute( '/app/clients', 'Clientes' )
    this.breadcrumbService.addFriendlyNameForRoute( '/app/clients/register', 'Cadastro' )
    this.breadcrumbService.addFriendlyNameForRoute( '/app/clients/search', 'Pesquisa' )
    this.breadcrumbService.addFriendlyNameForRouteRegex( '/app/clients/view', 'Detalhes' )
    this.breadcrumbService.addFriendlyNameForRouteRegex( '/app/clients/view/[a-zA-Z]', '' )

    this.breadcrumbService.addFriendlyNameForRoute( '/app/equipments', 'Equipamentos' )
    this.breadcrumbService.addFriendlyNameForRoute( '/app/equipments/register', 'Cadastro' )
    this.breadcrumbService.addFriendlyNameForRoute( '/app/equipments/search', 'Pesquisa' )
    this.breadcrumbService.addFriendlyNameForRouteRegex( '/app/equipments/view', 'Detalhes' )
    this.breadcrumbService.addFriendlyNameForRouteRegex( '/app/equipments/view/[a-zA-Z]', '' )

    this.breadcrumbService.addFriendlyNameForRoute( '/app/users', 'Usuários' )
    this.breadcrumbService.addFriendlyNameForRoute( '/app/users/register', 'Cadastro' )

    this.breadcrumbService.addFriendlyNameForRoute( '/app/report', 'Relatório de Conduta' )

    this.breadcrumbService.addFriendlyNameForRoute( '/app/dashboard', 'Dashboard' )
  }
}
