import { Component, OnInit } from '@angular/core';
import { KullaniciService } from './kullanici.service';
import { Kullanici } from '../../../models/kullanici';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHelper } from '../../../auth/auth-helper';


@Component({
  selector: 'kullanici',
  templateUrl: './kullanici.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `]
})
export class KullaniciComponent implements OnInit {

  kullanicilar:Kullanici[];
  source: LocalDataSource = new LocalDataSource();
  kullanici: Kullanici;
  id:any;
  loading:boolean=true;
  constructor(private kullaniciService: KullaniciService,private authHelper:AuthHelper) {
    this.kullanici = new Kullanici();
  }

  getKullaniciAll(){
    this.kullaniciService.getKullaniciAll().subscribe(data =>{
      this.kullanicilar = data;
      this.kullanicilar.forEach((kullanici,index)=>
      {
        if(kullanici.isAdmin==true){
          kullanici.adminMi='Admin'
        }
        else{
          kullanici.adminMi='Kullanıcı'
        }
      }
     )
      
      this.source.load(this.kullanicilar);
      this.loading=false;
      console.log('kullanicilar', this.kullanicilar);
    });
  }
  addKullanici(kullanici:Kullanici){   
    this.kullaniciService.addKullanici(kullanici);
    console.log('kullanici',kullanici);
  }
  updateKullanici(kullanici:Kullanici){
    this.kullaniciService.updateKullanici(kullanici).subscribe(data =>{
      console.log('responseUpdate', data)
    });
  }
  deleteKullanici(kullaniciId:number){
    this.kullaniciService.deleteKullanici(kullaniciId).subscribe(data =>{
      console.log('responseDelete',data)
    });
  }

  settings = {
    actions:{
      columnTitle:'Kullanici'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
     
      kullaniciAdi: {
        title: 'Kullanıcı Adı',
        type: 'string',
      },
      sifre: {
        title: 'Şifre',
        type: 'string'},
        adSoyad: {
          title: 'Adı Soyadı',
          type: 'string'},
          mailAdresi: {
            title: 'Mail',
            type: 'string'},

      adminMi: {
        title: 'Kullanici Rolü',
        type:'boolean',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
            { value: 'Admin', title: 'Admin' },
            { value: 'Kullanıcı', title: 'Kullanıcı' },

            ]

            },
          },
        },
    },
  };
  
  getByAdminMiNameFetchId(name) {
    let id;
    console.log("sa",name);
    if (name == "Admin") {
      id = true;
    } else if (name == "Kullanıcı") {
      id = false;
    }
    return id;
  }


  onCreateConfirm(event) {

    if(event.newData.amount != 50) {
      this.kullanici = <Kullanici>Object.keys(event).map(e => event[e])[0];
      this.kullanici["isAdmin"] = this.getByAdminMiNameFetchId(this.kullanici['adminMi'])
      console.log('new Data', this.kullanici)
      this.addKullanici(this.kullanici)
      event.confirm.resolve(event.newData);
     
     } else {
       console.log('reject')
      event.confirm.reject();
     }
  }

  onDeleteConfirm(event): void {
    console.log('ondelete')
    if (window.confirm('Are you sure you want to delete?')) {
      this.kullanici = <Kullanici>Object.keys(event).map(e => event[e])[0];
      
       
       this.deleteKullanici(this.kullanici["kullaniciID"])
      event.confirm.resolve();
      
      //
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): void{
    console.log('onsavedata', event.newData.kullaniciID)
    let kullanici = new Kullanici();
    kullanici.KullaniciID= event.newData.kullaniciID;
    kullanici.KullaniciAdi=event.newData.kullaniciAdi;
    kullanici.adSoyad=event.newData.adSoyad;
    kullanici.Sifre=event.newData.sifre;
    kullanici.isAdmin= event.newData.isAdmin;
    kullanici.mailAdresi = event.newData.mailAdresi;
    let admin = this.getByAdminMiNameFetchId(event.newData.adminMi);
    kullanici.isAdmin = admin;
    console.log('update data', kullanici);
    event.confirm.resolve(event.newData);
    this.updateKullanici(kullanici);
  }

  ngOnInit() {
    this.authHelper.session()
    this.authHelper.authorize()
    this.getKullaniciAll()
  }

}