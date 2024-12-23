import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ProductMasterService } from '../Product-master.service';
import { Input } from '@angular/core';
import { Product } from '../ProductItem';
import { NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-product-item-group',
  templateUrl: './product-item-group.component.html',
  styleUrls: ['./product-item-group.component.css']
})
export class ProductItemGroupComponent implements OnInit {
  productItemForm : FormGroup
  MCatList: any[] = [];
  MCat1List: any[] = [];
  returnUrl: string | undefined;
  @Input() productObj: Product = <Product>{};
  constructor(
    private fb: FormBuilder,public productMasterService:ProductMasterService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
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
    if (!!this._activatedRoute.snapshot.params['returnUrl']) {
      this.returnUrl = this._activatedRoute.snapshot.params['returnUrl'];
    }
    this.getCategoryList();
  }

  submit(){

  }

  goBack(){
    this.router.navigate([this.returnUrl]);
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
