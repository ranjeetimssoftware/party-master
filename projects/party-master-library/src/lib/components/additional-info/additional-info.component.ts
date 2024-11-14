import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalInfo, MembershipObj, PartyMasterLibraryService } from '../../party-master-library.service';

@Component({
  selector: 'lib-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css'],
})
export class AdditionalInfoComponent {
  additionalInfoForm: FormGroup;
  userSettings:any;
  areaList:any[]=[];
  District:any[]=[];
  FilteredDistrict:any[]=[];
  CategoryList:any[]=[];
  MemberSchemeList:any[]=[];
  ContractPriceList:any[]=[];
  SalesmanList:any[]=[];

  @Input() additinalInfo!:AdditionalInfo;
  @Input() mode!:string;
  constructor(private router: Router, private fb: FormBuilder,public partyMasterService:PartyMasterLibraryService) {
    this.partyMasterService.customermasterObj.AdditionalInfo.membershipInfo = <MembershipObj>{};
    this.additionalInfoForm = this.fb.group({
      MenuCategory: [''],
      CreditLimit: [],
      CreditDays: [],
      IsOverseas:[0],
      Area: [''],
      Province: [''],
      district: [''],
      Salesman: [''],
      ContractPrice:[''],
      IsContractPrice:[0],
      IsCustomerMember:[0],
      Gender:[''],
      DOB:[''],
      WeddingAnniversary:[''],
      WorkingOrganization:[''],
      Designation:[''],
      Status:[1],
      Membership_Scheme:[''],
      Membership_StartDate:[''],
      Membership_EndDate:[''],
      Membership_Barcode:[''],
    });
    this.userSettings = this.partyMasterService.userSettings;
    if(this.userSettings.isOverSeas == 0) this.partyMasterService.customermasterObj.AdditionalInfo.isOverSeasCustomer = 0;
    if(this.userSettings.EnableContractPrice == 0) this.partyMasterService.customermasterObj.AdditionalInfo.enbleContractPrice = 0;
    this.getAreaList();
    this.getDistrictList();
    this.getCategoryList();
    this.getMemberScheme();
    this.getContractPriceList();
    this.getSalesmanList();
  }

    
  ngOnInit(){
    if(this.mode == 'view'){
      this.additionalInfoForm.disable();
    }
  }

  onMembershipCheck(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.partyMasterService.customermasterObj.AdditionalInfo.createMember = 1;
    }else{
      this.partyMasterService.customermasterObj.AdditionalInfo.createMember = 0;
    }
  }

  onIsOverseasCheck(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.checked){
      this.partyMasterService.customermasterObj.AdditionalInfo.isOverSeasCustomer = 1;
    }else{
      this.partyMasterService.customermasterObj.AdditionalInfo.isOverSeasCustomer = 0;
    }
  }

  getAreaList(){
    this.partyMasterService.getArea().subscribe((res:any) => {
      this.areaList = res.result;
    })
  }
  getDistrictList(){
    this.partyMasterService.getDistrict().subscribe((res:any) => {
      this.District = this.FilteredDistrict = res.result;
    })
  }
  getCategoryList(){
    this.partyMasterService.getcategorywiseconfiguration().subscribe((res:any) => {
      this.CategoryList = res.result;
    })
  }
  getMemberScheme(){
    this.partyMasterService.getMemberSchemeList().subscribe((res:any) => {
      if(res.status == "ok"){
        this.MemberSchemeList = res.result;
      }
    })
  }

  getContractPriceList(){
    this.partyMasterService.getContractPriceList().subscribe((res:any) => {
      if(res.status == "ok"){
        this.ContractPriceList = res;
      }
    })
  }
  getSalesmanList(){
    this.partyMasterService.getSalesmanList().subscribe((res:any) => {
      this.SalesmanList = res;
    })
  }

  FilterDistrict(){
    this.FilteredDistrict = this.District.filter(x => x.State == this.partyMasterService.customermasterObj.AdditionalInfo.province);
  }


}
