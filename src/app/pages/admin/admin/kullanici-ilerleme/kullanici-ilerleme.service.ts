import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KullaniciIlerleme } from '../../../models/kullaniciIlerleme';
import { Observable } from 'rxjs';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class KullaniciIlerlemeService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl =this.test +"/KullaniciIlerleme/";
  path = ""
  
  getKullaniciIlerlemeAll():Observable<KullaniciIlerleme[]> {
    this.path = this.baseUrl + "getAll";   
    return this.httpClient.get<KullaniciIlerleme[]>(this.path);
  }
  addKullaniciIlerleme(kullaniciIlerleme:KullaniciIlerleme){
    this.path = this.baseUrl +"add"
    this.httpClient.post(this.path,kullaniciIlerleme).subscribe(data=>{
      //console.log('response data', data)
      //this.alertifyService.success("Şehir başarıyla eklendi.")
      //this.router.navigateByUrl('/cityDetail/'+data["id"])
    });
   }
   updateKullaniciIlerleme(kullaniciIlerleme:KullaniciIlerleme){
     this.path = this.baseUrl +"put?id="+ kullaniciIlerleme.IlerlemeId;
     return this.httpClient.put(this.path,kullaniciIlerleme);
   }
   deleteKullaniciIlerleme(id){
     //console.log('kullaniciId', id)
     this.path = this.baseUrl +"delete?id=" + id;
     return this.httpClient.delete(this.path);
   }
  
}