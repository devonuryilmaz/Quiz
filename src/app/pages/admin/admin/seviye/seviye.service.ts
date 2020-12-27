import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seviye } from '../../../models/seviye';
import { Observable } from 'rxjs';
import { AtifSeviye } from '../../../models/AtifSeviye';
import { GazeSeviye } from '../../../models/GazeSeviye';
import { FacetofaceSeviye } from '../../../models/FacetoFaceSeviye';
import { KullaniciRapor } from '../../../models/KullaniciRapor';
import { KullaniciAtıfRapor } from '../../../models/KullaniciAtıfRapor';
import { CONFIG } from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class SeviyeService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl = this.test + "/Seviye/";
  path = ""

  getOturumSeviye(oturumID: number): Observable<Seviye[]> {
    this.path = this.baseUrl + "getOturum?oturumID=" + oturumID
    return this.httpClient.get<Seviye[]>(this.path)
  }

  getSeviyeAll(isAdmin: boolean): Observable<Seviye[]> {
    this.path = this.baseUrl + "getAll?isAdmin=" + isAdmin;
    return this.httpClient.get<Seviye[]>(this.path);
  }
  getAtifSeviyeAll(isAdmin: boolean): Observable<AtifSeviye[]> {

    return this.httpClient.get<AtifSeviye[]>(this.test + "/Atif/getAll?isAdmin=" + isAdmin);
  }

  addKullaniciRapor(rapor: KullaniciRapor) {
    return this.httpClient.post(this.test + "/KullaniciRapor/add", rapor)
  }

  addKullaniciAtıfRapor(rapor: KullaniciAtıfRapor) {
    return this.httpClient.post(this.test + "/KullaniciAtıfRapor/add", rapor)
  }

  getAllKullaniciAtıfRapor(rapor: KullaniciAtıfRapor) {
    return this.httpClient.get(this.test + "/KullaniciAtıfRapor/getAll")
  }

  kullaniciRaporKontrol(rapor: KullaniciRapor) {
    return this.httpClient.post(this.test + "/KullaniciRapor/RaporKontrol", rapor)
  }
  kullaniciAtıfRaporKontrol(rapor: KullaniciAtıfRapor) {
    return this.httpClient.post(this.test + "/KullaniciAtıfRapor/RaporKontrol", rapor)
  }

  sonAtifRapor(oturumID: number, kullaniciID: number): Observable<KullaniciAtıfRapor> {
    return this.httpClient.get<KullaniciAtıfRapor>(this.test + "/KullaniciAtıfRapor/getSonOturumRaporu?oturumID=" + oturumID +
      "&kullaniciID=" + kullaniciID);
  }

  sonRapor(oturumID: number, kullaniciID: number): Observable<KullaniciRapor> {
    return this.httpClient.get<KullaniciRapor>(this.baseUrl + "/getSonOturumRaporu?oturumID=" + oturumID +
      "&kullaniciID=" + kullaniciID);
  }

  kullaniciCompleteKontrol(rapor: KullaniciRapor): Observable<KullaniciRapor> {
    return this.httpClient.post<KullaniciRapor>(this.test + "/KullaniciRapor/KullaniciCompleteControl", rapor)
  }
  kullaniciAtıfCompleteKontrol(rapor: KullaniciAtıfRapor): Observable<KullaniciAtıfRapor> {
    return this.httpClient.post<KullaniciAtıfRapor>(this.test + "/KullaniciAtıfRapor/KullaniciCompleteControl", rapor)
  }

  getFacetoFaceSeviyeAll(isAdmin: boolean): Observable<FacetofaceSeviye[]> {

    return this.httpClient.get<FacetofaceSeviye[]>(this.test + "/FaceToFaceSeviye/getAll?isAdmin=" + isAdmin);
  }

  getKullaniciRaporAll(): Observable<KullaniciRapor[]> {

    return this.httpClient.get<KullaniciRapor[]>(this.test + "/KullaniciRapor/getAll");
  }

  getGazeCastSeviyeSeviyeAll(isAdmin: boolean): Observable<GazeSeviye[]> {

    return this.httpClient.get<GazeSeviye[]>(this.test + "/GazeCastSeviyeSeviye/getAll?isAdmin=" + isAdmin);
  }
  addAtifSeviye(seviye: AtifSeviye) {
    this.path = this.baseUrl + "add"
    return this.httpClient.post(this.test + "/Atif/add", seviye)
  }

  addGazeCastSeviyeSeviye(seviye: GazeSeviye) {
    this.path = this.baseUrl + "add"
    return this.httpClient.post(this.test + "/GazeCastSeviyeSeviye/add", seviye)
  }
  addFacetoFaceSeviye(seviye: FacetofaceSeviye) {
    this.path = this.baseUrl + "add"
    return this.httpClient.post(this.test + "/FaceToFaceSeviye/add", seviye)
  }

  deleteGazeCastSeviyeSeviye(id) {

    return this.httpClient.delete(this.test + "/GazeCastSeviyeSeviye/delete?id=" + id);
  }
  addSeviye(seviye: Seviye) {
    this.path = this.baseUrl + "add"
    return this.httpClient.post(this.path, seviye)
  }
  deleteSeviye(id) {
    console.log('seviyeIDD', id)
    this.path = this.baseUrl + "delete?id=" + id;
    return this.httpClient.delete(this.path);
  }
  updateGazeCastSeviyeSeviye(seviye) {
    console.log('seviye', seviye)
    return this.httpClient.put(this.test + "/GazeCastSeviyeSeviye/put?id=" + seviye.id, seviye);
  }

  updateFacetofaceSeviyeSeviye(seviye) {
    console.log('seviye', seviye)
    return this.httpClient.put(this.test + "/FaceToFaceSeviye/put?id=" + seviye.id, seviye);
  }
  deleteAtifSeviye(id) {

    return this.httpClient.delete(this.test + "/Atif/delete?id=" + id);
  }
  deleteFaceToFaceSeviyeSeviye(id) {

    return this.httpClient.delete(this.test + "/FaceToFaceSeviye/delete?id=" + id);
  }
  getAllByKategoriId(id) {
    this.path = this.baseUrl + "getAllByKategoriId?kategoriID=" + id;
    return this.httpClient.get<Seviye[]>(this.path);
  }
  getSeviyeById(id) {
    this.path = this.baseUrl + "get?seviyeID=" + id;
    return this.httpClient.get<Seviye>(this.path);
  }
  updateSeviye(seviye: Seviye, kategoriId) {
    let id = seviye["seviyeID"]
    console.log('seviye****', seviye)
    let jsonSeviye = {
      "kategoriID": kategoriId,
      "SeviyeNumarasi": seviye["seviyeNumarasi"],
      "isAktif": seviye["isAktif"],
      "siraNumarasi": seviye["siraNumarasi"],
      "soruSuresi": seviye["soruSuresi"],
      "oturumID": seviye["oturumID"],
      "oturumSirasi": seviye["oturumSirasi"]
    }
    this.path = this.baseUrl + "put?id=" + id;
    return this.httpClient.put(this.path, JSON.parse(JSON.stringify(jsonSeviye)));
  }

  updateAtifSeviye(seviye) {
    console.log('seviye', seviye)
    return this.httpClient.put(this.test + "/Atif/put?id=" + seviye.id, seviye);

  }

  getAtifOturum(oturumID: number): Observable<AtifSeviye[]> {
    return this.httpClient.get<AtifSeviye[]>(this.test + "/Atif/getAtifOturum?oturumID=" + oturumID);
  }

  getFaceOturum(oturumID: number): Observable<FacetofaceSeviye[]> {
    return this.httpClient.get<FacetofaceSeviye[]>(this.test + "/FaceToFaceSeviye/getFaceOturum?oturumID=" + oturumID);
  }

  getGazeOturum(oturumID: number): Observable<GazeSeviye[]> {
    return this.httpClient.get<GazeSeviye[]>(this.test + "/GazeCastSeviyeSeviye/getGazeOturum?oturumID=" + oturumID);
  }

}
