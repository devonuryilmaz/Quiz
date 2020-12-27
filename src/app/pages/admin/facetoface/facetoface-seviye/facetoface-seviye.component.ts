import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SeviyeService } from '../../admin/seviye/seviye.service';
import { FacetofaceSeviye } from '../../../models/FacetoFaceSeviye';
import { OturumService } from '../../admin/oturum/oturum.service';
import { Oturum } from '../../../models/Oturum';

@Component({
  selector: 'facetoface-seviye',
  templateUrl: './facetoface-seviye.component.html',
  styleUrls: ['./facetoface-seviye.component.scss']
})
export class FacetofaceSeviyeComponent implements OnInit {

  seviyeler = [];
  source: LocalDataSource = new LocalDataSource();
  loading: boolean = true;
  oturumDropdownList: { value: string, title: string }[] = [];
  oturumlar: Oturum[];
  settings: any;
  constructor(private seviyeService: SeviyeService, private oturumService: OturumService) { }

  ngOnInit() {
    this.initializeSettings();
    this.getfaceSeviyeSeviyeAll()
  }
  getfaceSeviyeSeviyeAll() {
    this.seviyeService.getFacetoFaceSeviyeAll(true).subscribe(async data => {
      this.seviyeler = data;
      this.source.load(this.seviyeler)
      this.seviyeler.forEach(function (k) {
        if (k.isAktif) {
          k.aktif = "Aktif"
        } else {
          k.aktif = "Pasif";
        }
      })
      console.log('seviyeler', this.seviyeler)
      this.loading = false;
      await this.getOturumAll()
    })
  }
  deletefaceSeviyeSeviye(id) {
    return this.seviyeService.deleteFaceToFaceSeviyeSeviye(id)
  }

  addfaceSeviyeSeviye(seviye) {
    return this.seviyeService.addFacetoFaceSeviye(seviye)
  }
  onDeleteConfirm(event): void {
    console.log('ondelete', event.data)
    if (window.confirm('Are you sure you want to delete?')) {
      this.deletefaceSeviyeSeviye(event.data["id"]).subscribe(data => {

        event.confirm.resolve();

      })

    } else {
      event.confirm.reject();
    }
  }

  updateSeviye(seviye: FacetofaceSeviye) {
    return this.seviyeService.updateFacetofaceSeviyeSeviye(seviye)
  }
  onSaveConfirm(event): void {

    if (event.newData.aktif == "Aktif") {
      event.newData.isAktif = true;
    } else if (event.newData.aktif == "Pasif") {
      event.newData.isAktif = false;
    } else {
      event.confirm.reject();
    }
    let oturumId = this.getByOturumAdiFetchId(event.newData["oturumAdi"]);
    event.newData["oturumID"] = oturumId
    event.confirm.resolve(event.newData);
    this.updateSeviye(event.newData).subscribe(data => {
      console.log('data', data)
    })
  }


  onCreateConfirm(event) {
    if (event.newData["aktif"] == "Aktif") {
      event.newData.isAktif = 1
    } else if (event.newData["aktif"] == "Pasif") {
      event.newData.isAktif = 0
    }
    else {
      event.confirm.reject();
      return
    }
    let oturumId = this.getByOturumAdiFetchId(event.newData["oturumAdi"]);
    event.newData["oturumID"] = oturumId
    console.log('new Data', event.newData)
    this.addfaceSeviyeSeviye(event.newData).subscribe(data => {
      if (data) {

        event.newData["ID"] = data["ID"]

        event.confirm.resolve(event.newData)
      } else {
        console.log('reject')
        event.confirm.reject();
      }
    })

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
  initializeSettings() {
    this.settings = {
      actions: {
        columnTitle: 'Kategori',
        mode: 'external'
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
        cancelButtonContent: '<i class="nb-close" ></i>',
        confirmSave: true,

      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
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
        aciklama: {
          title: 'Açıklama',
          type: 'string',
        },
        sıraNumarası: {
          title: 'Sıra Numarası',
          type: 'string',
        },
        aktif: {
          title: 'Aktif mi ?',
          type: 'string'
        },
        oturumSirasi: {
          title: 'Oturum Sırası',
          type: 'string',
        },

      },
    };
  }

}
