import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { MultiStockLevel, Product } from '../../pages/ProductItem';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';
import { ProductMasterService } from '../../pages/Product-master.service';


@Component({
  selector: 'lib-inventory-controls',
  templateUrl: './inventory-controls.component.html',
  styleUrls: ['./inventory-controls.component.css'],
})
export class InventoryControlsComponent implements OnInit {

  @Input() productObj: Product = <Product>{};
  MSLevel: MultiStockLevel = <MultiStockLevel>{};
  isTableVisible = false;
  @ViewChild("genericMultiSelectWarehouse") genericMultiSelectWarehouse!: MultiSelectGenericGridComponent;
  gridPopupSettingsForWarehouse: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  constructor(private productMasterService: ProductMasterService) { 
    this.productObj.MultiStockLevels = [];
  }
  

  ngOnInit(): void {
  }

  addMultiStockLevel(){
    if(this.MSLevel.WAREHOUSE == null || this.MSLevel.WAREHOUSE == undefined || this.MSLevel.WAREHOUSE == ""){
      this.productMasterService.openSuccessDialog("Please select a warehouse first.");
      return;
    }
    this.productObj.MultiStockLevels.push(this.MSLevel);
    this.MSLevel = <MultiStockLevel>{};
  }
  
  removeMultiStockLevel(i:number){
    this.productObj.MultiStockLevels.splice(i,1);
  }

  WarehouseEnterCommand() {
   
    this.gridPopupSettingsForWarehouse = {
      title: "Warehouse",
      userWiseWarehouseOnly:false,
      apiEndpoints: `/getAllWarehousePagedList`,
      defaultFilterIndex: 0,
      columns: [
        {
          key: "NAME",
          title: "NAME",
          hidden: false,
          noSearch: false
        }
      ]
    };
    this.genericMultiSelectWarehouse.show();

  }

  onWarehouseSelected(value:any) {
    if(this.productObj.MultiStockLevels.find(x => x.WAREHOUSE === value.NAME)){
      this.productMasterService.openErrorDialog("Cannot enter same Warehouse !");
      return;
    }else
    {
      this.MSLevel.WAREHOUSE = value.NAME;
    }

  }

  onCheckOption(event: Event, targetObj: any, targetKey: string) {
    const input = event.target as HTMLInputElement;
    if (input) {
      targetObj[targetKey] = input.checked ? 1 : 0;
    } else {
      alert("Invalid input element");
    }
  }



  ngAfterViewInit() {
  }

  preventInput($event:any) {
    $event.preventDefault();
    return false;
  }


}
