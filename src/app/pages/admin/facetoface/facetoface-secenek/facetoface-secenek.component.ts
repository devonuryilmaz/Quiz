import { Component, OnInit } from '@angular/core';
import { FaceToFaceSecenek } from '../../../models/FacetofaceSecenek';
import { FaceToFaceSoru } from '../../../models/FacetofaceSoru';
import { SoruService } from '../../admin/soru/soru.service';
import { SecenekService } from '../../admin/secenek/secenek.service';
import { LocalDataSource } from 'ng2-smart-table';
import { FaceToFacePhoto } from '../../../models/FacetofacePhoto';

@Component({
  selector: 'facetoface-secenek',
  templateUrl: './facetoface-secenek.component.html',
  styleUrls: ['./facetoface-secenek.component.scss']
})
export class FacetofaceSecenekComponent implements OnInit {

  settings: any;
  secenekler: FaceToFaceSecenek[];
  videoUrl;
  loading: boolean = true;
  facetofaceSorular: FaceToFacePhoto[];
  photoSoruAciklamaList: { value: number, title: string }[] = [];
  source: LocalDataSource = new LocalDataSource();
  constructor(private secenekService: SecenekService, private faceSoruService: SoruService) { }

  ngOnInit() {
    this.getFAceSoruPhotoAll()
    this.initializeSettings();
  }

  getFacePhotosSecenekAll() {
    this.secenekService.getFacePhotosSecenekAll().subscribe(data => {
      this.secenekler = data;
      console.log('secenekler face', this.secenekler)
      this.secenekler.forEach((secenek, index) => {
        this.facetofaceSorular.forEach((soru, i) => {
          if (secenek["faceToFacePhotoID"] == soru["id"]) {
            secenek["photoAciklama"] = soru["aciklama"];
          }
        })
        if (secenek["isTrue"] == true) {
          secenek["dogruMu"] = "Doğru";
        } else {
          secenek["dogruMu"] = "Yanlış";
        }
      })
      this.initializeSettings();
      this.source.load(this.secenekler);
      this.loading = false;
    })
  }
  getFAceSoruPhotoAll() {
    this.faceSoruService.getFaceSoruPhotoAll().subscribe(data => {
      this.facetofaceSorular = data;
      data.forEach((photo, index) => {
        //this.seviyeDropDownList.push({ value: Object.keys(seviye).map(e => seviye[e])[1], title: Object.keys(seviye).map(e => seviye[e])[1] });
        this.photoSoruAciklamaList.push({ value: photo["id"], title: photo["aciklama"] })

      })
      console.log("faceSoru", this.facetofaceSorular)
      this.getFacePhotosSecenekAll();
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

        photoAciklama: {
          title: 'Fotoğraf Açıklaması',
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:
                this.photoSoruAciklamaList,
            },
          },
        },

        aciklama: {
          title: 'Seçenek Cümlesi',
          type: 'string',
        },
        dogruMu: {
          title: 'Doğru Mu?',
          type: 'boolean',
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
  getByPhotoSoru(soruPhoto) {
    let s = this.facetofaceSorular.find(s => s["aciklama"] == soruPhoto)
    return s["id"] ? s["id"] : -1;
  }
  addFaceSecenek(secenek: FaceToFaceSecenek) {
    return this.secenekService.addFacePhotoSecenek(secenek)
  }
  onCreateConfirm(event) {
    if (event.newData["dogruMu"] == "Doğru") {
      event.newData["isTrue"] = true;
    } else if (event.newData["dogruMu"] == "Yanlış") {
      event.newData["isTrue"] = false;
    }
    event.newData["faceToFacePhotoID"] = this.getByPhotoSoru(event.newData["photoAciklama"])
    this.addFaceSecenek(event.newData).subscribe(data => {
      if (data["id"]) {
        event.newData["id"] = data["id"]
        event.confirm.resolve()
      } else {
        event.confirm.reject()
      }
    })
  }


  deleteFacePhotoSecenek(id) {
    return this.secenekService.deleteFacePhotoSecenek(id)
  }
  onDeleteConfirm(event) {
    console.log('event data', event.data)
    if (window.confirm('Are you sure you want to delete?')) {
      console.log('event', event.data["id"])
      if (event.data["id"] > 0) {
        this.deleteFacePhotoSecenek(event.data["id"]).subscribe(() => {
          event.confirm.resolve()
        })
      }
      else {
        event.confirm.reject()
      }
    } else {
      event.confirm.reject()
    }
  }

  updateFacePhotoSecenek(secenek: FaceToFaceSecenek) {
    return this.secenekService.updateFacePhotoSecenek(secenek)
  }
  onSaveConfirm(event): void {
    console.log("eskievent", event);
    console.log("yenievent", event.newData);
    return;

    if (event.newData["dogruMu"] == "Doğru") {
      event.newData["isTrue"] = true;
    } else if (event.newData["dogruMu"] == "Yanlış") {
      event.newData["isTrue"] = false;
    }
    event.newData["faceToFacePhotoID"] = event.newData["photoAciklama"].to  //this.getByPhotoSoru(event.newData["photoAciklama"])

    this.updateFacePhotoSecenek(event.newData).subscribe(data => {
      if (data["id"]) {
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    })

  }


}
