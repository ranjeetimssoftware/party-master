import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';
import { PartyMasterLibraryService } from '../../party-master-library.service';

@Component({
  selector: 'lib-create-sub-ledger',
  templateUrl: './create-sub-ledger.component.html',
  styleUrls: ['./create-sub-ledger.component.css'],
})
export class CreateSubLedgerComponent {
  subLedgerForm: FormGroup;
  returnUrl: string | undefined;
  subledgerObj:SubledgerObj = <SubledgerObj>{};
  mode:string = 'add';

  @ViewChild("genericMultiSelectLedger") genericMultiSelectLedger!: MultiSelectGenericGridComponent;
  gridPopupSettingsForLedger: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private partyMasterService: PartyMasterLibraryService
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
    if (!!this._activatedRoute.snapshot.params['mode']) {
      if (this._activatedRoute.snapshot.params['mode'] === 'view') {
        this.mode = 'view';
        this.subLedgerForm.disable();
      }
      let acid = this._activatedRoute.snapshot.params['acid'];
      this.partyMasterService
        .getSubLegerById(acid).subscribe((res:any) => {
          if(res.status == "ok"){
            this.subledgerObj = res.result;
          }
          else if(res.status == "error"){
            this.partyMasterService.openErrorDialog(res.result);
          }
        },error => {
          this.partyMasterService.openErrorDialog(error.error.detail);
        })
    }
  }

  onKeyDown(event: KeyboardEvent){
    if(event.key !== "Enter"){
      event.preventDefault();
    }else{
      this.onEnterMainLedgerList();
    }
  }

  onEnterMainLedgerList(){
    this.gridPopupSettingsForLedger = {
      title: "Ledger List",
      apiEndpoints: `/getAllCustomerPaged/A`,
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
    this.subledgerObj.MainLedgerId = event.ACID;
    this.subledgerObj.MainLedgerName = event.CUSTNAME;
  }

  submit() {
    if (this.subledgerObj.SL_ACNAME == "" || this.subledgerObj.SL_ACNAME == null || this.subledgerObj.SL_ACNAME == undefined) {
      alert("Please Enter Sub Ledger Name.");
      return;
    }
    this.partyMasterService.saveNewSubLedgerGroup(this.mode, this.subledgerObj).subscribe((res:any) => {
      if (res.status == 'ok') {
        this.partyMasterService.openSuccessDialog("Sub Ledger Saved Successfully!");
        this.subledgerObj = <SubledgerObj>{};
        this.router.navigate([this.returnUrl]); // Navigate to the previous route
      } else if (res.status == 'error') {
        this.partyMasterService.openErrorDialog(res.result);
      }
    },
    error => {
      this.partyMasterService.openErrorDialog(error.error.detail);
    })
  }

  onCheckHasMainLedger(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.subledgerObj.HASMAINGROUP = 1;
    }else{
      this.subledgerObj.HASMAINGROUP = 0;
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
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
