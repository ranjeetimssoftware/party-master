import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from './shared/components/generic/generic-dialog/generic-dialog.component';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PartyMasterLibraryService {
  userSettings:any;
  customermasterObj:CustomerMasterObj = <CustomerMasterObj>{};
  
  constructor(private http: HttpClient,public dialog: MatDialog, private configService: ConfigService) { 
    this.customermasterObj.status = 1;
    this.customermasterObj.AdditionalInfo = <AdditionalInfo>{};
    this.getAllsettings().subscribe((res:any) => {
      if(res.status == "ok")
      this.userSettings = JSON.parse(res.result);
    })
  }

  private get apiUrl(): string {
    // let url = this.state.getGlobalSetting("apiUrl");
    let url = this.configService.getApiUrl();
     let apiUrl = "";
 
     if (!!url && url.length > 0) { apiUrl = url };
     return apiUrl
   }

   reset(){
    this.customermasterObj = <CustomerMasterObj>{};  
    this.customermasterObj.status = 1;
    this.customermasterObj.AdditionalInfo = <AdditionalInfo>{};
    this.customermasterObj.salesTarget = <SalesTarget>{};
    this.customermasterObj.customerPartyAccount = <any>{};
    this.customermasterObj.contactPerson = [];
    this.customermasterObj.documentUpload = [];
    this.customermasterObj.AdditionalInfo.membershipInfo = <MembershipObj>{};
    if (this.userSettings.CompanyType == 'B2B') {
      this.customermasterObj.isCustomerLedger = 1;
    }
   }

   openSuccessDialog(Message:string) {
   return this.dialog.open(GenericDialogComponent, {
      minWidth:'25rem',
      data:{
        Title: "Information",
        Message: Message
      }
    });
  }
  openErrorDialog(Message:string) {
    this.dialog.open(GenericDialogComponent, {
      minWidth:'25rem',
      data:{
        Title: "Error",
        Message: Message
      }
    });
  }

   getCustomerList(ptype:string):Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `/getAllCustomer?ptype=${ptype}`);
  }

  saveCustomer(mode:string,dataObj:CustomerMasterObj){
    let data= {mode:mode, data:dataObj};
    return this.http.post(this.apiUrl+`/saveCustomerProfile`,data);
  }
  saveNewLedgerGroup(mode:string,dataObj:any){
    let data= {mode:mode, data:dataObj};
    return this.http.post(this.apiUrl+`/saveNewLedgerGroup`,data);
  }

  saveNewSubLedgerGroup(mode:string,dataObj:any){
    let data= {mode:mode, data:dataObj};
    return this.http.post(this.apiUrl+`/saveNewSubLedger`,data);
  }

  getCustomerById(ptype:string, acid:string){
    return this.http.get<any[]>(this.apiUrl + `/getAllCustomerById?ptype=${ptype}&acid=${acid}`); 
  }

  getLedgerGroup(acid:string){
    return this.http.get<any[]>(this.apiUrl + `/getLedgerGroup?acid=${acid}`); 
  }

  getSubLegerById(id:string){
    return this.http.get<any[]>(this.apiUrl + `/getSubLegerById?id=${id}`); 
  }
  getAllsettings(){
    return this.http.get<any[]>(this.apiUrl + '/getAllSetting'); 
  }
  getLedgerGroupList(){
    return this.http.get<any[]>(this.apiUrl + '/getLedgerGroups'); 
  }

  getSubLedgerList(){
    return this.http.get<any[]>(this.apiUrl + '/getAllSubLeger'); 
  }

  getArea(){
    return this.http.get<any[]>(this.apiUrl + '/getAreaDetail'); 
  }
  getDistrict(){
    return this.http.get<any[]>(this.apiUrl + '/getDistrict'); 
  }
  getContractPriceList(){
    return this.http.get<any[]>(this.apiUrl + '/getContractPriceList'); 
  }
  getMemberSchemeList(){
    return this.http.get<any[]>(this.apiUrl + '/getMemberSchemeList'); 
  }
  getcategorywiseconfiguration(){
    return this.http.get<any[]>(this.apiUrl + '/getcategorywiseconfiguration'); 
  }
  getSalesmanList (){
    return this.http.get<any[]>(this.apiUrl + '/getSalesmanList '); 
  }
  getDivisionList (){
    return this.http.get<any[]>(this.apiUrl + '/getDivisionList '); 
  }
  getParentGroupTree (){
    return this.http.get<any[]>(this.apiUrl + '/getaccounttree'); 
  }
  
  uploadDocument(body:any) {
    return this.http.post(`${this.apiUrl}/FileUpload`, body);
}
onDeleteItem(acid: string,ptype:string){
  const params = new HttpParams().set('acid', acid);
    return this.http.post<any[]>(this.apiUrl + `/deleteCustomer/${ptype}`,null,{params});
}
onToggleStatus(acid: string,ptype:string){
  const params = new HttpParams().set('acid', acid);
  return this.http.post<any[]>(this.apiUrl + `/toggleCustomerStatus/${ptype}`,null,{params});
}
}

export interface CustomerMasterObj{
  customerCode:string;
  customerName:string;
  contactNo:string;
  address:string;
  vatNo:string;
  email:string;
  mobile:string;
  hasSubLedger:number;
  phone:string;
  status:number;
  isCustomerLedger:number;
  AdditionalInfo:AdditionalInfo;
  contactPerson:contactPerson[];
  shippingAdresses:ShippingAddress[];
  bankInformation:BankInformation[];
  salesTarget:SalesTarget;
  customerPartyAccount:CustomerPartyAccountObj;
  documentUpload:DocumentObj[];
  parentGroup:string;
  additionalInfo:any;
}

export interface CustomerPartyAccountObj{
  pType:string;
  acType:string;
  category:string;
  mapId:string;
  type:string; 
  parent:string;
  termsAndConditions:any;
  divList:any[];

}

export interface contactPerson{
  name:string;
  contact:string;
  designation:string;
  email:string;
}

export interface ShippingAddress{
  address:string;
  name:string;
  phone:string;
  locationmap:string;
  ACID:string;
}

export interface BankInformation{
  acid:string;
  bankCode:string;
  bankName:string;
  bankAccountNumber:string;
  isDefault:number;
}
export interface AdditionalInfo{
  category: string,
  crLimit: number,
  creditDays: string,
  isOverSeasCustomer:number,
  area: string,
  province: string,
  district: string,
  dealingSalesman: string,
  contractPrice:number,
  enbleContractPrice:number,
  createMember:number,
  membershipInfo:MembershipObj;
  supType:number;
  customerStatus:string;
  isCommon:number;
}

export interface SalesTarget{
  acid:string;
  yearlyTarget:number;
  shrawanTarget:number;
  bhadraTarget:number;
  ashwinTarget:number;
  kartikTarget:number;
  mangsirTarget:number;
  poushTarget:number;
  maghTarget:number;
  falgunTarget:number;
  chaitraTarget:number;
  baisakhTarget:number;
  jesthaTarget:number;
  asadhTarget:number;
}

export interface MembershipObj{
  gender:string;
  dateOfBirth:string | null;
  weddingAniversary:string| null;
  workingOrganization:string| null;
  designation:string| null;
  customerStatus:number| null,
  membershipScheme:string| null,
  membershipStartDate:string | null,
  membsershipEndDate:string| null,
  membershipBarcode:string| null,
}

export interface DocumentObj{
  documentExtenstion:string;
  documentFileName:string;
  path:string;
  acid:string;
}
