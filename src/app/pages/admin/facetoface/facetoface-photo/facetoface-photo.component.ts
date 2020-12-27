import { Component, OnInit } from '@angular/core';
import { FaceToFaceSoru } from '../../../models/FacetofaceSoru';
import { LocalDataSource } from 'ng2-smart-table';
import { FacetofaceSeviye } from '../../../models/FacetoFaceSeviye';
import { SoruService } from '../../admin/soru/soru.service';
import { SeviyeService } from '../../admin/seviye/seviye.service';
import { FaceToFacePhoto } from '../../../models/FacetofacePhoto';
import { VideoUploadCustomSoruComponent } from '../../helper/video-upload-custom-soru/video-upload-custom-soru.component';

@Component({
  selector: 'facetoface-photo',
  templateUrl: './facetoface-photo.component.html',
  styleUrls: ['./facetoface-photo.component.scss']
})
export class FacetofacePhotoComponent implements OnInit {

 
  settings: any;
  sorularPhoto: FaceToFacePhoto[];
  videoUrl;
  loading:boolean=true;
  sorular: FaceToFaceSoru[];
  seviyeDropDownList: { value: string, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  constructor(private soruService:SoruService, private seviyeSeviyeService:SeviyeService) { }
 
  ngOnInit() {
    this.getSoruAll()
    this.initializeSettings();
  }

  getFAcePhotoSoruAll(){
    this.soruService.getFaceSoruPhotoAll().subscribe(data => {
      this.sorularPhoto = data;
      console.log('sorular photo',this.sorularPhoto)
      this.sorularPhoto.forEach((photo, index) => {
        this.sorular.forEach((soru, i) => {
          if(photo["faceToFaceSoruID"] == soru["id"]){
            
            photo["soruAdi"] = soru["aciklama"]
          }
        })
      
      })
      this.initializeSettings();
     
      this.source.load(this.sorularPhoto);
      this.loading=false;
    })
    
  }
  getSoruAll(){
    this.soruService.getFacetoFaceSoruAll(true).subscribe(data => {
      this.sorular = data;
      console.log('sorular',this.sorular)
      data.forEach((seviye, index) => {
        //this.seviyeDropDownList.push({ value: Object.keys(seviye).map(e => seviye[e])[1], title: Object.keys(seviye).map(e => seviye[e])[1] });
        this.seviyeDropDownList.push({value:seviye["aciklama"],title:seviye["aciklama"]})

      })
    
      
      this.getFAcePhotoSoruAll();
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
      
        soruAdi: {
          title: 'Sorular',
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
          title: 'Fotoğraf Açıklama',
          type: 'string',
        },
        url : {
          title:'Fotoğraf',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadCustomSoruComponent
        }
        
      },
    };
  }
  
  addFacePhoto(soru:FaceToFacePhoto){
    return this.soruService.addFacetofacePhoto(soru)
  }
  getBySeviye(photo){
    let s = this.sorular.find(s => s["aciklama"] == photo)
    return s["id"] ? s["id"] : -1;
  }
  deleteFacePhoto(id){
    return this.soruService.deleteFacetofacePhoto(id)
  }
  onDeleteConfirm(event){
    if (window.confirm('Are you sure you want to delete?')) {
    console.log('event',event.data["id"])
    if(event.data["id"] > 0){
      this.deleteFacePhoto(event.data["id"]).subscribe(() => {
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
  updateFacePhoto(soru:FaceToFacePhoto){
   return this.soruService.updateFacetofacePhoto(soru)
  }
  onSaveConfirm(event): void {
    
  
    event.newData["faceToFaceSoruID"] = this.getBySeviye(event.newData["soruAdi"])
   
    this.updateFacePhoto(event.newData).subscribe(data => {
      if(data["id"]){
        event.confirm.resolve(event.newData);
      }else{
        event.confirm.reject();
      }
    } )
    
  }
  onCreateConfirm(event){
   
    event.newData["faceToFaceSoruID"] = this.getBySeviye(event.newData["soruAdi"])
    this.addFacePhoto(event.newData).subscribe(data => {
      if(data["id"]){
        event.newData["id"] = data["id"]
        event.confirm.resolve(event.newData)
      }else{
        event.confirm.reject()
      }
    })
  }


}
