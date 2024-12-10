import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { Product, TBarcode } from '../../pages/ProductItem';
import { ProductMasterService } from '../../pages/Product-master.service';


@Component({
  selector: 'lib-barcode-mapping',
  templateUrl: './barcode-mapping.component.html',
  styleUrls: ['./barcode-mapping.component.css'],
})
export class BarcodeMappingComponent implements OnInit {
  PBarCode: TBarcode = <TBarcode>{};
  @Input() productObj: Product = <Product>{};
  @Input() PBarCodeCollection: TBarcode[] = [];
  constructor(private productMasterService:ProductMasterService) { 
  }

  ngOnInit(): void {

    try {
      setTimeout(() => {
        this.PBarCode.UNIT = this.productObj.BASEUNIT;
      }, 3000);
      this.PBarCode.ISOLD = 0;

    } catch (ex) {

      alert(ex);
    }
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

  discontinueBC(event:Event,i:number) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.PBarCodeCollection[i].ISOLD = 1;
      this.PBarCodeCollection[i].DISCONTINUE = 1;
    } else {
      this.PBarCodeCollection[i].ISOLD = 0;
      this.PBarCodeCollection[i].DISCONTINUE = 0;
    }
  }



  ngAfterViewInit() {
  }


}
