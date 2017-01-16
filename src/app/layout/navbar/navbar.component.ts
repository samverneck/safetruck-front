import { Component, EventEmitter, ElementRef, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AppConfig } from '../../app.config'
import { AuthService } from './../../../providers/auth.service'
declare var jQuery: any

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html'
})
export class Navbar {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter()
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter()
  $el: any
  config: any

  constructor(
    private auth: AuthService,
    private router: Router,
    el: ElementRef,
    config: AppConfig
  ) {
    this.$el = jQuery(el.nativeElement)
    this.config = config.getConfig()
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/auth/login'])
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state)
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null)
  }
}
