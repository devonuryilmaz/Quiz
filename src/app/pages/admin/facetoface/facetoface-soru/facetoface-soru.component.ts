import { Component, OnInit } from '@angular/core';
import { FaceToFaceSoru } from '../../../models/FacetofaceSoru';
import { FacetofaceSeviye } from '../../../models/FacetoFaceSeviye';
import { LocalDataSource } from 'ng2-smart-table';
import { SoruService } from '../../admin/soru/soru.service';
import { SeviyeService } from '../../admin/seviye/seviye.service';

@Component({
  selector: 'facetoface-soru',
  templateUrl: './facetoface-soru.component.html',
  styleUrls: ['./facetoface-soru.component.scss']
})
export class FacetofaceSoruComponent implements OnInit {

  settings: any;
  sorular: FaceToFaceSoru[];
  videoUrl;
  loading:boolean=true;
  seviyeler: FacetofaceSeviye[];
  seviyeDropDownList: { value: string, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  constructor(private soruService:SoruService, private seviyeSeviyeService:SeviyeService) { }
 
  ngOnInit() {
    this.getSeviyeAll()
    this.initializeSettings();
  }

  getFAceSoruAll(){
    this.soruService.getFacetoFaceSoruAll(true).subscribe(data => {
      this.sorular = data;
      console.log('sorular face',this.sorular)
      this.sorular.forEach((soru, index) => {
        this.seviyeler.forEach((seviye, i) => {
          if(soru["faceToFaceID"] == seviye["id"]){
            
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
    this.seviyeSeviyeService.getFacetoFaceSeviyeAll(true).subscribe(data => {
      this.seviyeler = data;
      data.forEach((seviye, index) => {
        //this.seviyeDropDownList.push({ value: Object.keys(seviye).map(e => seviye[e])[1], title: Object.keys(seviye).map(e => seviye[e])[1] });
        this.seviyeDropDownList.push({value:seviye["aciklama"],title:seviye["aciklama"]})

      })
      console.log('dropdown',this.seviyeDropDownList)
      
      this.getFAceSoruAll();
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
       
        siraNumarasi:{
          title: 'Sıra Numarası',
          type: 'string',
        },
    
        aktif:{
          title: 'Aktif mi?',
          type: 'string',
        }
        
      },
    };
  }
  addFaceSoru(soru:FaceToFaceSoru){
    return this.soruService.addFacetofaceSoru(soru)
  }
  getBySeviye(seviye){
    let s = this.seviyeler.find(s => s["aciklama"] == seviye)
    return s["id"] ? s["id"] : -1;
  }
  deleteFace(id){
    return this.soruService.deleteFacetofaceSoru(id)
  }
  onDeleteConfirm(event){
    if (window.confirm('Are you sure you want to delete?')) {
    console.log('event',event.data["id"])
    if(event.data["id"] > 0){
      this.deleteFace(event.data["id"]).subscribe(() => {
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
  updateFace(soru:FaceToFaceSoru){
   return this.soruService.updateFacetofaceSoru(soru)
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
    event.newData["faceToFaceID"] = this.getBySeviye(event.newData["seviyeAdi"])
   
    this.updateFace(event.newData).subscribe(data => {
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
    event.newData["faceToFaceID"] = this.getBySeviye(event.newData["seviyeAdi"])
    this.addFaceSoru(event.newData).subscribe(data => {
      if(data["id"]){
        event.newData["id"] = data["id"]
        event.confirm.resolve(event.newData)
      }else{
        event.confirm.reject()
      }
    })
  }

}
