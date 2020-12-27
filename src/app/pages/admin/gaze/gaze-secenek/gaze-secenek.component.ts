import { Component, OnInit } from '@angular/core';
import { VideoUploadCustomSoruComponent } from '../../helper/video-upload-custom-soru/video-upload-custom-soru.component';
import { FaceToFaceSoru } from '../../../models/FacetofaceSoru';
import { GazeCastCevap } from '../../../models/GazeCevap';
import { LocalDataSource } from 'ng2-smart-table';
import { SecenekService } from '../../admin/secenek/secenek.service';
import { SoruService } from '../../admin/soru/soru.service';
import { GazeSoru } from '../../../models/GazeSoru';
import { VideoUploadGazeSecenek1Component } from '../../helper/video-upload-gaze-secenek1/video-upload-gaze-secenek1.component';
import { VideoUploadGazeSecenek2Component } from '../../helper/video-upload-gaze-secenek2/video-upload-gaze-secenek2.component';
import { VideoUploadGazeSecenek3Component } from '../../helper/video-upload-gaze-secenek3/video-upload-gaze-secenek3.component';
import { VideoUploadGazeSecenek4Component } from '../../helper/video-upload-gaze-secenek4/video-upload-gaze-secenek4.component';
import { VideoUploadGazeSecenek5Component } from '../../helper/video-upload-gaze-secenek5/video-upload-gaze-secenek5.component';
import { VideoUploadGazeSecenek6Component } from '../../helper/video-upload-gaze-secenek6/video-upload-gaze-secenek6.component';
import { VideoUploadGazeSecenek7Component } from '../../helper/video-upload-gaze-secenek7/video-upload-gaze-secenek7.component';
import { VideoUploadGazeSecenek8Component } from '../../helper/video-upload-gaze-secenek8/video-upload-gaze-secenek8.component';

@Component({
  selector: 'gaze-secenek',
  templateUrl: './gaze-secenek.component.html',
  styleUrls: ['./gaze-secenek.component.scss']
})
export class GazeSecenekComponent implements OnInit {

  
  settings: any;
  gazeCevap: GazeCastCevap[];
  loading:boolean=true;
  
  sorular: GazeSoru[];
  seviyeDropDownList: { value: string, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  constructor(private secenekService:SecenekService, private soruService:SoruService) { }
 
  ngOnInit() {
    this.getSoruAll()
    this.initializeSettings();
  }

  getGazeCevapAll(){
    this.secenekService.getGazeCevapAll().subscribe(data => {
      this.gazeCevap = data;
      console.log('gaze cevaplar',this.gazeCevap)
      this.gazeCevap.forEach((secenek, index) => {
        this.sorular.forEach((soru, i) => {
          if(secenek["gazeCastSoruID"] == soru["id"]){
            
            secenek["soruAdi"] = soru["aciklama"]
          }
        })
        if(secenek["photo1isTrue"] == true){
          secenek["dogruMu1"] = "Doğru";
        }else{
          secenek["dogruMu1"] = "Yanlış";
        }

        if(secenek["photo2isTrue"] == true){
          secenek["dogruMu2"] = "Doğru";
        }else{
          secenek["dogruMu2"] = "Yanlış";
        }

        if(secenek["photo3isTrue"] == true){
          secenek["dogruMu3"] = "Doğru";
        }else{
          secenek["dogruMu3"] = "Yanlış";
        }

        if(secenek["photo4isTrue"] == true){
          secenek["dogruMu4"] = "Doğru";
        }else{
          secenek["dogruMu4"] = "Yanlış";
        }

        if(secenek["photo5isTrue"] == true){
          secenek["dogruMu5"] = "Doğru";
        }else{
          secenek["dogruMu5"] = "Yanlış";
        }

        if(secenek["photo6isTrue"] == true){
          secenek["dogruMu6"] = "Doğru";
        }else{
          secenek["dogruMu6"] = "Yanlış";
        }

        if(secenek["photo7isTrue"] == true){
          secenek["dogruMu7"] = "Doğru";
        }else{
          secenek["dogruMu7"] = "Yanlış";
        }

        if(secenek["photo8isTrue"] == true){
          secenek["dogruMu8"] = "Doğru";
        }else{
          secenek["dogruMu8"] = "Yanlış";
        }
      
      })
      this.initializeSettings();
     
      this.source.load(this.gazeCevap);
      this.loading=false;
    })
    
  }
  getSoruAll(){
    this.soruService.getGazeSoruAll(true).subscribe(data => {
      this.sorular = data;
      console.log('sorular',this.sorular)
      data.forEach((seviye, index) => {
        this.seviyeDropDownList.push({value:seviye["aciklama"],title:seviye["aciklama"]})
      })  
      this.getGazeCevapAll();
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
       
        url1 : {
          title:'Fotoğraf1',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek1Component,
          isAdd:false
        },
        dogruMu1: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },
        url2 : {
          title:'Fotoğraf2',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek2Component
        },
        dogruMu2: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },
        url3 : {
          title:'Fotoğraf3',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek3Component
        },
        dogruMu3: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },
        url4 : {
          title:'Fotoğraf4',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek4Component
        },
        dogruMu4: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },
        url5 : {
          title:'Fotoğraf5',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek5Component
        },
        dogruMu5: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },
        url6 : {
          title:'Fotoğraf6',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek6Component
        },
        dogruMu6: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },

        url7 : {
          title:'Fotoğraf7',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek7Component
        },
        dogruMu7: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },

        url8 : {
          title:'Fotoğraf8',
          type:'custom',
          editable:false,
          filter:false,
          renderComponent:VideoUploadGazeSecenek8Component
        },
        dogruMu8: {
          title: 'Doğru Mu?',
          type:'boolean',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Doğru', title: 'Doğru' },
              { value: 'Yanlış', title: 'Yanlış' },
              ]
            },
          },
        },
      },
    };
  }
  
  addGazeSecenek(secenek:GazeCastCevap){
    return this.secenekService.addGazeSecenek(secenek)
  }
  getBySeviye(photo){
    let s = this.sorular.find(s => s["aciklama"] == photo)
    return s["id"] ? s["id"] : -1;
  }
   onCreateConfirm(event){
    if(event.newData["dogruMu1"] == "Doğru"){
      event.newData["Photo1isTrue"] = true;
    }else if(event.newData["dogruMu1"] == "Yanlış"){
      event.newData["Photo1isTrue"] = false;
    }

    if(event.newData["dogruMu2"] == "Doğru"){
      event.newData["Photo2isTrue"] = true;
    }else if(event.newData["dogruMu2"] == "Yanlış"){
      event.newData["Photo2isTrue"] = false;
    }

    if(event.newData["dogruMu3"] == "Doğru"){
      event.newData["Photo3isTrue"] = true;
    }else if(event.newData["dogruMu3"] == "Yanlış"){
      event.newData["Photo3isTrue"] = false;
    }

    if(event.newData["dogruMu4"] == "Doğru"){
      event.newData["Photo4isTrue"] = true;
    }else if(event.newData["dogruMu4"] == "Yanlış"){
      event.newData["Photo4isTrue"] = false;
    }

    if(event.newData["dogruMu5"] == "Doğru"){
      event.newData["Photo5isTrue"] = true;
    }else if(event.newData["dogruMu5"] == "Yanlış"){
      event.newData["Photo5isTrue"] = false;
    }
    if(event.newData["dogruMu6"] == "Doğru"){
      event.newData["Photo6isTrue"] = true;
    }else if(event.newData["dogruMu6"] == "Yanlış"){
      event.newData["Photo6isTrue"] = false;
    }

    if(event.newData["dogruMu7"] == "Doğru"){
      event.newData["Photo7isTrue"] = true;
    }else if(event.newData["dogruMu7"] == "Yanlış"){
      event.newData["Photo7isTrue"] = false;
    }

    if(event.newData["dogruMu8"] == "Doğru"){
      event.newData["Photo8isTrue"] = true;
    }else if(event.newData["dogruMu8"] == "Yanlış"){
      event.newData["Photo8isTrue"] = false;
    }
    event.newData["gazeCastSoruID"] = this.getBySeviye(event.newData["soruAdi"])
    this.addGazeSecenek(event.newData).subscribe(data => {
      if(data["id"]){
        event.newData["id"] = data["id"]
        event.confirm.resolve(event.newData)
      }else{
        event.confirm.reject()
      }
    })
  }
  
  deleteGazeSecenek(id){
    return this.secenekService.deleteGazeSecenek(id)
  }
  onDeleteConfirm(event){
    if (window.confirm('Are you sure you want to delete?')) {
    console.log('event',event.data["id"])
    if(event.data["id"] > 0){
      this.deleteGazeSecenek(event.data["id"]).subscribe(() => {
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
  
  updateGazeSecenek(secenek:GazeCastCevap){
   return this.secenekService.updateGazeSecenek(secenek)
  }
  onSaveConfirm(event): void {
    if(event.newData["dogruMu1"] == "Doğru"){
      event.newData["Photo1isTrue"] = true;
    }else if(event.newData["dogruMu1"] == "Yanlış"){
      event.newData["Photo1isTrue"] = false;
    }

    if(event.newData["dogruMu2"] == "Doğru"){
      event.newData["Photo2isTrue"] = true;
    }else if(event.newData["dogruMu2"] == "Yanlış"){
      event.newData["Photo2isTrue"] = false;
    }

    if(event.newData["dogruMu3"] == "Doğru"){
      event.newData["Photo3isTrue"] = true;
    }else if(event.newData["dogruMu3"] == "Yanlış"){
      event.newData["Photo3isTrue"] = false;
    }

    if(event.newData["dogruMu4"] == "Doğru"){
      event.newData["Photo4isTrue"] = true;
    }else if(event.newData["dogruMu4"] == "Yanlış"){
      event.newData["Photo4isTrue"] = false;
    }
  
    if(event.newData["dogruMu5"] == "Doğru"){
      event.newData["Photo5isTrue"] = true;
    }else if(event.newData["dogruMu5"] == "Yanlış"){
      event.newData["Photo5isTrue"] = false;
    }
    if(event.newData["dogruMu6"] == "Doğru"){
      event.newData["Photo6isTrue"] = true;
    }else if(event.newData["dogruMu6"] == "Yanlış"){
      event.newData["Photo6isTrue"] = false;
    }

    if(event.newData["dogruMu7"] == "Doğru"){
      event.newData["Photo7isTrue"] = true;
    }else if(event.newData["dogruMu7"] == "Yanlış"){
      event.newData["Photo7isTrue"] = false;
    }

    if(event.newData["dogruMu8"] == "Doğru"){
      event.newData["Photo8isTrue"] = true;
    }else if(event.newData["dogruMu8"] == "Yanlış"){
      event.newData["Photo8isTrue"] = false;
    }
    event.newData["gazeCastSoruID"] = this.getBySeviye(event.newData["soruAdi"])
   
    this.updateGazeSecenek(event.newData).subscribe(data => {
      if(data["id"]){
        event.confirm.resolve(event.newData);
      }else{
        event.confirm.reject();
      }
    } )
    
  }
 


}
