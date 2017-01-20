import { Component, ViewEncapsulation, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Http } from '@angular/http'
import * as $ from 'jquery'
import 'rxjs/add/operator/toPromise'

import { AuthService } from './../../../providers/auth.service'

declare var swal: any

@Component({
  selector: 'reset-password',
  styleUrls: [ './reset-password.styles.scss' ],
  templateUrl: './reset-password.template.html',
  encapsulation: ViewEncapsulation.None
})

export class ResetPassword implements OnInit {
  public path: string
  public errorMsg: string
  private token: string
  private password: string
  private confirm: string
  private email: string

  constructor(
    private http: Http,
    private auth: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.path = window.location.href.split('/')[4]
    this.route.params.forEach((params: Params) => {
      if (params['token'] !== undefined) {
        this.getTokenInfo(params['token'])
          .then(token => {
            let client = token.json()
            if (!client.active) {
              this.router.navigate(['/auth/login'])
              return
            }
            this.email = client.email
            this.token = params['token']
          })
          .catch(err => this.router.navigate(['/auth/login']))
      }
    })
  }

  changePassword() {
    $('.alert').hide('fast')
    if (this.password !== this.confirm) {
      this.errorMsg = 'As senhas precisam ser iguais.'
      $('.alert').show('fast')
      return
    }
    if (this.password.length < 6) {
      this.errorMsg = 'A senha deve conter pelo menos 6 caracteres.'
      $('.alert').show('fast')
      return
    }

    this.http
      .post(`${API_URL}/forgot/${this.token}`, {password: this.password})
      .toPromise()
      .then(res => {
        swal({
          title: this.path === 'forgot'
            ? 'Senha alterada'
            : 'Senha cadastrada',
          text: this.path === 'forgot'
            ? 'A sua senha foi alterada com sucesso.'
            : 'A sua senha foi criada com sucesso.',
          type: 'success'
        }).then(() => {
          this.auth.login(this.email, this.password)
            .toPromise()
            .then(resp => this.router.navigate(['/app']))
        })
      }
      )
      .catch(err => {
        swal({
          title: 'Erro',
          text:  this.path === 'forgot'
            ? 'Houve algum problema ao atualizar sua senha. Tente novamente mais tarde'
            : 'Houve algum problema ao cadastrar sua senha. Tente novamente mais tarde',
          type: 'error'
        })
        console.error(err)
      })
  }

  getTokenInfo(token) {
    return  this.http
      .get(`${API_URL}/forgot/${token}`)
      .toPromise()
  }

}
