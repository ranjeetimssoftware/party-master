import { TAcList } from './Account.interface';
import { EventEmitter } from '@angular/core';
import { IDivision } from './commonInterface.interface';
export interface Item {
  MCODE: string;
  MENUCODE: string;
  DESCA: string;
  BARCODE: string;
  RATE: number;
  PRATE: number;
  BASEUNIT: string;
  QUANTITY: number;
  ISVAT: number;
  ISSERVICECHARGE: number;
  PTYPE: number;
  CRATE: number;
  EDATE: Date;
  PARENT: string;
  ParentName:string;
  MGROUP: string;
  MgroupName: string;
  SUPCODE: string;
  STOCK: number;
  BATCH: string;
  MCategory: string;
  MRP: number;
  // duplicate name cannot remove because it is used my other classes.
  Mcode: string;
  MGroup: string;
  Parent: string;
  Batches: string;
  RangeType: string;
  inputMode: boolean;
  In_Rate_A: number;
  IN_PRATE_A: number;
  shelf: string;
  RACK: string;
}

export interface Product {
  NATURETYPE: number;
  LENGTH:Number;
  WIDTH: Number;
  BREADTH: Number;
  AlternateUnits: AlternateUnit[];
  AltUnit: UnitAndQty;
  Par: Product;
  COLOR: string;
  SIZE: string;
  VOLUME: string;
  SETTING: string;
  MajorGroup: Product;
  TRNUSER: string;
  Serial: number;
  MCODE: string;
  MENUCODE: string;
  DESCA: string;
  DESCB: string;
  PARENT: string;
  TYPE: string;
  BASEUNIT: string;
  ALTUNIT: string;
  CONFACTOR: number;
  RATE_A: number;
  RATE_B: number;
  PRATE_A: number;
  PRATE_B: number;
  VAT: number;
  MINLEVEL: number;
  MAXLEVEL: number;
  ROLEVEL: number;
  MINWARN: number;
  MAXWARN: number;
  ROWARN: number;
  LEVELS: number;
  BRAND: string;
  MODEL: string;
  MGROUP: string;
  ParentName:string;
  MgroupName: string;
  FCODE: number;
  ECODE: number;
  DISMODE: string;
  DISRATE: number;
  DISAMOUNT: number;
  RECRATE: number;
  MARGIN: number;
  SMARGIN:number;
  PRERATE: number;
  PRESRATE: number;
  DISCONTINUE: number;
  PRERATE1: number;
  PRERATE2: number;
  SCHEME_A: number;
  SCHEME_B: number;
  SCHEME_C: number;
  SCHEME_D: number;
  SCHEME_E: number;
  FLGNEW: number;
  SALESMANID: number;
  TDAILY: number;
  TMONTHLY: number;
  TYEARLY: number;
  VPRATE: number;
  VSRATE: number;
  PTYPE: number;
  ZEROROLEVEL: number;
  RATE_C: number;
  CRATE: number;
  ISUNKNOWN: number;
  TSTOP: number;
  HASSERIAL: number;
  HASSERVICECHARGE: number;
  TAXGROUP_ID: number;
  REQEXPDATE: number;
  Description: string;
  MODES: string;
  PATH: string;
  SUPCODE: string;
  supplierName:string;
  LATESTBILL: string;
  MCAT: string;
  MCAT1: string;
  MIDCODE: string;
  SAC: string;
  SRAC: string;
  PAC: string;
  PRAC: string;
  GENERIC: string;
  BARCODE: string;
  DIMENSION: string;
  SUPITEMCODE: string;
  EDATE: Date;
  MAXSQTY: number;
  MultiStockLevels: MultiStockLevel[];
  ItemRateDiscount: RateDiscount;
  WHOUSE: string;
  BRANDCODE: string;
  PCL: string;
  STATUS: number;
  PRODUCTID: string;
  MRP: number;
  HSNCode: number;
  GST: number;
  TaxCategory: number;
  GWEIGHT: string;
  SHELFLIFE: number;
  Weighable: string;
  PRATE_C:number;
  Ex_Rate_A : number;
  Ex_Rate_B : number;
  Ex_Rate_C : number;
  IsQtyUnknown : number;
  HASVARIANT: number;
  HASECSCHARGE : number;
  NWEIGHT: string;
  CBM : string;
  Ex_Prate_A:number;
  AltSellingPrices:AltSellingPrice[];
  IN_RATE_A:number;
  IN_RATE_B:number;
  IN_RATE_C:number;
  discontinueCheckbox:boolean;
  PACK: string;
  IN_PRATE_A: number;
  WARRANTY: number;
  SUPITEMNAME: string;
  PARENT_MCODE:string;
  CATEGORIESLIST:[];
  ImageUpload:string;
  ENABLEITEMWISEBATCH:number;
  SAC_ACNAME:string;
  SRAC_ACNAME:string;
  PAC_ACNAME:string;
  PRAC_ACNAME:string;
  ECSRATE:number;
  ISRECURRING:number;
  ISAMOUNTWISEBILL:number;
  HASCOMMISSIONCHARGE:number;
  HASBATCH: number;
  AVAILABLESTOCK:number;
  MainItemName: string;
  BillingDisplay: number;
  LabeledMRP: number;
  ItemWisePrice: ItemWisePrice[];
  MultipleRetailPrice: MultipleRetailPrice[];
  guid:string,
  SubCatA: string,
  SubCatB: string,
  USER:any,
  ALIAS:string,
  Location:any,
  ItemCostCenter:null|number,
  PRODUCTLIFE: number;
  CustomValues:any;
  REFITEMNAME: string;
  REFMCODE: string;
  ISBARITEM:string;
}

export interface AltSellingPrice{
  SNO:number;
  MCODE:string;
  CRATE_A:string;
  WSRATE_A:string;
  NRATE_A:string;
  WNRATE_A:string;
  UNIT:string;
  CONFACTOR:number;
}


export interface RateGroup {
  RID: number;
  DESCRIPTION: string;
  SHORTNAME: string;
}
export interface RateDiscount {
  MCODE: string;
  DTRRATE: number;
  WSLRATE: number;
  RTLRATE: number;
  FLTRATE: number;
}
export interface ItemRate {
  RateGroup: RateGroup;
  ISNEW: number;
  SNO: number;
  UNIT: string;
  RATETYPE: string;
  RATE: number;
  RATEID: number;
  MCODE: string;
  ExistsInCollection: boolean;
}
export interface MultiStockLevel {
  MCODE: string;
  WAREHOUSE: string;
  ROLEVEL: number;
  MINLEVEL: number;
  MAXLEVEL: number;
}
export interface TBarcode {
  SN: number;
  BCODEID: number;
  SRATE: number;
  BCODE: string;
  MCODE: string;
  UNIT: string;
  ISSUENO: string;
  SUPCODE: string;
  BATCHNO: string;
  REMARKS: string;
  INVNO: string;
  DIV: string;
  FYEAR: string;
  DESCA: string;
  EDATE: Date;
  EXPIRY: Date;

  SupplierAccount: TAcList;
  BCodeDetails: BarcodeDetail[];
  Division: IDivision;
  MRP: number;
  MRP_WO_VAT: number;
  ISOLD: any;
  BARCODEDETAILS:any;
  DISCONTINUE: number;
  VARIANTDETAIL: string;
  VCHRNO: string;
  ISDEFAULT: number;
}
export interface TYield{
  SubItem: string;
  Yield: number;
}

export interface BarcodeDetail {
  VALUE: any;
  COL_LENGTH: number;
  DATA_TYPE: string;
  COLUMN_NAME: string;
}

export interface KotCategory {
  ID: number;
  NAME: string;
}
export interface Brand {
  BrandId: string;
  BrandName: string;
  BRANDCODE: string;
  PARENTBRANDCODE: string;
  TYPE: string;
  PCL: string;
  STATUS: number;
  BRANDTYPE: string;

}
export interface Model {
  BrandId: string;
  ModelId: string;
  ModelName: string;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  routerLinkActiveOptions?: any;
  menuName: string;
}

export interface ProductGroup{
    MGROUP:string;
    SUBGROUP_A:string;
    SUBGROUP_B:string;
    SUBGROUP_C:string;
    SUBGROUP_D:string;
    
    // PARENT:string;
}

export interface prodObj{
  MENUCODE: string;
  DESCA: string;
  MGROUP: string;
  MARGIN: number;
  MCAT:string;
  PARENT: string;
  MCODE:string;
  CHILD:number;
  LEVEL:number;
  ItemCostCenter:number;
}

export interface ItemWisePrice {
  MCODE: string;
  LANDINGCOST: string;
  SELLRATEBEFORETAX: number;
  W_SELLRATEBEFORETAX:number;
  BATCH: string;
  MRP: number;
  EXPDATE: Date | string;
  STOCK: number;
}

export interface MultipleRetailPrice{
  MCODE: string;
  RATE: number;
  INRATE:number;
  EXPDATE: Date;
  ISACTIVE: number;
  DIVISION:string;
}

export interface groupSearchObj{
  SUBGROUP_A:string;
  SUBGROUP_B:string;
  SUBGROUP_C:string;
  SUBGROUP_D:string;
}

export interface ProductAttributes{
  DEPARTMENT: string;
  TYPE: string;
  BRAND: string;
  FLAVOUR: string;
  MAINCATNAME: string;
  SUBCATNAME: string;
  SIZE: string;
  MATERIAL: string;
  MODEL: string;
}
export interface PriceHistory{
  MCODE: string;
  Rate: number;
  TRNDATE: string | Date;
  BILLTO: string;
  ITEMDESC: string;
}

export interface UnitAndQty {
  Unit: string;
  Qty: number;
  Rate: number;
  BaseUnit: string;
  BaseQty: number;
  BaseRate: number;
  ConversionFactor: number;
}

export interface AlternateUnit {
  SNO: number;
  MCODE: string;
  ALTUNIT: string;
  DEFAULT_ORDER_UNIT: string;
  UNIT: string;
  CONFACTOR: number;
  RATE: number;
  ISDEFAULT: number;
  ISDEFAULTPUNIT: number;
  ISBASEUNIT: number;
  ISDEFAULTPRATE: number;
  BRCODE: string;
  PRATE_A: number;
  RATE_A: number;
  RATE_B: number;
  RATE_C: number;
  RATE_D: number;
  PRATE: number;
  ISDISCONTINUE: number;
  ISDEFAULTORDERUNIT: number;
  EX_RATE: number;
  EX_RATE_B: number;
  BASEUOM: string;
  Ex_Prate_A: number;
  IN_PRATE: number;
  WSRATE_DISCOUNT: number;
  SRATE_DISCOUNT: number;
  StopDecimal: number;
}

export interface AlternateItem{
  DESCA:string;  
  MENUCODE:string;  
  UNIT:string;  
}

export interface ProductType {
  PTYPENAME: string;
  NATURETYPE: number;
  PTYPEID: number;
}

export interface natureType {
  nameType: number;
}