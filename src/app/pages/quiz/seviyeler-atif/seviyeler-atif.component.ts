import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seviye } from '../../models/seviye';
import { SeviyeService } from '../../admin/admin/seviye/seviye.service';
import { KategoriService } from '../../admin/admin/kategori/kategori.service';
import { AuthHelper } from '../../auth/auth-helper';
import { AtifSeviye } from '../../models/AtifSeviye';
import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { KullaniciRapor } from '../../models/KullaniciRapor';
import { KullaniciAtıfRapor } from '../../models/KullaniciAtıfRapor';


@Component({
  selector: 'seviyeler-atif',
  templateUrl: './seviyeler-atif.component.html',
  styleUrls: ['./seviyeler-atif.component.scss']
})
export class SeviyelerAtifComponent implements OnInit {

  private sub: any;
  id: number;
  seviyeler: AtifSeviye[]
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

  ngOnInit() {
    this.authhElper.session()
    this.sub = this.route.params.subscribe(params => {
      console.log('***********params', params)
      this.id = +params['id'];
      console.log('id', this.id)
      if (Number.isNaN(this.id)) {
        //this.router.navigate(['../../'])//error.
        this.router.navigateByUrl("/pages/quiz/kategoriler")
      } else {

        this.getAllByKategoriId()

      }

    });
  }

  start(seviye, seviyeOturum: Seviye[]) {

    let rapor = new KullaniciAtıfRapor();
    rapor.KullaniciID = this.authhElper.userId;
    rapor.SeviyeID = seviye.id;
    rapor["oturumID"] = seviye.oturumID;
    rapor["oturumSirasi"] = seviye["oturumSirasi"];
    let suankiSira = 0;
    try {
      suankiSira = seviyeOturum.findIndex(s => s["oturumSirasi"] == seviye["oturumSirasi"]).valueOf();
    }
    catch{ }
    let oncekiSira = 0
    console.log('rapor', rapor)
    let userRol = this.authhElper.userActor;
    console.log('******rol', userRol);
    if (!userRol) {//BURAYA BAK***************
      this.seviyeService.kullaniciAtıfRaporKontrol(rapor).subscribe(async isFind => {
        if (isFind) {
          this.seviyeService.kullaniciAtıfCompleteKontrol(rapor).subscribe(complete => {
            if (!complete["isTamamlandi"]) {
              this.router.navigateByUrl("pages/quiz/atif-sorular/" + seviye.id)
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
      })//
    } else {//BİR DE BURAYA********************
      this.router.navigateByUrl("pages/quiz/atif-sorular/" + seviye.id)
    }

  }

  localStorageEkle(rapor: KullaniciAtıfRapor, seviye: any) {

    this.seviyeService.addKullaniciAtıfRapor(rapor).subscribe(r => {
      if (localStorage.getItem(r["kullaniciID"] + 'userAtif')) {
        let data;
        data = JSON.parse(localStorage.getItem(r["kullaniciID"] + 'userAtif'));
        let arr = [];
        arr = data;
        arr.push({
          index: 0, seviyeID: r["seviyeID"], raporId: r["id"],
          oturumID: r["oturumID"], oturumSirasi: r["oturumSirasi"], oturumTamamlandi: r["oturumTamamlandi"]
        })
        localStorage.setItem(r["kullaniciID"] + 'userAtif', JSON.stringify(arr));
        this.router.navigateByUrl("pages/quiz/atif-sorular/" + seviye.id)
      } else {
        localStorage.setItem(r["kullaniciID"] + 'userAtif', JSON.stringify([{
          index: 0, seviyeID: r["seviyeID"], raporId: r["id"],
          oturumID: r["oturumID"], oturumSirasi: r["oturumSirasi"], oturumTamamlandi: r["oturumTamamlandi"]
        }]));
        this.router.navigateByUrl("pages/quiz/atif-sorular/" + seviye.id)
      }
    })
  }

  getAllByKategoriId() {
    this.seviyeService.getAtifSeviyeAll(false).subscribe(data => {
      this.seviyeler = data;
      console.log('seviyeler', this.seviyeler)
    })
  }


}
