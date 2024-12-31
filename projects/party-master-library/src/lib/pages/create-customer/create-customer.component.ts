import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDialogComponent } from '../../shared/components/generic/generic-dialog/generic-dialog.component';
import { SalesTargetComponent } from '../../components/sales-target/sales-target.component';
import { AdditionalInfoComponent } from '../../components/additional-info/additional-info.component';
import {
  AdditionalInfo,
  CustomerMasterObj,
  MembershipObj,
  PartyMasterLibraryService,
} from '.././../party-master-library.service';
import { SalesTarget } from '../../party-master-library.service';
import { empty } from 'rxjs';

@Component({
  selector: 'lib-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent {
  customerForm: FormGroup;
  mode: string = 'add';
  userSettings: any;
  returnUrl: string | undefined;
  @ViewChild(AdditionalInfoComponent) additionalInfoComponent!: AdditionalInfoComponent;
  @ViewChild(SalesTargetComponent) salesTargetComponent!: SalesTargetComponent;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public partyMasterService: PartyMasterLibraryService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.partyMasterService.reset();
    this.userSettings = this.partyMasterService.userSettings;
    console.log("User Setting", this.userSettings)
    this.customerForm = this.fb.group({
      CustomerCode: ['', Validators.required],
      CustomerName: ['', [Validators.required, Validators.maxLength(50)]],
      Address: ['', [Validators.required, Validators.maxLength(50)]],
      VATNo: [''],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Phone: [''],
      LedgerAc: [0],
    });
    if (this.userSettings.CompanyType == 'B2B') {
      this.partyMasterService.customermasterObj.isCustomerLedger = 1;
      this.partyMasterService.customermasterObj.status = 1;
      this.partyMasterService.customermasterObj.customerPartyAccount = <any>{};
    }
  
    
  }

  ngOnInit() {
    if(this.userSettings.AUTOCUSCODE == 1){
      this.customerForm.controls['CustomerCode'].disable();      
    }
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }

    if (!!this._activatedRoute.snapshot.params['mode']) {
      if (this._activatedRoute.snapshot.params['mode'] === 'view') {
        this.mode = 'view';
        this.customerForm.disable();
      }
      if (this._activatedRoute.snapshot.params['mode'] === 'edit') {
        this.mode = 'edit';
      }
      let acid = this._activatedRoute.snapshot.params['acid'];
      this.partyMasterService
        .getCustomerById('C', acid)
        .subscribe((res: any) => {
          this.partyMasterService.customermasterObj = res.result;
          this.partyMasterService.customermasterObj.AdditionalInfo =
            res.result.additionalInfo;
            delete(this.partyMasterService.customermasterObj.additionalInfo);

            if(this.partyMasterService.customermasterObj.AdditionalInfo.createMember == 1){
              this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.membershipStartDate = this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.membershipStartDate?this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.membershipStartDate.split('T')[0]:null;
              this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.membsershipEndDate = this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.membsershipEndDate?this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.membsershipEndDate.split('T')[0]:null;
              this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.dateOfBirth = this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.dateOfBirth?this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.dateOfBirth.split('T')[0]:null;
              this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.weddingAniversary = this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.weddingAniversary?this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo.weddingAniversary.split('T')[0]:null;
            }
            if(this.userSettings.EnableContractPrice == 1){
              if(this.partyMasterService.customermasterObj.AdditionalInfo.contractPrice != null || this.partyMasterService.customermasterObj.AdditionalInfo.contractPrice != undefined){
                this.partyMasterService.customermasterObj.AdditionalInfo.enbleContractPrice = 1;
              }
            }
            if(this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions){
              this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions = JSON.parse(this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions);
            }
            if(this.partyMasterService.customermasterObj.salesTarget == null){
              this.partyMasterService.customermasterObj.salesTarget = <SalesTarget>{};
            }
        });
    }

    
    
  }

  selectedTab: number = 0;

  // Method to handle tab change
  onTabChange(index: number) {
    this.selectedTab = index;
  }

  submit() {
    if (this.customerForm.get('CustomerName')?.invalid) {
      alert('Customer Name limit is upto 50 characters');
    }
    if (this.customerForm.get('Address')?.invalid) {
      alert('Address limit is upto 50 characters');
    }
    if (
      this.partyMasterService.customermasterObj.customerName == '' ||
      this.partyMasterService.customermasterObj.customerName == undefined ||
      this.partyMasterService.customermasterObj.customerName == null
    ) {
      alert('Please Enter Customer Name.');
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
      this.userSettings.CompanyType == 'B2B'&& this.partyMasterService.customermasterObj.vatNo == '' ||
        this.partyMasterService.customermasterObj.vatNo == undefined ||
        this.partyMasterService.customermasterObj.vatNo == null && this.partyMasterService.customermasterObj.AdditionalInfo
        .isOverSeasCustomer == 0)
     {
      alert('Please Enter VAT No.');
      return;
    }
    if (this.userSettings.CompanyType == 'B2B' && this.partyMasterService.customermasterObj.vatNo.length != 9) {
      alert('VAT no. must be of 9 digits.');
      console.log("is being used 9 digits");
      return;
   }
   if (this.userSettings.CompanyType == 'B2C' && this.partyMasterService.customermasterObj.vatNo.length != 9) {
    alert('VAT no. must be of 9 digits.');
    console.log("is being used 9 digits");
    return;
 }
    if (
      this.partyMasterService.customermasterObj.vatNo &&
      (isNaN(Number(this.partyMasterService.customermasterObj.vatNo)) || 
        /[a-zA-Z]/.test(this.partyMasterService.customermasterObj.vatNo))
    ) {
      alert('VAT No. must be numeric and contain no alphabets.');
      return;
    } if (
      this.partyMasterService.customermasterObj.vatNo != '' &&
      this.partyMasterService.customermasterObj.vatNo != undefined &&
      this.partyMasterService.customermasterObj.vatNo != null &&
      this.partyMasterService.customermasterObj.AdditionalInfo
        .isOverSeasCustomer == 0
    ) {
      if (this.userSettings.CompanyType == 'B2B' && this.partyMasterService.customermasterObj.vatNo.length != 9) {
        alert('VAT no. must be of 9 digits.');
        console.log("is being used 9 digits");
        return;
      }
    }
    if (this.partyMasterService.customermasterObj.mobile.length != 10) {
      alert('Mobile no. must be of 10 digits.');
      return;
    }
    if (
      this.partyMasterService.customermasterObj.mobile &&
      (isNaN(Number(this.partyMasterService.customermasterObj.mobile)) || 
        /[a-zA-Z]/.test(this.partyMasterService.customermasterObj.mobile))
    ) {
      alert('Mobile No. must be numeric and contain no alphabets.');
      return;
    }
    if (
      this.partyMasterService.customermasterObj.mobile == '' ||
      this.partyMasterService.customermasterObj.mobile == undefined ||
      this.partyMasterService.customermasterObj.mobile == null
    ) {
      alert('Please Enter Mobile No.');
      return;
    }
    if(this.partyMasterService.userSettings.CREATE_CPROFILE_AS_MEMBER ==1){
      const dateValidation = this.additionalInfoComponent.validateEndDate();
      if(!dateValidation){
        alert('End date cannot be earlier than start date');
        return;
      }
    }
    if(this.partyMasterService.userSettings.ENABLESALES_TARGET == 1){
    const isValid = this.salesTargetComponent.validateAndSubmit();
    if(!isValid){
      return;
    }
  }
  if (this.partyMasterService.userSettings.AdditionalInfoCompulsoryInPartyMaster === 1) {
    const contactPerson = this.partyMasterService.customermasterObj.contactPerson;
  
    if (Array.isArray(contactPerson)) {
      this.partyMasterService.customermasterObj.contactPerson = contactPerson.filter(
        (contact: any) => contact.name.trim() !== '' && contact.contact.trim() !== ''
      );
    } else {
      this.partyMasterService.customermasterObj.contactPerson = [];
    }
  }
  if (this.partyMasterService.userSettings.EnableOnlinePayment === 1) {
  const bankInformation = this.partyMasterService.customermasterObj.bankInformation;

  if (Array.isArray(bankInformation)) {
    // Filter out invalid entries
    this.partyMasterService.customermasterObj.bankInformation = bankInformation.filter((bank: any) => {
      if (typeof bank === 'string') {
        // For string entries, check if they are non-empty
        return bank.trim() !== '';
      }

      if (typeof bank === 'object' && bank !== null) {
        // For object entries, validate specific fields
        return (
          (bank.accountNumber?.trim() || '') !== '' || // Check if accountNumber is valid
          (bank.bankName?.trim() || '') !== ''         // Check if bankName is valid
        );
      }

      // Remove invalid data types (e.g., numbers, null, undefined)
      return false;
    });
  } else {
    // Initialize as an empty array if not a valid array
    this.partyMasterService.customermasterObj.bankInformation = [];
  }
}


  if (this.partyMasterService.userSettings.EnableShippingAddress === 1) {
    const shippingAddress = this.partyMasterService.customermasterObj.shippingAdresses;
  
    if (Array.isArray(shippingAddress)) {
      // Filter valid entries only
      this.partyMasterService.customermasterObj.shippingAdresses = shippingAddress.filter((address: any) => {
        if (typeof address === 'string') {
          // For string addresses, check if they are non-empty
          return address.trim() !== '';
        }
  
        if (typeof address === 'object' && address !== null) {
          // For object addresses, check specific fields (e.g., line1, city)
          return (
            (address.address?.trim() || '') !== '' || // Ensure line1 is non-empty
            (address.name?.trim() || '') !== ''    // Ensure city is non-empty
          );
        }
  
        // Remove invalid types (e.g., numbers, null, undefined)
        return false;
      });
    } else {
      // Reset to an empty array if not an array
      this.partyMasterService.customermasterObj.shippingAdresses = [];
    }
  }
  
    if (
      this.userSettings.SalesmanCompulsoryInPartyMaster == 1 &&
      (this.partyMasterService.customermasterObj.AdditionalInfo
        .dealingSalesman == '' ||
        this.partyMasterService.customermasterObj.AdditionalInfo
          .dealingSalesman == undefined ||
        this.partyMasterService.customermasterObj.AdditionalInfo
          .dealingSalesman == null)
    ) {
      alert('Please Select Salesman.');
      return;
    }
    // if (this.partyMasterService.customermasterObj.isCustomerLedger == 1) {
    // }
    this.partyMasterService.customermasterObj.customerPartyAccount.type = 'A';
    this.partyMasterService.customermasterObj.customerPartyAccount.parent =
      'PA';
    this.partyMasterService.customermasterObj.customerPartyAccount.pType =
      'C';
    if(this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions){
      this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions = JSON.stringify(this.partyMasterService.customermasterObj.customerPartyAccount.termsAndConditions);
    }
    if(Object.keys(this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo).length === 0){
      this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo = {
        customerStatus: '1',
        gender: '',
        dateOfBirth: null,
        weddingAniversary: null,
        workingOrganization: null,
        membershipStartDate: null,
        membsershipEndDate: null,
        designation:null,
        membershipScheme: null,
        membershipBarcode: null,
      };
      console.log("Customer Status");
    }
    this.partyMasterService
      .saveCustomer(this.mode, this.partyMasterService.customermasterObj)
      .subscribe((res: any) => {
        if (res.status == 'ok') {
        const dialogRef = this.partyMasterService.openSuccessDialog(res.result);
        setTimeout(() => {
          dialogRef.close();
        }, 2000);
          this.partyMasterService.reset();
        this.router.navigate([this.returnUrl]); // Navigate to the previous route
        } else if (res.status == 'error') {
          this.partyMasterService.openErrorDialog(res.result);
        }else if(res.status == 400){
          this.partyMasterService.openErrorDialog(res.detail);
        }
      },error => {
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

  onCheckCreateCustomerLedger(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.partyMasterService.customermasterObj.isCustomerLedger = 1;
    }else{
      this.partyMasterService.customermasterObj.isCustomerLedger = 0;
    }
  }
}
