import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';

@Component({
  selector: 'lib-create-sub-ledger',
  templateUrl: './create-sub-ledger.component.html',
  styleUrls: ['./create-sub-ledger.component.css'],
})
export class CreateSubLedgerComponent {
  subLedgerForm: FormGroup;
  returnUrl: string | undefined;
  subledgerObj:SubledgerObj = <SubledgerObj>{};

  @ViewChild("genericMultiSelectLedger") genericMultiSelectLedger!: MultiSelectGenericGridComponent;
  gridPopupSettingsForLedger: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.subLedgerForm = this.fb.group({
      SubLedgerName: ['', Validators.required],
      PanNo: ['', Validators.required],
      MainLedgerName: ['', Validators.required],
      hasMainLedger: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
  }

  onEnterMainLedgerList(){
    this.gridPopupSettingsForLedger = {
      title: "Ledger List",
      apiEndpoints: `/getAllCustomer?ptype=A`,
      defaultFilterIndex: 1,
      showIsDefaultSelection: true,
      columns: [
        {
          key: "ACID",
          title: "ACID",
          hidden: false,
          noSearch: false
        },
        {
          key: "CUSTNAME",
          title: "NAME",
          hidden: false,
          noSearch: false
        },
      ]
    }
    this.genericMultiSelectLedger.show();
  }

  onSelectMainLedger(event:any){
    this.subledgerObj.MainLedgerId = event.acid;
    this.subledgerObj.MainLedgerName = event.acname;
  }

  submit() {
    if (this.subLedgerForm.valid) {
      console.log('Form Data', this.subLedgerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate([this.returnUrl]); // Navigate to the previous route
  }
}

export interface SubledgerObj{
  SL_ACNAME:string;
  PAN_NO:string;
  MainLedgerName:string;
  MainLedgerId:string;
  HASMAINGROUP:number;
}
