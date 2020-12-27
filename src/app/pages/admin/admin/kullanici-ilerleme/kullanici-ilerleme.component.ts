import { Component, OnInit, OnDestroy } from '@angular/core';


import { LocalDataSource } from 'ng2-smart-table';
import { KullaniciService } from '../kullanici/kullanici.service';
import { Kullanici } from '../../../models/kullanici';
import { Seviye } from '../../../models/seviye';
import { SeviyeService } from '../seviye/seviye.service';
import { KullaniciIlerleme } from '../../../models/kullaniciIlerleme';
import { KullaniciIlerlemeService } from './kullanici-ilerleme.service';
import { AuthHelper } from '../../../auth/auth-helper';
import { KategoriService } from '../kategori/kategori.service';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { logging } from 'selenium-webdriver';
import { log } from 'util';


@Component({
  selector: 'kullaniciIlerleme',
  templateUrl: './kullanici-ilerleme.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `]
})
export class KullaniciIlerlemeComponent implements OnInit {
  selectedUserKategoriRapor=false;
  showKategori=true;
  showUser=false;
  showUserRapor=false;
  showCustomUser=false;
  showUserAtifRapor=false;
  showUserAtifCevap=false;
  atifCevap=[];
 kategoriler=[];
 showAtifUser=false;
 users=[]
 userRapor=[];
 userAtifRapor=[]
 currentTheme: string;
 isCompleted=false;
 private alive = true;
 type = 'month';
  constructor(private kategoriService:KategoriService,private authHelper:AuthHelper) {
 
  
  }


  getUser(id,isCustom){

    this.kategoriService.GetKategoriKullaniciUser(id,isCustom).subscribe(data =>{
      console.log('data',data);
      this.users = data;
      if(isCustom){
        this.showCustomUser = true;
      }else{
        this.showUser = true;
      }
     
      this.showKategori = false;
    })
  }

  getUserAtif(){

    this.kategoriService.GetAtifKullaniciUser().subscribe(data =>{
      console.log('data',data);
      this.users = data;
     
     
      this.showKategori = false;
      this.showAtifUser = true;
    })
  }
   secondsToHms(d) {
     console.log('d***',d);

    d = Number(d) /1000 ;
    
    var day = Math.floor(d / 3600 % 24);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var dday = day > 0 ? day + (day == 1 ? " gün, " : " gün, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " saat, " : " saat, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " dakika, " : " dakika, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " saniye" : " saniye") : "";
    return dday+hDisplay + mDisplay + sDisplay; 
}
  
  getAtifCevap(user){

    this.kategoriService.GetKullaniciAtifRaporCevap(user["userId"],user["seviyeId"]).subscribe(data =>{
      console.log('data',data);
      
      this.showUserAtifRapor=false;
      this.showUserAtifCevap = true;
      this.atifCevap = data;
      
    })
    
  }
  getUserAtifRapor(user){
    console.log('user',user);
    
    this.showAtifUser = false;
    this.showUserAtifRapor = true;
    this.kategoriService.GetKullaniciAtifRaporSoru(user["userId"]).subscribe(data =>{
      console.log('dataaaaaaa****',data);
      
      this.userAtifRapor = data;
      this.userAtifRapor.forEach((d) => {
        var endDate = new Date(d['endDate']);
         if(endDate.getFullYear() > 1){
  
          let startdate = new Date(d['startDate']);
          var diff = Math.abs(endDate.getTime() - startdate.getTime());
          console.log('secondsToHms',this.secondsToHms(diff));
          d['finishTime'] = this.secondsToHms(diff)
                  
         }else{
           console.log('***yokkkk');
           
         }
         
  
       })
     
    })

 
  }
  getUserRapor(user,isCustom){
    console.log('user',user);
    console.log('isCustom',isCustom);
    this.selectedUserKategoriRapor = isCustom
    
   this.kategoriService.GetKullaniciRaporSoru(user["kategoriId"],user["userId"],isCustom).subscribe(data =>{
     this.userRapor = data;
     this.userRapor.forEach((d) => {
      var endDate = new Date(d['endDate']);
       if(endDate.getFullYear() > 1){

     
        let startdate = new Date(d['startDate']);
        var diff = Math.abs(endDate.getTime() - startdate.getTime());
        console.log('secondsToHms',this.secondsToHms(diff));
        d['finishTime'] = this.secondsToHms(diff)
                
       }else{
         console.log('yokkkk');
         
       }
       

     })
     console.log('user rapor',this.userRapor);
     this.showUser=false;
     this.showCustomUser = false;
     
     this.showUserRapor = true;
   })
  }

  deneme(){
    this.showUserRapor=false
    if(this.selectedUserKategoriRapor){
      this.showCustomUser = true;
    }else{
      this.showUser = true;
    }
  }
  getKategoriAll(){
    this.kategoriService.getKategoriAll(false).subscribe(data=>{
      this.kategoriler = data;
      console.log('kategoriler',this.kategoriler)
    
    })
  } 

 
  ngOnInit() {
    this.authHelper.session()
    this.authHelper.authorize()
    this.getKategoriAll();
    this.kategoriService.GetAtifKullaniciUser().subscribe(data =>{
      console.log('dataaaaa',data);
      
    })
  }

}