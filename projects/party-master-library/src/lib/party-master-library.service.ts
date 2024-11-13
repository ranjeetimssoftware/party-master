import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from './shared/components/generic/generic-dialog/generic-dialog.component';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class PartyMasterLibraryService {
  userSettings:any;
  customermasterObj:CustomerMasterObj = <CustomerMasterObj>{}
  
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

   openSuccessDialog(Message:string) {
    this.dialog.open(GenericDialogComponent, {
      data:{
        Title: "Information",
        Message: Message
      }
    });
  }
  openErrorDialog(Message:string) {
    this.dialog.open(GenericDialogComponent, {
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

  getCustomerById(ptype:string, acid:string){
    return this.http.get<any[]>(this.apiUrl + `/getAllCustomerById?ptype=${ptype}&acid=${acid}`); 
  }

  getLedgerGroup(acid:string){
    return this.http.get<any[]>(this.apiUrl + `/getLedgerGroup?acid=${acid}`); 
  }
  getAllsettings(){
    return this.http.get<any[]>(this.apiUrl + '/getAllSetting'); 
  }
  getLedgerGroupList(){
    return this.http.get<any[]>(this.apiUrl + '/getLedgerGroups'); 
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
}

export interface CustomerMasterObj{
  customerCode:string;
  customerName:string;
  contactNo:string;
  address:string;
  vatNo:string;
  email:string;
  mobile:string;
  phone:string;
  status:number;
  isCustomerLedger:number;
  AdditionalInfo:AdditionalInfo;
  contactPerson:contactPerson[];
  shippingAdresses:ShippingAddress[];
  bankInformation:BankInformation[];
  salesTarget:SalesTarget;
  customerPartyAccount:CustomerPartyAccountObj;
  documentUpload:any[];
}

export interface CustomerPartyAccountObj{
  pType:string;
  acType:string;
  category:string;
  mapId:string;
  type:string; 
  parent:string;
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
  Area: string,
  province: string,
  district: string,
  dealingSalesman: string,
  ContractPrice:number,
  enbleContractPrice:number,
  createMember:number,
  membershipInfo:MembershipObj;
  vendorType:string;
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
  dateOfBirth:string;
  weddingAniversary:string;
  workingOrganization:string
  designation:string;
  customerStatus:number,
  membershipScheme:string,
  membershipStartDate:string,
  membsershipEndDate:string,
  membershipBarcode:string,
}
