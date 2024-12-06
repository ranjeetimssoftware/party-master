import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { AlternateItem, Product, TBarcode } from '../../pages/ProductItem';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';


@Component({
  selector: 'lib-alternate-item',
  templateUrl: './alternate-item.component.html',
  styleUrls: ['./alternate-item.component.css'],
})
export class AlternateItemComponent implements OnInit {
  alternateItem: AlternateItem = <AlternateItem>{};
  @Input() AlternateItemList: AlternateItem[] = [];
  @ViewChild("genericMultiSelectItem") genericMultiSelectItem!: MultiSelectGenericGridComponent;
  gridPopupSettingsForItem: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  constructor() { 
  }

  ngOnInit(): void {
  }

  addAlternateItem(){
    this.AlternateItemList.push(this.alternateItem);          
    this.alternateItem =<AlternateItem>{};
  }


  removeAlternateItem(i:number){
    this.AlternateItemList.splice(i,1);
  }

  onEnterMainLedgerList(){
    this.gridPopupSettingsForItem = {
      title: "Product List",
      apiEndpoints: `/getMenuitemWithStockPagedList/0/A/all/PI/w`,
      defaultFilterIndex: 0,
      showIsDefaultSelection: true,
      columns: [
        {
          key: "DESCA",
          title: "NAME",
          hidden: false,
          noSearch: false
        },
        {
          key: "MENUCODE",
          title: "PRODUCT CODE",
          hidden: false,
          noSearch: false
        },
        {
          key: "BASEUNIT",
          title: "UNIT",
          hidden: false,
          noSearch: false
        },
      ]
    }
    this.genericMultiSelectItem.show();
  }
  onSelectItem(event:any){
    this.alternateItem.DESCA = event.DESCA;
    this.alternateItem.MENUCODE = event.MENUCODE;
    this.alternateItem.UNIT = event.BASEUNIT;
    this.addAlternateItem();    
  }



  ngAfterViewInit() {
  }


}
