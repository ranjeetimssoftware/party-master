import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdditionalInfo,
  CustomerMasterObj,
  CustomerPartyAccountObj,
  PartyMasterLibraryService,
} from '../../party-master-library.service';

@Component({
  selector: 'lib-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css'],
})
export class CreateVendorComponent {
  vendorForm: FormGroup;
  mode: string = 'add';
  userSettings: any;
  returnUrl: string | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public partyMasterService: PartyMasterLibraryService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.partyMasterService.reset();
    this.userSettings = this.partyMasterService.userSettings;
    this.vendorForm = this.fb.group({
      VendorCode: ['', Validators.required],
      VendorName: ['', Validators.required],
      Address: ['', Validators.required],
      VATNo: ['', Validators.required],
      Email: ['', [Validators.required,Validators.email]],
      Mobile: ['', Validators.required],
      Phone: ['', Validators.required],
      
    });
    if (this.userSettings.CompanyType == 'B2B') {
      this.partyMasterService.customermasterObj.isCustomerLedger = 0;
      this.partyMasterService.customermasterObj.status = 1;
      this.partyMasterService.customermasterObj.customerPartyAccount = <CustomerPartyAccountObj>{};
    }
  }

  ngOnInit() {
    if(this.userSettings.AUTOSUPCODE == 1){
      this.vendorForm.controls['VendorCode'].disable();      
    }
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
    if (!!this._activatedRoute.snapshot.params['mode']) {
      if (this._activatedRoute.snapshot.params['mode'] === 'view') {
        this.mode = 'view';
        console.log("edit being hit",this.partyMasterService.customermasterObj.AdditionalInfo.customerStatus);
        this.vendorForm.disable();
      }
      if (this._activatedRoute.snapshot.params['mode'] === 'edit') {
        this.mode = 'edit';
      }
      let acid = this._activatedRoute.snapshot.params['acid'];
      this.partyMasterService
        .getCustomerById('V', acid)
        .subscribe((res: any) => {
          this.partyMasterService.customermasterObj = res.result;
          this.partyMasterService.customermasterObj.AdditionalInfo =
            res.result.additionalInfo;
        });
    }else{
      this.partyMasterService.reset();
    }
  }

  selectedTab: number = 0;

  // Method to handle tab change
  onTabChange(index: number) {
    this.selectedTab = index;
  }

  submit() {
    
    
    if (
      this.partyMasterService.customermasterObj.customerName == '' ||
      this.partyMasterService.customermasterObj.customerName == undefined ||
      this.partyMasterService.customermasterObj.customerName == null
    ) {
      alert('Please Enter Vendor Name.');
      return;
    }
    if (
      this.partyMasterService.customermasterObj.address == '' ||
      this.partyMasterService.customermasterObj.address == undefined ||
      this.partyMasterService.customermasterObj.address == null
    ) {
      alert('Please Enter Address.');
      return;
    }
    if (
      (this.partyMasterService.customermasterObj.vatNo == '' ||
        this.partyMasterService.customermasterObj.vatNo == undefined ||
        this.partyMasterService.customermasterObj.vatNo == null) &&
      this.userSettings.CompanyType == 'B2B'
    ) {
      alert('Please Enter VAT No.');
      return;
    } 
    if (this.userSettings.CompanyType == 'B2B' && this.partyMasterService.customermasterObj.vatNo.length != 9) {
      alert('VAT no. must be of 9 digits.');
      console.log("is being used 9 digits");
      return;
   }
    else if (
      this.partyMasterService.customermasterObj.vatNo &&
      (isNaN(Number(this.partyMasterService.customermasterObj.vatNo)) || 
        /[a-zA-Z]/.test(this.partyMasterService.customermasterObj.vatNo))
    ) {
      alert('VAT No. must be numeric and contain no alphabets.');
      return;
    }
    else if (
      this.partyMasterService.customermasterObj.vatNo != '' &&
      this.partyMasterService.customermasterObj.vatNo != undefined &&
      this.partyMasterService.customermasterObj.vatNo != null &&
      this.partyMasterService.customermasterObj.AdditionalInfo
        .isOverSeasCustomer == 0
    ) {
      if (this.partyMasterService.customermasterObj.vatNo.length != 9) {
        alert('VAT no. must be of 9 digits.');
        return;
      }
    }
    if (
      this.partyMasterService.customermasterObj.mobile == '' ||
      this.partyMasterService.customermasterObj.mobile == undefined ||
      this.partyMasterService.customermasterObj.mobile == null
    ) {
      alert('Please Enter Mobile No.');
      return;
    }
    if(!this.vendorForm.get('Email')?.valid){
      alert('Please enter a valid email address');
      return;
    }
    if (!this.partyMasterService.customermasterObj.AdditionalInfo.customerStatus) {
      this.partyMasterService.customermasterObj.AdditionalInfo.customerStatus = 'active';
    }
    // if (this.partyMasterService.customermasterObj.isCustomerLedger == 1) {
    // }
    this.partyMasterService.customermasterObj.customerPartyAccount.type = 'A';
    this.partyMasterService.customermasterObj.customerPartyAccount.parent =
      'PA';
    this.partyMasterService.customermasterObj.customerPartyAccount.pType =
      'V';
      this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.customerStatus = this.partyMasterService.customermasterObj.AdditionalInfo.customerStatus;
    this.partyMasterService
      .saveCustomer(this.mode, this.partyMasterService.customermasterObj)
      .subscribe((res: any) => {
        if (res.status == 'ok') {
          this.partyMasterService.openSuccessDialog(res.result);
          this.partyMasterService.reset();
          this.router.navigate([this.returnUrl]); // Navigate to the previous route
        } else if (res.status == 'error') {
          this.partyMasterService.openErrorDialog(res.result);
        }else if(res.status == 400){
          this.partyMasterService.openErrorDialog(res.detail);
        }
      }, error => {
        this.partyMasterService.openErrorDialog(error.error.detail);
      });
  }

  goBack() {
    this.router.navigate([this.returnUrl]); // Navigate to the previous route
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
}
}
