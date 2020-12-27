import { Injectable } from '@angular/core';

import { Kategori } from '../../../models/kategorii';
import { Observable } from 'rxjs';
import { UserMessages } from '../../../models/Message';
import { HttpClient } from '@angular/common/http';
import {CONFIG} from '../../../../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) {  }
  test = CONFIG.apiURL;

  addMessage(message:UserMessages){
    
    return this.httpClient.post(this.test +"UserMessages/add",message);
   }
  getMessageAll():Observable<UserMessages[]> {
    
    return this.httpClient.get<UserMessages[]>(this.test +"UserMessages/getAll");
  }
  UsersMessagesInteract(alanID,gonderenID):Observable<UserMessages[]> {
    
    return this.httpClient.get<UserMessages[]>(this.test +"UserMessages/UsersMessagesInteract?alanID="+alanID+"&gonderenID="+gonderenID);
  }
  GetMessagesForUser(alanId,gonderenID):Observable<number>{
    return this.httpClient.get<number>(this.test +"UserMessages/GetMessagesForUser?alan="+alanId+"&gonderen="+gonderenID);
  }

  ClearReadedMessage(alanId,gonderenID):Observable<boolean>{
    return this.httpClient.get<boolean>(this.test +"UserMessages/ClearReadedMessage?alan="+alanId+"&gonderen="+gonderenID);
  }
  getUsersInteract(id):Observable<number[]> {
    
    return this.httpClient.get<number[]>(this.test +"UserMessages/getUserInterect?userID="+ id);
  }

  GetNotReadedAllMessages(id):Observable<number> {
    
    return this.httpClient.get<number>(this.test +"UserMessages/GetNotReadedAllMessages?alan="+ id);
  }
}
