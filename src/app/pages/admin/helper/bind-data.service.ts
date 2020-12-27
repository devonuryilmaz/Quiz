import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BindDataService {
  private allMsgCount = new BehaviorSubject(0);


  private kategoriGazeSource = new BehaviorSubject("");
  private kategoriFaceSource = new BehaviorSubject("");
  private kategoriAtifSource = new BehaviorSubject("");
  private kategoriSource = new BehaviorSubject("");
  private soruSource = new BehaviorSubject("");
  private saecenekSource = new BehaviorSubject("");
  private soruFotoSource = new BehaviorSubject("");
  private soruatifSource = new BehaviorSubject("");
  private soruGazeSource = new BehaviorSubject("");
  private soruFacePhoto = new BehaviorSubject("");

  private secenekGazePhoto = new BehaviorSubject("");
  private secenek2GazePhoto = new BehaviorSubject("");
  private secenek3GazePhoto = new BehaviorSubject("");
  private secenek4GazePhoto = new BehaviorSubject("");


  currentMsgCount = this.allMsgCount.asObservable();

  currentGazeSecenek3 = this.secenek3GazePhoto.asObservable();
  currentGazeSecenek4 = this.secenek4GazePhoto.asObservable();
  
  currentGazeSecenek = this.secenekGazePhoto.asObservable();
  currentGazeSecenek2 = this.secenek2GazePhoto.asObservable();
  currentGazeSoru = this.soruGazeSource.asObservable();
  currentAtifSoru = this.soruatifSource.asObservable();
  currentGazeKategori = this.kategoriGazeSource.asObservable();
  currentFaceKategori = this.kategoriFaceSource.asObservable();
  currentAtifKategori = this.kategoriAtifSource.asObservable();
  currentKategori = this.kategoriSource.asObservable();
  currentSoruFoto = this.soruFotoSource.asObservable();
  currentSoru = this.soruSource.asObservable();
  currentSecenek = this.saecenekSource.asObservable();
  currentFaceSoruPhoto = this.soruFacePhoto.asObservable();


  changeMsgCount(count){ 
    console.log('$$$$$$$$$$change msg count')
    this.allMsgCount.next(count);
  }
  changeSoruFoto(url){ 
    
    this.soruFotoSource.next(url);
  }

  changeFaceSoruPhoto(url){ 
    
    this.soruFacePhoto.next(url);
  }

  changeGazeSecenekPhoto(url){ 
    
    this.secenekGazePhoto.next(url);
  }
  changeGazeSecenek2Photo(url){ 
    
    this.secenek2GazePhoto.next(url);
  }
  changeGazeSecenek3Photo(url){ 
    
    this.secenek3GazePhoto.next(url);
  }
  changeGazeSecenek4Photo(url){ 
    
    this.secenek4GazePhoto.next(url);
  }

  changeGazeSecenek5Photo(url){ 
    
    this.secenekGazePhoto.next(url);
  }
  changeGazeSecenek6Photo(url){ 
    
    this.secenek2GazePhoto.next(url);
  }
  changeGazeSecenek7Photo(url){ 
    
    this.secenek3GazePhoto.next(url);
  }
  changeGazeSecenek8Photo(url){ 
    
    this.secenek4GazePhoto.next(url);
  }

  changeGazeSoru(url){ 
    
    this.soruGazeSource.next(url);
  }

  changeAtifSoru(url){ 
    console.log('change',url)
    this.soruatifSource.next(url);
  }

  changeGazeKategori(url){ 
    console.log('change',url)
    this.kategoriGazeSource.next(url);
  }

  changeAitfKategori(url){ 
    console.log('change',url)
    this.kategoriAtifSource.next(url);
  }
  changeFaceKategori(url){ 
    console.log('change',url)
    this.kategoriFaceSource.next(url);
  }
  
  changeKategori(url){ 
    this.kategoriSource.next(url);
  }
  changeSoru(url){ 
    this.soruSource.next(url);
  }
  changeSecenek(url){ 
    this.saecenekSource.next(url);
  }
}
