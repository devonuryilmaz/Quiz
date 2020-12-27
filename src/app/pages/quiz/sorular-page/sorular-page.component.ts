import { Component, OnInit, ViewChild, QueryList, ViewChildren, HostListener, Input, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbStepperComponent, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbCardModule, NbButtonComponent } from '@nebular/theme';
import { SoruService } from '../../admin/admin/soru/soru.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { Soru } from '../../models/soru';
import { SecenekService } from '../../admin/admin/secenek/secenek.service';
import { Secenek } from '../../models/secenek';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbFlipCardComponent } from '@nebular/theme/components/card/flip-card/flip-card.component'
import { NbRevealCardComponent } from '@nebular/theme/components/card/reveal-card/reveal-card.component'
import { SeviyeService } from '../../admin/admin/seviye/seviye.service';
import { Seviye } from '../../models/seviye';
import { AuthHelper } from '../../auth/auth-helper';
import { KategoriService } from '../../admin/admin/kategori/kategori.service';
import { Kategori } from '../../models/kategorii';
import { SoruFoto } from '../../models/SoruFoto';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { KullaniciRapor } from '../../models/KullaniciRapor';
import { OturumService } from '../../admin/admin/oturum/oturum.service';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ENTER = 13
}


@Component({
  selector: 'sorular-page',
  templateUrl: './sorular-page.component.html',
  styleUrls: ['./sorular-page.component.scss']
})
export class SorularPageComponent implements OnInit {

  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  statusToast: NbToastStatus;
  dogruSayisi: number = 0;
  index: number
  yanlisSayisi: number = 0;
  private sub: any;
  emotionalFaceTrue: string = "";
  urlId: number;
  sorular: Soru[];
  secenekler: Secenek[];
  soruId: number;
  status = 0;
  seviye: Seviye;
  uzunluk: number;
  secenekUzunluk = 0;
  sayiStyle: any;
  kategoriAdi: string;
  kategori: Kategori;
  kategoriler: Kategori[];
  faceReplayDagitim: boolean = false;
  storage;
  userRaporIndex: number;
  tema: number = 0;

  @ViewChildren(NbFlipCardComponent) cards: QueryList<NbFlipCardComponent>
  listCard: NbFlipCardComponent[]

  @ViewChildren(NbButtonComponent) buttons: QueryList<NbButtonComponent>


  @ViewChild(NbFlipCardComponent)
  flipCard: NbFlipCardComponent;

  @ViewChild(NbRevealCardComponent)
  revealCard: NbRevealCardComponent;


  @ViewChild(NbStepperComponent)
  nbStepperComponent: NbStepperComponent;
  constructor(
    private sorularService: SoruService,
    private seviyeService: SeviyeService,
    private route: ActivatedRoute,
    private router: Router,
    private seceneklerService: SecenekService,
    private toastrService: NbToastrService,
    private authhElper: AuthHelper,
    private kategoriService: KategoriService,
    private elRef: ElementRef,
    private oturumService: OturumService,

    config: NgbCarouselConfig) {

  }

  //Yanlış Mesajı
  errorToastMessage(headerMessage, bodyMessage) {
    let type = NbToastStatus.DANGER;;
    this.showToast(type, headerMessage, bodyMessage);
  }

  //Doğru Mesajı
  successToastMessage(headerMessage, bodyMessage) {
    let type = NbToastStatus.SUCCESS;;
    this.showToast(type, headerMessage, bodyMessage);
  }

  //Toast Gösterme
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


  ngOnInit() {
    //Giriş Kontrolü
    this.authhElper.session()
    //Local Strorage kontrolü (User id ile alma)
    this.storage = JSON.parse(localStorage.getItem(this.authhElper.userId + 'user'))
    console.log('###storage###', this.storage)
    //Seviye id den kategoriyi bulma sonrasında seviyenin sorularını alma 
    this.sub = this.route.params.subscribe(params => {
      this.urlId = +params['id'];
      console.log('this.urlId', this.urlId)
      if (this.urlId > 0) {
        this.seviyeService.getSeviyeById(this.urlId).subscribe(data => {
          console.log("data", data)
          this.seviye = data
          console.log("seviye", this.seviye)
          if (this.seviye["soruSuresi"] && this.seviye["soruSuresi"] != null) {
            this.soruSuresi = this.seviye["soruSuresi"]
          }
          console.log("süre", this.seviye)

        }, error => { console.log("error") },
          async () => {

            this.kategoriService.getKategoriById(this.seviye["kategoriID"]).subscribe(item => {
              this.kategori = item;
              this.tema = item.tema
              this.kategoriAdi = this.kategori["kategoriAdi"]
              console.log("kate", this.tema)
            })

            await this.getAllBySoruId(this.urlId)

          })
      }
      if (Number.isNaN(this.urlId)) {
        this.router.navigateByUrl("/pages/quiz/kategoriler")
      }
    });

  }

  //Seviyelere geri dönüş fonksiyonu
  turnToSeviye() {
    //Sorular varsa eğer seviyelere dönmeden önce veritabanına kayıt edilir
    if (this.sorular.length > 0 && !this.authhElper.userActor) {
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
          this.sorularService.updateKullaniciRapor(completeRapor).subscribe(data => {
            if (data) {
              //Local storageden o seviyeyi kaldırma işlemi 
              this.storage.splice(this.userRaporIndex, 1)
              console.log('store***', this.storage)
              localStorage.setItem(this.authhElper.userId + 'user', JSON.stringify(this.storage))

            }
          })
        })
    }

    //Eğer test cevaplanıp çıkılmışsa mesaj göster
    if (this.sorular.length > 0) {
      this.successToastMessage("Tebrikler", "Diğer egzersizde başarılar")
    }
    let path = "/pages/quiz/oturumlar";
    this.router.navigateByUrl(path);

  }

  indexler: number[] = []
  emotionalFaceResim: boolean = false;
  //Sorunun seçeneklerini al
  async getAllBySecenekId(id: number) {
    //Tıklanma olayını hayıra çevir 
    this.submitted = false;
    this.seceneklerService.getAllBySecenekId(id).subscribe(async data => {
      this.secenekler = data;
      this.secenekler.forEach(item => {
        //Urlleri f ve v yi atarak çevirme 
        if (item["url"] != null || item["url"] == "") {
          item["url"] = item["url"].slice(1, item["url"].length)

        }
        else {
          item["url"] = null
        }
      })

      console.log("burda")
      this.secenekUzunluk = this.secenekler.length;
      if (this.tema == 3) {
        //Emotional face butonları için doğru yanlış atamaları
        if (this.secenekler[0]["isTrue"]) {
          this.emotionalFaceTrue = this.secenekler[1]["icerik"]
        }
        else {
          this.emotionalFaceTrue = this.secenekler[0]["icerik"]
        }
        this.emotionalFaceResim = true;
        console.log("secenek", this.emotionalFaceTrue)
      }

      console.log("secenekler", this.buttons)
      this.sayiStyle = {
        'margin': this.secenekler.length == 2 ? 'auto' : ''
      }
      let last = 0;     /*
      last = data.findIndex(item=>item.isTrue)
        if(this.indexler.length==0){
          this.indexler.push(last);
        }
        else{ 
          this.index = (this.indexler.length*3)+last
          this.indexler.push(this.index);
        }*/
    }, error => { }, async () => {
      if (this.ilkFotoGosterildi || this.tema == 6)
        await this.birinciGosterim()
    })
  }

  soruYok: boolean = false;
  //Seviyelerin soruları alnır
  async getAllBySoruId(id: number) {
    this.soruPhotos = [];
    this.sorularService.getAllBySoruId(id).subscribe(async data => {
      if (data.length == 0) {
        this.soruYok = true;
        return;
      }
      else {
        this.sorular = data;
      }
      try {
        //local storage kontrol ediliyor eğer daha önce bu seviyeye girilmişse 
        //seviyenin hangi indexte kaldığı alınarak soru id belirleniyor
        //İlk defa giriliyorsa catch'e düşecek ve 0 dan başlayacak
        this.userRaporIndex = this.storage.findIndex(r => r["seviyeID"] == this.urlId)
        //await this.delay(500)
        console.log("rapor", this.storage[this.userRaporIndex])
        this.soruId = this.sorular[this.storage[this.userRaporIndex]["index"]]["soruID"]
        //Progress bar yüzdesi kalınan soruya göre ayarlanıyor
        this.status = Math.trunc(((this.storage[this.userRaporIndex]["index"]) / this.sorular.length) * 100)
        console.log("status", this.status)
        this.ilkFotoGosterildi = false;
      } catch {
        this.soruId = this.sorular[0]["soruID"]
      }
      this.uzunluk = this.sorular.length;
      this.length = this.sorular.length;
    }, error => { }, async () => {
      await this.getSoruAllPhotos(this.soruId);
      console.log("sa", this.sorular)
      if (this.sorular.length > 0) {
        //Resimli sorular için urllerin dönüştürülmesi yapılıyor
        this.sorular.forEach(async (soru) => {
          if (soru.url != null) {
            soru.url = soru.url.slice(1, soru.url.length)

          }
          else {
            soru.url = null
          }
        })

        //Sorunun Seçenekleri Alınıyor
        await this.getAllBySecenekId(this.soruId)
        //Sorudan sonra seçenek, seçenekten sonra cevabın gösterilmesi için çağırılan fonksiyon
        /*if (this.ilkFotoGosterildi)
          await this.birinciGosterim()
*/
      }
    })
  }

  soruPhotos: any[];
  emotionReplayUrl: string;
  soruPhotoIndex: number = 0;
  fotoMu: boolean;
  //Sorunun fotoğrafları alınır 
  async getSoruAllPhotos(soruID: number) {
    this.soruPhotos = [];
    this.soruPhotoSelect = []
    this.faceReplayRandom = [];
    this.sorularService.getSoruFoto(soruID).subscribe(async data => {
      //Url dönüşüm işlemleri yapılıyor
      this.soruPhotos = data;
      this.soruPhotos.sort((a, b) => {
        return a.sira - b.sira;
      })
      console.log("getAll", this.soruPhotos)
      this.soruPhotos.forEach((item) => {
        if (item.url != null) {
          let neBu = item.url.slice(0, 1)
          console.log("nebu", neBu)
          if (neBu == "v") {
            this.fotoMu = false
          }
          else if (neBu == "f") {
            this.fotoMu = true
          }
          item.url = item.url.slice(1, item.url.length)
        }
        else {
          item.url = null
        }
        //Soruların visibility başta false olarak ayarlanıyor
        //Sonrasında ilk soruya true verilecek ve sıra sıra true değerini alacaklar
        item["visible"] = false;
        //Sorunun sıraları diziye atılıyor
        this.soruPhotoSelect.push(item["sira"])
      })
      console.log(this.soruPhotos);
    }, error => {
      console.log("error")
    },
      async () => {
        //Kategori kontrolü
        if (this.tema == 5) {
          //Face replayde 8'lik bi alana yayıldığı tasarlanarak farklı indexler alması için ve diziye atama işlemleri
          console.log("uzunluk", this.soruPhotos.length)
          for (var i = 0; i < this.soruPhotos.length; i++) {
            var randomnumber = Math.floor(Math.random() * (9 - 1)) + 1; //0ile10 arası rakam

            if (this.faceReplayRandom.indexOf(randomnumber) == -1) { // dizideki indexine bakıyorum -1 ise yani yoksa 

              this.faceReplayRandom.push(randomnumber);// diziye ekliyorum
            }
            else { //varsa i'yi 1 düşürüp başa döndüp yine rakam üretiyorum.. böylece aynı rakam gelse bile başa dönüp yine rakam üretecek!
              i--;
            }
            console.log("select list", this.soruPhotoSelect);

          }
          //Bu kategoriye ait gösterim
          await this.faceReplayGosterim();
        }
        else {
          //Diğer fotoğraf/video sorularının gösterimi için çalışacak fonksiyon
          await this.soruFotoGosterim();
        }


      })
  }

  keyTıkSayisi: number = 0;

  //Klavye eventlerini yakalaması için 
  @HostListener('window:keyup', ['$event'])
  async keyEvent(event: KeyboardEvent) {
    console.log(event);
    //Entera basılırsa,tıklanmışsa ve tık sayısı soruların uzunluğundan az ya da eşitse
    if (event.keyCode === KEY_CODE.ENTER && this.submitted && this.keyTıkSayisi <= this.sorular.length) {
      await this.delay(500)
      this.sonrakiSoru(this.nbStepperComponent, this.keyTıkSayisi - 1)
    }
    if (this.kategori["tema"] == 3 && this.keyTıkSayisi < this.sorular.length) {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        //Sağ yön tuşuna basılırsa
        this.keyTıkSayisi++;
        console.log("sağ", this.sorular.indexOf)
        console.log("buton", this.buttons.find(i => i.adi == "sag"))
        if (this.submitted != true) {
          this.soruKontrol(this.nbStepperComponent, this.secenekler[1]["isTrue"], this.sorular.indexOf, null, this.buttons.find(i => i.adi == "sag"))
        }
      }
      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        //Sol yön tuşuna basılırsa
        this.keyTıkSayisi++;
        console.log("sol")
        console.log("buton", this.buttons)
        if (this.submitted != true) {
          this.soruKontrol(this.nbStepperComponent, this.secenekler[0]["isTrue"], this.sorular.indexOf, null, this.buttons.find(i => i.adi == "sol"))

        }
        //    console.log("buton",this.buttons.find(i=>i.adi=="sol"))
      }

    }
  }


  submitted = false;
  video: any;
  //Sonraki soruya geçiş fonksiyonu 
  async sonrakiSoru(stepper: NbStepperComponent, i, vide?: any) {
    ///
    try {
      this.videolar[i + 1].currentTime = 0;
      this.videolar[i + 1].load()
      this.videolar[i + 1].autoplay = true;
      this.videolar[i + 1].play();
    } catch (error) {

    }
    //Doğru cevap ve soru  gösterimi
    this.emotionalFaceResim = false;
    this.ucuncuGosterim = false;
    //Doğru cevap gösterimi
    this.dogruCevap = false;
    this.secondShowing = false;
    this.firstShowing = true;
    //Emotion replayseçeneği gösterimi
    this.soruSecenekGosterim = false;
    //Emotion replay fotoğrafı gösterimi
    this.sorufotogosterim = true;
    //Fotoğraflı soruların başlangıç indexi
    this.soruPhotoIndex = 0;
    //İlk gösterim için çağırılan fonksiyon
    //this.birinciGosterim()
    this.submitted = false;
    console.log("sub", this.submitted)
    //Doğru yanlış sayısı local storagedeki değerlere eşitleniyor
    if (!this.authhElper.userActor) {
      this.dogruSayisi = this.storage[this.userRaporIndex]["dogru"]
      this.yanlisSayisi = this.storage[this.userRaporIndex]["yanlis"]
    }
    //Kalınan yere göre progress bar ayarlanıyor
    this.status += Math.trunc(100 / this.length);//float değeri integera çeviriyor.çünkü float değer progreste kötü gözüküyor.
    if (i == this.length - 1) {
      this.status = 100;// floattan integere çevirdiğimiz için veri kaybı oluyor son aşamada %100ü dolduramıyor o yüzden ??

    }
    if (this.tema == 3) {
      //Buton renklerini sıfırladık
      this.buttons.forEach(item => item.status = "")
    }

    //Sonraki step
    stepper.next();
    //Sonraki step local storagedeki item atandı
    if (!this.authhElper.userActor) {

      this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex;
      localStorage.setItem(this.authhElper.userId + 'user', JSON.stringify(this.storage))
    }


    if (i < this.length - 1) {
      //soruların uzunluğundan az ise sonraki soruya geç
      this.soruId = this.sorular[i + 1]["soruID"]
      if (this.tema == 4 || this.tema == 5) {
        await this.getSoruAllPhotos(this.soruId);
        await this.delay(1000);
      }
      await this.getAllBySecenekId(this.soruId)
      //await this.customVideo(null,i);

    }

  }

  length: number;
  butonStyle: any;
  butonStyle2: any;
  dogruCevap: boolean;
  cevapSrc: string;
  ucuncuGosterim: boolean;
  duyguIsımDogru: string;

  //Soru doğruluğunun kontrol edildiği fonksiyon
  async soruKontrol(stepper?: NbStepperComponent, isTrue?, i?, flipCard?: NbFlipCardComponent, buton?: NbButtonComponent, element?: any) {
    this.submitted = true;
    console.log("lengt", this.length)
    if (element) {
      //Gelen divden doğru cevabı buluyoruz ve cevap srcye atıyoruz
      if (element["children"][0]["src"]) {
        //this.cevapSrc = element["children"][0]["src"]
        this.cevapSrc = this.secenekler.find(s => s.isTrue == true)["url"]
        console.log("element", element)
      }
      else {
        this.cevapSrc = this.secenekler.find(s => s.isTrue == true)["icerik"];
      }
      //Doğru cevap ve soru fotoğrafı gösterilir
      this.ucuncuGosterim = true;
      console.log("element", this.cevapSrc)
    }
    console.log("i", i)
    //Doğru cevapta
    if (isTrue && isTrue == true) {
      //Doğru cevabın görünürlüğünü ayarlıyoruz 
      if (element) {
        element.setAttribute("style", "visibility:visible")
      }
      //Doğru sayısı local storage'e kayıt ediliyor
      if (!this.authhElper.userActor) {
        this.storage[this.userRaporIndex]["dogru"]++;

      }
      this.dogruCevap = true;
      this.dogruSayisi++;
      //Fotoğraflı soruların doğru gösterim süresi %10 düşüyor
      //3 sn -> 2.7 sn >>> 2.7 sn -> 2.5 sn (isteğe göre ayarlanır)
      console.log("süre", this.soruSuresi)
      this.soruSuresi = (this.soruSuresi - (this.soruSuresi * 0.10))
      //Eğer flipcard ise seçenek
      if (flipCard) {
        //seçenekleri gösterme fonk
        this.secenekGoster();
      }
      //Seçenek buton ise
      if (buton) {
        //buton görüntülerini ayarlama fonksiyonu 
        this.butonYak(true)
      }
      //Testin sonu ise test bitti mesajı
      if (i == this.length - 1) {
        this.successToastMessage("Doğru Cevap", "Tebrikler test bitmiştir .");
        await this.delay(750);
      }
      //test devam ediyorsa doğru cevap mesajı
      else {
        this.successToastMessage("Doğru Cevap", "Sonraki soruya geçebilirsiniz.");
        await this.delay(750);
      }

      //Sonraki soruya geçmeden 0.75 sn bekleme süresi
      //      await this.delay(750);

    } else {
      //Local storage'e yanlış sayısı 
      if (!this.authhElper.userActor) {
        this.storage[this.userRaporIndex]["yanlis"]++;
      }
      if (this.tema == 7 && this.fotoMu) {
        this.cevapSrc = this.secenekler.find(s => s.isTrue == true)["icerik"]
      }
      if (!this.cevapSrc && this.fotoMu) {
        this.cevapSrc = this.secenekler.find(s => s.isTrue == true)["icerik"]

      }

      console.log("yanlış", this.duyguIsımDogru)
      this.yanlisSayisi++;
      this.dogruCevap = false;
      //Eğer flipcard ise seçenek
      if (flipCard) {
        //seçenekleri gösterme fonk
        this.secenekGoster();
      }
      if (buton) {
        //buton görüntülerini ayarlama fonksiyonu
        this.butonYak(false)
      }
      //Test bitimi yanlış cevap ve test bitimi mesajı
      if (i == this.length - 1) {
        this.errorToastMessage("Yanlış Cevap", "Tebrikler egzersiz bitmiştir .")
        await this.delay(750);
      }
      //Yanlış cevap mesajı
      else {
        this.errorToastMessage("Yanlış Cevap", "Sonraki soruya geçebilirsiniz.");
        await this.delay(750);
      }
      //Seçenek buton ise

    }
    //local storage'e stepperın indexini atama
    if (!this.authhElper.userActor) {
      this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex;
      localStorage.setItem(this.authhElper.userId + 'user', JSON.stringify(this.storage))
    }

  }

  soruPhotoSelect: number[] = [];
  emotionSelect: number = 1;

  //Emotion Replay kategorisi için soru kontrolü fonksiyonu
  async EmotionReplayKontrol(stepper?: NbStepperComponent, i?, item?: any, secenekIcerik?: string, sira?: number
    , flipCard?: NbFlipCardComponent, cevap?: any) {
    //Tıklandı = true
    this.submitted = true;
    console.log("i", this.soruPhotoSelect)
    //Soru sırası ile tıklananın sıralaması aynı ise 
    if (sira == this.soruPhotoSelect[this.soruPhotoIndex]) {

      this.soruPhotoIndex++;
      //Doğru cevap verince gelen itemin görünürlüğünü ayarlıyoruz
      if (item) {
        flipCard.toggle()
        await this.delay(500)
        console.log("element", item)
        console.log("cevap", cevap)
        console.log("secenek", secenekIcerik)
        item.setAttribute("style", "visibility:hidden")
      }

      //Test bitimi ve doğru cevap mesajları
      if (i == this.length - 1) {
        this.successToastMessage("Doğru Cevap", "Tebrikler test bitmiştir .");
      } else {
        this.successToastMessage("Doğru Cevap", "Sonraki soruya geçebilirsiniz.");
      }
      await this.delay(750);
      //Soruların sırası ile son gelen sıra aynı ise doğru sayısını arttır sonraki soruya geç
      if (this.soruPhotos.length == sira) {
        this.dogruSayisi++;
        if (!this.authhElper.userActor) {
          this.storage[this.userRaporIndex]["dogru"]++;

        }
        await this.delay(500)
        this.sonrakiSoru(stepper, i)
      }
    }
    //Yanlış cevap için 
    else {
      //Yanlış sayısı arttırılıyor
      this.yanlisSayisi++;
      if (!this.authhElper.userActor) {
        this.storage[this.userRaporIndex]["yanlis"]++;

      }
      if (item) {
        cevap["src"] = "../../../../assets/images/false.png";
        await this.delay(300)
        flipCard.toggle()
        await this.delay(500)
        item.setAttribute("style", "visibility:hidden")
      }
      //Son soru ise testi bitiriyor değilse sonraki soruya geçiyor 
      if (i == this.length - 1) {
        this.errorToastMessage("Yanlış Cevap", "Tebrikler test bitmiştir .")
      } else {
        this.errorToastMessage("Yanlış Cevap", "Sonraki soruya geçebilirsiniz.");
      }
      await this.delay(750);
      this.sonrakiSoru(stepper, i)

    }
    //local storage'e son kalınan index atanıyor
    if (!this.authhElper.userActor) {
      this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex;
      localStorage.setItem(this.authhElper.userId + 'user', JSON.stringify(this.storage))
    }
  }

  faceReplayIlkSoru: boolean = true;
  async faceReplayIlkSoruGosterim() {
    this.faceReplayIlkSoru = false;
    this.ilkFotoGosterildi = true;
    this.faceReplayGoster = true;
    await this.faceReplayGosterim();
  }

  //Face Replay kategorisi için 
  async faceReplayGosterim() {
    let say: number = 0;
    if (!this.ilkFotoGosterildi) {
      //this.frSonrakiSoru = true;
      this.ilkFotoGosterildi = true;
      return;
    }
    if (!this.authhElper.userActor) {
      this.soruId = this.sorular[this.storage[this.userRaporIndex]["index"]]["soruID"];
      //Progress bar yüzdesi kalınan soruya göre ayarlanıyor
      this.status = Math.trunc(((this.storage[this.userRaporIndex]["index"]) / this.sorular.length) * 100)

    }

    this.soruPhotos[0]["visible"] = true;
    await this.delay(this.soruSuresi)

    //İlk fotoğrafın gösterimi için 
    //Fotoğraflar birer saniye gösteriliyor
    for (let i = 0; i < this.soruPhotos.length; i++) {
      //Sorulara dağılacakları index veriliyor
      this.soruPhotos[i]["dagit"] = this.faceReplayRandom[i]

      //Eğer sorunun son fotoğrafı ise template'i 2. aşamaya geçir
      if (i == this.soruPhotos.length - 1) {
        await this.delay(this.soruSuresi + 500);
        //Soru fotoğrafını kapat
        this.faceReplayGoster = false;
        //Soru fotoğraflarının dağılacağı yeri aç 
        this.faceReplayDagitim = true;
        //Soru fotoğrafının indexini sıfırla
        this.soruPhotoIndex = 0
      }
      //Eğer sorunun son fotoğrafı değilse sonraki fotoğrafı göster
      else {
        await this.delay(this.soruSuresi + 500);
        this.soruPhotos[i + 1]["visible"] = true;
        this.soruPhotos[i]["visible"] = false;
      }
    }

  }
  //face replay sonraki soru
  frSonrakiSoru: boolean = false;
  //Face Replay kategorisinin soru kontrolü
  async FaceReplaySoruKontrol(stepper?: NbStepperComponent, i?, sira?: number, element?: any) {
    console.log("sira", sira)
    console.log("element", element)
    //element.setAttribute("style", "visibility:hidden");
    element.setAttribute("disabled", "");
    this.submitted = true;
    console.log("i", i)
    //Soru sırası ile tıklananın sıralaması aynı ise (doğru ise yani )
    if (sira == this.soruPhotoSelect[this.soruPhotoIndex]) {

      this.soruPhotoIndex++;

      if (i == this.length - 1) {
        this.successToastMessage("Doğru Cevap", "Tebrikler test bitmiştir .");
      } else {
        this.successToastMessage("Doğru Cevap", "Sonraki soruya geçebilirsiniz.");
      }
      await this.delay(750);
      //Eğer sorunun son fotoğrafı ve doğruysa doğru sayınısı arttırır
      if (this.soruPhotos.length == sira) {
        this.dogruSayisi++;
        if (!this.authhElper.userActor) {
          this.storage[this.userRaporIndex]["dogru"]++;
        }
        this.faceReplayDagitim = false;
        this.frSonrakiSoru = true;
        //await this.faceReplaySonrakiSoru(stepper, i)
      }
    }
    //Soru sırası ile tıklananın sıralaması aynı değil ise (yanlış ise yani )
    else {
      this.yanlisSayisi++;
      if (!this.authhElper.userActor) {
        this.storage[this.userRaporIndex]["yanlis"]++;
      }


      if (i == this.length - 1) {
        this.errorToastMessage("Yanlış Cevap", "Tebrikler test bitmiştir .")        //stepper.next();

      } else {
        this.errorToastMessage("Yanlış Cevap", "Sonraki soruya geçebilirsiniz.");
      }
      await this.delay(750);
      this.faceReplayDagitim = false;
      if (i != this.length - 1) {
        this.frSonrakiSoru = true;
      }
      else if (i == this.length - 1) {
        this.frSonrakiSoru = false;
        stepper.next();
      }

      //await this.faceReplaySonrakiSoru(stepper, i)

    }
  }

  //Face Replay sonraki soruya geçiş
  async faceReplaySonrakiSoru(stepper?: NbStepperComponent, i?) {
    console.log("sadeneme", i)
    console.log("soru", this.soruId)
    if (!this.authhElper.userActor) {
      this.dogruSayisi = this.storage[this.userRaporIndex]["dogru"]
      this.yanlisSayisi = this.storage[this.userRaporIndex]["yanlis"]
    }
    stepper.next();

    if (!this.authhElper.userActor) {
      this.storage[this.userRaporIndex]["index"] = this.nbStepperComponent.selectedIndex;
      localStorage.setItem(this.authhElper.userId + 'user', JSON.stringify(this.storage))
    }
    if (i == this.length - 1) {
      this.status = 100;// floattan integere çevirdiğimiz için veri kaybı oluyor son aşamada %100ü dolduramıyor o yüzden ??

    }
    else {
      this.status += Math.trunc(100 / this.length);
    }
    //Dağıtımı kapatma
    //this.faceReplayDagitim = false;
    if (this.ilkFotoGosterildi) {
      if (i < this.length - 1) {
        this.soruId = this.sorular[i + 1]["soruID"]
        if (this.tema == 4 || this.tema == 5) {
          await this.getSoruAllPhotos(this.soruId);
          await this.delay(1000);
        }
        await this.getAllBySecenekId(this.soruId)
      }
    }
    else {
      this.faceReplayGosterim();
    }

    //await this.delay(500);
    this.frSonrakiSoru = false;
    this.ilkFotoGosterildi = true;
    this.faceReplayDagitim = false;
    this.faceReplayGoster = true;

  }




  secondShowing: boolean = false;
  firstShowing: boolean;

  async birinciGosterim() {
    console.log("sa")
    try {
      if (!this.authhElper.userActor) {
        console.log("idrapor", this.urlId)

        this.userRaporIndex = this.storage.findIndex(r => r["seviyeID"] == this.urlId)
        console.log("rapor", this.storage[this.userRaporIndex])
        this.nbStepperComponent.selectedIndex = this.storage[this.userRaporIndex]["index"]
      }

    }
    catch{
      console.log("yok")
    }
    //this.faceReplayDagitim=true;
    await this.delay(this.soruSuresi + 500)
    this.firstShowing = false;
    await this.delay(500)
    this.secondShowing = true;
  }

  sorufotogosterim: boolean = true;
  soruSecenekGosterim: boolean = false;
  faceReplayGoster: boolean = false;
  faceReplayNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
  faceReplayRandom: number[] = []

  //Video sonlanınca çalışan fonksiyon
  videoEnd() {
    if (this.soruPhotoIndex == this.soruPhotos.length - 1) {
      this.soruPhotos.sort(function (a, b) { return 0.5 - Math.random() });
      console.log("sort", this.soruPhotos)
      this.delay(500)
      this.sorufotogosterim = false;
      this.soruSecenekGosterim = true;
      this.soruPhotoIndex = 0;
    }
    else {
      this.soruPhotoIndex++;
      this.delay(500)
      this.soruPhotos[this.soruPhotoIndex - 1]["visible"] = false;
      this.soruPhotos[this.soruPhotoIndex]["visible"] = true;
    }
  }

  async emotionReplayFoto() {
    this.soruPhotos[0]["visible"] = true;
    for (let i = 0; i < this.soruPhotos.length; i++) {
      //Eğer sorunun son fotoğrafı ise template'i 2. aşamaya geçir
      if (i == this.soruPhotos.length - 1) {
        /*this.soruPhotos.sort((a,b)=>{
          return a.sira - b.sira;
        })*/
        this.soruPhotos.sort(function (a, b) { return 0.5 - Math.random() });
        await this.delay(this.soruSuresi + 500);
        //Soru fotoğrafını kapat
        this.sorufotogosterim = false;
        //Soru fotoğraflarının dağılacağı yeri aç 
        this.soruSecenekGosterim = true;
        //Soru fotoğrafının indexini sıfırla
        this.soruPhotoIndex = 0
      }
      //Eğer sorunun son fotoğrafı değilse sonraki fotoğrafı göster
      else {
        await this.delay(this.soruSuresi + 500);
        this.soruPhotoIndex++;
        this.soruPhotos[this.soruPhotoIndex - 1]["visible"] = false;
        this.soruPhotos[this.soruPhotoIndex]["visible"] = true;
      }
    }
  }

  async soruFotoGosterim() {
    if (this.soruPhotos.length > 0) {
      /* this.soruPhotos.sort((a,b)=>{
         return a.sira - b.sira;
       })*/
      this.soruPhotos[this.soruPhotoIndex]["visible"] = true;
    }
    if (this.tema == 4 && this.fotoMu == true) {
      this.emotionReplayFoto()
    }
  }

  soruSuresi: number;


  soruGoster(revealCard: NbRevealCardComponent) {
    revealCard.toggle();
  }
  secenekGoster() {
    //flipCard.toggle();
    this.cards.forEach(item => item.toggle());
  }

  butonYak(isTrue: boolean) {
    if (isTrue == true) {
      return 'green'
    }
    else {
      return 'red'
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  videoBitis: boolean = false;
  say: number = 0;
  videolar: HTMLVideoElement[] = [];
  async customVideo(vide?: any, i?: number) {
    if (vide && this.videolar.length != this.sorular.length) {
      this.videolar.push(vide)
      this.videolar.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
      });
      console.log("vide", this.videolar)
    }
    // if (this.videoPlayed == false) {
    //   console.log("i", i)
    //   this.videolar[vide["id"]].play();
    // }

  }

  ilkFotoGosterildi = false;
  async ilkFotografiGoster() {
    this.firstShowing = true;
    this.ilkFotoGosterildi = true;
    await this.birinciGosterim();
  }
}