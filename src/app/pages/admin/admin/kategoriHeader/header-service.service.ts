import { Injectable } from '@angular/core';
import { AdminPanel } from '../../../models/AdminPanel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {

  constructor(private httpClient:HttpClient) { }
  baseUrl =CONFIG.apiURL+"Header/";
  path = ""
  
  getHeader():Observable<AdminPanel> {
    this.path = this.baseUrl + "get";   
    return this.httpClient.get<AdminPanel>(this.path);
  }

   updateHeader(header:AdminPanel){
     this.path = this.baseUrl +"put?id=1";
     return this.httpClient.put(this.path,header);
   }

   
}
