import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { OturumService } from '../../admin/admin/oturum/oturum.service';
import { KullaniciIlerlemeService } from '../../admin/admin/kullanici-ilerleme/kullanici-ilerleme.service';
import { AuthService } from '../../auth/auth.service';
import { AuthHelper } from '../../auth/auth-helper';
import { Seviye } from '../../models/seviye';
import { SeviyeService } from '../../admin/admin/seviye/seviye.service';
import { Oturum } from '../../models/Oturum';
import { Router } from '@angular/router';
import { SeviyelerGazecastComponent } from '../seviyeler-gazecast/seviyeler-gazecast.component';
import { SeviyelerAtifComponent } from '../seviyeler-atif/seviyeler-atif.component';
import { SeviyelerFacetofactComponent } from '../seviyeler-facetofact/seviyeler-facetofact.component';
import { SeviyelerPageComponent } from '../seviyeler-page/seviyeler-page.component';
import { NbWindowService, NbDialogService, NbDialogRef } from '@nebular/theme';
import { KategoriService } from '../../admin/admin/kategori/kategori.service';
import { element } from '@angular/core/src/render3';

@Component({
  providers: [SeviyelerGazecastComponent, SeviyelerAtifComponent, SeviyelerFacetofactComponent, SeviyelerPageComponent],
  selector: 'oturum-page',
  templateUrl: './oturum-page.component.html',
  styleUrls: ['./oturum-page.component.scss'],
})
export class OturumPageComponent implements OnInit {

  seviyeler: Seviye[]
  oturumId: number;
  oturum: Oturum;
  loading: boolean = true;
  isAdmin: boolean;
  isUser: boolean;
  @Input() seviyeAdi: string;
  @Input() kategoriUrl: string;
  oturumlar: Oturum[];

  constructor(private oturumService: OturumService, private raporService: KullaniciIlerlemeService, private authHelper: AuthHelper,
    private seviyeService: SeviyeService, private router: Router, private gaze: SeviyelerGazecastComponent, private atif: SeviyelerAtifComponent,
    private face: SeviyelerFacetofactComponent, private seviye: SeviyelerPageComponent, private dialogService: NbDialogService,
    private kategoriService: KategoriService) {
  }

  ngOnInit() {
    this.isAdmin = this.authHelper.userActor;
    this.isUser = !this.isAdmin;
    console.log("admin", this.isAdmin)
    this.getOturum(this.authHelper.userId)
  }

  getOturum(id) {
    if (!this.isAdmin) {
      this.oturumService.getKullaniciOturum(id).subscribe(async data => {
        this.oturumId = data["oturumID"]
        this.oturum = data
        this.getSeviyeler(this.oturumId, false, null)
      })
    }
    else {
      this.oturumService.getOturumlar().subscribe(async data => {
        this.oturumlar = data;
        data.forEach(async o => {
          this.oturumId = o["oturumID"]
          this.getSeviyeler(this.oturumId, true, o)
        })
      })
    }
  }

  open(dialog: TemplateRef<any>, seviye: Seviye) {
    this.seviyeAdi = seviye["seviyeNumarasi"];
    //this.sırala(false, this.oturum)
    if (seviye["isAtif"] == true) {
      this.kategoriService.getAtifKategoriService(false).subscribe(resp => {
        //console.log(resp[0])
        this.kategoriUrl = resp[0]["videoUrl"].slice(1, resp[0]["videoUrl"].length);
      }, error => { },
        () => {
          this.dialogService.open(dialog);
        })
    }
    else if (seviye["isGazeCast"] == true) {

      this.kategoriService.getGazeKategoriService(false).subscribe(resp => {
        //console.log(resp[0]);
        this.kategoriUrl = resp[0]["videoUrl"].slice(1, resp[0]["videoUrl"].length);
        //console.log(this.kategoriUrl);
      }, error => { },
        () => {
          this.dialogService.open(dialog);
        })

    }
    else if (seviye["isFaceToFace"] == true) {

      this.kategoriService.getFacetofaceKategoriService(false).subscribe(resp => {
        //console.log(resp[0]);
        this.kategoriUrl = resp[0]["videoUrl"].slice(1, resp[0]["videoUrl"].length);
        //console.log(this.kategoriUrl);
      }, error => { },
        () => {
          this.dialogService.open(dialog);
        })

    } else {
      this.kategoriService.getKategoriById(seviye["kategoriID"]).subscribe(resp => {
        //console.log(resp);
        this.kategoriUrl = resp["url"].slice(1, resp["url"].length);
      }, error => { },
        () => {
          this.dialogService.open(dialog);
        })
    }
  }

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  getSeviyeler(id, isAdmin, oturum: Oturum) {
    this.seviyeService.getOturumSeviye(id).subscribe(async data => {
      data.forEach(sev => {
        this.kategoriService.getKategoriById(sev["kategoriID"]).subscribe(resp => {
          console.log(resp);
          sev.kategoriAciklama = resp["aciklama"]
        })
      })
      if (!isAdmin) {
        console.log("burda")
        this.seviyeler = data
        this.getAtifSeviye(id, false, null)
        this.getFaceSeviye(id, false, null)
        this.getGazeSeviye(id, false, null)
      }
      else {
        oturum.seviyeler = data
        this.getAtifSeviye(id, true, oturum)
        this.getFaceSeviye(id, true, oturum)
        this.getGazeSeviye(id, true, oturum)
      }
    })
  }

  async sırala(isAdmin, oturum: Oturum) {
    if (!isAdmin) {
      console.log("seviye", this.seviyeler)

      this.seviyeler.sort((a, b) => a["oturumSirasi"] - b["oturumSirasi"])
      this.loading = false;
    }
    else {
      console.log("oturum")
      oturum.seviyeler.sort((a, b) => a["oturumSirasi"] - b["oturumSirasi"]);
      this.loading = false;
    }
  }
  getAtifSeviye(id, isAdmin, oturum: Oturum) {
    this.seviyeService.getAtifOturum(id).subscribe(data => {
      data.forEach(atif => {
        let seviye = new Seviye()
        seviye["seviyeID"] = atif["id"]
        this.kategoriService.getAtifKategoriService(true).subscribe(resp => {
          console.log(resp);
          seviye.kategoriAciklama = resp[0]["aciklama"]
        })
        seviye["isAtif"] = true
        seviye["isAktif"] = atif["isAktif"]
        seviye["siraNumarasi"] = atif["sıraNumara"]
        seviye["seviyeNumarasi"] = atif["aciklama"]
        seviye["aktif"] = atif["aktif"]
        seviye["oturumID"] = atif["oturumID"]
        seviye["oturumSirasi"] = atif["oturumSirasi"]
        if (isAdmin == false) {
          this.seviyeler.push(seviye)
        }
        else {
          oturum.seviyeler.push(seviye);
        }
      })
    })
  }

  getFaceSeviye(id, isAdmin, oturum: Oturum) {
    this.seviyeService.getFaceOturum(id).subscribe(data => {
      data.forEach(face => {
        let seviye = new Seviye()
        seviye["seviyeID"] = face["id"]
        this.kategoriService.getFacetofaceKategoriService(true).subscribe(resp => {
          console.log(resp);
          seviye.kategoriAciklama = resp[0]["aciklama"]
        })
        seviye["isFaceToFace"] = true
        seviye["isAktif"] = face["isAktif"]
        seviye["siraNumarasi"] = face["sıraNumara"]
        seviye["seviyeNumarasi"] = face["aciklama"]
        seviye["aktif"] = face["aktif"]
        seviye["oturumID"] = face["oturumID"]
        seviye["oturumSirasi"] = face["oturumSirasi"]
        if (isAdmin == false) {
          console.log("admin yanlış")
          this.seviyeler.push(seviye)
        }
        else {
          oturum.seviyeler.push(seviye);
        }
      })
    })
  }

  getGazeSeviye(id, isAdmin, oturum: Oturum) {
    this.seviyeService.getGazeOturum(id).subscribe(async data => {
      data.forEach(gaze => {
        let seviye = new Seviye()
        seviye["seviyeID"] = gaze["id"]
        this.kategoriService.getGazeKategoriService(true).subscribe(resp => {
          console.log(resp);
          seviye.kategoriAciklama = resp[0]["aciklama"]
        })
        seviye["isGazeCast"] = true
        seviye["isAktif"] = gaze["isAktif"]
        seviye["siraNumarasi"] = gaze["sıraNumara"]
        seviye["seviyeNumarasi"] = gaze["aciklama"]
        seviye["aktif"] = gaze["aktif"]
        seviye["oturumID"] = gaze["oturumID"]
        seviye["oturumSirasi"] = gaze["oturumSirasi"]
        if (isAdmin == false) {
          this.seviyeler.push(seviye)
        }
        else {
          oturum.seviyeler.push(seviye);
        }
      }), error => { },
        () => {
        }
    })
    if (isAdmin == false) {
      sirala(false, null, this.seviyeler)
      this.loading = false;
      //this.sırala(false, null);

    }
    else {
      sirala(true, oturum, null);
      this.loading = false;
      //this.sırala(true, oturum);
    }
  }

  start(seviye, ref: NbDialogRef<any>) {
    ref.close();
    seviye.id = seviye["seviyeID"]
    if (seviye["isAtif"] == true) {
      console.log("atif")
      this.atif.start(seviye, this.seviyeler)
      //this.router.navigateByUrl("pages/quiz/atif-sorular/"+seviye.seviyeID)
    }
    else if (seviye["isGazeCast"] == true) {
      console.log("gaze")
      this.gaze.start(seviye, this.seviyeler)
      //this.router.navigateByUrl("pages/quiz/gazecast-sorular/"+seviye.seviyeID)
    }
    else if (seviye["isFaceToFace"] == true) {
      console.log("face")
      this.face.start(seviye, this.seviyeler)
      //this.router.navigateByUrl("pages/quiz/facetı-fact-sorular/"+seviye.seviyeID)
    } else {
      console.log("sev", seviye)
      this.seviye.start(seviye, this.seviyeler)
      //this.router.navigateByUrl("pages/quiz/sorular/"+seviye.seviyeID)

    }
  }
}

function sirala(isAdmin, oturum: Oturum, seviyeler: Seviye[]) {
  setTimeout(() => {
    if (!isAdmin) {
      console.log("seviye", seviyeler)

      seviyeler.sort((a, b) => a["oturumSirasi"] - b["oturumSirasi"])
    }
    else {
      console.log("oturum")
      oturum.seviyeler.sort((a, b) => a["oturumSirasi"] - b["oturumSirasi"]);
    }
  }, 350);
}