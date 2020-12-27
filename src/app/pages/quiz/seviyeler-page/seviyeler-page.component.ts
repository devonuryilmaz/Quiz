import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seviye } from '../../models/seviye';
import { SeviyeService } from '../../admin/admin/seviye/seviye.service';
import { KategoriService } from '../../admin/admin/kategori/kategori.service';
import { AuthHelper } from '../../auth/auth-helper';
import { KullaniciRapor } from '../../models/KullaniciRapor';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'seviyeler-page',
  templateUrl: './seviyeler-page.component.html',
  styleUrls: ['./seviyeler-page.component.scss']
})
export class SeviyelerPageComponent implements OnInit {
  private sub: any;
  id: number;
  seviyeler: Seviye[]
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
    let path = "/pages/quiz/oturumlar";
    console.log("deneme", path);
    this.router.navigateByUrl(path);

  }

  start(seviye, seviyeOturum: Seviye[]) {
    console.log("gelen Seviye", seviye)

    let rapor = new KullaniciRapor();
    rapor.isKategoriCustom = false;
    rapor.kullaniciID = this.authhElper.userId;
    rapor.kategoriID = seviye.kategoriID
    rapor.seviyeID = seviye.seviyeID;
    rapor["oturumID"] = seviye.oturumID;
    rapor["oturumSirasi"] = seviye["oturumSirasi"];
    //console.log("rapor", rapor.seviyeID)
    if (!this.authhElper.userActor) {
      let suankiSira = seviyeOturum.findIndex(s => s["oturumSirasi"] == seviye["oturumSirasi"]).valueOf()
      let oncekiSira = 0
      this.seviyeService.kullaniciRaporKontrol(rapor).subscribe(async isFind => {
        if (isFind) {
          this.seviyeService.kullaniciCompleteKontrol(rapor).subscribe(complete => {
            console.log("rapor", rapor)
            if (!complete["isTamamlandi"]) {
              this.router.navigateByUrl("pages/quiz/sorular/" + seviye.seviyeID)
            }
            else {
              this.warningToastMessage("Seviye Uyarısı", "Bu seviye tamamlanmıştır. Tekrar girilemez.")
              console.log('tamamlamışsınız');
              return
            }
          })
        }
        else {
          let atifVar = false;
          let girilebilir = false;
          if (rapor["oturumSirasi"] > 1) {
            await this.seviyeService.sonAtifRapor(seviye.oturumID, this.authhElper.userId).subscribe(async rp => {
              oncekiSira = seviyeOturum.findIndex(s => s["oturumSirasi"] == rp["oturumSirasi"]).valueOf()
              if (rp && rp["isTamamlandi"]) {
                if ((suankiSira - oncekiSira) == 1) {
                  atifVar = true;
                  girilebilir = true;
                  this.localStorageEkle(rapor, seviye)
                }
              }
            }, error => {
              console.log("error")
            },
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
    }
    else {
      this.router.navigateByUrl("pages/quiz/sorular/" + seviye.seviyeID)
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
          index: 0, kategoriID: r["kategoriID"], seviyeID: r["seviyeID"], isCustom: false, dogru: 0, yanlis: 0, raporId: r["id"],
          oturumID: r["oturumID"], oturumSirasi: r["oturumSirasi"], oturumTamamlandi: r["oturumTamamlandi"]
        })
        console.log("arr", arr)
        localStorage.setItem(r["kullaniciID"] + 'user', JSON.stringify(arr));
        this.router.navigateByUrl("pages/quiz/sorular/" + seviye.seviyeID)
      }
      else {
        localStorage.setItem(r["kullaniciID"] + 'user', JSON.stringify([{
          index: 0, kategoriID: r["kategoriID"], seviyeID: r["seviyeID"], isCustom: false, dogru: 0, yanlis: 0, raporId: r["id"],
          oturumID: r["oturumID"], oturumSirasi: r["oturumSirasi"], oturumTamamlandi: r["oturumTamamlandi"]
        }]));

        this.router.navigateByUrl("pages/quiz/sorular/" + seviye.seviyeID)
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

        this.getAllByKategoriId(this.id)

      }

    });
  }
  getAllByKategoriId(id) {
    this.seviyeService.getAllByKategoriId(id).subscribe(data => {
      this.seviyeler = data;
      console.log('seviyeler', this.seviyeler)
    })
  }


}