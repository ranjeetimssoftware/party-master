import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PartyMasterLibraryService } from '../../party-master-library.service';
import { Product } from '../../pages/ProductItem';
import { ProductMasterService } from '../../pages/Product-master.service';
import { MultiSelectGenericGridComponent, MultiSelectGenericPopUpSettings } from '../../shared/components/generic/multiselect-generic-grid/multiselect-generic-grid.component';


@Component({
  selector: 'lib-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css'],
})
export class DetailInfoComponent implements OnInit {
  isDiscounted:number=0;

  @ViewChild('DiscontinuedItem') DiscontinuedItem!: ElementRef;
  @Input() productObj: Product = <Product>{};

  @ViewChild("genericGridSupplierPopup") genericGridSupplierPopup!: MultiSelectGenericGridComponent;
  gridPopupSettingsForSupplier: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  @ViewChild("genericGridAccountLedger_Sales") genericGridAccountLedger_Sales!: MultiSelectGenericGridComponent;
  gridPopupSettingsForAccountLedgerList_Sales: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  @ViewChild("genericGridAccountLedger_SalesReturn") genericGridAccountLedger_SalesReturn!: MultiSelectGenericGridComponent;
  gridPopupSettingsForAccountLedgerList_SalesReturn: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  @ViewChild("genericGridAccountLedger_Purchase") genericGridAccountLedger_Purchase!: MultiSelectGenericGridComponent;
  gridPopupSettingsForAccountLedgerList_Purchase: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  @ViewChild("genericGridSupplierPopup") genericGridAccountLedger_PurchaseReturn!: MultiSelectGenericGridComponent;
  gridPopupSettingsForAccountLedgerList_PurchaseReturn: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  @ViewChild("genericMultiSelectItem") genericMultiSelectItem!: MultiSelectGenericGridComponent;
  gridPopupSettingsForItem: MultiSelectGenericPopUpSettings = new MultiSelectGenericPopUpSettings();
  MCatList: any[] = [];
  LocationList: any[] = [];
  MCat1List: any[] = [];
  KOTcatList: any[] = [];
  colorGroupList: any[] = [];


  constructor(private cdr: ChangeDetectorRef, private productMasterService:ProductMasterService) { 
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getSalesDetail();
    this.getKOTCategoryList();
    this.getColorGroupList();
    this.getLocationList();
  }

  onCheckOption(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cdr.detectChanges();
  }

  getCategoryList(){
    this.productMasterService.getMCatList().subscribe((res) => {
      this.MCatList = res;
      this.productObj.MCAT = this.MCatList[0].MENUCAT;
    });

    this.productMasterService.getMCat1List().subscribe((res) => {
      this.MCat1List = res;
    });
  }

  getLocationList(){
    this.productMasterService.getLocationList().subscribe((res: any) => {
      this.LocationList = res;
    });

  }

  getKOTCategoryList(){
    this.productMasterService.getKOTCategory().subscribe((res: any) => {
      if (res.status == 'ok') {
        this.KOTcatList = res.result;
      }
    });
  }

  getColorGroupList(){
    this.productMasterService.getColorGroup().subscribe(
      (response: any) => {
        const res = response;
        if (res && res['status'] === 'ok' && res.result !== null) {
          this.colorGroupList = res && res.result ? res.result : [];
        } else {
          this.colorGroupList = [];
        }
      },
      (err) => {
        this.colorGroupList = [];
      }
    );
  }

  onEnterSupplierCommand() {
    this.getCustomersList();
    this.genericGridSupplierPopup.show();
  }

  getCustomersList() {
    this.gridPopupSettingsForSupplier = {
      title: 'Supplier',
      apiEndpoints: `/getAccountPagedListByPType/PA/V/0`,
      defaultFilterIndex: 0,
      columns: [
        {
          key: 'ACNAME',
          title: 'NAME',
          hidden: false,
          noSearch: false,
        },
        {
          key: 'VATNO',
          title: 'PAN NO.',
          hidden: false,
          noSearch: false,
        },
        {
          key: 'ADDRESS',
          title: 'ADDRESS',
          hidden: false,
          noSearch: false,
        },
      ],
    };
  }

  dblClickPopupParty(customer:any) {
    this.productObj.SUPCODE = customer.ACID;
    this.productObj.supplierName = customer.ACNAME;
  }

  getSalesDetail(){
    this.productMasterService.getSalesInfo().subscribe((data) => {
    const arrayData = Object.values(data);
    
    let salesAc = arrayData.filter(x => x.ACID == this.productMasterService.userSetting.SalesAc);
    this.productObj.SAC_ACNAME = salesAc[0].ACNAME;

    let salesReturnAc = arrayData.filter(x => x.ACID == this.productMasterService.userSetting.SalesReturnAc);
    this.productObj.SRAC_ACNAME = salesReturnAc[0].ACNAME;

    let purchaseAc = arrayData.filter(x => x.ACID == this.productMasterService.userSetting.PurchaseAc);
    this.productObj.PAC_ACNAME = purchaseAc[0].ACNAME;

    let purchaseReturnAc = arrayData.filter(x => x.ACID == this.productMasterService.userSetting.PurchaseReturnAc);
    this.productObj.PRAC_ACNAME = purchaseReturnAc[0].ACNAME;     
    })
  }
  SalesAccountEnterClicked() {
    this.gridPopupSettingsForAccountLedgerList_Sales = {
      title: "Accounts",
      apiEndpoints: `/getAccountPagedListByMapId/Details/Product Master`,
      defaultFilterIndex: 1,
      columns: [
        {
          key: 'ACID',
          title: 'AC CODE',
          hidden: false,
          noSearch: false
        },
        {
          key: 'ACNAME',
          title: 'A/C NAME',
          hidden: false,
          noSearch: false
        },
      ]}
    this.genericGridAccountLedger_Sales.show();
  }

  dblClickSalesAccountSelect(account:any) {
    this.productObj.SAC = account.ACID;
    this.productObj.SAC_ACNAME = account.ACNAME;
  }

  
  SalesReturnAccountEnterClicked() {
    this.gridPopupSettingsForAccountLedgerList_SalesReturn = {
      title: "Accounts",
      apiEndpoints: `/getAccountPagedListByMapId/Details/Product Master`,
      defaultFilterIndex: 1,
      columns: [
        {
          key: 'ACID',
          title: 'AC CODE',
          hidden: false,
          noSearch: false
        },
        {
          key: 'ACNAME',
          title: 'A/C NAME',
          hidden: false,
          noSearch: false
        },
      ]}
    this.genericGridAccountLedger_SalesReturn.show();
  }

  dblClickSalesReturnAccountSelect(account:any) {
    this.productObj.SRAC = account.ACID;
    this.productObj.SRAC_ACNAME = account.ACNAME;
  }

  
  PurchaseAccountEnterClicked() {
    this.gridPopupSettingsForAccountLedgerList_Purchase = {
      title: "Accounts",
        apiEndpoints: `/getAccountPagedListByMapId/Master/Product Master`,
        defaultFilterIndex: 1,
        columns: [
          {
            key: 'ACID',
            title: 'AC CODE',
            hidden: false,
            noSearch: false
          },
          {
            key: 'ACNAME',
            title: 'A/C NAME',
            hidden: false,
            noSearch: false
          },
        ]
    }
    this.genericGridAccountLedger_Purchase.show();
  }

  dblClickPurchaseAccountSelect(account:any) {
    this.productObj.PAC = account.ACID;
    this.productObj.PAC_ACNAME = account.ACNAME;
  }

  
  PurchaseReturnAccountEnterClicked() {
    this.gridPopupSettingsForAccountLedgerList_PurchaseReturn = {
      title: "Accounts",
        apiEndpoints: `/getAccountPagedListByMapId/Master/Product Master`,
        defaultFilterIndex: 1,
        columns: [
          {
            key: 'ACID',
            title: 'AC CODE',
            hidden: false,
            noSearch: false
          },
          {
            key: 'ACNAME',
            title: 'A/C NAME',
            hidden: false,
            noSearch: false
          },
        ]
    }
    this.genericGridAccountLedger_PurchaseReturn.show();
  }

  dblClickPurchaseReturnAccountSelect(account:any) {
    this.productObj.PRAC = account.ACID;
    this.productObj.PRAC_ACNAME = account.ACNAME;
  }

  onEnterMasterItemList(){
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

  onSelectItem(value:any){
    this.productObj.SUPITEMCODE = value.MCODE;
    this.productObj.SUPITEMNAME = value.DESCA;
  }



  ngAfterViewInit() {
  }


}
