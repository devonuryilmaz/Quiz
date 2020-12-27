import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seviye } from '../../models/seviye';
import { SeviyeService } from '../../admin/admin/seviye/seviye.service';
import { KategoriService } from '../../admin/admin/kategori/kategori.service';
import { AuthHelper } from '../../auth/auth-helper';
import { AtifSeviye } from '../../models/AtifSeviye';
import { GazeSeviye } from '../../models/GazeSeviye';
import { KullaniciRapor } from '../../models/KullaniciRapor';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


@Component({
  selector: 'seviyeler-facetofact',
  templateUrl: './seviyeler-facetofact.component.html',
  styleUrls: ['./seviyeler-facetofact.component.scss']
})
export class SeviyelerFacetofactComponent implements OnInit {

  private sub: any;
  id: number;
  seviyeler: GazeSeviye[]
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  statusToast: NbToastStatus;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private seviyeService: SeviyeService,
    private authhElper: AuthHelper,
    private toastrService: NbToastrService) { }
  warningToastMessage(headerMessage, bodyMessage) {
    let type = NbToastStatus.WARNING;;
    this.showToast(type, headerMessage, bodyMessage);
  }
  showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    this.toastrService.show(
      body,
      `${title}`,
      config);
  }

  turnToKategori() {
    let path = "/pages/quiz/kategoriler";
    console.log("deneme", path);
    this.router.navigateByUrl(path);

  }
  start(seviye, seviyeOturum: Seviye[]) {

    let rapor = new KullaniciRapor();
    rapor.isKategoriCustom = true;
    rapor.kullaniciID = this.authhElper.userId;
    rapor.kategoriID = 5
    rapor.seviyeID = seviye.id;
    rapor["oturumID"] = seviye.oturumID;
    rapor["oturumSirasi"] = seviye["oturumSirasi"];
    let suankiSira = 0;
    try {
      suankiSira = seviyeOturum.findIndex(s => s["oturumSirasi"] == seviye["oturumSirasi"]).valueOf();
    }
    catch{ }
    let oncekiSira = 0
    console.log("rapor", rapor)
    let userRole = this.authhElper.userActor;
    if (!userRole) {
      this.seviyeService.kullaniciRaporKontrol(rapor).subscribe(async isFind => {
        if (isFind) {
          this.seviyeService.kullaniciCompleteKontrol(rapor).subscribe(complete => {
            if (!complete["isTamamlandi"]) {
              this.router.navigateByUrl("pages/quiz/facetı-fact-sorular/" + seviye.id)
            } else {
              // todo notification(zaten bu quizi tamamlamışsınız)
              this.warningToastMessage("Seviye Uyarısı", "Bu seviye tamamlanmıştır. Tekrar girilemez.")
              console.log('tamamlamışsınız');
              return
            }
          })
        } else {

          let atifVar = false;
          let girilebilir = false;
          if (rapor["oturumSirasi"] > 1) {
            await this.seviyeService.sonAtifRapor(seviye.oturumID, this.authhElper.userId).subscribe(async rp => {
              oncekiSira = seviyeOturum.findIndex(s => s["oturumSirasi"] == rp["oturumSirasi"]).valueOf()
              if (rp && rp["isTamamlandi"]) {
                atifVar = true;
                if ((suankiSira - oncekiSira) == 1) {
                  girilebilir = true;
                  this.localStorageEkle(rapor, seviye)
                }
              }
            }, error => { },
              async () => {
                if (!atifVar) {
                  await this.seviyeService.sonRapor(seviye.oturumID, this.authhElper.userId).subscribe(async rp => {
                    oncekiSira = seviyeOturum.findIndex(s => s["oturumSirasi"] == rp["oturumSirasi"]).valueOf()
                    console.log("rp", rp)
                    if (rp && rp["isTamamlandi"]) {
                      atifVar = true;
                      if ((suankiSira - oncekiSira) == 1) {
                        girilebilir = true;
                        this.localStorageEkle(rapor, seviye)
                      }
                    }
                  }, error => { },
                    () => {
                      if (!girilebilir) {
                        this.warningToastMessage("Seviye Uyarısı", "Şuan bu seviyeye girilemez!")
                      }
                    })
                }
              })
          }
          else if (rapor["oturumSirasi"] == 1) {
            this.localStorageEkle(rapor, seviye)
          }
        }
      })
    } else {
      this.router.navigateByUrl("pages/quiz/facetı-fact-sorular/" + seviye.id)
    }

  }


  localStorageEkle(rapor: KullaniciRapor, seviye: any) {
    this.seviyeService.addKullaniciRapor(rapor).subscribe(r => {
      if (localStorage.getItem(r["kullaniciID"] + 'user')) {
        let data;
        data = JSON.parse(localStorage.getItem(r["kullaniciID"] + 'user'));
        let arr = [];
        arr = data;
        arr.push({
          index: 0, kategoriID: r["kategoriID"], seviyeID: r["seviyeID"], isCustom: true, dogru: 0, yanlis: 0, raporId: r["id"],
          oturumID: r["oturumID"], oturumSirasi: r["oturumSirasi"], oturumTamamlandi: r["oturumTamamlandi"]
        })
        console.log("arr", arr)
        localStorage.setItem(r["kullaniciID"] + 'user', JSON.stringify(arr));
        this.router.navigateByUrl("pages/quiz/facetı-fact-sorular/" + seviye.seviyeID)
      }
      else {
        localStorage.setItem(r["kullaniciID"] + 'user', JSON.stringify([{
          index: 0, kategoriID: r["kategoriID"], seviyeID: r["seviyeID"], isCustom: true, dogru: 0, yanlis: 0, raporId: r["id"],
          oturumID: r["oturumID"], oturumSirasi: r["oturumSirasi"], oturumTamamlandi: r["oturumTamamlandi"]
        }]));

        this.router.navigateByUrl("pages/quiz/facetı-fact-sorular/" + seviye.seviyeID)
      }
    })
  }

  ngOnInit() {



    this.authhElper.session()
    this.sub = this.route.params.subscribe(params => {
      console.log('***********params', params)
      this.id = +params['id'];
      console.log('id', this.id)
      if (Number.isNaN(this.id)) {
        //this.router.navigate(['../../'])//error.
        this.router.navigateByUrl("/pages/quiz/oturumlar")
      } else {

        this.getAllByKategoriId()

      }

    });
  }
  getAllByKategoriId() {
    this.seviyeService.getFacetoFaceSeviyeAll(false).subscribe(data => {
      this.seviyeler = data;
      console.log('seviyeler', this.seviyeler)
    })
  }


}
