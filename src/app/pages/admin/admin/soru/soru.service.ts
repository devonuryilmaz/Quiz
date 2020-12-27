import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soru } from '../../../models/soru';
import { SoruFoto } from '../../../models/SoruFoto';
import { FaceToFacePhoto } from '../../../models/FacetofacePhoto';
import { FaceToFaceSoru } from '../../../models/FacetofaceSoru';
import { AtıfSoru } from '../../../models/AtifSoru';
import { GazeSoru } from '../../../models/GazeSoru';
import { KullaniciRapor } from '../../../models/KullaniciRapor';
import { KullaniciAtıfRapor } from '../../../models/KullaniciAtıfRapor';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class SoruService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl =this.test +"/Soru/";
  path = ""

  getFacetoFactSoruPhotosById(id): Observable<FaceToFacePhoto[]>{
    return this.httpClient.get<FaceToFacePhoto[]>(this.test +"/FaceToFacePhoto/getAllByFacetoFaceSoruId?id="+ id);
  }

  getFacetoFactSoruAllPhotos(): Observable<FaceToFacePhoto[]>{
    return this.httpClient.get<FaceToFacePhoto[]>(this.test +"/FaceToFacePhoto/getAll");
  }
  getFacetoFactSoruAllBySeviyeId(id): Observable<FaceToFaceSoru[]>{
    return this.httpClient.get<FaceToFaceSoru[]>(this.test +"/FaceToFaceSoru/getAllBySeviyeId?id="+ id);
  }
  getAtıfSoruAllBySeviyeId(id): Observable<AtıfSoru[]> {
    this.path = this.baseUrl + '/getAll';
    return this.httpClient.get<AtıfSoru[]>(this.test +"/AtıfSoru/getAllBySeviyeId?id="+ id);
  }
  getGazeSoruAllBySeviyeId(id){
    return this.httpClient.get<GazeSoru[]>(this.test +"/GazeCastSoru/getAllGazeSoruBySeviyeId?id="+ id);
  }
  getAtıfSoruAll(isAdmin:boolean): Observable<AtıfSoru[]> {
    return this.httpClient.get<AtıfSoru[]>(this.test +"/AtıfSoru/getAll?isAdmin="+isAdmin);
  }
  getFaceSoruPhotoAll(): Observable<FaceToFacePhoto[]> {
    return this.httpClient.get<FaceToFacePhoto[]>(this.test +"/FaceToFacePhoto/getAll");
  }

  getGazeSoruAll(isAdmin:boolean): Observable<GazeSoru[]> {
    return this.httpClient.get<GazeSoru[]>(this.test +"/GazeCastSoru/getAll?isAdmin="+isAdmin);
  }

  getFacetoFaceSoruAll(isAdmin:boolean): Observable<FaceToFaceSoru[]> {
    return this.httpClient.get<FaceToFaceSoru[]>(this.test +"/FaceToFaceSoru/getAll?isAdmin="+isAdmin);
  }


  getSoruAll(isAdmin:boolean):Observable<Soru[]> {
    this.path = this.baseUrl + "getAll?isAdmin="+isAdmin;   
    return this.httpClient.get<Soru[]>(this.path);
  }
  getAllBySoruId(id){
    this.path = this.baseUrl + "getAllBySeviyeId?seviyeID=" + id;   
    return this.httpClient.get<Soru[]>(this.path);
  }
  addSoru(soru:Soru){
    this.path = this.baseUrl +"add"
    return this.httpClient.post(this.path,soru)

    }
    deleteSoru(id){
      console.log('soruIDD', id)
      this.path = this.baseUrl +"delete?id=" + id;
      return this.httpClient.delete(this.path);
   }
   updateSoru(soru:Soru){
     console.log('soru',soru)
    this.path = this.baseUrl +"put?id="+soru.SoruID
    return this.httpClient.put(this.path,soru);
}

getSoruFoto(id:number):Observable<SoruFoto[]> {
  this.path = this.test +"/Soru/" + "getAllSoruFoto?soruID="+id;   
  return this.httpClient.get<SoruFoto[]>(this.path);
}

updateAtıfSoru(soru: AtıfSoru) {
    
  return this.httpClient.put(this.test +"/AtıfSoru/put?id=" + soru["id"], soru);
}

updateKullaniciRapor(rapor: KullaniciRapor) {
    
  return this.httpClient.put(this.test +"/KullaniciRapor/put?id=" + rapor["id"], rapor);
}
getAllKullaniciAtıfRapor():Observable<KullaniciAtıfRapor[]>{
  return this.httpClient.get<KullaniciAtıfRapor[]>(this.test +"/KullaniciAtıfRapor/getAll")
}
getKullaniciRaporAll(): Observable<KullaniciRapor[]> {

  return this.httpClient.get<KullaniciRapor[]>(this.test +"/KullaniciRapor/getAll");
}


updateKullaniciAtıfRapor(rapor: KullaniciAtıfRapor) {
    
  return this.httpClient.put(this.test +"/KullaniciAtıfRapor/put?id=" + rapor["ID"], rapor);
}

updateGazeSoru(soru: GazeSoru) {
  
  return this.httpClient.put(this.test +"/GazeCastSoru/put?id=" + soru["id"], soru);
}
updateFacetofaceSoru(soru: FaceToFaceSoru) {
   
  return this.httpClient.put(this.test +"/FaceToFaceSoru/put?id=" + soru["id"], soru);
}
updateFacetofacePhoto(soru: FaceToFacePhoto) {
  
  return this.httpClient.put(this.test +"/FaceToFacePhoto/put?id=" + soru["id"], soru);
}
deleteAtifSoru(id) {
  return this.httpClient.delete(this.test +"/AtıfSoru/delete?id=" + id);
}
deleteGazeSoru(id) {
  return this.httpClient.delete(this.test +"/GazeCastSoru/delete?id=" + id);
}
deleteFacetofaceSoru(id) {
  return this.httpClient.delete(this.test +"/FaceToFaceSoru/delete?id=" + id);
}
deleteFacetofacePhoto(id) {
  return this.httpClient.delete(this.test +"/FaceToFacePhoto/delete?id=" + id);
}
addAtıfSoru(soru: AtıfSoru) {
  return this.httpClient.post(this.test +"/AtıfSoru/add", soru)
}

addGazeSoru(soru: GazeSoru) {
  return this.httpClient.post(this.test +"/GazeCastSoru/add", soru)
}
addFacetofaceSoru(soru: FaceToFaceSoru) {
  return this.httpClient.post(this.test +"/FaceToFaceSoru/add", soru)
}
addFacetofacePhoto(soru: FaceToFacePhoto) {
  return this.httpClient.post(this.test +"/FaceToFacePhoto/add", soru)
}
}
