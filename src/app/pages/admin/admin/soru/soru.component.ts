import { Component, OnInit } from '@angular/core';
import { SoruService } from './soru.service';
import { SeviyeService } from '../seviye/seviye.service';
import { Soru } from '../../../models/soru';
import { Seviye } from '../../../models/seviye';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHelper } from '../../../auth/auth-helper';
import { VideoUploadComponent } from '../../helper/video-upload/video-upload.component';
import { BindDataService } from '../../helper/bind-data.service';
import { KategoriService } from '../kategori/kategori.service';
import { Kategori } from '../../../models/kategorii';

@Component({
  selector: 'soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.scss']
})
export class SoruComponent implements OnInit {
  settings: any;
  sorular: Soru[];
  videoUrl;
  soru: Soru;
  seviyeler: Seviye[];
  kategoriler: Kategori[];
  seviyeDropDownList: { value: string, title: string,id:number }[] = [];
  source: LocalDataSource = new LocalDataSource();
  loading:boolean=true;
  constructor(private soruService: SoruService,
    private seviyeService: SeviyeService,
    private kategoriService: KategoriService,
    private dataBindService:BindDataService,
    private authHelper:AuthHelper) {
      this.initializeSettings();
    this.soru = new Soru();
  }

  ngOnInit() {
    console.log('soru sayfası')
    this.authHelper.session()
    this.authHelper.authorize()
    this.getSeviyeAll();
  }


  getSeviyeAll() {
    this.kategoriService.getKategoriAll(true).subscribe(async data=>{
      this.kategoriler=data
    },error=>{},
    ()=>{

    
    this.seviyeService.getSeviyeAll(true).subscribe(data => {
      this.seviyeler = data;
      data.forEach((seviye, index) => {
        try {
          let kateAdi = this.kategoriler.find(k => k["kategoriID"] == seviye["kategoriID"])["kategoriAdi"]
          console.log("Seviye",seviye)
          seviye["seviyeNumarasi"]= kateAdi+"/" + seviye["seviyeNumarasi"]
          this.seviyeDropDownList.push({ value: seviye["seviyeNumarasi"], title: seviye["seviyeNumarasi"],id:seviye["seviyeID"] });
        } catch (error) {
           
        }
 
      })
      //Seviye Adı güncellemede gözükmüyor

      this.initializeSettings();
      this.getSoruAll();
    });
  })
  }
  
  addSoru(soru: Soru) {
    return this.soruService.addSoru(soru);
  }
  deleteSoru(id) {
    this.soruService.deleteSoru(id).subscribe(data => {
    });
  }

  getSoruAll() {
    this.soruService.getSoruAll(true).subscribe(data => {
      this.sorular = data;
      console.log('---sorular',this.sorular)
      this.sorular.forEach((soru, index) => {
        this.seviyeler.forEach((seviye, i) => {
          if (soru["seviyeID"] == seviye["seviyeID"]) {
            soru["seviyeAdi"] = seviye["seviyeNumarasi"]
            
          }
          if (soru["soruTipi"] == 1) {
            soru.soruTipAdi = "Resim";

          } else if (soru["soruTipi"] == 2) {
            soru.soruTipAdi = "Yazı";

          } else if (soru["soruTipi"] == 3) {
            soru.soruTipAdi = "Video";
          }
        })
        if(soru.isAktif){
          soru.aktif ="Aktif"
        }else{
          soru.aktif = "Pasif";
        }
      })
      this.source.load(this.sorular);
      this.loading=false;
    });

  }
  updateSoru(soru) {
    this.soruService.updateSoru(soru).subscribe(data => {
    });
  }
  getBySeviyeNameFetchId(name) {
    let s = this.seviyeler.find(s => s["seviyeNumarasi"] == name)
    let id = s["seviyeID"]
    return id;
  }
  getBySoruTipiNameFetchId(name) {
    let id;
    if (name == "Yazı") {
      id = 2;
    } else if (name == "Video") {
      id = 3;
    } else if (name == "Resim") {
      id = 1;
    }
    return id;
  }

  onCreateConfirm(event) {
     
    if(event.newData["aktif"] == "Aktif"){
      event.newData["isAktif"] = 1
    }else if(event.newData["aktif"] == "Pasif"){
      event.newData["isAktif"] =0
    }else{
      event.confirm.reject()
      return
    }
   
      this.soru = <Soru>Object.keys(event).map(e => event[e])[0];
      this.soru.SeviyeID =  this.seviyeDropDownList.find(s=> s.value == event.newData["seviyeAdi"]).id
      //let id = this.getBySeviyeNameFetchId(this.soru["seviyeAdi"]);
      //this.soru["SeviyeID"] = id;
      this.soru["soruTipi"] = this.getBySoruTipiNameFetchId(this.soru['soruTipAdi'])
      this.addSoru(this.soru).subscribe(data =>{
        if(data["soruID"]){
          event.newData["soruID"] = data["soruID"]
          event.confirm.resolve(event.newData);
        }else{
          event.confirm.reject();
        }
        
      })
      
  

    
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.soru = <Soru>Object.keys(event).map(e => event[e])[0];
      this.deleteSoru(this.soru['soruID'])
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): void {
    console.log('*****************event',event.newData)
    if(event.newData["aktif"] == "Aktif"){
      event.newData["isAktif"] = 1
    }else if(event.newData["aktif"] == "Pasif"){
      event.newData["isAktif"] =0
    }else{
      event.confirm.reject()
      return
    }
    let soru = new Soru();
    soru.SoruID = event.newData['soruID'];
    soru.SoruNumarasi = event.newData['soruNumarasi'];
    soru.SoruCumlesi = event.newData['soruCumlesi'];
    soru.soruIcerik = event.newData['soruIcerik']
    soru.isAktif = event.newData['isAktif']
    //let id = this.getBySeviyeNameFetchId(event.newData["seviyeAdi"]);
    let tipId = this.getBySoruTipiNameFetchId(event.newData["soruTipAdi"]);
    soru.SeviyeID =  this.seviyeDropDownList.find(s=> s.value == event.newData["seviyeAdi"]).id
    soru.SoruTipi = tipId
    console.log("soru",soru)
    this.updateSoru(soru)
    event.confirm.resolve(event.newData);
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
        soruNumarasi: {
          title: 'Sıra Numarası',
          type: 'string',
        },
        seviyeAdi: {
          title: 'Soru Seviyesi',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:
                this.seviyeDropDownList,
            },
          },
        },
        soruTipAdi: {
          title: 'Soru Tipi',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list: [{ value: 'Resim', title: 'Resim' },
              { value: 'Yazı', title: 'Yazı' },
              { value: 'Video', title: 'Video' }
              ]

            },
          },
        },
        soruCumlesi: {
          title: 'Soru Cümlesi',
          type: 'string',
        },
        
        soruIcerik:{
          title: 'Soru Metni',
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
          renderComponent:VideoUploadComponent 
        }
        
      },
    };
  }

}
