import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { BindDataService } from '../bind-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
 
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  videoPlayerSource:string;
  photoSource:string;
  videoVisible=false;
  photoVisible = false;
  
  constructor(private dataBindService:BindDataService,private router:Router) { }

  ngOnInit() {

    this.dataBindService.currentGazeKategori.subscribe(url => { 
    
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
          
        }
      }
      else if(url[0] == "f"){
        this.videoVisible = false;
        this.photoVisible = true;
        
        this.photoSource =url.slice(1,url.length)
      }
      
       
       
     }) 
    this.dataBindService.currentFaceKategori.subscribe(url => { 
      console.log('face')
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
          
        }
      }
      else if(url[0] == "f"){
        this.videoVisible = false;
        this.photoVisible = true;
        
        this.photoSource =url.slice(1,url.length)
      }
      
       
       
     }) 
    this.dataBindService.currentKategori.subscribe(url => { 
      
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
          
        }
      }
      else if(url[0] == "f"){
        this.videoVisible = false;
        this.photoVisible = true;
        
        this.photoSource =url.slice(1,url.length)
      }
      
       
       
     }) 

     this.dataBindService.currentAtifKategori.subscribe(url => { 
      console.log('current')
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
          
        }
      }
      else if(url[0] == "f"){
        this.videoVisible = false;
        this.photoVisible = true;
        
        this.photoSource =url.slice(1,url.length)
      }
      
       
       
     }) 


     this.dataBindService.currentSoru.subscribe(url => { 
    
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
        } 
      }
      else if(url[0] == "f"){
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 
     this.dataBindService.currentAtifSoru.subscribe(url => { 
    
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
        } 
      }
      else if(url[0] == "f"){
        console.log('photo soru atif')
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 

     this.dataBindService.currentGazeSoru.subscribe(url => { 
    
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        this.photoVisible = false;
        this.videoVisible = true;
        
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load(); 
          }
        } 
      }
      else if(url[0] == "f"){
        console.log('photo soru atif')
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 

     this.dataBindService.currentSecenek.subscribe(url => { 
      
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        console.log('url',url)
        this.photoVisible = false;
        this.videoVisible = true;
      
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load();    
          } 
        }
      }
      else if(url[0] == "f"){
        console.log('url',url)
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 

     
     this.dataBindService.currentGazeSecenek.subscribe(url => { 
      
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        console.log('url',url)
        this.photoVisible = false;
        this.videoVisible = true;
      
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load();    
          } 
        }
      }
      else if(url[0] == "f"){
        console.log('url',url)
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 

     this.dataBindService.currentGazeSecenek2.subscribe(url => { 
      
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        console.log('url',url)
        this.photoVisible = false;
        this.videoVisible = true;
      
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load();    
          } 
        }
      }
      else if(url[0] == "f"){
        console.log('url',url)
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 

     this.dataBindService.currentGazeSecenek3.subscribe(url => { 
      
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        console.log('url',url)
        this.photoVisible = false;
        this.videoVisible = true;
      
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load();    
          } 
        }
      }
      else if(url[0] == "f"){
        console.log('url',url)
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 

     this.dataBindService.currentGazeSecenek4.subscribe(url => { 
      
      if(url[0] == "v"){
        this.videoPlayerSource = "";
        console.log('url',url)
        this.photoVisible = false;
        this.videoVisible = true;
      
        this.videoPlayerSource = url.slice(1,url.length)
        if(this.videoVisible){
          if(this.videoplayer){
            this.videoplayer.nativeElement.load();    
          } 
        }
      }
      else if(url[0] == "f"){
        console.log('url',url)
        this.videoVisible = false;
        this.photoVisible = true;
        this.photoSource = url.slice(1,url.length)
      }    
     
     }) 
   
  }
 

}
