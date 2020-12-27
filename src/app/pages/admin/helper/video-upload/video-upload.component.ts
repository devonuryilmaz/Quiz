import { Component, OnInit, Input, AfterViewChecked, AfterViewInit, AfterContentChecked, AfterContentInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { BindDataService } from '../bind-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {

  @Output() sendUrl: string;

  @Input() rowData: any;
  currentUrl;
  videoUrl: string
  isVideoVisible = 'hidden'
  progress: number;
  uploadMessage;
  uploadVisible = false;
  spinnerStatus = false;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  statusToast: NbToastStatus;

  constructor(private http: HttpClient, private dataBindService: BindDataService, private router: Router,
    private toastrService: NbToastrService, private route: ActivatedRoute
  ) { }
  oynat() {
    if (this.router.url.split("/")[3] == "soru") {
      console.log('send soru')
      this.dataBindService.changeSoru(this.rowData["url"])
    }
    if (this.router.url.split("/")[3] == "kategori") {
      console.log('send kategori')
      this.dataBindService.changeKategori(this.rowData["url"])
    }
    if (this.router.url.split("/")[3] == "secenek") {
      console.log('send secenek')
      this.dataBindService.changeSecenek(this.rowData["url"])
    }
    if (this.router.url.split("/")[3] == "soruFotograf") {
      console.log('send soruFoto')
      this.dataBindService.changeSecenek(this.rowData["url"])
    }


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
    if (this.router.url.split("/")[3] == "soru") {
      if (this.rowData["url"] != "" && this.rowData["url"] != null) {

        this.isVideoVisible = 'visible'

      }
      this.currentUrl = "soru";
    }
    if (this.router.url.split("/")[3] == "kategori") {

      if (this.rowData["url"] != "" && this.rowData["url"] != null) {
        this.isVideoVisible = 'visible'

      }
      this.currentUrl = "kategori";
    }

    if (this.router.url.split("/")[3] == "secenek") {
      console.log('-----secenek')
      if (this.rowData["url"] != "" && this.rowData["url"] != null) {
        this.isVideoVisible = 'visible'

      }
      this.currentUrl = "secenek";
    }
    if (this.router.url.split("/")[3] == "soruFotograf") {
      console.log('-----soruFotograf')
      if (this.rowData["url"] != "" && this.rowData["url"] != null) {
        this.isVideoVisible = 'visible'

      }
      this.currentUrl = "soruFotograf";
    }
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();
    let selectedFile;
    let fileType;
    let fileTypeSplit;
    let urlType;
    let controller;
    let tmpId;

    for (let file of files) {
      formData.append(file.name, file);
      selectedFile = file;
    }
    fileType = String(selectedFile.type)
    fileTypeSplit = fileType.split("/")[0]
    if (fileTypeSplit == "image") {
      urlType = "photos";
    } else if (fileTypeSplit == "video") {
      urlType = "video";
    }
    if (this.currentUrl == "kategori") {
      tmpId = this.rowData["kategoriID"]
    } else if (this.currentUrl == "soru") {

      tmpId = this.rowData["soruID"]
    } else if (this.currentUrl == "secenek") {

      tmpId = this.rowData["secenekID"]
    }
    else if (this.currentUrl == "soruFotograf") {

      tmpId = this.rowData["id"]
    }


    let id = -1
    let url = "";
    id = this.rowData["kategoriID"]

    const uploadReq = new HttpRequest('POST', `https://sosyalbilis.com/api/` + urlType + '/' + this.currentUrl + '/' + tmpId, formData, {
      reportProgress: true

    });

    this.http.request(uploadReq).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);

        //todo videoe yüklenirken async arka plan spinner
        //todo video yüklenince sayfa yenilensin
      }
      else if (event.type === HttpEventType.Response) {
        this.uploadMessage = event.body
        if (event.status == 200) {
          //todo  başarılı toastı 
          this.rowData["url"] = event.body;
          this.successToastMessage("Video/Resim Yükleme", "Video/Resim başarı ile yüklenmiştir.")
          this.router.navigateByUrl(this.router.url)
        } else if (event.url == null) {
          this.errorToastMessage("Video/Resim Yükleme", "Video/Resim yüklerken hata oluştu!")
        }
        else {
          //todo  başarısız toastı 
          this.errorToastMessage("Video/Resim Yükleme", "Video/Resim yüklerken hata oluştu!")

        }
      }

    });

  }


}
