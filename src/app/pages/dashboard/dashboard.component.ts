import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AuthHelper } from '../auth/auth-helper';
import { Router } from '@angular/router';
import { NbWindowService, NbDialogService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminPanel } from '../models/AdminPanel';
import { HeaderServiceService } from '../admin/admin/kategoriHeader/header-service.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { BindDataService } from '../admin/helper/bind-data.service';
import { VideoUploadComponent } from '../admin/helper/video-upload/video-upload.component';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss']
})

export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.authHelper.session()
    this.getHeader();

  }
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  user: boolean;
  dialogRef: any
  header: FormGroup;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  statusToast: NbToastStatus;
  headerSrc: AdminPanel;
  video: File;
  progress: number;
  uploadMessage;
  loading: boolean = true;

  constructor(private authHelper: AuthHelper, private router: Router, private dialogService: NbDialogService,
    private formBuilder: FormBuilder, private headerService: HeaderServiceService, private toastrService: NbToastrService,
    private http: HttpClient) {
    this.user = this.authHelper.userActor;
    this.header = this.formBuilder.group({
      message: ["", Validators.required],
    })
  }

  openCustom(dialog: TemplateRef<any>) {

    this.dialogRef = this.dialogService.open(dialog);
  }

  //Yanlış Mesajı
  GuncellemeMesaj(headerMessage, bodyMessage) {
    let type = NbToastStatus.INFO;
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

  async getHeader() {
    this.headerService.getHeader().subscribe(data => {
      this.headerSrc = data
      if (this.videoplayer) {
        this.videoplayer.nativeElement.load();
        this.loading = false;
      }
    })
  }

  turnToOturum() {
    let path = "/pages/quiz/oturumlar";
    console.log("deneme", path);
    this.router.navigateByUrl(path);
  }

  turnToKategori() {
    let path = "/pages/quiz/kategoriler";
    this.router.navigateByUrl(path);
  }

  onSubmit(dialog: TemplateRef<any>) {
    if (!this.header.invalid) {
      let message = new AdminPanel();
      message.kategoriHeaderMessage = this.header.controls.message.value;
      this.upload(this.video)
      this.headerService.updateHeader(message).subscribe(data => {
        console.log("ok")
        this.header.reset();
        this.GuncellemeMesaj("Açıklama Güncelleme", "Açıklama Başarı ile Güncellenmiştir.")
        this.dialogRef.close();
      })
    }
  }

  degisti(gelen) {
    gelen.target.labels[0].textContent = gelen.target.files[0].name;
    this.video = gelen.target.files[0]
    console.log("gelen", this.video);
  }

  upload(file) {

    const formData = new FormData();
    let selectedFile;
    let fileType;
    let fileTypeSplit;
    let urlType;

    formData.append(file.name, file);
    selectedFile = file;

    fileType = String(selectedFile.type)
    fileTypeSplit = fileType.split("/")[0]
    urlType = "video";

    const uploadReq = new HttpRequest('POST', `/api/video/adminPanel/1`, formData, {
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
    return this.uploadMessage;
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

}
