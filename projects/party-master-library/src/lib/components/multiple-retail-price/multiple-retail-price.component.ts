import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { MultipleRetailPrice, Product } from '../../pages/ProductItem';


@Component({
  selector: 'lib-multiple-retail-price',
  templateUrl: './multiple-retail-price.component.html',
  styleUrls: ['./multiple-retail-price.component.css'],
})
export class MultipleRetailPriceComponent implements OnInit {
  @Input() PMultipleRetailPrice: MultipleRetailPrice[] = [];
  MultipeRetailObj: MultipleRetailPrice = <MultipleRetailPrice>{}
 

  constructor(private partyMasterService:PartyMasterLibraryService) { 
  }

  ngOnInit(): void {
  }

  addMRP(){

    if(this.MultipeRetailObj.RATE == 0 || this.MultipeRetailObj.RATE == null){
        alert("Rate cannot be empty");
        return;
    }

    if(!this.MultipeRetailObj.EXPDATE){
        alert("Expiry Date cannot be empty");
        return;
    }

    this.MultipeRetailObj.ISACTIVE = 1;
    this.PMultipleRetailPrice.push(this.MultipeRetailObj);


    this.MultipeRetailObj = <MultipleRetailPrice>{};

}
removeMSLevel(i:number){
  this.PMultipleRetailPrice.splice(i,1);
  
}

  



  ngAfterViewInit() {
  }


}
