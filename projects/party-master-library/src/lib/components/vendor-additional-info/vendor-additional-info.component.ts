import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalInfo, MembershipObj, PartyMasterLibraryService } from '../../party-master-library.service';

@Component({
  selector: 'lib-vendor-additional-info',
  templateUrl: './vendor-additional-info.component.html',
  styleUrls: ['./vendor-additional-info.component.css'],
})
export class VendorAdditionalInfoComponent {
  vendorAdditionalInfoForm: FormGroup;
  userSettings:any;
  additinalInfoObj = <AdditionalInfo>{};
  @Input() additinalInfo!:AdditionalInfo;
  constructor(private router: Router, private fb: FormBuilder,public partyMasterService:PartyMasterLibraryService) {
    this.additinalInfoObj.membershipInfo = <MembershipObj>{};
    this.vendorAdditionalInfoForm = this.fb.group({
      Category: ['', Validators.required],
      VendorType: ['', Validators.required],
      CustomerVendor: ['', Validators.required],
      CreditLimit: ['', Validators.required],
      CreditDays: ['', Validators.required],
      ContractPrice: ['', Validators.required],
      SelectContractPrice: ['', Validators.required],
      VendorStatus: ['', Validators.required],
    });
    this.partyMasterService.customermasterObj.AdditionalInfo = this.additinalInfoObj;
    this.userSettings = this.partyMasterService.userSettings;
    this.additinalInfoObj.createMember = 1;
  }
}
