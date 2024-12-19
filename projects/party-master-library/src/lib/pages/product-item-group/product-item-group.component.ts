import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ProductMasterService } from '../Product-master.service';
import { Input } from '@angular/core';
import { Product } from '../ProductItem';

@Component({
  selector: 'lib-product-item-group',
  templateUrl: './product-item-group.component.html',
  styleUrls: ['./product-item-group.component.css']
})
export class ProductItemGroupComponent implements OnInit {
  productItemForm : FormGroup
  MCatList: any[] = [];
  MCat1List: any[] = [];
  @Input() productObj: Product = <Product>{};
  constructor(
    private fb: FormBuilder,public productMasterService:ProductMasterService
  ) {
    this.productItemForm=this.fb.group({
      GroupName: [],
      IsMainGroup: [],
      GroupCode: [],
      ParentGroup: [],
      RecommendedMargin: [],
      Category: [],
      AnotherCategory: [],
      IsGroupHavingFeaturesItem: [],
    });
   }

  ngOnInit(): void {
    this.getCategoryList();
  }

  submit(){

  }

  goBack(){

  }

  close(){

  }
  getCategoryList(){
    this.productMasterService.getMCatList().subscribe((res) => {
      this.MCatList = res;
      
    });

    this.productMasterService.getMCat1List().subscribe((res) => {
      this.MCat1List = res;
    });
  }
}
