import { Component, EventEmitter, ElementRef, Output } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService, AppConfig } from './../../../../core'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Output() public toggleSidebarEvent: EventEmitter<any> = new EventEmitter()
  @Output() public toggleChatEvent: EventEmitter<any> = new EventEmitter()
  public $el: any
  public config: any

  /**
   * Creates an instance of NavbarComponent.
   * @param {AuthService} auth
   * @param {Router} router
   * @param {ElementRef} el
   * @param {AppConfig} config
   *
   * @memberOf NavbarComponent
   */
  constructor(private auth: AuthService, private router: Router, el: ElementRef, config: AppConfig) {
    this.$el = $(el.nativeElement)
    this.config = config.getConfig()
  }

  /**
   *
   *
   *
   * @memberOf NavbarComponent
   */
  public logout() {
    this.auth.logout()
    this.router.navigate(['/auth/login'])
  }

  /**
   *
   *
   * @param {any} state
   *
   * @memberOf NavbarComponent
   */
  public toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state)
  }

  /**
   *
   *
   *
   * @memberOf NavbarComponent
   */
  public toggleChat(): void {
    this.toggleChatEvent.emit(null)
  }
}
