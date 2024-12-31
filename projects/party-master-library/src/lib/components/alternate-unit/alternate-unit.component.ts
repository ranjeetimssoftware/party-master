import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { AlternateUnit, Product } from '../../pages/ProductItem';
import { ProductMasterService } from '../../pages/Product-master.service';


@Component({
  selector: 'lib-alternate-unit',
  templateUrl: './alternate-unit.component.html',
  styleUrls: ['./alternate-unit.component.css'],
})
export class AlternateUnitComponent implements OnInit {
  userSetting:any;
  Units: any[] = [];
  @Input() productObj: Product = <Product>{};
  @Input() CurAltUnit: AlternateUnit = <AlternateUnit>{};
  @Input() AlternateUnits: AlternateUnit[] = [];
  @Input() modee!: string;
  
  constructor(public productMasterService:ProductMasterService) { 
    this.userSetting = this.productMasterService.userSetting;
    this.getAllUnits();
  }

  ngOnInit(): void {
    
  }

  getAllUnits(){
    this.productMasterService.getUnits().subscribe((res) => {
      this.Units = res;
    });
  }

  addAltUnit(){
    if(this.CurAltUnit.ALTUNIT == "" || this.CurAltUnit.ALTUNIT == undefined || this.CurAltUnit.ALTUNIT == null){
      this.productMasterService.openSuccessDialog("Please Select a Unit first.");
      return;
    }
    if(this.CurAltUnit.CONFACTOR == 0 || this.CurAltUnit.CONFACTOR == undefined || this.CurAltUnit.CONFACTOR == null){
      this.productMasterService.openSuccessDialog("Please Enter conversion factor.");
      return;
    }
    this.AlternateUnits.push(this.CurAltUnit);
    this.CurAltUnit = <AlternateUnit>{};
  }

  removeAltUnit(i:number){
    this.AlternateUnits.splice(i,1);
  }

  RecalculateVATAmount() {
    if (this.productObj.VAT == 1) {
      let vatrate = this.userSetting.VatConRate;
      if (this.CurAltUnit.IN_RATE) {
        let RATE = (this.CurAltUnit.IN_RATE / vatrate).toFixed(2)
        this.CurAltUnit.RATE = Number(RATE);

      }else this.CurAltUnit.RATE = 0;
      if (this.CurAltUnit.IN_RATE_B) {
        let RATE_B = (this.CurAltUnit.IN_RATE_B / vatrate).toFixed(2)
        this.CurAltUnit.RATE_B = Number(RATE_B);
      }else this.CurAltUnit.RATE_B = 0;
    }
    else {
      if (this.CurAltUnit.IN_RATE)
        this.CurAltUnit.RATE = this.CurAltUnit.IN_RATE;
      else this.CurAltUnit.RATE = 0;
      if (this.CurAltUnit.IN_RATE_B)
        this.CurAltUnit.RATE_B = this.CurAltUnit.IN_RATE_B;
      else this.CurAltUnit.RATE_B = 0;
    }
  }

  RecalculateNonVATAmount_EX_RATE() {
    if (this.productObj.VAT == 1) {
      if (this.CurAltUnit.RATE) {
        let IN_RATE = (this.CurAltUnit.RATE * 1.13).toFixed(2)
        this.CurAltUnit.IN_RATE = Number(IN_RATE);
      }else this.CurAltUnit.IN_RATE = 0;
    }else {
      if (this.CurAltUnit.RATE) {
        this.CurAltUnit.IN_RATE = this.CurAltUnit.RATE;
      }else this.CurAltUnit.IN_RATE = 0;      
    } 
  }
  RecalculateNonVATAmount_EX_RATE_B() {
    if (this.productObj.VAT == 1) {
      if (this.CurAltUnit.RATE_B) {
        let IN_RATE_B = (this.CurAltUnit.RATE_B * 1.13).toFixed(2)
        this.CurAltUnit.IN_RATE_B = Number(IN_RATE_B);
      } else this.CurAltUnit.IN_RATE_B = 0;
    }else{
      if (this.CurAltUnit.RATE_B) {
        this.CurAltUnit.IN_RATE_B = this.CurAltUnit.RATE_B;
      } else this.CurAltUnit.IN_RATE_B = 0;
    }
  }


  ngAfterViewInit() {
  }


}
