import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, Input } from '@angular/core';
import { KategoriService } from './kategori.service';
import { Kategori } from '../../../models/kategorii';
import { LocalDataSource, DefaultEditor } from 'ng2-smart-table';
import { AuthService } from '../../../auth/auth.service';
import { AuthHelper } from '../../../auth/auth-helper';

import { VideoUploadComponent } from '../../helper/video-upload/video-upload.component';
import { BindDataService } from '../../helper/bind-data.service';


@Component({
  selector: 'kategori',
  templateUrl: './kategori.component.html',
  styles: [` 
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `]
})

export class KategoriComponent implements OnInit {
 
 
  videoUrl:string;
  kategoriler:Kategori[];
  source: LocalDataSource = new LocalDataSource();
  kategori: Kategori;
  id:any;
  loading:boolean=true;
  temaDropDownList: { value: string, title: string,id:number }[] = [
    {title:"Social Scenes",value:"Social Scenes",id:1},  
    {title:"Gaze Match",value:"Gaze Match",id:2},
    {title:"Emotional Face",value:"Emotional Face",id:3},
    {title:"Emotion replay",value:"Emotion replay",id:4},
    {title:"Face Replay",value:"Face Replay",id:5},
    {title:"Custom",value:"Custom",id:6},
    {title:"Duyguyu İsimlendir",value:"Duyguyu İsimlendir",id:7}];

  constructor(private kategoriService: KategoriService, private dataBindService:BindDataService,
    private authHelper:AuthHelper) {
    this.kategori = new Kategori();
   
  }
 

  ngOnInit() {
    
      console.log('kategori sayfası')
      this.authHelper.session()
      this.authHelper.authorize()    
      this.getKategoriAll()

      }
    


  getKategoriAll(){
    this.kategoriService.getKategoriAll(true).subscribe(data =>{
      this.kategoriler = data;
      
      this.kategoriler.forEach(k => {
        if(k.isAktif){
          k.aktif ="Aktif"
        }else{
          k.aktif = "Pasif";
        }
        this.temaDropDownList.filter(t => k.tema==t.id).map(x=>{
            k.temaAdi = x.title

            
        })
      })
/*
      this.kategoriler.forEach(function(k){
        console.log('k',k)

        if(k.isAktif){
          k.aktif ="Aktif"
        }else{
          k.aktif = "Pasif";
        }
       })*/
      this.source.load(this.kategoriler);
      this.loading=false;
      console.log('kategoriler',this.kategoriler)
      
     
    });
  }
  addKategori(kategori){   
    
   return this.kategoriService.addKategori(kategori)
  }
  updateKategori(kategori:Kategori){
    return this.kategoriService.updateKategori(kategori)
  }
  
  deleteKategori(kategoriId:number){
    this.kategoriService.deleteKategori(kategoriId).subscribe(data =>{
      console.log('responseDelete',data)
    });
  }

  settings = {
    actions:{
      columnTitle:'Kategori',
      mode:'external'
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
      cancelButtonContent: '<i class="nb-close" ></i>',
      confirmSave: true,
     
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
     
      kategoriAdi: {
        title: 'Kategori Adı',
        type: 'string',
      },
      aciklama:{
        title: 'Açıklama',
        type: 'string',
      },
      aktif: {
        title: 'Aktif mi ?',
        type: 'string',
        filter:false
      },
      temaAdi: {
        title: 'Tema',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list:
              this.temaDropDownList,
          },
        },
      },
      url : {
        title:'Video',
        type:'custom',
        filter:false,
        renderComponent:VideoUploadComponent
      }
      
    },
  };
  
 

  onCreateConfirm(event) {
   
  event.newData.tema = this.temaDropDownList.find(d=> d.value==event.newData.temaAdi).id

    if(event.newData.aktif == "Aktif" || event.newData.aktif == "Pasif"){
      if(event.newData.aktif == "Aktif"){
        event.newData.isAktif = true;
      }else{
        event.newData.isAktif = false;
      }
      this.addKategori(event.newData).subscribe(data => {
        if(data){
          event.newData["kategoriID"] = data["kategoriID"]
          event.confirm.resolve(event.newData);
        }
      })
    
    }

  }

  onDeleteConfirm(event): void {
    console.log('ondelete')
    if (window.confirm('Are you sure you want to delete?')) {
      this.kategori = <Kategori>Object.keys(event).map(e => event[e])[0];
      
       
       this.deleteKategori(this.kategori["kategoriID"])
      event.confirm.resolve();
      
      //
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): void{

    event.newData.tema =this.temaDropDownList.find(d=> d.value==event.newData.temaAdi).id

    console.log("up",event.newData)


    if(event.newData.aktif == "Aktif" || event.newData.aktif == "Pasif"){
      if(event.newData.aktif == "Aktif"){
        event.newData.isAktif = true;
      }else{
        event.newData.isAktif = false;
      }
      this.updateKategori(event.newData).subscribe(data => {
        if(data){
          event.confirm.resolve(event.newData);
        }
      })
    }
  }

}
