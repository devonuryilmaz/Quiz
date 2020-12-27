import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../../../../assets/config'
import { Oturum } from '../../../models/Oturum'

@Injectable({
  providedIn: 'root'
})
export class OturumService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl = this.test + "Oturum/";
  path = "";

  getOturumlar(): Observable<Oturum[]> {
    this.path = this.baseUrl + "getAll";
    return this.httpClient.get<Oturum[]>(this.path);
  }

  getKullaniciOturum(kullaniciID: number): Observable<Oturum> {
    this.path = this.baseUrl + "getKullaniciOturum?kullaniciID=" + kullaniciID;
    return this.httpClient.get<Oturum>(this.path)
  }

  addOturum(oturum: Oturum) {
    this.path = this.baseUrl + "add"
    return this.httpClient.post<Oturum>(this.path, oturum)
  }

  getOturum(oturumID: number): Observable<Oturum> {
    this.path = this.baseUrl + "get?oturumID=" + oturumID;
    console.log("p", this.path)
    return this.httpClient.get<Oturum>(this.path)
  }

  updateOturum(oturum: Oturum) {
    this.path = this.baseUrl + "put?id=" + oturum["oturumID"];
    console.log("p", this.path)
    return this.httpClient.put(this.path, oturum)
  }

  deleteOturum(id: number) {
    this.path = this.baseUrl + "delete?id=" + id
    return this.httpClient.delete(this.path)
  }

  getSonSeviye(oturumID: number): Observable<any> {
    this.path = this.baseUrl + "getSonSeviye?oturumID=" + oturumID
    console.log("son", this.path)
    return this.httpClient.get<any>(this.path)
  }
}
