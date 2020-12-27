import { Component, OnInit } from '@angular/core';
import { SoruService } from '../soru/soru.service';
import { SecenekService } from './secenek.service';
import { Soru } from '../../../models/soru';
import { Secenek } from '../../../models/secenek';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthHelper } from '../../../auth/auth-helper';
import { VideoUploadComponent } from '../../helper/video-upload/video-upload.component';
import { BindDataService } from '../../helper/bind-data.service';
import { KategoriService } from '../kategori/kategori.service';
import { SeviyeService } from '../seviye/seviye.service';

@Component({
  selector: 'secenek',
  templateUrl: './secenek.component.html',
  styleUrls: ['./secenek.component.scss']
})
export class SecenekComponent implements OnInit {
  settings: any;
  videoUrl;
  secenekler: Secenek[];
  secenek: Secenek;
  sorular: Soru[];
  soruDropDownList: { value: string, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  loading:boolean=true;
  constructor(private soruService: SoruService,
    private secenekService: SecenekService,
    private seviyeService: SeviyeService,
    private kategoriService: KategoriService,
    private authHelper:AuthHelper,
    private dataBindService:BindDataService) {
      this.initializeSettings();
    this.secenek = new Secenek();
  }

  ngOnInit() {
    console.log('seçenek sayfası')
    this.authHelper.session()
    this.authHelper.authorize()
    this.getSoruAll();

  }
  getSoruAll() {
    this.soruService.getSoruAll(true).subscribe(async data => {
      this.sorular = data;
      data.forEach((soru, index) => {
        console.log("sorular",Object.keys(soru))
        this.soruDropDownList.push({ value: Object.keys(soru).map(e => soru[e])[6], title: Object.keys(soru).map(e => soru[e])[6] });
      })
        
      this.getSecenekAll();
      this.initializeSettings();
    });

  }
  addSecenek(secenek: Secenek) {
    return this.secenekService.addSecenek(secenek);
  }
  deleteSecenek(id) {
    this.secenekService.deleteSecenek(id).subscribe(data => {
    });
  }

  getSecenekAll() {
    this.secenekService.getSecenekAll().subscribe(data => {
      this.secenekler = data;
      console.log('secenekler',this.secenekler)
      this.secenekler.forEach((secenek, index) => {
        this.sorular.forEach((soru, i) => {
          if (secenek["soruID"] == soru["soruID"]) {
           
              secenek.SoruAdi = soru["soruCumlesi"]
             // console.log('soru adi',secenek.SoruAdi)
              //secenek.SoruID = soru["SoruID"]
          }
          if (secenek["isTrue"] == true) {
            secenek.isTrue = true;
            secenek.dogruMu= "Doğru";

          } else if (secenek["isTrue"] == false) {
            secenek.isTrue = false;
            secenek.dogruMu= "Yanlış";


          }
        })
      })
      this.source.load(this.secenekler);
      this.loading=false;
    });

  }
  updateSecenek(secenek) {
    this.secenekService.updateSecenek(secenek).subscribe(data => {
    });
  }
  getBySoruNameFetchId(name) {

    let s = this.sorular.find(s => Object.keys(s).map(e => s[e])[6] == name )
    //console.log('s',s["soruID"])
    let id = s["soruID"]
    return id;
  }
  getByDogruCevapNameFetchId(name) {
    let id;
   // console.log("sa",name);
    if (name == "Doğru") {
      id = true;
    } else if (name == "Yanlış") {
      id = false;
    }
    return id;
  }

  onCreateConfirm(event) {
    if (event.newData.amount != 50) {
      this.secenek = <Secenek>Object.keys(event).map(e => event[e])[0];

      //let id = this.getBySoruNameFetchId(this.secenek["SoruAdi"]);
      this.secenek["soruID"] = this.getBySoruNameFetchId(event.newData["SoruAdi"]);

      this.secenek["isTrue"] = this.getByDogruCevapNameFetchId(this.secenek['dogruMu'])
      console.log("sec",this.secenek)
     // console.log('fatih', this.secenek);
      this.addSecenek(this.secenek).subscribe(data =>{
        if(data["secenekID"]){
          event.newData["secenekID"] = data["secenekID"];
          event.confirm.resolve(event.newData);
        }else{
          event.confirm.reject();
        }
      })
      
    } 
      
    
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.secenek = <Secenek>Object.keys(event).map(e => event[e])[0];
      this.deleteSecenek(this.secenek['secenekID'])
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): void {
    console.log(event.newData)
    let secenek = new Secenek();
    secenek.SoruID = event.newData['soruID'];
    secenek.Icerik = event.newData['icerik'];
    secenek.SecenekID = event.newData['secenekID'];
    secenek.isTrue= event.newData['isTrue'];
    //secenek.SoruID = parseInt(event.newData["SoruAdi"]);
    let id = this.getBySoruNameFetchId(event.newData['SoruAdi']);
    let isTrue = this.getByDogruCevapNameFetchId(event.newData['dogruMu']);
    secenek.SoruID = id;
    secenek.isTrue = isTrue;

    this.updateSecenek(secenek);
    event.confirm.resolve(event.newData);
    
  }
  initializeSettings() {
    this.settings = {
      actions: {
        columnTitle: 'Secenekler'
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
        icerik: {
          title: 'İçerik',
          type: 'string',
        },
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
        dogruMu: {
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