import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kategori } from '../../../models/kategorii';
import { Observable } from 'rxjs';
import { AtifKategori } from '../../../models/AtifKategori';
import { FacetofaceKategori } from '../../../models/FacetofaceKategori';
import { GazeKategori } from '../../../models/GazeKategori';
import { RaporUser } from '../../../models/RaporUser';
import { RaporSoru } from '../../../models/RaporSoru';
import { RaporAtifCevap } from '../../../models/RaporAtifCevap';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class KategoriService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl =this.test + "Kategori/";
  path = "" 
  
  getKategoriAll(isAdimn:boolean):Observable<Kategori[]> {
    this.path = this.baseUrl + "getAll?isAdmin="+isAdimn;   
    return this.httpClient.get<Kategori[]>(this.path);
  }

  getKategoriById(id:number):Observable<Kategori>{
    this.path = this.baseUrl + "get?kategoriID="+id;
    return this.httpClient.get<Kategori>(this.path);
  }

  GetKategoriKullaniciUser (kategoriId:number,isCustom:boolean):Observable<RaporUser[]> {
     
    return this.httpClient.get<RaporUser[]>(this.test +"/KullaniciRapor/GetKategoriKullaniciUser?kategoriId="+kategoriId+"&isCustom="+isCustom);
  }

  GetAtifKullaniciUser ():Observable<RaporUser[]> {
     
    return this.httpClient.get<RaporUser[]>(this.test +"/KullaniciRapor/GetAtifKullaniciUser");
  }

  GetKullaniciRaporSoru (kategoriId:number,kullaniciId:number,isCustom:boolean):Observable<RaporSoru[]> {
     
    return this.httpClient.get<RaporSoru[]>(this.test +"/KullaniciRapor/GetKullaniciRaporSoru?kullaniciId="+kullaniciId+"&kategoriId="+kategoriId+"&isCustom="+isCustom);
  }

  GetKullaniciAtifRaporSoru (kullaniciId:number):Observable<RaporSoru[]> {
     
    return this.httpClient.get<RaporSoru[]>(this.test +"/KullaniciRapor/GetKullaniciAtifRaporSoru?userId="+kullaniciId);
  }
  GetKullaniciAtifRaporCevap (kullaniciId:number,seviyeId:number):Observable<RaporAtifCevap[]> {
     
    return this.httpClient.get<RaporAtifCevap[]>(this.test +"/KullaniciRapor/GetAtifCevapUser?userId="+kullaniciId+"&seviyeId="+seviyeId);
  }

  getAtifKategoriService(isAdmin:boolean):Observable<AtifKategori[]> {
     
    return this.httpClient.get<AtifKategori[]>(this.test +"/Custom/GetAtif?isAdmin="+isAdmin);
  }
  getGazeKategoriService(isAdmin:boolean):Observable<GazeKategori[]> {
     
    return this.httpClient.get<GazeKategori[]>(this.test +"/Custom/GetGaze?isAdmin="+isAdmin);
  }
  getFacetofaceKategoriService(isAdmin:boolean):Observable<FacetofaceKategori[]> {
     
    return this.httpClient.get<FacetofaceKategori[]>(this.test +"/Custom/GetFacetoface?isAdmin="+isAdmin);
  }

  addKategori(kategori:Kategori){
    console.log('post kategori',kategori)
    kategori.Aciklama ="asd";
    this.path = this.baseUrl +"add"
    return this.httpClient.post(this.path,kategori)
   }
   updateKategori(kategori:Kategori){
     console.log('****kategori ',kategori)
     this.path = this.baseUrl +"put?id="+ kategori["kategoriID"];
     return this.httpClient.put(this.path,kategori);
   }
   updateGazeKategori(kategori:GazeKategori){
   
    return this.httpClient.put(this.test +"/Custom/putGaze",kategori);
  }
   updateAtıfKategori(kategori:AtifKategori){
   
    return this.httpClient.put(this.test +"/Custom/putAtif",kategori);
  }
  updateFacetofaceKategori(kategori:FacetofaceKategori){
   
    return this.httpClient.put(this.test +"/Custom/putFace",kategori);
  }
   deleteKategori(id){
     console.log('kategoriIDD', id)
     this.path = this.baseUrl +"delete?id=" + id;
     return this.httpClient.delete(this.path);
   }
  
}
