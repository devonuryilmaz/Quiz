import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KullaniciLogin } from '../../models/kullaniciLogin';
import { HeaderComponent } from '../../../@theme/components';
import { AuthHelper } from '../auth-helper';
import { Router } from '@angular/router';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginUser:any={};
 loggedIn:boolean;
 destroyByClick = true;
 duration = 2000;
 hasIcon = true;
 position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
 preventDuplicates = false;
 statusToast: NbToastStatus;
  constructor(private authService: AuthService,private authHelper:AuthHelper,private router:Router,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService,
    ) { 
      if(this.authService.token != null){
        if(this.authHelper.loggedIn){
          this.router.navigateByUrl("/pages/dashboard");
        }
      }
      
  
    }
    loginForm:FormGroup;
    submitted:boolean=false;
    
  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        userNameControl:["",Validators.required],
        passwordControl:["",Validators.required]
      }
    )
  
  }

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




  get validate() {
    return this.loginForm.controls;
  }

  loginAction(){
    this.submitted=true;
    if(!this.loginForm.invalid){
      this.loginUser = Object.assign({},this.loginForm.value)
      console.log('loginUser',this.loginUser)
      
        this.authService.login(this.loginUser).toPromise().catch(async error=>{
          this.loggedIn=false;
          console.log('error kısmı')
          this.errorToastMessage("Hatalı Giriş","Tekrar Deneyiniz!")
          await this.delay(1500);
          
        }).then(async data=>{
          if(data){
            this.successToastMessage("Giriş Başarılı","Yönlendirme Yapılıyor.")
            await this.delay(1500);
            //window.location.href = 'http://localhost:4200/#/pages/dashboard';
            window.location.reload()
         
          }
        })
    
    }
  }
  
  private delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

errorToastMessage(headerMessage,bodyMessage){
  let type = NbToastStatus.DANGER;;
  this.showToast(type, headerMessage, bodyMessage);
}
  
  
}
