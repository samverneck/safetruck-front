import { Component, ViewEncapsulation } from '@angular/core'
import { Http } from '@angular/http'

@Component( {
  selector: 'forgot-password',
  styleUrls: [ './forgot-password.component.scss' ],
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None
} )

export class ForgotPasswordComponent {
  public email: string
  public errorMsg: string

  /**
   * Creates an instance of ForgotPasswordComponent.
   * @param {Http} http
   *
   * @memberOf ForgotPasswordComponent
   */
  constructor( private http: Http ) { }

  /**
   *
   *
   *
   * @memberOf ForgotPasswordComponent
   */
  public sendEmail() {
    $( '.alert' ).hide()
    if ( this.validateEMail( this.email ) ) {
      this.requestTokenByEmail( { email: this.email } )
        .then( res => {
          swal(
            'E-mail enviado',
            'Em instantes você receberá um email com as informações para alteração da sua senha',
            'success'
          )
        } )
        .catch( error => {
          console.log( error )
          this.errorMsg = 'O email informado não está cadastrado.'
          $( '.alert' ).show( 'fast' )
        } )
    } else {
      this.errorMsg = 'O email informado não é um endereço de e-mail válido'
      $( '.alert' ).show( 'fast' )
    }
  }

  /**
   *
   *
   * @param {any} params
   * @returns
   *
   * @memberOf ForgotPasswordComponent
   */
  public requestTokenByEmail( params ) {
    return this.http
      .post( `${API_URL}/forgot`, params )
      .toPromise()
  }

  /**
   *
   *
   * @param {any} token
   * @returns
   *
   * @memberOf ForgotPasswordComponent
   */
  public getTokenInfo( token ) {
    return this.http
      .get( `${API_URL}/forgot/${token}` )
      .toPromise()
  }

  /**
   *
   *
   * @param {any} email
   * @returns
   *
   * @memberOf ForgotPasswordComponent
   */
  public validateEMail( email ) {
    return /^[\w\.\-]{3,}\@[a-zA-Z0-9\.\-]{3,}\.[A-Za-z]{2,}$/.test( email )
  }

}
