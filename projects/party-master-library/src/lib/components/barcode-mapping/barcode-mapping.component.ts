import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { Product, TBarcode } from '../../pages/ProductItem';


@Component({
  selector: 'lib-barcode-mapping',
  templateUrl: './barcode-mapping.component.html',
  styleUrls: ['./barcode-mapping.component.css'],
})
export class BarcodeMappingComponent implements OnInit {
  PBarCode: TBarcode = <TBarcode>{};
  @Input() productObj: Product = <Product>{};
  @Input() PBarCodeCollection: TBarcode[] = [];
  constructor() { 
  }

  ngOnInit(): void {
  }

  addBarcode(){
    this.PBarCodeCollection.push(this.PBarCode);          
    this.PBarCode =<TBarcode>{};
  }

  editBarcode(i:number){
    this.PBarCode = this.PBarCodeCollection[i];
    this.removeBarcode(i);
  }

  removeBarcode(i:number){
    this.PBarCodeCollection.splice(i,1);
  }



  ngAfterViewInit() {
  }


}
