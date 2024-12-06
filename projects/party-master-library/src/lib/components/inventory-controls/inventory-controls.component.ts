import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { MultiStockLevel, Product } from '../../pages/ProductItem';


@Component({
  selector: 'lib-inventory-controls',
  templateUrl: './inventory-controls.component.html',
  styleUrls: ['./inventory-controls.component.css'],
})
export class InventoryControlsComponent implements OnInit {

  @Input() productObj: Product = <Product>{};
  MSLevel: MultiStockLevel = <MultiStockLevel>{};
  isTableVisible = false;
  constructor(private partyMasterService:PartyMasterLibraryService) { 
    this.productObj.MultiStockLevels = [];
  }
  

  ngOnInit(): void {
  }

  addMultiStockLevel(){
    this.productObj.MultiStockLevels.push(this.MSLevel);
    this.MSLevel = <MultiStockLevel>{};
  }
  
  removeMultiStockLevel(i:number){
    this.productObj.MultiStockLevels.splice(i,1);
  }



  ngAfterViewInit() {
  }


}
