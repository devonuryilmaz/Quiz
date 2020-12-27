import { Component, OnInit } from '@angular/core';
import { GazeSoru } from '../../../models/GazeSoru';
import { GazeSeviye } from '../../../models/GazeSeviye';
import { LocalDataSource } from 'ng2-smart-table';
import { SoruService } from '../../admin/soru/soru.service';
import { SeviyeService } from '../../admin/seviye/seviye.service';
import { VideoUploadCustomSoruComponent } from '../../helper/video-upload-custom-soru/video-upload-custom-soru.component';

@Component({
  selector: 'gaze-soru',
  templateUrl: './gaze-soru.component.html',
  styleUrls: ['./gaze-soru.component.scss']
})
export class GazeSoruComponent implements OnInit {
  settings: any;
  sorular: GazeSoru[];
  videoUrl;
  soru: GazeSoru;
  loading:boolean=true;
  seviyeler: GazeSeviye[];
  seviyeDropDownList: { value: string, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  constructor(private soruService:SoruService, private seviyeSeviyeService:SeviyeService) { }
 
  ngOnInit() {
    this.getSeviyeAll()
    this.initializeSettings();

  }

  getAtifSoruAll(){
    this.soruService.getGazeSoruAll(true).subscribe(data => {
      this.sorular = data;
      console.log('sorular gaze',this.sorular)
      this.sorular.forEach((soru, index) => {
        this.seviyeler.forEach((seviye, i) => {
          if(soru["gazeCastID"] == seviye["id"]){
            
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
    this.seviyeSeviyeService.getGazeCastSeviyeSeviyeAll(true).subscribe(data => {
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
       
        sıraNumarasi:{
          title: 'Sıra Numarası',
          type: 'string',
        },
        aktif:{
          title: 'Aktif mi?',
          type: 'string',
        },
        videoUrl : {
          title:'Video',
          type:'custom',
          filter:false,
          renderComponent:VideoUploadCustomSoruComponent
        }
      
      },
    };
  }
  addAtıfSoru(soru:GazeSoru){
    return this.soruService.addGazeSoru(soru)
  }
  getBySeviye(seviye){
    let s = this.seviyeler.find(s => s["aciklama"] == seviye)
    return s["id"] ? s["id"] : -1;
  }
  deleteAtif(id){
    return this.soruService.deleteGazeSoru(id)
  }
  onDeleteConfirm(event){
    if (window.confirm('Are you sure you want to delete?')) {
    console.log('event',event.data["id"])
    if(event.data["id"] > 0){
      this.deleteAtif(event.data["id"]).subscribe(() => {
        event.confirm.resolve()
      })
    }
    else{
      event.confirm.reject()
    }
  }else{
    event.confirm.reject()
  }
  }
  updateAtif(soru:GazeSoru){
   return this.soruService.updateGazeSoru(soru)
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
    event.newData["gazeCastID"] = this.getBySeviye(event.newData["seviyeAdi"])
   
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
    event.newData["gazeCastID"] = this.getBySeviye(event.newData["seviyeAdi"])
    this.addAtıfSoru(event.newData).subscribe(data => {
      if(data["id"]){
        event.newData["id"] = data["id"]
        event.confirm.resolve(event.newData)
      }else{
        event.confirm.reject()
      }
    })
  }
}
