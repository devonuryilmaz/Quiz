import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AtifSeviye } from '../../../models/AtifSeviye';
import { AtıfSoru } from '../../../models/AtifSoru';
import { SoruService } from '../../admin/soru/soru.service';
import { SeviyeService } from '../../admin/seviye/seviye.service';
import { VideoUploadCustomComponent } from '../../helper/video-upload-custom/video-upload-custom.component';
import { VideoUploadCustomSoruComponent } from '../../helper/video-upload-custom-soru/video-upload-custom-soru.component';

@Component({
  selector: 'atif-soru',
  templateUrl: './atif-soru.component.html',
  styleUrls: ['./atif-soru.component.scss']
})
export class AtifSoruComponent implements OnInit {
  settings: any;
  sorular: AtıfSoru[];
  videoUrl;
  soru: AtıfSoru;
  seviyeler: AtifSeviye[];
  seviyeDropDownList: { value: string, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  loading:boolean=true;
  constructor(private soruService:SoruService, private seviyeSeviyeService:SeviyeService) { }
 
  ngOnInit() {
    this.getSeviyeAll()
    this.initializeSettings();
  }

  getAtifSoruAll(){
    this.soruService.getAtıfSoruAll(true).subscribe(data => {
      this.sorular = data;
      console.log('sorular atıf',this.sorular)
      this.sorular.forEach((soru, index) => {
        this.seviyeler.forEach((seviye, i) => {
          if(soru["atıfID"] == seviye["id"]){
            
            soru["seviyeAdi"] = seviye["aciklama"]
          }
        })

        if(soru["isAktif"]){
          soru["aktif"] = "Aktif";
        }else{
          soru["aktif"] = "Pasif";
        }
        
      })
      this.initializeSettings();
     
      this.source.load(this.sorular);
      this.loading=false;
    })
    
  }
  getSeviyeAll(){
    this.seviyeSeviyeService.getAtifSeviyeAll(true).subscribe(data => {
      this.seviyeler = data;
      data.forEach((seviye, index) => {
        //this.seviyeDropDownList.push({ value: Object.keys(seviye).map(e => seviye[e])[1], title: Object.keys(seviye).map(e => seviye[e])[1] });
        this.seviyeDropDownList.push({value:seviye["aciklama"],title:seviye["aciklama"]})

      })
      console.log('dropdown',this.seviyeDropDownList)
      
      this.getAtifSoruAll();
    })
  }

  initializeSettings() {
    this.settings = {
      actions: {
        columnTitle: 'Sorular'
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
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
      
        seviyeAdi: {
          title: 'Seviyeler',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:
                this.seviyeDropDownList,
            },
          },
        },
        
        aciklama:{
          title: 'Soru Cümlesi',
          type: 'string',
        },
      
        sıraNumara:{
          title: 'Sıra Numarası',
          type: 'string',
        },
        aktif:{
          title: 'Aktif mi?',
          type: 'string',
        },
        url : {
          title:'Video',
          type:'custom',
          filter:false,
          renderComponent:VideoUploadCustomSoruComponent
        }
      
      },
    };
  }
  addAtıfSoru(soru:AtıfSoru){
    return this.soruService.addAtıfSoru(soru)
  }
  getBySeviye(seviye){
    let s = this.seviyeler.find(s => s["aciklama"] == seviye)
    return s["id"] ? s["id"] : -1;
  }
  deleteAtif(id){
    return this.soruService.deleteAtifSoru(id)
  }
  onDeleteConfirm(event){
    if (window.confirm('Are you sure you want to delete?')) {
    console.log('event',event)
    if(event.data["id"] > 0){
      this.deleteAtif(event.data["id"]).subscribe(() => {
        event.confirm.resolve()
      })
    }
    else{
      event.confirm.reject()
    }
  }
  else{
    event.confirm.reject()
  }
  }
  updateAtif(soru:AtıfSoru){
    return this.soruService.updateAtıfSoru(soru)
  }
  onSaveConfirm(event): void {
    
    if(event.newData["aktif"] == "Aktif"){
      event.newData["isAktif"] = 1
    }else if(event.newData["aktif"] == "Pasif"){
      event.newData["isAktif"] =0
    }else{
      event.confirm.reject()
      return
    }
    event.newData["atıfID"] = this.getBySeviye(event.newData["seviyeAdi"])
   
    this.updateAtif(event.newData).subscribe(data => {
      if(data["id"]){
        event.confirm.resolve(event.newData);
      }else{
        event.confirm.reject();
      }
    } )
    
  }
  onCreateConfirm(event){
   
    if(event.newData["aktif"] == "Aktif"){
      event.newData["isAktif"] = 1
    }else if(event.newData["aktif"] == "Pasif"){
      event.newData["isAktif"] =0
    }else{
      event.confirm.reject()
      return
    }
    event.newData["atıfID"] = this.getBySeviye(event.newData["seviyeAdi"])
   // console.log('event newdata 1',event.newdata["id"])
    this.addAtıfSoru(event.newData).subscribe(data => {
      if(data["id"]){
        console.log('event data',event)

        event.newData["id"] = data["id"]

        event.confirm.resolve(event.newData)
      }else{
        event.confirm.reject()
      }
    })
  }
}
