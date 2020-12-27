import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpRequest, HttpClient } from '@angular/common/http';
import { BindDataService } from '../bind-data.service';
import { Router } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'video-upload-gaze-secenek1',
  templateUrl: './video-upload-gaze-secenek1.component.html',
  styleUrls: ['./video-upload-gaze-secenek1.component.scss']
})
export class VideoUploadGazeSecenek1Component implements OnInit {

  
  
  @Input() rowData: any;
  currentUrl;
  videoUrl:string
  isVideoVisible='hidden'
  progress:  number;
  uploadMessage;
  uploadVisible = false;
  spinnerStatus=false;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  statusToast: NbToastStatus;
  
  constructor(private http:HttpClient, private dataBindService:BindDataService,private router: Router,
    private toastrService: NbToastrService,
    ) { }


  
  //Yanlış Mesajı
  errorToastMessage(headerMessage,bodyMessage){
    let type = NbToastStatus.DANGER;;
    this.showToast(type, headerMessage, bodyMessage);
  }

  //Doğru Mesajı
  successToastMessage(headerMessage,bodyMessage){
    let type = NbToastStatus.SUCCESS;;
    this.showToast(type, headerMessage, bodyMessage);
  }

  //Toast Gösterme
  showToast(type: NbToastStatus, title: string, body: string){
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

  oynat(){
  
    
    if(this.router.url.split("/")[2] == "gaze"){
      
      if(this.router.url.split("/")[3] == "secenek"){
        console.log('change gaze secenek')
        this.dataBindService.changeGazeSecenekPhoto(this.rowData["photo1Url"])
      }
      
     
    }
  
   
  }
  ngOnInit() {
    console.log('ng on init gaze secenek1')
  
        if(this.rowData["photo1Url"] != "" && this.rowData["photo1Url"]!=null){
          
          this.isVideoVisible ='visible' 
        }
      
      this.currentUrl = "gazeSecenek";

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

    for (let file of files){
      formData.append(file.name, file);
      selectedFile = file;
    }
    fileType = String(selectedFile.type)  
    fileTypeSplit = fileType.split("/")[0]
    if(fileTypeSplit == "image"){
      urlType ="photos";
    }else if(fileTypeSplit == "video"){
      urlType = "video";    
    }
    if(this.currentUrl == "gazeSecenek"){
      
      this.currentUrl = "gazeSecenekPhoto1";
      
    }

      let id=-1
      let url ="";  
       id = this.rowData["id"]

    const uploadReq = new HttpRequest('PUT', `https://sosyalbilis.com/api/Custom/`+urlType+'/'+this.currentUrl + '/'+ id, formData, {
      reportProgress: true
     
    });

     this.http.request(uploadReq).subscribe(event => {     
      
      if (event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total);    
    
        //todo videoe yüklenirken async arka plan spinner
        //todo video yüklenince sayfa yenilensin
      }       
      else if (event.type === HttpEventType.Response){
        this.uploadMessage = event.body
        if(event.status == 200){      
          //todo  başarılı toastı 
          this.rowData["url"]=event.body;
          this.successToastMessage("Video/Resim Yükleme","Video/Resim başarı ile yüklenmiştir.")

        }else{
        //todo  başarısız toastı 
        this.errorToastMessage("Video/Resim Yükleme","Video/Resim yüklerken hata oluştu!")

        }
      }

    });
       
  }

}
