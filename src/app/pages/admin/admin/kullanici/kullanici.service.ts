import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kullanici } from '../../../models/kullanici';
import { Observable } from 'rxjs';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl =this.test +"/Kullanici/";
  path = ""
  
  getKullaniciAll():Observable<Kullanici[]> {
    this.path = this.baseUrl + "getAll";   
    return this.httpClient.get<Kullanici[]>(this.path);
  }
  addKullanici(kullanici:Kullanici){
    this.path = this.baseUrl +"add"
    this.httpClient.post(this.path,kullanici).subscribe(data=>{
      //console.log('response data', data)
      //this.alertifyService.success("Şehir başarıyla eklendi.")
      //this.router.navigateByUrl('/cityDetail/'+data["id"])
    });
   }
   updateKullanici(kullanici:Kullanici){
     this.path = this.baseUrl +"put";
     return this.httpClient.put(this.path,kullanici);
   }
   deleteKullanici(id){
     //console.log('kullaniciId', id)
     this.path = this.baseUrl +"delete?id=" + id;
     return this.httpClient.delete(this.path);
   }
   
   GetChatUsers(ids):Observable<Kullanici[]>{
    this.path = this.baseUrl +"GetChatUsers" 
    return this.httpClient.post<Kullanici[]>(this.path,ids);
  }

  
}