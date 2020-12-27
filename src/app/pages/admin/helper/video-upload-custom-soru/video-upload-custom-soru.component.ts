import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { BindDataService } from '../bind-data.service';
import { Router } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'video-upload-custom-soru',
  templateUrl: './video-upload-custom-soru.component.html',
  styleUrls: ['./video-upload-custom-soru.component.scss']
})
export class VideoUploadCustomSoruComponent implements OnInit {

  @Output() sendUrl: string;
  
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
    private toastrService: NbToastrService) { }

  
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
  
    if(this.router.url.split("/")[2] == "atif"){
      
      if(this.router.url.split("/")[3] == "soru"){
        this.dataBindService.changeAtifSoru(this.rowData["url"])
      }
     
    }
    if(this.router.url.split("/")[2] == "gaze"){
      
      if(this.router.url.split("/")[3] == "soru"){
        console.log('change gaze soru')
        this.dataBindService.changeGazeSoru(this.rowData["videoUrl"])
      }
      
     
    }
    if(this.router.url.split("/")[2] == "facetoface"){
      
      if(this.router.url.split("/")[3] == "soruPhoto"){
       
        this.dataBindService.changeFaceKategori(this.rowData["url"])
      }
      
    }
   
  }
  ngOnInit() {
    console.log('ng on init')

    if(this.router.url.split("/")[2] == "atif"){
      console.log('this.row',this.rowData)
      if(this.rowData["url"] != "" && this.rowData["url"]!=null){
   
        this.isVideoVisible ='visible' 
      }
      this.currentUrl = "atifSoru";
    }

    if(this.router.url.split("/")[2] == "facetoface"){
      
      if(this.router.url.split("/")[3] == "soruPhoto"){
        if(this.rowData["url"] != "" && this.rowData["url"]!=null){
        
        this.isVideoVisible ='visible' 
        }
        this.currentUrl = "facetofaceSoru";
      }
    
     
    }
    if(this.router.url.split("/")[2] == "gaze"){
      console.log('gaze sayfa')
      
      if(this.router.url.split("/")[3] == "soru"){
        if(this.rowData["videoUrl"] != "" && this.rowData["videoUrl"]!=null){
          
          this.isVideoVisible ='visible' 
        }
      }

      this.currentUrl = "gazeSoru";

    
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
    if(this.currentUrl == "atif"){
      
      this.currentUrl = "atifSoru";
      
    }else if(this.currentUrl == "facetoface"){
      this.currentUrl = "facetofaceKategori";
    }else if(this.currentUrl == "secenek"){
      tmpId = this.rowData["secenekID"]
    }
    else if(this.currentUrl == "gaze"){
      this.currentUrl = "gazeSoru";
    }else if(this.currentUrl == "facetofaceSoru"){
      this.currentUrl = "facetofaceSoruPhotos";
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
