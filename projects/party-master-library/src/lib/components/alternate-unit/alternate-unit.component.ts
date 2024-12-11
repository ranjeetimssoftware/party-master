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
  @Input() productObj: Product = <Product>{};
  public CurAltUnit: AlternateUnit = <AlternateUnit>{};
  @Input() AlternateUnits: AlternateUnit[] = [];
  constructor(public productMasterService:ProductMasterService) { 
    this.userSetting = this.productMasterService.userSetting;
  }

  ngOnInit(): void {

  }

  addAltUnit(){
    this.AlternateUnits.push(this.CurAltUnit);
    this.CurAltUnit = <AlternateUnit>{};
  }

  removeAltUnit(i:number){
    this.AlternateUnits.splice(i,1);
  }



  ngAfterViewInit() {
  }


}
