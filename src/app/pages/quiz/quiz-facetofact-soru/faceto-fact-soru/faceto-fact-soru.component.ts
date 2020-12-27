import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SoruService } from '../../../admin/admin/soru/soru.service';
import { AuthHelper } from '../../../auth/auth-helper';
import { SecenekService } from '../../../admin/admin/secenek/secenek.service';
import { AtıfCevap } from '../../../models/AtifCevap';
import { NbStepperComponent } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { KullaniciRapor } from '../../../models/KullaniciRapor';
import { OturumService } from '../../../admin/admin/oturum/oturum.service';

@Component({
  selector: 'faceto-fact-soru',
  templateUrl: './faceto-fact-soru.component.html',
  styleUrls: ['./faceto-fact-soru.component.scss']
})
export class FacetoFactSoruComponent implements OnInit {


  constructor(private soruService: SoruService, private secenekService: SecenekService, private route: ActivatedRoute,
    private authHepler: AuthHelper, private authhElper: AuthHelper, private router: Router,
    private oturumService: OturumService) { }
  sorular = [];
  clicked = false;
  @ViewChild(NbStepperComponent)
  nbStepperComponent: NbStepperComponent;
  soruAllPhotos = [];
  photosAllSecenekler = [];
  soruPhotosVisible = false;
  startBtnVisible = true;
  private sub: any;
  openedPhotoIndex = 0;
  cevapVisible = false;
  selectedPhotos = []
  selectedSecenekler = [];
  userRaporIndex;
  storage;
  ngOnInit() {
    let userRole = this.authHepler.userActor;
    if (!userRole) {

      this.storage = JSON.parse(localStorage.getItem(this.authHepler.userId + 'user'))
      console.log('###storage###', this.storage)
      let id;
      this.route.params.subscribe(params => {

        id = params["id"]
      })

      try {
        this.userRaporIndex = this.storage.findIndex(r => r["kategoriID"] == 5 && r["seviyeID"] == id && r["isCustom"] == true)
        this.nbStepperComponent.selectedIndex = this.storage[this.userRaporIndex]["index"]
      } catch (error) {
        this.router.navigateByUrl("/pages/quiz/kategoriler")

      }
    } else {
      console.log('this.nbStepperComponent.selectedIndex');

      this.nbStepperComponent.selectedIndex = 0;
    }

    this.authhElper.session()
    this.sub = this.route.params.subscribe(params => {

      let id = +params['id'];

      if (Number.isNaN(id)) {
        console.log(' this.router.navigateByUrl');

        this.router.navigateByUrl("/pages/quiz/kategoriler")
      } else {
        console.log(' this.router.navigateByUrl elseee');

        this.getFacetoFactSoruById(id)
        this.getFactoFactAllPhotos()
        this.getFacetoFactSecenekAllSecenek()

      }

    });


  }

  getFacetoFactSoruById(id) {
    this.soruService.getFacetoFactSoruAllBySeviyeId(id).subscribe(data => {
      this.sorular = data;
      if (this.sorular.length < 1) {
        this.router.navigateByUrl("/pages/quiz/facetofact-seviyeler/1")
        return
      }

    })
  }
  getFactoFactAllPhotos() {
    this.soruService.getFacetoFactSoruAllPhotos().subscribe(data => {
      this.soruAllPhotos = data;

      this.soruAllPhotos.forEach(photo => {
        photo["url"] = photo["url"].slice(1, photo["url"].length)
        photo["visible"] = false
      })
      console.log('soruAllPhotos', this.soruAllPhotos)
    })
  }
  getFacetoFactSecenekAllSecenek() {
    this.secenekService.getFacetoFactSecenekAllSecenek().subscribe(data => {
      this.photosAllSecenekler = data

      console.log('photosSecenekler', this.photosAllSecenekler)
    })
  }
  getBySoruIdPhotos(id) {
    let photos = [];
    this.soruAllPhotos.forEach((photo) => {
      if (photo["faceToFaceSoruID"] == id) {
        photos.push(photo)
      }
    })

    return photos
  }

  getByPhotoIdSecenekler(id) {
    console.log('gelen id', id)
    let secenekler = [];
    this.photosAllSecenekler.forEach((secenek) => {

      if (secenek["faceToFacePhotoID"] == id) {
        console.log('secenek', secenek)
        secenekler.push(secenek)
      }
    })
    return secenekler
  }

  start(soru) {
    // this.storage[this.userRaporIndex]["index"]=this.nbStepperComponent.selectedIndex;
    // localStorage.setItem(this.authHepler.userId+'user',JSON.stringify(this.storage))
    this.cevapVisible = false;
    this.soruPhotosVisible = true;
    //console.log('soru',soru)
    this.selectedPhotos = this.getBySoruIdPhotos(soru["id"])
    this.selectedPhotos[this.openedPhotoIndex]["visible"] = true;


  }
  async cevapla(secenek, stepper: NbStepperComponent) {
    this.clicked = true;
    await this.delay(1000);
    this.selectedPhotos[this.openedPhotoIndex]["visible"] = false;
    this.openedPhotoIndex++;
    let userActor = this.authHepler.userActor
    if (!userActor) {
      if (this.openedPhotoIndex == this.selectedPhotos.length) {
        if (secenek["isTrue"]) {
          this.storage[this.userRaporIndex]["dogru"]++;
        } else {
          this.storage[this.userRaporIndex]["yanlis"]++;
        }

        console.log("secenek1", secenek)
        //console.log('girdi')
        stepper.next();
        this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex;
        localStorage.setItem(this.authHepler.userId + 'user', JSON.stringify(this.storage))
        this.openedPhotoIndex = 0;
        this.startBtnVisible = true;
      } else {
        //console.log('else')
        if (secenek["isTrue"]) {
          this.storage[this.userRaporIndex]["dogru"]++;
        } else {
          this.storage[this.userRaporIndex]["yanlis"]++;
        }

        localStorage.setItem(this.authHepler.userId + 'user', JSON.stringify(this.storage))
        console.log("secenek2", secenek)
        this.selectedPhotos[this.openedPhotoIndex]["visible"] = true;
        this.selectedSecenekler = this.getByPhotoIdSecenekler(this.selectedPhotos[this.openedPhotoIndex]["id"])
      }
    } else {
      if (this.openedPhotoIndex == this.selectedPhotos.length) {


        stepper.next();

        this.openedPhotoIndex = 0;
        this.startBtnVisible = true;
      } else {


        this.selectedPhotos[this.openedPhotoIndex]["visible"] = true;
        this.selectedSecenekler = this.getByPhotoIdSecenekler(this.selectedPhotos[this.openedPhotoIndex]["id"])
      }
    }
    //
    this.clicked = false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  nextSoruPhoto() {


    this.selectedPhotos[this.openedPhotoIndex]["visible"] = false;
    this.openedPhotoIndex++;
    if (this.openedPhotoIndex == this.selectedPhotos.length) {

      this.openedPhotoIndex = 0;
      this.soruPhotosVisible = false;
      this.selectedPhotos[this.openedPhotoIndex]["visible"] = true;
      this.startBtnVisible = false
      this.selectedSecenekler = this.getByPhotoIdSecenekler(this.selectedPhotos[this.openedPhotoIndex]["id"])

      this.cevapVisible = true;

    } else {
      this.selectedPhotos[this.openedPhotoIndex]["visible"] = true;

    }

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
      completeRapor.kategoriID = this.storage[this.userRaporIndex]["kategoriID"]
      completeRapor.seviyeID = this.storage[this.userRaporIndex]["seviyeID"]
      completeRapor.kullaniciID = this.authHepler.userId;
      completeRapor.oturumSirasi = this.storage[this.userRaporIndex]["oturumSirasi"]
      completeRapor["oturumID"] = this.storage[this.userRaporIndex]["oturumID"]
      this.oturumService.getSonSeviye(completeRapor["oturumID"]).subscribe(data => {
        console.log("sa", data)
        if (completeRapor.oturumSirasi == data) {
          console.log("gitti", data)
          completeRapor.oturumTamamlandi = true
        }
      }, error => { },
        () => {
          this.soruService.updateKullaniciRapor(completeRapor).subscribe(data => {
            if (data) {
              this.storage.splice(this.userRaporIndex, 1)
              console.log('store***', this.storage)
              localStorage.setItem(this.authHepler.userId + 'user', JSON.stringify(this.storage))

              this.router.navigateByUrl("pages/quiz/kategoriler")
            }
          })
        })
    } else {
      this.router.navigateByUrl("pages/quiz/kategoriler")
    }


  }

}
