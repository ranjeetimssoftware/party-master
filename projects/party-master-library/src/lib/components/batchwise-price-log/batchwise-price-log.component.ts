import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { ItemWisePrice, Product } from '../../pages/ProductItem';


@Component({
  selector: 'lib-batchwise-price-log',
  templateUrl: './batchwise-price-log.component.html',
  styleUrls: ['./batchwise-price-log.component.css'],
})
export class BatchwisePriceLogComponent implements OnInit {
  @Input() ItemWisePriceList: ItemWisePrice[] = [];
  ItemWisePrice: ItemWisePrice = <ItemWisePrice>{};
  constructor() { 
  }

  ngOnInit(): void {
  }

  addBatchWisePrice(){
    this.ItemWisePriceList.push(this.ItemWisePrice);
    this.ItemWisePrice = <ItemWisePrice>{};
  }
  removeBatchWisePrice(i:number){
    this.ItemWisePriceList.splice(i,1);
  }



  ngAfterViewInit() {
  }


}
