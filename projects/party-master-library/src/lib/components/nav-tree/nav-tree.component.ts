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
  secondSidebarVisible = false;
  thirdSidebarVisible = false;
  fourthSidebarVisible = false;
  productgrouptree:any =[];
  groupSelectObj: ProductGroup = <ProductGroup>{};
  subGroupAList: any = [];
  prodObj: prodObj = <prodObj>{};
  selectedGroupInfo:prodObj = <prodObj>{};

  selectedMainItem: string | null = null;
  selectedSecondItem: string | null = null;
  selectedThirdItem: string | null = null;
  MainItems:[]= [];
  GroupAItems:[]= [];
  GroupBItems:[] = [];
  GroupCItems = ['A111', 'A112', 'A113', 'A114', 'A115'];
  filteredMainItems: string[] = [];
  filteredGroupAItems = [...this.GroupAItems];
  filteredGroupBItems = [...this.GroupBItems];
  filteredGroupCItems = [...this.GroupCItems];
  searchQuery: string = '';
  searchTermSecond: string = '';
  searchTermThird: string = '';
  searchTermFourth: string = '';
  
  selectedPath: string[] =[];

  constructor(private router:Router, private ProductMasterService: ProductMasterService){}

  ngOnInit(): void {
    
    this.ProductMasterService.getProductGroupTree().subscribe((res)=>{
      this.productgrouptree =res;
      console.log('productGroupTree:', this.productgrouptree[0].children);

      if(this.productgrouptree.length>0 && this.productgrouptree[0].children){
        this.MainItems = this.productgrouptree[0].children.map((item:any)=> item.name);
        this.filteredMainItems =[...this.MainItems];
        console.log('Main Items',this.MainItems);
      }else{
        this.MainItems =[];
        this.filteredMainItems =[];
      }
    });

    this.getAllMajorGroup();
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;

    // Reset active states when the dashboard is closed
    if (!this.isNavbarOpen) {
      this.resetActiveStates();
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

  getSubGroupA(e:Event) {
    const input = e.target as HTMLInputElement;
    let mainGroupID = input.value;
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
        this.groupSelectObj.SUBGROUP_A = "";
        this.groupSelectObj.SUBGROUP_B = "";
        this.groupSelectObj.SUBGROUP_C = "";
  
  
  
      } else {
  
        this.subGroupAList = [];
        
        this.groupSelectObj.SUBGROUP_A = "";
        this.groupSelectObj.SUBGROUP_B = "";
        this.groupSelectObj.SUBGROUP_C = ""
  
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

  toggleSecondSidebar(itemName: string) {
    
    this.thirdSidebarVisible = false;
    this.fourthSidebarVisible = false;

    // Update selected state for the main sidebar
    const selectedItem = this.productgrouptree[0].children.find(
      (item:any) => item.name ===itemName
    );

    if(selectedItem && selectedItem.children && selectedItem.children.length >0 ){
      this.GroupAItems = selectedItem.children.map((item:any)=> item.name);
      this.filteredGroupAItems=[...this.GroupAItems];
      this.secondSidebarVisible = true;
    }else{
      this.secondSidebarVisible = false;
    }
    this.selectedMainItem = selectedItem;
    // Reset lower-level selections
    this.selectedSecondItem = null;
    this.selectedThirdItem = null;
  }

  toggleThirdSidebar(itemName: string) {
    
    this.fourthSidebarVisible = false;

    const selectedItem =this.productgrouptree[0].children.find((item:any)=> item.name ===this.selectedMainItem)?.children.find((item:any)=> item.name ===itemName);
    console.log('hehe', selectedItem);
    if(selectedItem && selectedItem.children && selectedItem.children.length >0){
      this.GroupBItems = selectedItem.children.map((item:any)=> item.name);
      console.log('GroupBITEMS', this.GroupBItems);
      this.filteredGroupBItems = [...this.GroupBItems];
      this.thirdSidebarVisible = true;
    }else{
      this.thirdSidebarVisible = false;
    }
    
    // Update selected state for the second sidebar
   this.selectedSecondItem = selectedItem;

    // Reset lower-level selections
    this.selectedThirdItem = null;
  }

  toggleFourthSidebar(item: string) {
    this.fourthSidebarVisible = true;

    // Update selected state for the third sidebar
    this.selectedThirdItem = item;
    this.selectedPath[2] = item;
  }

  subGroupCitem(item: string){
    this.selectedPath[3] = item;
  }

  // navigateToHeading(){
  //   this.router.navigate(['/navtreeheading'],{
  //     queryParams:{path:JSON.stringify(this.selectedPath)}
  //   });
  // }

  resetActiveStates() {
    
    this.selectedMainItem = null;
    this.selectedSecondItem = null;
    this.selectedThirdItem = null;
    this.secondSidebarVisible = false;
    this.thirdSidebarVisible = false;
    this.fourthSidebarVisible = false;
  }

  filterItems(sidebar: string) {
    if (sidebar === 'main') {
      this.filteredMainItems = this.MainItems.filter((item: string) => item.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else if (sidebar === 'GroupA') {
      this.filteredGroupAItems = this.GroupAItems.filter((item:string) => item.toLowerCase().includes(this.searchTermSecond.toLowerCase()));
    } else if (sidebar === 'GroupB') {
      this.filteredGroupBItems = this.GroupBItems.filter((item:string)=> item.toLowerCase().includes(this.searchTermThird.toLowerCase()));
    } else if (sidebar === 'GroupC') {
      this.filteredGroupCItems = this.GroupCItems.filter(item => item.toLowerCase().includes(this.searchTermFourth.toLowerCase()));
    }
  }
}

