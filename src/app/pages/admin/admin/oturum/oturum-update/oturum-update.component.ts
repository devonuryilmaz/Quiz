import { Component, OnInit } from '@angular/core';
import { Oturum } from '../../../../models/Oturum';
import { OturumService } from '../oturum.service';
import { SeviyeService } from '../../seviye/seviye.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Seviye } from '../../../../models/seviye';
import { AtifSeviye } from '../../../../models/AtifSeviye';
import { SeviyeModel } from '../../../../models/SeviyeModel';
import { GazeSeviye } from '../../../../models/GazeSeviye';
import { FacetofaceSeviye } from '../../../../models/FacetoFaceSeviye';

@Component({
  selector: 'oturum-update',
  templateUrl: './oturum-update.component.html',
  styleUrls: ['./oturum-update.component.scss']
})

export class OturumUpdateComponent implements OnInit {

  oturum = new Oturum()
  id: number;
  oturumForm: FormGroup;
  submitted = false;
  seviyeler: Seviye[];
  secilmisSeviye: SeviyeModel[] = [];
  guncellenecekSeviyeler: SeviyeModel[] = [];

  constructor(private oturumService: OturumService, private seviyeService: SeviyeService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.seviyeService.getSeviyeAll(true).subscribe(data => {
      this.seviyeler = data;
    }, error => { }, async () => {
      await this.getAtifSeviye()
      await this.getFacetoFaceSeviye()
      await this.getGazeSeviye()
      this.seviyeler.forEach((s) => {
        if (s["oturumID"] == this.id) {
          let sev = new SeviyeModel()
          s.oturumAktif = true;
          sev.id = s["seviyeID"];
          this.secilmisSeviye.push(sev)
        }
      })
      console.log(this.seviyeler)
    })

    this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.oturumForm = this.formBuilder.group(
      {
        oturumAdi: ["", Validators.required],
        isAktif: ["", Validators.required],
      })

    this.oturumService.getOturum(this.id).subscribe(data => {
      this.oturum = data;
    });
  }

  goster(seviye: Seviye, event: any) {
    let sev = new SeviyeModel()
    sev.id = seviye["seviyeID"]
    sev.isAtif = seviye["isAtif"]
    sev.isFaceToFace = seviye["isFaceToFace"]
    sev.isGazeCast = seviye["isGazeCast"]
    const index: number = this.guncellenecekSeviyeler.findIndex(s => s.id === seviye["seviyeID"])
    if (event.target.checked) {
      console.log("true", sev)
      sev["oturumAktif"] = true;
      this.secilmisSeviye.push(sev)
      if (index != -1) {
        this.guncellenecekSeviyeler.splice(index, 1)
        this.guncellenecekSeviyeler.push(sev);
      }
      else {
        this.guncellenecekSeviyeler.push(sev);
      }
    }
    else {
      sev["oturumAktif"] = false;
      console.log(index)
      if (this.guncellenecekSeviyeler.length == 0)
        this.guncellenecekSeviyeler.push(sev);

      if (index != -1) {
        sev["oturumAktif"] = false;
        console.log("false", sev)
        this.guncellenecekSeviyeler.splice(index, 1)
        this.guncellenecekSeviyeler.push(sev);
      }
    }
    console.log(this.guncellenecekSeviyeler)
  }

  update() {
    if (!this.oturumForm.invalid) {
      let oturum: Oturum = Object.assign({}, this.oturumForm.value)
      console.log("o", oturum)
      oturum["oturumID"] = this.id
      this.guncellenecekSeviyeler.forEach(s => {
        let sev = this.seviyeler.find(item => item["seviyeID"] === s.id)
        console.log(sev)
        if (sev != null) {
          sev["oturumID"] = this.id
          if (s["isAtif"] == true) {
            let atif = new AtifSeviye();
            atif["id"] = sev["seviyeID"]
            atif["isAktif"] = sev["isAktif"]
            atif["siraNumara"] = sev["siraNumarasi"]
            atif["aciklama"] = sev["seviyeNumarasi"]
            atif["aktif"] = sev["aktif"]
            if (s["oturumAktif"])
              atif["oturumID"] = this.id
            this.seviyeService.updateAtifSeviye(atif).subscribe()
          }
          else if (s["isGazeCast"] == true) {
            let gaze = new GazeSeviye();
            gaze["id"] = sev["seviyeID"]
            gaze["isAktif"] = sev["isAktif"]
            gaze["siraNumara"] = sev["siraNumarasi"]
            gaze["aciklama"] = sev["seviyeNumarasi"]
            gaze["aktif"] = sev["aktif"]
            if (s["oturumAktif"])
              gaze["oturumID"] = this.id
            this.seviyeService.updateGazeCastSeviyeSeviye(gaze).subscribe()
          }
          else if (s["isFaceToFace"] == true) {
            let face = new FacetofaceSeviye();
            face["id"] = sev["seviyeID"]
            face["isAktif"] = sev["isAktif"]
            face["siraNumara"] = sev["siraNumarasi"]
            face["aciklama"] = sev["seviyeNumarasi"]
            face["aktif"] = sev["aktif"]
            if (s["oturumAktif"]) {
              face["oturumID"] = this.id
            }
            this.seviyeService.updateFacetofaceSeviyeSeviye(face).subscribe()
          } else {
            if (!s["oturumAktif"]) {
              sev["oturumID"] = null
            }
            this.seviyeService.updateSeviye(sev, sev["kategoriID"]).subscribe()
          }
        }
      })
      this.oturumService.updateOturum(oturum).subscribe(data => {
      }, error => { }, () => {
        this.router.navigateByUrl("/pages/admin/oturum/Liste")
      })
    }
  }

  sil() {
    this.oturumService.deleteOturum(this.id).subscribe(() => {
      this.router.navigateByUrl("/pages/admin/oturum/Liste")
    })
  }

  getAtifSeviye() {
    this.seviyeService.getAtifSeviyeAll(false).subscribe(data => {
      console.log("atif", data)
      data.forEach(atif => {
        if (atif["isAktif"] == true) {
          let seviye = new Seviye();
          seviye["seviyeID"] = atif["id"]
          seviye["isAtif"] = true
          seviye["isAktif"] = atif["isAktif"]
          seviye["siraNumarasi"] = atif["sıraNumara"]
          seviye["seviyeNumarasi"] = atif["aciklama"]
          seviye["aktif"] = atif["aktif"]
          seviye["oturumID"] = atif["oturumID"]
          if (atif["oturumID"] == this.id) {
            seviye["oturumAktif"] = true
          }
          this.seviyeler.push(seviye)
        }
      });
    })
  }

  getFacetoFaceSeviye() {
    this.seviyeService.getFacetoFaceSeviyeAll(false).subscribe(data => {
      data.forEach(face => {
        if (face["isAktif"] == true) {
          let seviye = new Seviye();
          seviye["seviyeID"] = face["id"]
          seviye["isFaceToFace"] = true
          seviye["isAktif"] = face["isAktif"]
          seviye["siraNumarasi"] = face["sıraNumarası"]
          seviye["seviyeNumarasi"] = face["aciklama"]
          seviye["aktif"] = face["aktif"]
          seviye["oturumID"] = face["oturumID"]
          if (face["oturumID"] == this.id) {
            seviye["oturumAktif"] = true
          }
          this.seviyeler.push(seviye)
        }
      });
    })
  }

  getGazeSeviye() {
    this.seviyeService.getGazeCastSeviyeSeviyeAll(false).subscribe(data => {
      data.forEach(gaze => {
        if (gaze["isAktif"] == true) {
          let seviye = new Seviye();
          seviye["seviyeID"] = gaze["id"]
          seviye["isGazeCast"] = true
          seviye["isAktif"] = gaze["isAktif"]
          seviye["siraNumarasi"] = gaze["sıraNumarası"]
          seviye["seviyeNumarasi"] = gaze["aciklama"]
          seviye["aktif"] = gaze["aktif"]
          seviye["oturumID"] = gaze["oturumID"]
          if (gaze["oturumID"] == this.id) {
            seviye["oturumAktif"] = true
          }
          this.seviyeler.push(seviye)
        }
      });
    })
  }

}
