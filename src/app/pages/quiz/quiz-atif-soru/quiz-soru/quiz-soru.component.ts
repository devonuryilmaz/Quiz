import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SoruService } from '../../../admin/admin/soru/soru.service';
import { AuthHelper } from '../../../auth/auth-helper';
import { SecenekService } from '../../../admin/admin/secenek/secenek.service';
import { AtıfCevap } from '../../../models/AtifCevap';
import { NbStepperComponent } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { KullaniciAtıfRapor } from '../../../models/KullaniciAtıfRapor';
import { OturumService } from '../../../admin/admin/oturum/oturum.service';

@Component({
  selector: 'quiz-soru',
  templateUrl: './quiz-soru.component.html',
  styleUrls: ['./quiz-soru.component.scss']
})
export class QuizSoruComponent implements OnInit {
  private sub: any;
  @ViewChild(NbStepperComponent)
  nbStepperComponent: NbStepperComponent;
  userRaporIndex;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  videoPlayerSource: string;
  sorular = [];
  selectedId;
  storage;
  atifRaporlar = [];
  constructor(private soruService: SoruService, private route: ActivatedRoute, private authHepler: AuthHelper,
    private authhElper: AuthHelper, private router: Router, private secenekService: SecenekService,
    private oturumService: OturumService) { }

  ngOnInit() {

    this.soruService.getAllKullaniciAtıfRapor().subscribe(data => {
      this.atifRaporlar = data;


    })
    let id;

    let userRole = this.authHepler.userActor;
    if (!userRole) {//buraya bak***********
      this.storage = JSON.parse(localStorage.getItem(this.authHepler.userId + 'userAtif'))
      console.log('###storage###', this.storage)

      this.route.params.subscribe(params => {

        id = params["id"]
      })
      try {
        this.userRaporIndex = this.storage.findIndex(r => r["seviyeID"] == id)
        this.nbStepperComponent.selectedIndex = this.storage[this.userRaporIndex]["index"]
      } catch (error) {
        this.router.navigateByUrl("/pages/quiz/oturumlar")

      }

    } else {
      this.nbStepperComponent.selectedIndex = 0;// admin ise selected index 0 yani hep baştan başlıyor
    }

    this.authhElper.session()
    this.sub = this.route.params.subscribe(params => {
      // console.log('***********params',params)
      let id = +params['id'];
      console.log('id', id);

      if (Number.isNaN(id)) {
        //this.router.navigate(['../../'])//error.
        this.router.navigateByUrl("/pages/quiz/oturumlar")
      } else {
        if (this.videoplayer) {
          this.videoplayer.nativeElement.load();
        }
        this.selectedId = id;
        this.getAtıfSoruAllBySeviyeId(id)

      }

    });

  }

  atifRaporStartDate(id) {
    return this.atifRaporlar.find(r => r['id'] == id)['startDate'];
  }
  getAtıfSoruAllBySeviyeId(id) {
    this.soruService.getAtıfSoruAllBySeviyeId(id).subscribe(data => {
      this.sorular = data;
      if (this.sorular.length < 1) {

        this.router.navigateByUrl("/pages/quiz/oturumlar")
        return
      }
      console.log('####333 sorular', this.sorular)
      let g = [];
      this.sorular.forEach(function (s, i) {
        s["type"] = s["url"][0]
        s["url"] = s.url.slice(1, s.url.length);
      })
    })
  }
  soruCevapla(soru, value, stepper: NbStepperComponent) {
    console.log('soru', soru)
    console.log('value', value)
    console.log('userId', this.authHepler.userId)
    let userRole = this.authHepler.userActor
    let atıfCevap = new AtıfCevap()
    atıfCevap.AtıfSoruID = soru["id"]
    atıfCevap.UserID = this.authHepler.userId;
    atıfCevap.Cevap = value;
    atıfCevap.AtıfSeviyeID = this.selectedId;
    if (!userRole) {//buraya bak **** 
      this.secenekService.addAtıfSecenek(atıfCevap).subscribe(data => {
        if (data["id"] > 0) {
          this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex + 1;
          localStorage.setItem(this.authHepler.userId + 'userAtif', JSON.stringify(this.storage))
          stepper.next()


        }
      })
    } else {
      stepper.next()
    }
  }


  complete() {



    let userRole = this.authHepler.userActor;
    if (!userRole) {// buraya bak ********
      let completeRapor = new KullaniciAtıfRapor();
      completeRapor.ID = this.storage[this.userRaporIndex]["raporId"]
      let date = this.atifRaporStartDate(completeRapor.ID);


      completeRapor.isTamamlandi = true;
      completeRapor.SeviyeID = this.storage[this.userRaporIndex]["seviyeID"]
      completeRapor.KullaniciID = this.authHepler.userId;
      completeRapor.startDate = date;
      completeRapor.oturumSirasi = this.storage[this.userRaporIndex]["oturumSirasi"]
      completeRapor["oturumID"] = this.storage[this.userRaporIndex]["oturumID"]
      this.oturumService.getSonSeviye(completeRapor["oturumID"]).subscribe(data => {
        if (completeRapor.oturumSirasi == data) {
          completeRapor.oturumTamamlandi = true
        }
      })
      this.soruService.updateKullaniciAtıfRapor(completeRapor).subscribe(data => {
        if (data) {
          this.storage.splice(this.userRaporIndex, 1)
          console.log('store***', this.storage)
          localStorage.setItem(this.authHepler.userId + 'userAtif', JSON.stringify(this.storage))

          this.router.navigateByUrl("pages/quiz/oturumlar")
        }
      })
    } else {
      this.router.navigateByUrl("pages/quiz/oturumlar")
    }
  }

}
