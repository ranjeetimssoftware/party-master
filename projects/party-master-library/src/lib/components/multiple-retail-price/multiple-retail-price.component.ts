import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { MultipleRetailPrice, Product } from '../../pages/ProductItem';
import { ProductMasterService } from '../../pages/Product-master.service';
import { GenericDivisionMappingComponent } from '../../shared/components/generic/generic-division-mapping/generic-division-mapping.component';


@Component({
  selector: 'lib-multiple-retail-price',
  templateUrl: './multiple-retail-price.component.html',
  styleUrls: ['./multiple-retail-price.component.css'],
})
export class MultipleRetailPriceComponent implements OnInit {
  @Input() PMultipleRetailPrice: MultipleRetailPrice[] = [];
  @Input() modee!:string;
  MultipeRetailObj: MultipleRetailPrice = <MultipleRetailPrice>{};
  DivisionList:any[]=[];
  userSetting:any; 
  @ViewChild("divisionMapping") divisionMapping!: GenericDivisionMappingComponent;

  constructor(private productMasterService:ProductMasterService, public partyMasterService:PartyMasterLibraryService) { 
    this.userSetting = this.productMasterService.userSetting;
  }

  ngOnInit(): void {
    if(this.userSetting.EnableDivisionWiseMulitpleSPrice == 0) this.getDivisionList();
  }

  addMRP(){

    if(this.MultipeRetailObj.RATE == 0 || this.MultipeRetailObj.RATE == null){
      this.productMasterService.openSuccessDialog("Rate cannot be empty");
        return;
    }

    if(!this.MultipeRetailObj.EXPDATE){
      this.productMasterService.openSuccessDialog("Expiry Date cannot be empty");
        return;
    }

    this.MultipeRetailObj.ISACTIVE = 1;
    // this.MultipeRetailObj.INRATE = this.MultipeRetailObj.RATE * this.userSetting.VatConRate;
    this.PMultipleRetailPrice.push(this.MultipeRetailObj);
    this.MultipeRetailObj = <MultipleRetailPrice>{};

}
removeMSLevel(i:number){
  this.PMultipleRetailPrice.splice(i,1);
  
}

onChangeINculsiveRate(){
  this.MultipeRetailObj.INRATE = Number( (this.MultipeRetailObj.RATE * this.userSetting.VatConRate).toFixed(2));
}

onChangeExculsiveRate(){
  this.MultipeRetailObj.RATE = Number(( this.MultipeRetailObj.INRATE / this.userSetting.VatConRate).toFixed(2));
}

getDivisionList(){
  this.partyMasterService.getDivisionList().subscribe((res:any) =>  {
    this.DivisionList = res?res:res.result;
  })
}

onSelectDivisionList(){
  let dialogData= {
    Title: "Select Division",
    dataArray:this.DivisionList
  }
  this.divisionMapping.openDialog(dialogData);
}

onCloseDivision(event:any){
  console.log("res",event);
  let divisions = event.map((x:any) => x.NAME).join(',');
  this.MultipeRetailObj.DIVISION = divisions;

}
  ngAfterViewInit() {
  }


}
