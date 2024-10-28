import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalInfo, PartyMasterLibraryService } from '../../party-master-library.service';

@Component({
  selector: 'lib-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.css'],
})
export class CreateVendorComponent {
  vendorForm: FormGroup;
  mode:string="add";
  userSettings:any;

  constructor(private router: Router, private fb: FormBuilder,public partyMasterService:PartyMasterLibraryService) {
    this.partyMasterService.customermasterObj.AdditionalInfo = <AdditionalInfo>{};
    this.userSettings =this.partyMasterService.userSettings;
    this.vendorForm = this.fb.group({
      VendorCode: ['', Validators.required],
      VendorName: ['', Validators.required],
      Address: ['', Validators.required],
      VATNo: ['', Validators.required],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Phone: ['', Validators.required],
    });
    if(this.userSettings.CompanyType == "B2B"){
      this.partyMasterService.customermasterObj.isCustomerLedger = 1;
      this.partyMasterService.customermasterObj.customerPartyAccount = <any>{};
    }
  }

  selectedTab: number = 0;

  // Method to handle tab change
  onTabChange(index: number) {
    this.selectedTab = index;
  }

  submit() {
    if(this.partyMasterService.customermasterObj.customerName == "" || this.partyMasterService.customermasterObj.customerName == undefined || this.partyMasterService.customermasterObj.customerName == null){
      alert("Please Enter Customer Name.");
      return;
    }
    if(this.partyMasterService.customermasterObj.address == "" || this.partyMasterService.customermasterObj.address == undefined || this.partyMasterService.customermasterObj.address == null){
      alert("Please Enter Address.");
      return;
    }
    if((this.partyMasterService.customermasterObj.vatNo == "" || this.partyMasterService.customermasterObj.vatNo == undefined || this.partyMasterService.customermasterObj.vatNo == null) && this.userSettings.CompanyType == "B2B"){
      alert("Please Enter VAT No.");
      return;
    }else if(this.partyMasterService.customermasterObj.vatNo != "" && this.partyMasterService.customermasterObj.vatNo != undefined && this.partyMasterService.customermasterObj.vatNo != null && this.partyMasterService.customermasterObj.AdditionalInfo.isOverSeasCustomer == 0){
      if(this.partyMasterService.customermasterObj.vatNo.length == 9){
        alert("VAT no. must be of 9 digits.");
        return;
      }
    }
    if(this.partyMasterService.customermasterObj.mobile == "" || this.partyMasterService.customermasterObj.mobile == undefined || this.partyMasterService.customermasterObj.mobile == null){
      alert("Please Enter Mobile No.");
      return;
    }
    if(this.userSettings.SalesmanCompulsoryInPartyMaster == 1 && (this.partyMasterService.customermasterObj.AdditionalInfo.dealingSalesman == "" || this.partyMasterService.customermasterObj.AdditionalInfo.dealingSalesman == undefined || this.partyMasterService.customermasterObj.AdditionalInfo.dealingSalesman == null)){
      alert("Please Select Salesman.");
      return;
    }
    if(this.partyMasterService.customermasterObj.isCustomerLedger == 1){
      this.partyMasterService.customermasterObj.customerPartyAccount.type = "A";
      this.partyMasterService.customermasterObj.customerPartyAccount.parent = "PA";
      this.partyMasterService.customermasterObj.customerPartyAccount.pType = "V";
    }
    this.partyMasterService.customermasterObj.contactNo=this.partyMasterService.customermasterObj.phone
    this.partyMasterService.saveCustomer(this.mode, this.partyMasterService.customermasterObj).subscribe((res:any) => {
      if(res.status == "ok"){
        this.partyMasterService.openSuccessDialog(res.result);
      }else if(res.status == "error"){
        this.partyMasterService.openErrorDialog(res.result);
      }
    });
  }

  goBack() {
    this.router.navigate(['/vendor']); // Navigate to the previous route
  }
}
