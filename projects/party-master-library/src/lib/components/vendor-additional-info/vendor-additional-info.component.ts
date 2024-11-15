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
  CategoryList:any[]=[];
  ContractPriceList:any[]=[];
  userSettings:any;
  @Input() additinalInfo:AdditionalInfo = <AdditionalInfo>{};
  @Input() mode!:string;
  constructor(private router: Router, private fb: FormBuilder,public partyMasterService:PartyMasterLibraryService) {
    this.additinalInfo.membershipInfo = <MembershipObj>{};
    this.vendorAdditionalInfoForm = this.fb.group({
      Category: ['', Validators.required],
      VendorType: ['', Validators.required],
      CustomerVendor: ['', Validators.required],
      CreditLimit: ['', Validators.required],
      CreditDays: ['', Validators.required],
      ContractPrice: ['', Validators.required],
      SelectContractPrice: ['', Validators.required],
      customerStatus: ['', Validators.required],
    });
    this.userSettings = this.partyMasterService.userSettings;
    this.getCategoryList();
  }

  ngOnInit(){
    if(this.mode == 'view'){
      this.vendorAdditionalInfoForm.disable();
    }
  }
  getCategoryList(){
    this.partyMasterService.getcategorywiseconfiguration().subscribe((res:any) => {
      this.CategoryList = res.result;
    })
  }
  getContractPriceList(){
    this.partyMasterService.getContractPriceList().subscribe((res:any) => {
      this.ContractPriceList = res;
    })
  }
  onCheckCustomerAsVendor(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.additinalInfo.isCommon = 1;
    }else{
      this.additinalInfo.isCommon = 0;
    }
  }
}
