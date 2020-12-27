import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { BindDataService } from '../bind-data.service';
import { Router } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'video-upload-custom',
  templateUrl: './video-upload-custom.component.html',
  styleUrls: ['./video-upload-custom.component.scss']
})
export class VideoUploadCustomComponent implements OnInit {

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
    private toastrService: NbToastrService) { }
  oynat() {

    if (this.router.url.split("/")[2] == "atif") {

      console.log('row', this.rowData)
      this.dataBindService.changeAitfKategori(this.rowData["videoUrl"])
    }
    if (this.router.url.split("/")[2] == "facetoface") {
      console.log('url face göster')

      this.dataBindService.changeFaceKategori(this.rowData["videoUrl"])
    }
    if (this.router.url.split("/")[2] == "gaze") {
      console.log('url face göster')

      this.dataBindService.changeGazeKategori(this.rowData["videoUrl"])
    }

  }
  ngOnInit() {


    if (this.router.url.split("/")[2] == "atif") {
      console.log('this.row', this.rowData)
      if (this.rowData["videoUrl"] != "" && this.rowData["videoUrl"] != null) {
        console.log('girdiii')
        this.isVideoVisible = 'visible'
      }
      this.currentUrl = "atif";
    }

    if (this.router.url.split("/")[2] == "facetoface") {
      console.log('face göster url', this.rowData)
      if (this.rowData["videoUrl"] != "" && this.rowData["videoUrl"] != null) {
        console.log('girdiii')
        this.isVideoVisible = 'visible'
      }
      this.currentUrl = "facetoface";
    }
    if (this.router.url.split("/")[2] == "gaze") {
      console.log('face göster url', this.rowData)
      if (this.rowData["videoUrl"] != "" && this.rowData["videoUrl"] != null) {
        console.log('girdiii')
        this.isVideoVisible = 'visible'
      }
      this.currentUrl = "gaze";
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
    if (this.currentUrl == "atif") {

      this.currentUrl = "atifKategori";

    } else if (this.currentUrl == "facetoface") {
      this.currentUrl = "facetofaceKategori";
    } else if (this.currentUrl == "secenek") {

      tmpId = this.rowData["secenekID"]
    }
    else if (this.currentUrl == "gaze") {

      this.currentUrl = "gazeKategori";
    }


    let id = -1
    let url = "";
    id = this.rowData["kategoriID"]

    const uploadReq = new HttpRequest('POST', `/api/Custom/` + urlType + '/' + this.currentUrl, formData, {
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

        } else {
          //todo  başarısız toastı 
          this.errorToastMessage("Video/Resim Yükleme", "Video/Resim yüklerken hata oluştu!")

        }
      }

    });

  }

}
