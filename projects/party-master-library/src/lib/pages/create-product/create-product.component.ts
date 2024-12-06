import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericDialogComponent } from '../../shared/components/generic/generic-dialog/generic-dialog.component';
import {
  AdditionalInfo,
  CustomerMasterObj,
  MembershipObj,
  PartyMasterLibraryService,
} from '../../party-master-library.service';
import { ProductMasterService } from '../Product-master.service';
import { Product, ProductType } from '../ProductItem';

@Component({
  selector: 'lib-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  ProductForm: FormGroup;
  mode: string = 'add';
  userSettings: any;
  returnUrl: string | undefined;
  isGroupSelectionVisible:boolean = false;
  GroupTree:any;
  SubGroupTree:any;
  MajorGroup!:string;
  SubGroupA?:string;
  SubGroupB?:string;
  productObj: Product = <Product>{};
  Units: any[] = [];
  PTypeList: ProductType[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    public productMasterService: ProductMasterService
  ) {
    this.userSettings = this.productMasterService.userSetting;
    this.ProductForm = this.fb.group({
      CustomerCode: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
    this.getAllMajorGroup();
    this.getAllUnits();
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

close(){
  this.isGroupSelectionVisible = !this.isGroupSelectionVisible;
}

getAllMajorGroup(){
  this.productMasterService.getProductGroupTree().subscribe((res:any) => {
    this.GroupTree = res;
  })
}

filterSubGroup(){
  this.SubGroupTree = this.GroupTree.find((x:any) => x.menucode == this.MajorGroup)?.children;
  // this.SubGroupTree = this.setChildren(this.GroupTree,this.MajorGroup);
}

setChildren(data:any,parentId:string){
  let subGroupArray = data.children.filter((x:any) => x.parentId == parentId);
  return subGroupArray;
}

getAllUnits(){
  this.productMasterService.getUnits().subscribe((res) => {
    this.Units = res;
    this.productMasterService.getPTypeList().subscribe(
      (res: any) => {
        if (res) {
          this.PTypeList = res;
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


}
