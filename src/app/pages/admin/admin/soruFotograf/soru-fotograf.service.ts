import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoruFoto } from '../../../models/SoruFoto';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class SoruFotografService {

  constructor(private httpClient:HttpClient) { }

  private baseUrl= CONFIG.apiURL +"/SoruFotograf/"

  path=""

  getAllSoruFotograflari():Observable<SoruFoto[]>{
    this.path = this.baseUrl +"getAll";
    return this.httpClient.get<SoruFoto[]>(this.path);
  }

  addSoruFoto(soruFoto:SoruFoto){
    this.path = this.baseUrl +"add"
    return this.httpClient.post(this.path,soruFoto)
  }

  updateSoruFoto(soruFoto: SoruFoto) {
    this.path = this.baseUrl +"update?id="+soruFoto["id"]
    return this.httpClient.put(this.path, soruFoto);
  }

  deleteSoruFoto(id:number){
    this.path = this.baseUrl +"delete?id="+id
      return this.httpClient.delete(this.path);
  }

  getSoruFotoById(id:number):Observable<SoruFoto>{
    this.path = this.baseUrl +"get?id="+id
      return this.httpClient.get<SoruFoto>(this.path);
  }


}
