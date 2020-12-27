import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secenek } from '../../../models/secenek';
import { FaceToFaceSecenek } from '../../../models/FacetofaceSecenek';
import { GazeCastCevap } from '../../../models/GazeCevap';
import { AtıfCevap } from '../../../models/AtifCevap';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class SecenekService {

  constructor(private httpClient: HttpClient) { }
  test = CONFIG.apiURL;
  baseUrl =this.test +"/Secenek/";
  path = ""
  getSecenekAll():Observable<Secenek[]> {
    this.path = this.baseUrl + "getAll";   
    return this.httpClient.get<Secenek[]>(this.path);
  }
  getGazeCevapAll(): Observable<GazeCastCevap[]> {
  
    return this.httpClient.get<GazeCastCevap[]>(this.test +"/GazeCastCevap/getAll");
  }
  getFacetoFactSecenekByPhotoId(id):Observable<FaceToFaceSecenek[]>{
    return this.httpClient.get<FaceToFaceSecenek[]>(this.test +"/FaceToFaceSecenek/getAllFacetofactByPhotoId?id="+id);
  }
  getFacetoFactSecenekAllSecenek():Observable<FaceToFaceSecenek[]>{
    return this.httpClient.get<FaceToFaceSecenek[]>(this.test +"/FaceToFaceSecenek/getAll");
  }

  getGazeCevapAllBySoruId(id): Observable<GazeCastCevap> {
  
    return this.httpClient.get<GazeCastCevap>(this.test +"/GazeCastCevap/getGazeCastCevapBySoruId?id="+id);
  }
  getFacePhotosSecenekAll(): Observable<FaceToFaceSecenek[]> {
    this.path = this.baseUrl + "getAll";
    return this.httpClient.get<FaceToFaceSecenek[]>(this.test +"/FaceToFaceSecenek/getAll");
  }

  getAllBySecenekId(id){
    this.path = this.baseUrl + "getAllBySoruId?soruID=" + id;   
    return this.httpClient.get<Secenek[]>(this.path);
  }
  addSecenek(secenek:Secenek){
    console.log('secenek post',secenek)
    this.path = this.baseUrl +"add"
   return this.httpClient.post(this.path,secenek)

    }

    
  addGazeSecenek(secenek: GazeCastCevap) {
    
    return this.httpClient.post(this.test +"/GazeCastCevap/add", secenek)

  }

  addAtıfSecenek(secenek: AtıfCevap) {
    console.log('cevap',secenek);
    
    return this.httpClient.post(this.test +"/AtıfCevap/add", secenek)

  }
  addFacePhotoSecenek(secenek: FaceToFaceSecenek) {
    return this.httpClient.post(this.test +"/FaceToFaceSecenek/add", secenek)
  }
  deleteFacePhotoSecenek(id) {

    return this.httpClient.delete(this.test +"/FaceToFaceSecenek/delete?id=" + id);
  }
  deleteGazeSecenek(id) {

    return this.httpClient.delete(this.test +"/GazeCastCevap/delete?id=" + id);
  }
  updateFacePhotoSecenek(secenek: FaceToFaceSecenek) {
    
    return this.httpClient.put(this.test +"/FaceToFaceSecenek/put?id="+ secenek["id"], secenek);

  }
  updateGazeSecenek(secenek: GazeCastCevap) {
    
    return this.httpClient.put(this.test +"/GazeCastCevap/put?id="+ secenek["id"], secenek);

  }

    deleteSecenek(id){
      console.log('soruIDD', id)
      this.path = this.baseUrl +"delete?id=" + id;
      return this.httpClient.delete(this.path);
   }
   updateSecenek(secenek:Secenek){
     console.log('secenek',Secenek)
    this.path = this.baseUrl +"put?id="+secenek.SecenekID
    return this.httpClient.put(this.path,secenek);
 
}
}