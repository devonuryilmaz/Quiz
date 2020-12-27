import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { BindDataService } from '../bind-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'video-upload-gaze-secenek7',
  templateUrl: './video-upload-gaze-secenek7.component.html',
  styleUrls: ['./video-upload-gaze-secenek7.component.scss']
})
export class VideoUploadGazeSecenek7Component implements OnInit {
  @Input() rowData: any;
  currentUrl;
  videoUrl:string
  isVideoVisible='hidden'
  progress:  number;
  uploadMessage;
  uploadVisible = false;
  spinnerStatus=false;
  constructor(private http:HttpClient, private dataBindService:BindDataService,private router: Router) { }
  oynat(){
  
    if(this.router.url.split("/")[2] == "gaze"){
      
      if(this.router.url.split("/")[3] == "secenek"){
      //  console.log('change gaze secenek')
        this.dataBindService.changeGazeSecenek7Photo(this.rowData["photo7Url"])
      }
      
     
    }
  
   
  }
  ngOnInit() {
    console.log('ng on init gaze secenek7')
  
        if(this.rowData["photo7Url"] != "" && this.rowData["photo7Url"]!=null){
          
          this.isVideoVisible ='visible' 
        }
      
      this.currentUrl = "gazeSecenek7";

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
    if(this.currentUrl == "gazeSecenek7"){
      
      this.currentUrl = "gazeSecenekPhoto7";
      
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
          

        }else{
        //todo  başarısız toastı 
        }
      }

    });
       
  }
}
