// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// Angular 2
import '@angular/platform-browser'
import '@angular/platform-browser-dynamic'
import '@angular/core'
import '@angular/common'
import '@angular/forms'
import '@angular/http'
import '@angular/router'
import '@angularclass/hmr'

// Statics
import 'rxjs/add/observable/throw'

// Operators
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/mergeMap'// flatMap
import 'rxjs/add/operator/share'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/toPromise'

import 'jquery'
import 'bootstrap'
import 'widgster'
import 'pace'
import 'eonasdan-bootstrap-datetimepicker'

if ( 'production' === ENV ) {
  //
} else {
  //
}
