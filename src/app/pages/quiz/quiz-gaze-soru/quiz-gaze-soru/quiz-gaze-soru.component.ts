import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SoruService } from '../../../admin/admin/soru/soru.service';
import { SecenekService } from '../../../admin/admin/secenek/secenek.service';
import { NbStepperComponent } from '@nebular/theme';
import { AuthHelper } from '../../../auth/auth-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { KullaniciRapor } from '../../../models/KullaniciRapor';
import { OturumService } from '../../../admin/admin/oturum/oturum.service';

@Component({
  selector: 'quiz-gaze-soru',
  templateUrl: './quiz-gaze-soru.component.html',
  styleUrls: ['./quiz-gaze-soru.component.scss']
})
export class QuizGazeSoruComponent implements OnInit {
  @ViewChild(NbStepperComponent)
  nbStepperComponent: NbStepperComponent;
  userRaporIndex;
  storage;
  private sub: any;
  soruVisible = true;
  sorular = [];
  cevap;
  container = ""
  devamButton = false;
  cevaplananSorular = []

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(private soruService: SoruService, private route: ActivatedRoute, private authHepler: AuthHelper,
    private router: Router, private secenekService: SecenekService, private authhElper: AuthHelper,
    private oturumService: OturumService) { }

  ngOnInit() {


    let userRole = this.authhElper.userActor;
    if (!userRole) {

      this.storage = JSON.parse(localStorage.getItem(this.authHepler.userId + 'user'))
      console.log('###storage###', this.storage)
      let id;
      this.route.params.subscribe(params => {

        id = params["id"]
      })
      try {
        this.userRaporIndex = this.storage.findIndex(r => r["kategoriID"] == 2 && r["seviyeID"] == id && r["isCustom"] == true)
        this.nbStepperComponent.selectedIndex = this.storage[this.userRaporIndex]["index"]
      } catch (error) {
        this.router.navigateByUrl("/pages/quiz/oturumlar")

      }

    } else {
      this.nbStepperComponent.selectedIndex = 0;
    }


    this.authhElper.session()
    this.sub = this.route.params.subscribe(params => {
      console.log('*****params', params)
      let id = +params['id'];

      if (Number.isNaN(id)) {
        //this.router.navigate(['../../'])//error.
        this.router.navigateByUrl("/pages/quiz/oturumlar")
      } else {
        if (this.videoplayer) {
          this.videoplayer.nativeElement.load();
        }
        this.getGazeSoruAllBySeviyeId(id)

      }

    });
  }

  getGazeSoruAllBySeviyeId(id) {
    this.soruService.getGazeSoruAllBySeviyeId(id).subscribe(data => {
      this.sorular = data;
      if (this.sorular.length < 1) {
        this.router.navigateByUrl("/pages/quiz/gazecast-seviyeler/1")
        return
      }
      let soruVideolaru = [];
      this.sorular.forEach((s, i) => {
        s["isCevap"] = false;
        s["videoUrl"] = s["videoUrl"].slice(1, s["videoUrl"].length);
        this.secenekService.getGazeCevapAllBySoruId(s["id"]).subscribe(data => {


          data["photo1Url"] = data["photo1Url"] ? data["photo1Url"].slice(1, data["photo1Url"].length) : null
          data["photo2Url"] = data["photo2Url"] ? data["photo2Url"].slice(1, data["photo2Url"].length) : null
          data["photo3Url"] = data["photo3Url"] ? data["photo3Url"].slice(1, data["photo3Url"].length) : null
          data["photo4Url"] = data["photo4Url"] ? data["photo4Url"].slice(1, data["photo4Url"].length) : null

          data["photo5Url"] = data["photo5Url"] ? data["photo5Url"].slice(1, data["photo5Url"].length) : null
          data["photo6Url"] = data["photo6Url"] ? data["photo6Url"].slice(1, data["photo6Url"].length) : null
          data["photo7Url"] = data["photo7Url"] ? data["photo7Url"].slice(1, data["photo7Url"].length) : null
          data["photo8Url"] = data["photo8Url"] ? data["photo8Url"].slice(1, data["photo8Url"].length) : null
          s["cevap"] = data;

        })
        console.log('soru', data)
      })


    })

  }
  photoClick(cevap, soruId) {
    this.container = "container"
    let userRole = this.authHepler.userActor;
    if (!this.soruCevapKontrol(soruId)) {
      if (!userRole) {
        console.log('cevap', cevap)
        if (cevap) {
          this.storage[this.userRaporIndex]["dogru"]++;
        } else {
          this.storage[this.userRaporIndex]["yanlis"]++;
        }
        this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex + 1;


        localStorage.setItem(this.authHepler.userId + 'user', JSON.stringify(this.storage))
      }



      this.cevaplananSorular.push({ id: soruId, cevap: cevap })
      console.log('id', this.cevaplananSorular)
    }

    this.devamButton = true;
  }
  soruCevapKontrol(id) {
    let a = 0;
    this.cevaplananSorular.forEach((soru) => {
      if (id == soru["id"]) {

        a = 1;
        return
      }

    })
    return a


  }
  next(stepper: NbStepperComponent) {
    this.devamButton = false;
    this.container = "";
    this.soruVisible = true;
    stepper.next()
  }
  cevapGoster() {
    this.soruVisible = false
  }

  async videoEnd() {
    await this.delay(4000)
    this.soruVisible = false

  }

  test() {
    console.log("play")
  }

  complete() {
    let userRole = this.authHepler.userActor;
    if (!userRole) {

      let completeRapor = new KullaniciRapor();
      completeRapor.id = this.storage[this.userRaporIndex]["raporId"]
      completeRapor.dogruSayisi = this.storage[this.userRaporIndex]["dogru"]
      completeRapor.yanlisSayisi = this.storage[this.userRaporIndex]["yanlis"]
      completeRapor.isKategoriCustom = this.storage[this.userRaporIndex]["isCustom"]
      completeRapor.isTamamlandi = true;
      completeRapor.oturumSirasi = this.storage[this.userRaporIndex]["oturumSirasi"]
      completeRapor["oturumID"] = this.storage[this.userRaporIndex]["oturumID"]
      completeRapor.kategoriID = this.storage[this.userRaporIndex]["kategoriID"]
      completeRapor.seviyeID = this.storage[this.userRaporIndex]["seviyeID"]
      completeRapor.kullaniciID = this.authhElper.userId;
      this.oturumService.getSonSeviye(completeRapor["oturumID"]).subscribe(async data => {
        if (completeRapor.oturumSirasi == data) {
          completeRapor["oturumTamamlandi"] = true
        }
      }, error => { },
        () => {
          console.log("rapo", completeRapor)
          this.soruService.updateKullaniciRapor(completeRapor).subscribe(data => {
            if (data) {
              //Local storageden o seviyeyi kaldırma işlemi 
              this.storage.splice(this.userRaporIndex, 1)
              console.log('store***', this.storage)
              localStorage.setItem(this.authhElper.userId + 'user', JSON.stringify(this.storage))

            }
          })
        })
    } else {
      this.router.navigateByUrl("pages/quiz/oturumlar")
    }
    //
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}