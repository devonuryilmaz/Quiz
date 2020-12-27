import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { AtifKategori } from '../../../models/AtifKategori';
import { Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { KategoriService } from '../../admin/kategori/kategori.service';
import { VideoUploadCustomComponent } from '../../helper/video-upload-custom/video-upload-custom.component';

@Component({
  selector: 'atif-kategori',
  templateUrl: './atif-kategori.component.html',
  styleUrls: ['./atif-kategori.component.scss']
})
export class AtifKategoriComponent implements OnInit {
  progress:  number;
  uploadMessage;
  src;
  atif :AtifKategori = new AtifKategori();
  kategoriler:AtifKategori[];
  constructor( private kategoriService:KategoriService) { 

  }
  getKategori(){
    this.kategoriService.getAtifKategoriService(true).subscribe(d => {
      console.log('data',d)
      this.kategoriler = d;
      this.kategoriler.forEach(function(k){
       if(k.isAktif){
         k.aktif ="Aktif"
       }else{
         k.aktif = "Pasif";
       }
      })
      //this.source.load(datath,ss
      this.src = this.kategoriler
      console.log('source',this.src)
    })
  }
  onSaveConfirm(event): void{
    console.log('edit',event.newData)

    if(event.newData.aktif == "Aktif" || event.newData.aktif == "Pasif"){
      if(event.newData.aktif == "Aktif"){
        event.newData.isAktif = true;
      }else{
        event.newData.isAktif = false;
      }
      this.updateAtifKategori(event.newData).subscribe(data => {
        if(data){
          event.confirm.resolve(event.newData);
        }
      })
    
    }
  }
  updateAtifKategori(kategori:AtifKategori){
    return this.kategoriService.updateAtıfKategori(kategori)
  }
  
  ngOnInit() {
    this.getKategori()
    console.log('kategori sayfası')
  
    }
  settings = {
    hideSubHeader:true,
    actions:{
      columnTitle:'Kategori',
      mode:'external',
      delete:false,
      add:false
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
     
      aciklama: {
        title: 'Açıklama',
        type: 'string',
        filter:false
      },
      aktif: {
        title: 'Aktif mi ?',
        type: 'string',
        filter:false
      },
      videoUrl : {
        title:'Video',
        type:'custom',
        filter:false,
        renderComponent:VideoUploadCustomComponent
      }
      
    },
  };
 

}
