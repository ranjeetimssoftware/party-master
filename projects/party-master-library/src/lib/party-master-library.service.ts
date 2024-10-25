import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyMasterLibraryService {
  userSettings:any;

  constructor(private http: HttpClient,) { }

  private get apiUrl(): string {
    // let url = this.state.getGlobalSetting("apiUrl");
    let url = environment.apiUrl;
     let apiUrl = "";
 
     if (!!url && url.length > 0) { apiUrl = url };
     return apiUrl
   }

   getCustomerList():Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getAllCustomer');
  }
}
