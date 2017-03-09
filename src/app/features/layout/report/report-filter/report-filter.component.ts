import { Component, Output, ViewEncapsulation, OnInit, ViewChild, AfterViewChecked, EventEmitter } from '@angular/core'
import { NgForm } from '@angular/forms'

import * as moment from 'moment'
import * as _ from 'lodash'

import { ReportService, Filter } from '../shared'
import { fadeInOut, ValidationService } from './../../../../core'

@Component( {
  selector: 'report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: [ './report-filter.component.scss' ],
  providers: [ ReportService ],
  animations: [ fadeInOut ],
  encapsulation: ViewEncapsulation.None
} )
export class ReportFilterComponent implements OnInit, AfterViewChecked {

  @ViewChild( 'reportForm' ) public currentForm: NgForm
  @Output() public onSearch = new EventEmitter<Filter>()

  public plaques: string[]
  public filter: Filter = {} as Filter
  public reportForm: NgForm
  public errors = {}

  public validationMessages = {
    'plaque': {
      'required': 'Obrigatório'
    },
    'start': {
      'required': 'Obrigatório'
    },
    'finish': {
      'required': 'Obrigatório'
    }
  }

  /**
   * Creates an instance of ReportFilterComponent.
   * @param {ReportService} reportService
   * @param {ValidationService} validation
   *
   * @memberOf ReportFilterComponent
   */
  constructor( private reportService: ReportService, private validation: ValidationService ) { }

  /**
   *
   *
   *
   * @memberOf ReportComponent
   */
  public ngOnInit(): void {

    this.filter.start = moment().subtract( 1, 'hours' ).toDate()
    this.filter.finish = new Date()

    // Obtém as placas cadastradas
    this.reportService.getPlaques().subscribe( plaques => {
      this.plaques = _.sortedUniq( plaques ) as string[]
    } )
  }

  /**
   *
   *
   *
   * @memberOf EquipmentFormComponent
   */
  public onSubmitClick() {
    if ( this.reportForm.form.valid ) {
      this.onSearch.emit( Object.assign( {}, this.filter ) )
    }
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  public ngAfterViewChecked() {
    this.formChanged()
  }

  /**
   *
   *
   *
   * @memberOf ClientFormComponent
   */
  public onCancelClick() {
    this.reportForm.reset()
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  private formChanged() {
    if ( this.currentForm === this.reportForm ) { return }
    this.reportForm = this.currentForm
    if ( this.reportForm ) {
      this.reportForm.valueChanges.subscribe(() => this.updateErrors() )
    }
  }

  /**
   *
   *
   *
   * @memberOf ClientRegisterComponent
   */
  private updateErrors() {
    this.errors = this.validation.getFormErrors( this.reportForm, this.validationMessages )
  }
}
