import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDialogComponent } from '../../shared/components/generic/generic-dialog/generic-dialog.component';
import { ProductMasterService } from '../Product-master.service';
import { prodObj, Product, ProductGroup, ProductType, RateDiscount, TBarcode } from '../ProductItem';
import * as uuid from 'uuid'
import { DetailInfoComponent } from '../../components/detail-info/detail-info.component';

@Component({
  selector: 'lib-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  ProductForm: FormGroup;
  mode: string = 'add';
  userSetting: any;
  returnUrl: string | undefined;
  isGroupSelectionVisible:boolean = false;
  disabledSubgroupA: boolean = true;
  disabledSubgroupB: boolean = true;
  disabledSubgroupC: boolean = true;
  tempMCODE!: string;
  tempPARENT!: string;
  tempChild!: number;
  tempMGROUP!: string;
  tempMENUCODE!: string;
  GroupTree:any;
  SubGroupTree:any;
  MajorGroup!:string;
  SubGroupA?:string;
  SubGroupB?:string;
  productObj: Product = <Product>{};
  groupSelectObj: ProductGroup = <ProductGroup>{};
  prodObj: prodObj = <prodObj>{};
  selectedGroupInfo:prodObj = <prodObj>{};
  mainGroupList: any = [];
  subGroupAList: any = [];
  subGroupBList: any = [];
  subGroupCList: any = [];
  Units: any[] = [];
  PTypeList: ProductType[] = [];
  PBarCode: TBarcode = <TBarcode>{};
  PBarCodeCollection: TBarcode[] = [];
  @ViewChild(DetailInfoComponent) child!: DetailInfoComponent;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    public productMasterService: ProductMasterService
  ) {
    this.userSetting = this.productMasterService.userSetting;
    this.ProductForm = this.fb.group({
      CustomerCode: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
    if(this.mode == 'add'){
      this.productObj.guid = uuid.v4();
      this.productObj.Weighable = 'kg';
      this.productObj.COLOR = '';
      this.productObj.VOLUME = '';
      this.productObj.SETTING = 'no';
      this.productObj.STATUS = 1;
      this.productObj.VAT = this.productMasterService.userSetting.EnablePanBill == 0? 1 : 0;
      let self = this;
      this.productObj.ItemRateDiscount = <RateDiscount>{};
      this.productObj.MultiStockLevels = [];
    }
    this.getAllMajorGroup();
    this.getAllUnits();
  }

  OnGroupChanges(){
    if(this.selectedGroupInfo != undefined){
    if(this.mode == 'add'){
    this.productObj.MgroupName = this.selectedGroupInfo.DESCA;
    this.productObj.MCAT = this.selectedGroupInfo.MCAT;
    this.productObj.ItemCostCenter = this.selectedGroupInfo.ItemCostCenter;
    this.productObj.MARGIN = this.selectedGroupInfo.MARGIN;
    this.productObj.MGROUP = this.selectedGroupInfo.MGROUP;
    this.productObj.PARENT = this.selectedGroupInfo.MCODE;
    this.productObj.MENUCODE = this.selectedGroupInfo?.MENUCODE;
      if((this.userSetting.ITEMGROUPCODELEVEL>(this.selectedGroupInfo.LEVEL))){
        this.productObj.MENUCODE = "";
        this.productObj.DESCA = "";
        return;
      }else{
        if(this.userSetting.AUTOCODEMODE == 0){
          this.generateUniqueKey(this.selectedGroupInfo.MGROUP,this.selectedGroupInfo.MCODE,this.selectedGroupInfo.MCAT);
        }
      }
     
      // }
    }else if(this.mode=="edit"){
      if((this.userSetting.ITEMGROUPCODELEVEL > (this.selectedGroupInfo.LEVEL))){
        this.productObj.MENUCODE = "";
        this.productObj.BASEUNIT = "";
        this.productObj.MCAT = "";
        return;
      }else{


        if(this.selectedGroupInfo.PARENT == "PRG99999999"){
          if(this.selectedGroupInfo.MGROUP == this.tempMGROUP){
            this.productObj.MENUCODE = this.tempMENUCODE;
          }else{
            if(this.userSetting.EnableMenucodeGenerationInEdit == 1){

              this.generateUniqueKey(this.selectedGroupInfo.MGROUP,this.selectedGroupInfo.MCODE,this.selectedGroupInfo.MCAT);

            }

          }
        }else{
          if(this.userSetting.ITEMGROUPCODELEVEL > 1){ //added by anubhav
            if(this.selectedGroupInfo.MCODE == this.tempPARENT){
              this.productObj.MENUCODE = this.tempMENUCODE;
            }else{
              if(this.userSetting.EnableMenucodeGenerationInEdit == 1){
              this.generateUniqueKey(this.selectedGroupInfo.MGROUP,this.selectedGroupInfo.MCODE,this.selectedGroupInfo.MCAT);
              }
            }

          }

        }
        this.productObj.MARGIN = this.selectedGroupInfo.MARGIN;
        this.productObj.MGROUP = this.selectedGroupInfo.MGROUP;
        this.productObj.PARENT = this.selectedGroupInfo.MCODE;
        this.productObj.MCAT = this.selectedGroupInfo.MCAT;
        this.productObj.ItemCostCenter = this.selectedGroupInfo.ItemCostCenter;

      }
    }

    }else{
    }
  }

  generateUniqueKey(groupID:string,PARENT:string,MCAT:string){
    if(this.userSetting.AUTOCODEMODE == 1){
      this.productMasterService.getAutoGenerateMenuCode(groupID,PARENT,MCAT).subscribe(
        (res:any)=>{
          if(res.status == 'ok'){
            this.productObj.MENUCODE = res.result;
            this.selectedGroupInfo.MENUCODE = res.result;
          }
        }
      )
    }else{
      this.productMasterService.getAutoGenerateMenuCode(groupID,PARENT).subscribe(
        (res:any)=>{
          if(res.status == 'ok'){
            this.productObj.MENUCODE = res.result;
          }
        }
      )
    }
  // }
}

  selectedTab: number = 0;

  // Method to handle tab change
  onTabChange(index: number) {
    this.selectedTab = index;
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

close(status:string){
  if(status == "ok"){
    this.OnGroupChanges();
  }
  this.isGroupSelectionVisible = !this.isGroupSelectionVisible;
}

getAllMajorGroup(){
  this.productMasterService.getMainGroupList().subscribe((response) => {
    if (response.length > 0) {
      this.mainGroupList = response;
    } else {
      this.mainGroupList = [];
    }
  });
}

getSubGroupA(e:Event) {
  const input = e.target as HTMLInputElement;
  let mainGroupID = input.value;
  if(this.userSetting.AUTOCODEMODE == 1){
    this.productMasterService.getAutoGenerateMenuCode(mainGroupID,mainGroupID).subscribe(
      res=>{
        if(res.status == 'ok'){
          this.prodObj.MENUCODE = res.result;
          this.selectedGroupInfo = this.prodObj;
        }
      }
    )
  }else{
    this.uniqueKey(mainGroupID);
  }

  this.productMasterService.getSubGroupList(mainGroupID).subscribe((res) => {
    if (res.length > 0) {
      this.subGroupAList = res;
      this.subGroupAList = res;
      this.disabledSubgroupA = false;
      this.disabledSubgroupB = true;
      this.disabledSubgroupC = true;
      this.groupSelectObj.SUBGROUP_A = "";
      this.groupSelectObj.SUBGROUP_B = "";
      this.groupSelectObj.SUBGROUP_C = "";



    } else {

      this.subGroupAList = [];
      this.subGroupAList = [];
      this.groupSelectObj.SUBGROUP_A = "";
      this.groupSelectObj.SUBGROUP_B = "";
      this.groupSelectObj.SUBGROUP_C = "";
      this.disabledSubgroupA = true;
      this.disabledSubgroupB = true;
      this.disabledSubgroupC = true;


    }
  })

  // this.PComponent.changeTree()
}
getSubGroupB(e:Event) {
  const input = e.target as HTMLInputElement;
  let subGroupAID = input.value;
  // this.PARENT = e.target.value;
  if(this.userSetting.AUTOCODEMODE == 1){
    this.productMasterService.getAutoGenerateMenuCode(subGroupAID,subGroupAID).subscribe(
      res=>{
        if(res.status == 'ok'){
          this.prodObj.MENUCODE = res.result;
          this.selectedGroupInfo = this.prodObj;
        }
      }
    )
  }else{
  this.uniqueKey(subGroupAID);
  }

  this.productMasterService.getSubGroupList(subGroupAID).subscribe((res) => {
    if (res.length > 0) {
      this.subGroupBList = res;
      this.subGroupBList = res;
      this.disabledSubgroupB = false;
      this.disabledSubgroupC = true;


    } else {
      this.subGroupBList = [];
      this.groupSelectObj.SUBGROUP_B = "";
      this.disabledSubgroupB = true;
      this.disabledSubgroupC = true;


    }
  })
}

getSubGroupC(e:Event) {
  const input = e.target as HTMLInputElement;
  let subGroupBID = input.value;
  // this.PARENT = e.target.value;
  if(this.userSetting.AUTOCODEMODE == 1){
    this.productMasterService.getAutoGenerateMenuCode(subGroupBID,subGroupBID).subscribe(
      res=>{
        if(res.status == 'ok'){
          this.prodObj.MENUCODE = res.result;
          this.selectedGroupInfo = this.prodObj;
        }
      }
    )
  }else{
  this.uniqueKey(subGroupBID);
  }

  this.productMasterService.getSubGroupList(subGroupBID).subscribe((res) => {

    if (res.length > 0) {
      this.subGroupCList = res;
      this.subGroupCList = res;
      this.disabledSubgroupC = false;

    } else {
      if(this.userSetting.AUTOCODEMODE != 1){
      this.uniqueKey(subGroupBID);
      }

      this.subGroupCList = [];
      this.subGroupCList = [];
      this.groupSelectObj.SUBGROUP_C = "";
      this.disabledSubgroupC = true;

    }
  })
}

selectedSubGroupC(e:Event){
  const input = e.target as HTMLInputElement;
  this.uniqueKey(input.value);

}

getAllUnits(){
  this.productMasterService.getUnits().subscribe((res) => {
    this.Units = res;
    this.productMasterService.getPTypeList().subscribe(
      (res: any) => {
        if (res) {
          this.PTypeList = res;
          if (this.mode != 'edit') {
            this.productObj.PTYPE = this.PTypeList[0].PTYPEID;
            this.productObj.NATURETYPE = this.PTypeList[0].NATURETYPE;
          }
        } else {
          this.PTypeList = [];
        }
      },
      (error) => {
        this.PTypeList = [];
      }
    );
  });
}

uniqueKey(groupID:string) {

  this.productMasterService.getProductInfo(groupID).subscribe(
    res => {
      if(res.status == "ok"){
        if(this.userSetting.AUTOCODEMODE == 1){
          res.result[0].MCAT = '';
          res.result[0].MENUCODE = '';
        }
        let prodObj: prodObj = res.result[0];
      prodObj.LEVEL = res.result2[0].ITEM_LEVEL;
      this.selectedGroupInfo = prodObj;
      }
    });

}

AddBCode() {
  try {

    this.PBarCodeCollection.forEach(x=>{
      x.MRP = this.productObj.IN_RATE_A
      x.MRP_WO_VAT = this.productObj.RATE_A;
      x.SRATE = this.productObj.RATE_A;
    });

    
    if(this.productObj.BARCODE == null || this.productObj.BARCODE === '0' || this.productObj.BARCODE === undefined){
      this.PBarCode.BCODE = this.productObj.MENUCODE;
    }
    else{
      this.PBarCode.BCODE = this.productObj.BARCODE;
    }
    this.PBarCode.MCODE= this.productObj.MCODE;
    this.PBarCode.UNIT = this.productObj.BASEUNIT;
    this.PBarCode.MRP = this.productObj.IN_RATE_A;
    this.PBarCode.MRP_WO_VAT= this.productObj.RATE_A;
    this.PBarCode.SRATE = this.productObj.RATE_A;
    this.PBarCode.DISCONTINUE = 0;
    this.PBarCode.ISDEFAULT = 1;

    let duplicateBC = this.PBarCodeCollection.filter(x=> x.BCODE == this.productObj.MENUCODE);
    
    if(duplicateBC.length == 0 ){
      this.PBarCodeCollection.push(this.PBarCode);
    }
          
  } catch (ex) {
    console.log(ex);
    alert(ex);
  }
}

onCheckVATOption(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input) {
    this.productObj.VAT = input.checked ? 1 : 0;
    this.child.RecalculateVATAmount();
  } else {
    alert("Invalid input element");
  }
}


onSubmit(){

  if(this.productObj.DESCA == '' || this.productObj.DESCA == null || this.productObj.DESCA == undefined){
    this.productMasterService.openSuccessDialog("Please Enter Item Name.");
    return;
  }
  if(this.userSetting.MANUALCODE == 1){
    if(this.productObj.MENUCODE == "" || this.productObj.MENUCODE == null || this.productObj.MENUCODE == undefined){
      this.productMasterService.openSuccessDialog("Please Enter Item Code.");
      return;
    }
  }
  if(this.userSetting.CompulsoryHSCodeInput == 1){
    if(this.productObj.HSNCode == '' || this.productObj.HSNCode == null || this.productObj.HSNCode == undefined){
      this.productMasterService.openSuccessDialog("Please Enter HS Code.");
      return;
    }    
  }
  if(this.productObj.MGROUP == "" || this.productObj.MGROUP == null || this.productObj.MGROUP == undefined){  
    this.productMasterService.openSuccessDialog("Please Select Item Group.");
    return;
  }
  if(this.productObj.BASEUNIT == "" || this.productObj.BASEUNIT == null || this.productObj.BASEUNIT == undefined){  
    this.productMasterService.openSuccessDialog("Please Select Stock Unit.");
    return;
  }
  if(this.userSetting.EnableProductWiseAccMapping == 1){
    if(this.productObj.SAC_ACNAME == "" || this.productObj.SAC_ACNAME == null || this.productObj.SAC_ACNAME == undefined){  
      this.productMasterService.openSuccessDialog("Please Select Sales Account.");
      return;
    }
    if(this.productObj.SRAC_ACNAME == "" || this.productObj.SRAC_ACNAME == null || this.productObj.SRAC_ACNAME == undefined){  
      this.productMasterService.openSuccessDialog("Please Select Sales Return Account.");
      return;
    } 
    if(this.productObj.PAC_ACNAME == "" || this.productObj.PAC_ACNAME == null || this.productObj.PAC_ACNAME == undefined){  
      this.productMasterService.openSuccessDialog("Please Select Purchase Account.");
      return;
    }
    if(this.productObj.PRAC_ACNAME == "" || this.productObj.PRAC_ACNAME == null || this.productObj.PRAC_ACNAME == undefined){  
      this.productMasterService.openSuccessDialog("Please Select Purchase Return Account.");
      return;
    }     
  }
  this.productObj.PCL = 'pc002';
  this.productObj.TYPE = 'A';
  this.productObj.LEVELS = 0;
  this.productObj.Location = this.productObj.Location.toString();
  if(this.mode != 'edit'){
    this.productMasterService.userSetting.MANUALCODE == 1 ? this.productObj.FCODE = 0 : this.productObj.FCODE = Number(this.productObj.MENUCODE);
  }
  if(this.mode === 'add'){
    this.AddBCode();
   }
  console.log("Product Object", this.productObj);
  this.productMasterService.saveProduct(this.mode, this.productObj,[],[],this.PBarCodeCollection,[],[],[]).subscribe((res:any) => {
    console.log("res",res);
  })
}

preventInput($event:any) {
  $event.preventDefault();
  return false;
}


}
