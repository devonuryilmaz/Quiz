import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { AuthHelper } from '../../../auth/auth-helper';
import { KullaniciService } from '../kullanici/kullanici.service';
import { UserMessages } from '../../../models/Message';
import { BindDataService } from '../../helper/bind-data.service';

@Component({
  selector: 'chat-deneme',
  templateUrl: './chat-deneme.component.html',
  styleUrls: ['./chat-deneme.component.scss']
})
export class ChatDenemeComponent implements OnInit {
  users = [];
  chatScrenHidden = false;
  selectedUserMessages = [];
  userName = [];
  selectedUserName = "Konuşma Ekranı";
  selectedUserId = 0;
  mesajAtilmayanKullanicilar = [];
  mesajAtilanKullanicilar = [];
  usersMessageCount = [];

  ngOnInit(): void {
   
    let msgCount;
    this.chatService.getUsersInteract(this.authHepler.userId).subscribe(data => {
     this.mesajAtilanKullanicilar = data;
   
      this.kullaniciService.GetChatUsers(data).subscribe(data => {
 
        data.forEach((d,i)=>{       
          this.chatService.GetMessagesForUser(this.authHepler.userId,d["kullaniciID"]).subscribe(data => {
            msgCount = data;      
            this.users.push(d);        
            this.usersMessageCount.push(msgCount)          
          })    
        })
      })
      
      this.kullaniciService.getKullaniciAll().subscribe(data => {
        this.userName = data;
        this.userName.forEach((u)=> {
          if(u["kullaniciID"] != this.authHepler.userId){
            if(!this.mesajAtilmayanKullaniciBul(u["kullaniciID"])){
              if(!this.authHepler.userActor && u["isAdmin"])
              {
                this.mesajAtilmayanKullanicilar.push(u);  
              }
              else if(this.authHepler.userActor){
                this.mesajAtilmayanKullanicilar.push(u);  
              }
              
            }
          }  
        })
      })
    })
  
  }
  mesajAtilmayanKullaniciBul(id){
    let userUd
      userUd = this.mesajAtilanKullanicilar.find(u => u == id)
      return userUd
  }
  messages = [];
  constructor(private chatService: ChatService, private authHepler: AuthHelper, private kullaniciService: KullaniciService,private bindService:BindDataService) {
  }
  findUserAdSoyad(id) {
    let user = this.userName.find(u => u["kullaniciID"] == id)
    return user["adSoyad"]
  }
  userMessage(id,index,aktif) {
    this.selectedUserId = id;
    this.selectedUserMessages = []
    this.selectedUserName = this.findUserAdSoyad(id)
    this.chatService.UsersMessagesInteract(this.authHepler.userId, id).subscribe(data => {
      data.forEach((m, i) => {
        let r = false;
        let adSoyad = this.findUserAdSoyad(m["gonderenUserId"]);
        if (m["gonderenUserId"] == this.authHepler.userId) {
          adSoyad = '';
          r = true;
        }
        this.selectedUserMessages.push({ text: m["mesaj"], date: m["tarih"], reply: r, user: { name: adSoyad, avatar: '' } })
      })
      if(aktif){
     
      this.chatService.ClearReadedMessage(this.authHepler.userId,id).subscribe(r => {
        if(r){
          this.bindService.changeMsgCount(this.usersMessageCount[index])      
          this.usersMessageCount[index] = 0;
        }
      })
    }
    })
    this.chatScrenHidden = false;
  }

  sendMessage(event: any) {
    let selectedUserActor = this.userName.find(u => u["kullaniciID"] == this.selectedUserId)["isAdmin"]
    if(selectedUserActor == false && this.authHepler.userActor == false){
      //todo yetki yok notification
    }else{
    let message = new UserMessages();
    message.AlanUserId = this.selectedUserId
    message.GonderenUserId = this.authHepler.userId;
    message.Mesaj = event.message;
    message.isOkundu = false;
    this.chatService.addMessage(message).subscribe(data => {
      if(data["id"]){
        let atilmayan = this.mesajAtilmayanKullanicilar.findIndex(u => u["kullaniciID"] == this.selectedUserId)
        if(atilmayan >= 0){  
          let atilmayanUser = this.mesajAtilmayanKullanicilar[atilmayan];
          this.mesajAtilmayanKullanicilar.splice(atilmayan,1)
          this.users.unshift(atilmayanUser)
        }
        this.selectedUserMessages.push({
          text: event.message,
          date: new Date(),
          reply: true,
    
          user: {
            name: '',
            avatar: '',
          },
        });
      }
    })
  }
  }

}
