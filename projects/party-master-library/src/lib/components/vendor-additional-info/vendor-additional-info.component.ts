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
  additionalInfo: any;
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
      CreditLimit: ['', [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')]],
      CreditDays: ['', Validators.required],
      isOverSeasCustomer:['',Validators.required],
      ContractPrice: ['', Validators.required],
      SelectContractPrice: ['', Validators.required],
      customerStatus: ['', Validators.required],
    });
    this.userSettings = this.partyMasterService.userSettings;
    this.getCategoryList();
    this.getContractPriceList();
  }

  ngOnInit(){
    this.additionalInfo= this.partyMasterService.customermasterObj.AdditionalInfo;
    if(this.additionalInfo.customerStatus === undefined){
      this.additinalInfo.customerStatus = '1';
    }
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
      this.ContractPriceList = res.result;
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
  onIsOverseasCheck(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.additinalInfo.isOverSeasCustomer = 1;
    }else{
      this.additinalInfo.isOverSeasCustomer = 0;
    }
  }
  onCheckContractPrice(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.additinalInfo.enbleContractPrice = 1;
    }else{
      this.additinalInfo.enbleContractPrice = 0;
    }
  }

}
