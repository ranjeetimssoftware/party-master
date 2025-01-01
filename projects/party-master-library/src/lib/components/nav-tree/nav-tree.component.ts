import { Component, OnInit } from '@angular/core';
import { ProductMasterService } from '../../pages/Product-master.service';
import { Router } from '@angular/router';
import { pathToFileURL } from 'url';
import { prodObj, ProductGroup } from '../../pages/ProductItem';

@Component({
  selector: 'lib-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css']
})
export class NavTreeComponent implements OnInit{
  mainGroupList: any =[];
  isNavbarOpen = false;
  productgrouptree:any =[];
  groupSelectObj: ProductGroup = <ProductGroup>{};
  subGroupAList: any = [];
  prodObj: prodObj = <prodObj>{};
  selectedGroupInfo:prodObj = <prodObj>{};

  selectedMainItem: string | null = null;
  selectedSecondItem: string | null = null;
  selectedThirdItem: string | null = null;
  
  searchQuery: string = '';
  searchTermSecond: string = '';
  searchTermThird: string = '';
  searchTermFourth: string = '';
  
  selectedPath: string[] =[];
  showSubgroupA: boolean = false;
  showSubgroupB: boolean = false;
  showSubgroupC: boolean = false;
  subGroupBList: any=[];
  subGroupCList: any;

  constructor(private router:Router, private ProductMasterService: ProductMasterService){}

  ngOnInit(): void {
    this.getAllMajorGroup();
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    if (!this.isNavbarOpen) {
      this.showSubgroupA= false;
      this.showSubgroupB= false;
      this.showSubgroupC= false;
    }
  }

  getAllMajorGroup(){
    this.ProductMasterService.getMainGroupList().subscribe((response) => {
      if (response.length > 0) {
        this.mainGroupList = response;
      } else {
        this.mainGroupList = [];
      }
    });
  }

  getSubGroupA(e:any) {
    
    let mainGroupID = e;
    if(this.ProductMasterService.userSetting.AUTOCODEMODE == 1){
      this.ProductMasterService.getAutoGenerateMenuCode(mainGroupID,mainGroupID).subscribe(
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
  
    this.ProductMasterService.getSubGroupList(mainGroupID).subscribe((res) => {
      if (res.length > 0) {
        this.subGroupAList = res;
        this.subGroupAList = res;
        console.log('subGroupAList', this.subGroupAList);
        this.showSubgroupA = true;
        this.showSubgroupB = false;
        this.showSubgroupC = false;
        this.groupSelectObj.SUBGROUP_A = "";
        this.groupSelectObj.SUBGROUP_B = "";
        this.groupSelectObj.SUBGROUP_C = "";
  
  
  
      } else {
  
        this.subGroupAList = [];
        this.subGroupAList = [];
        this.groupSelectObj.SUBGROUP_A = "";
        this.groupSelectObj.SUBGROUP_B = "";
        this.groupSelectObj.SUBGROUP_C = "";
        this.showSubgroupA = false;
        this.showSubgroupB = false;
        this.showSubgroupC = false;
  
  
      }
    })
  
    // this.PComponent.changeTree()
  }

  uniqueKey(groupID:string) {

    this.ProductMasterService.getProductInfo(groupID).subscribe(
      res => {
        if(res.status == "ok"){
          if(this.ProductMasterService.userSetting.AUTOCODEMODE == 1){
            res.result[0].MCAT = '';
            res.result[0].MENUCODE = '';
          }
          let prodObj: prodObj = res.result[0];
        prodObj.LEVEL = res.result2[0].ITEM_LEVEL;
        this.selectedGroupInfo = prodObj;
        }
      });
  
  }

  getSubGroupB(e:any) {
   
    let subGroupAID = e;
   
    if(this.ProductMasterService.userSetting.AUTOCODEMODE == 1){
      this.ProductMasterService.getAutoGenerateMenuCode(subGroupAID,subGroupAID).subscribe(
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
  
    this.ProductMasterService.getSubGroupList(subGroupAID).subscribe((res) => {
      if (res.length > 0) {
        this.subGroupBList = res;
        this.subGroupBList = res;
        this.showSubgroupB = true;
        this.showSubgroupC = false;
  
  
      } else {
        this.subGroupBList = [];
        this.groupSelectObj.SUBGROUP_B = "";
        this.showSubgroupB = false;
        this.showSubgroupC = false;
  
  
      }
    })
  }

  getSubGroupC(e:any) {
    
    let subGroupBID = e;
    // this.PARENT = e.target.value;
    if(this.ProductMasterService.userSetting.AUTOCODEMODE == 1){
      this.ProductMasterService.getAutoGenerateMenuCode(subGroupBID,subGroupBID).subscribe(
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
  
    this.ProductMasterService.getSubGroupList(subGroupBID).subscribe((res) => {
  
      if (res.length > 0) {
        this.subGroupCList = res;
        this.subGroupCList = res;
        this.showSubgroupC = true;
  
      } else {
        if(this.ProductMasterService.userSetting.AUTOCODEMODE != 1){
        this.uniqueKey(subGroupBID);
        }
  
        this.subGroupCList = [];
        this.subGroupCList = [];
        this.groupSelectObj.SUBGROUP_C = "";
        this.showSubgroupC = false;
  
      }
    })
  }

  filterItems(sidebar: string) {
    if (sidebar === 'main') {
      this.mainGroupList = this.mainGroupList.filter((item: string) => item.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else if (sidebar === 'GroupA') {
      this.subGroupAList = this.subGroupAList.filter((item:string) => item.toLowerCase().includes(this.searchTermSecond.toLowerCase()));
    } else if (sidebar === 'GroupB') {
      this.subGroupBList = this.subGroupBList.filter((item:string)=> item.toLowerCase().includes(this.searchTermThird.toLowerCase()));
    } else if (sidebar === 'GroupC') {
      this.subGroupCList = this.subGroupCList.filter((item:string) => item.toLowerCase().includes(this.searchTermFourth.toLowerCase()));
    }
  }
}

