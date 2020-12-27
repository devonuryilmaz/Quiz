import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SeviyeService } from './seviye.service';
import { Seviye } from '../../../models/seviye';
import { Kategori } from '../../../models/kategorii';
import { KategoriService } from '../kategori/kategori.service';
import { AuthHelper } from '../../../auth/auth-helper';
import { OturumService } from '../oturum/oturum.service';
import { Oturum } from '../../../models/Oturum';

@Component({
  selector: 'seviye',
  templateUrl: './seviye.component.html',
  styleUrls: ['./seviye.component.scss']
})
export class SeviyeComponent implements OnInit {
  kategoriler: Kategori[];
  kategori: Kategori;
  seviyeler: Seviye[];
  seviye: Seviye;
  source: LocalDataSource = new LocalDataSource();
  kategoriDropDownList: { value: string, title: string }[] = [];
  settings: any;
  loading: boolean = true;
  oturumDropdownList: { value: string, title: string }[] = [];
  oturumlar: Oturum[];

  constructor(private seviyeService: SeviyeService, private kategoriService: KategoriService, private authHelper: AuthHelper,
    private oturumService: OturumService) {
    this.seviye = new Seviye();
    this.kategori = new Kategori();
    this.seviye.Kategori = this.kategori;
    this.initializeSettings();
  }
  ngOnInit() {
    this.authHelper.session()
    this.authHelper.authorize()
    this.getKategoriAll();
  }

  getOturumAll() {
    this.oturumService.getOturumlar().subscribe(data => {
      this.oturumlar = data;
      data.forEach((oturum, index) => {
        this.oturumDropdownList.push({ value: oturum["oturumAdi"], title: oturum["oturumAdi"] })
      })
      this.initializeSettings();
      this.getSeviyeOturumlar();
    })
  }

  getSeviyeOturumlar() {
    this.seviyeler.forEach((s, index) => {
      this.oturumlar.forEach((o, i) => {
        if (o["oturumID"] == s["oturumID"]) {
          console.log("girdi")
          s.oturumAdi = o["oturumAdi"]
        }
      })
    })
    console.log("oturum", this.seviyeler)
  }

  getKategoriAll() {
    this.kategoriService.getKategoriAll(true).subscribe(data => {
      this.kategoriler = data;
      data.forEach((kategori, index) => {
        //console.log('kategori',kategori)
        // this.kategoriDropDownList.push({ value: Object.keys(kategori).map(e => kategori[e])[2], title: Object.keys(kategori).map(e => kategori[e])[2] });
        this.kategoriDropDownList.push({ value: kategori["kategoriAdi"], title: kategori["kategoriAdi"] })
      })
      console.log('kategoriDropDownList', this.kategoriDropDownList)
      this.initializeSettings()
      this.getSeviyeAll();
    })
  }

  getSeviyeAll() {
    this.seviyeService.getSeviyeAll(true).subscribe(async data => {
      this.seviyeler = data;
      this.seviyeler.forEach((s, index) => {
        this.kategoriler.forEach((k, i) => {
          if (k["kategoriID"] == s["kategoriID"]) {
            s.kategoriAdi = k["kategoriAdi"]
          }
        })
        if (s.isAktif) {
          s.aktif = "Aktif"
        } else {
          s.aktif = "Pasif";
        }
      })
      this.source.load(this.seviyeler);
      this.loading = false;
      await this.getOturumAll();
    });
  }

  addSeviye(seviye: Seviye) {
    return this.seviyeService.addSeviye(seviye);
  }

  deleteSeviye(seviyeId: number) {
    this.seviyeService.deleteSeviye(seviyeId).subscribe(data => {
      console.log('responseDelete', data)
    });
  }
  updateSeviye(seviye: Seviye, id) {
    return this.seviyeService.updateSeviye(seviye, id)
  }

  getByKategoriNameFetchId(name) {
    let k = this.kategoriler.find(k => k["kategoriAdi"] == name)
    let id = k["kategoriID"]
    return id;
  }

  getByOturumAdiFetchId(name) {
    let o;
    let id;
    try {
      o = this.oturumlar.find(o => o["oturumAdi"] == name)
      id = o["oturumID"]
      return id;
    }
    catch{
      return 0;
    }
  }

  onCreateConfirm(event) {
    if (event.newData.aktif == "Aktif" || event.newData.aktif == "Pasif") {
      if (event.newData.aktif == "Aktif") {
        event.newData.isAktif = true;
      } else {
        event.newData.isAktif = false;
      }
      this.seviye = <Seviye>Object.keys(event).map(e => event[e])[0];
      let id = this.getByKategoriNameFetchId(event.newData["kategoriAdi"]);
      let oturumId = this.getByOturumAdiFetchId(event.newData["oturumAdi"]);
      this.seviye["kategoriID"] = id;
      this.seviye["oturumID"] = oturumId
      this.addSeviye(this.seviye).subscribe(data => {
        if (data["seviyeID"]) {
          event.newData["seviyeID"] = data["seviyeID"]
          event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      })
    }

  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.seviye = <Seviye>Object.keys(event).map(e => event[e])[0];
      this.deleteSeviye(this.seviye['seviyeID'])
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): void {
    console.log(event.newData)
    this.seviye = event.newData
    let id = this.getByKategoriNameFetchId(event.newData["kategoriAdi"]);
    let oturumId = this.getByOturumAdiFetchId(event.newData["oturumAdi"]);
    this.seviye["oturumID"] = oturumId
    if (event.newData.aktif == "Aktif" || event.newData.aktif == "Pasif") {
      if (event.newData.aktif == "Aktif") {
        event.newData.isAktif = true;
      } else {
        event.newData.isAktif = false;
      }
      this.updateSeviye(this.seviye, id).subscribe(data => {
        if (data) {
          event.confirm.resolve(event.newData);
        }
      })
    }
  }

  initializeSettings() {
    this.settings = {
      actions: {
        columnTitle: 'Seviye',
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
        kategoriAdi: {
          title: 'Kategori',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:
                this.kategoriDropDownList,
            },
          },
        },
        oturumAdi: {
          title: 'Oturum',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:
                this.oturumDropdownList,
            },
          },
        },
        seviyeNumarasi: {
          title: 'Seviye Adı',
          type: 'string',
        },
        siraNumarasi: {
          title: 'Sıra Numarası',
          type: 'string',
        },
        soruSuresi: {
          title: 'Soru Süresi',
          type: 'string',
        },
        aktif: {
          title: 'Aktif mi ?',
          type: 'string',
          filter: false
        },
        oturumSirasi: {
          title: 'Oturum Sırası',
          type: 'string',
        },
      },
    };
  }

}
