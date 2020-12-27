import { Component, OnInit } from '@angular/core';
import { KategoriService } from '../admin/admin/kategori/kategori.service';
import { AuthHelper } from '../auth/auth-helper';
import { Kullanici } from '../models/kullanici';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'rapor-user',
  templateUrl: './rapor-user.component.html',
  styleUrls: ['./rapor-user.component.scss']
})
export class RaporUserComponent implements OnInit {

  showKategori:boolean;
  showUser=false;
  showUserRapor=false;
  showCustomUser=false;
  showUserAtifRapor=false;
  showUserAtifCevap=false;
  atifCevap=[];
 kategoriler=[];
 showAtifUser=false;
 loading:boolean=true;
 id:number;
 users=[]
 userRapor=[];
 userAtifRapor=[]
 currentTheme: string;
 isCompleted=false;
 type = 'month';
 user:Kullanici;
  constructor(private kategoriService:KategoriService,private authHelper:AuthHelper) {
 
  
  }


  getUserAtif(){

    this.kategoriService.GetAtifKullaniciUser().subscribe(data =>{
      console.log('data',data);
      this.users = data;     
      this.showKategori = false;
      this.showAtifUser = true;
    })
  }
  
  getAtifCevap(user){

    this.kategoriService.GetKullaniciAtifRaporCevap(user["userId"],user["seviyeId"]).subscribe(data =>{
      console.log('data',data);
      
      this.showUserAtifRapor=false;
      this.showUserAtifCevap = true;
      this.atifCevap = data;
      
    })
    
  }
  getUserAtifRapor(){

    
    this.showKategori = false;
    this.showUserAtifRapor = true;
    this.kategoriService.GetKullaniciAtifRaporSoru(this.id).subscribe(data =>{
      console.log('dataaaaaaa********',data);
      
      this.userAtifRapor = data;
     
    })

 
  }
  getUserRapor(kategoriId,isCustom){
    
   this.kategoriService.GetKullaniciRaporSoru(kategoriId,this.id,isCustom).subscribe(data =>{
     this.userRapor = data;
     
     this.showKategori=false;
     this.showUserRapor = true;
   })
  }

  getKategoriAll(){
    this.kategoriService.getKategoriAll(false).subscribe(async data=>{
      this.kategoriler = data;
      this.loading=false;
      this.showKategori =true;
      console.log('kategoriler',this.kategoriler)
    
    })
  } 

 
  ngOnInit() {
    this.authHelper.session()
    this.id = this.authHelper.userId;
    this.getKategoriAll();

  }
}
