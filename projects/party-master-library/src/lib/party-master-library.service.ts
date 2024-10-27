import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyMasterLibraryService {
  userSettings:any;
  customermasterObj:CustomerMasterObj = <CustomerMasterObj>{}
  
  constructor(private http: HttpClient,) { 
    this.customermasterObj.status = 1;
  }

  private get apiUrl(): string {
    // let url = this.state.getGlobalSetting("apiUrl");
    let url = environment.apiUrl;
     let apiUrl = "";
 
     if (!!url && url.length > 0) { apiUrl = url };
     return apiUrl
   }

   getCustomerList(ptype:string):Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `/getAllCustomer?ptype=?${ptype}`);
  }

  saveCustomer(mode:string,dataObj:CustomerMasterObj){
    let data= {mode:mode, data:dataObj};
    return this.http.post(this.apiUrl+`/saveCustomerProfile`,data);
  }

   getAllsettings(){
    return this.http.get<any[]>(this.apiUrl + '/getAllSetting'); 
  }
  uploadDocument(body:any) {
    return this.http.post(`${this.apiUrl}/FileUpload`, body);
}
}

export interface CustomerMasterObj{
  customerCode:string;
  customerName:string;
  address:string;
  vatNo:string;
  email:string;
  mobile:string;
  phone:string;
  status:number;
  isCustomerLedger:number;
  AdditionalInfo:AdditionalInfo;
  ContactPerson:contactPerson[];
  customerPartyAccount:any;
  DOCUMENTUPLOAD:any[];
}

export interface contactPerson{
  name:string;
  contact:string;
  designation:string;
  email:string;
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
