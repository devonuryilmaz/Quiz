import { Component, OnInit } from '@angular/core';
import { SoruFotografService } from './soru-fotograf.service';
import { SoruFoto } from '../../../models/SoruFoto';
import { LocalDataSource } from 'ng2-smart-table';
import { SoruService } from '../soru/soru.service';
import { Soru } from '../../../models/soru';
import { VideoUploadComponent } from '../../helper/video-upload/video-upload.component';

@Component({
  selector: 'soru-fotograf',
  templateUrl: './soru-fotograf.component.html',
  styleUrls: ['./soru-fotograf.component.scss']
})
export class SoruFotografComponent implements OnInit {

  constructor(private soruFotoService:SoruFotografService,private soruService:SoruService) { 
    this.initialize();
  }
  soruFotograf:SoruFoto;
  soruFotograflari:SoruFoto[];
  sorular:Soru[];
  soruDropDownList: { value: string, title: string }[] = [];
  settings:any
  source:LocalDataSource = new LocalDataSource();
  loading:boolean=true;
  ngOnInit() {
    this.soruGetAll();
  }

  addSoruFoto(SoruFoto: SoruFoto) {
    return this.soruFotoService.addSoruFoto(SoruFoto);
  }
  deleteSoruFoto(id) {
    this.soruFotoService.deleteSoruFoto(id).subscribe(data => {
    });
  }

  updateSoruFoto(soruFoto) {
    this.soruFotoService.updateSoruFoto(soruFoto).subscribe(data => {
      console.log("id", data)
    });
  }
  getBySoruNameFetchId(name) {

    let s = this.sorular.find(s => Object.keys(s).map(e => s[e])[6] == name )
    //console.log('s',s["soruID"])
    let id = s["soruID"]
    return id;
  }


  onCreateConfirm(event) {
    if (event.newData.amount != 50) {
      this.soruFotograf = <SoruFoto>Object.keys(event).map(e => event[e])[0];

      //let id = this.getBySoruNameFetchId(this.soruFotograf["SoruAdi"]);
      this.soruFotograf["soruID"] =  this.getBySoruNameFetchId(event.newData["SoruAdi"]);

     // console.log('fatih', this.secenek);
      this.addSoruFoto(this.soruFotograf).subscribe(data =>{
        if(data["id"]){
          event.newData["id"] = data["id"];
          event.confirm.resolve(event.newData);
        }else{
          event.confirm.reject();
        }
      })
      
    } 
      
    
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.soruFotograf = <SoruFoto>Object.keys(event).map(e => event[e])[0];
      this.deleteSoruFoto(this.soruFotograf['id'])
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  
  onSaveConfirm(event): void {
    let soruFoto = new SoruFoto();
    soruFoto["id"]= event.newData['id'];
    soruFoto["url"]=event.newData['url'];
    soruFoto["secenekAciklama"]=event.newData['secenekAciklama'];
    soruFoto['sira']=event.newData['sira'];
    let id = this.getBySoruNameFetchId(event.newData['SoruAdi']);
    soruFoto['soruID'] = id;
    console.log("update",soruFoto)
    this.updateSoruFoto(soruFoto);
    event.confirm.resolve(event.newData);
  }


  soruGetAll(){
    this.soruService.getSoruAll(true).subscribe(async data => {
      this.sorular = data;
      data.forEach((soru, index) => {
        console.log("sorular",soru)
        this.soruDropDownList.push({ value: Object.keys(soru).map(e => soru[e])[6], title: Object.keys(soru).map(e => soru[e])[6] });
      })
    },error=>{
      console.log("error")
    },
    ()=>{
      this.initialize();
      this.getSoruFotografAll();
    })

  }

  getSoruFotografAll(){
    this.soruFotoService.getAllSoruFotograflari().subscribe(async data=>{
      this.soruFotograflari = data;
      this.soruFotograflari.forEach((soruFoto, index) => {
        this.sorular.forEach((soru, i) => {
          if (soruFoto["soruID"] == soru["soruID"]) {
           
            soruFoto.SoruAdi = soru["soruCumlesi"]
             // console.log('soru adi',secenek.SoruAdi)
              //secenek.SoruID = soru["SoruID"]
          }})
      })
      this.source.load(this.soruFotograflari)
      this.loading=false;
    })
  }




  initialize(){
    this.settings={
      actions: {
        columnTitle: 'Soru Fotoğrafları'
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
        SoruAdi: {
          title: 'Sorular',
          
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:
                this.soruDropDownList,
            },
          },
        },
        secenekAciklama:{
          title:'Aciklama',
          type:'string'
        },
        sira:{
          title:'Sıra',
          type:'number'
        },
        url : {
          title:'Video',
          type:'custom',
          filter:false,
          renderComponent:VideoUploadComponent
        }
        
      },
    };
  }


}
