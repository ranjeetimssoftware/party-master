import { Component, Input, ViewChild } from "@angular/core";
import { MultiCurrencyPrice, Product } from "../../pages/ProductItem";
import { ProductMasterService } from "../../pages/Product-master.service";


@Component({
  selector: "multi-currency-price",
  templateUrl: "./multiCurrencyPrice.component.html",
})
export class MulltiCurrencyPriceComponent {
  @Input() productObj: Product = <Product>{};
  multipleCurrencyObj: MultiCurrencyPrice = <MultiCurrencyPrice>{};

  constructor(
     private productService: ProductMasterService,
      ) {
    
  }

  ngOnInit() {
    this.productService.getCurrencyMaster().subscribe((res:any)=>{
      if(res.status == 'ok'){
          this.productObj.multiCurrencyList = res.result;



      }
  });

  }
  



  recalculateVATAmount(curr:number,i:number){
    this.productObj.multiCurrencyList[i].CurrencyRATE_B = Number((curr * (this.productService.userSetting.VatConRate)).toFixed(2));
  }

  recalculateNonVATAmount(curr:number,i:number){
    this.productObj.multiCurrencyList[i].CurrencyRATE_A = Number((curr/this.productService.userSetting.VatConRate).toFixed(2));
  }
  


}
