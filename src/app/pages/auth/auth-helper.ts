import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
  })

export class AuthHelper {

    loggedIn: boolean;
    userActor: boolean;
     token: any;
    userId:number;
    userName:string;
    constructor(private authService: AuthService, private router:Router) {
      this.tokenControl();
    }
    tokenControl(){
        this.token = this.authService.token;
        if (this.token != null) {
            console.log('token',this.token)
            this.loggedIn = this.authService.loggedIn();
            if(this.loggedIn){
                if(this.authService.getCurrentUserRole() != "True"){
                    this.userActor = false;
                    //window.location.href = 'http://localhost:4200/#/pages/dashboard';
                }else{
                   
                    this.userActor = true;
                }        
                this.userId = this.authService.getCurrentUserId();
                this.userName = this.authService.getCurrentUserName();
               
            }else{
                this.router.navigateByUrl("/pages/login")
            }
        }else{
            this.router.navigateByUrl("/pages/login")
        }
    }
    session(){
        this.tokenControl()
        if(!this.token || !this.loggedIn){
         console.log('tamam')
          window.location.reload()
        }
    }
    authorize(){
        if(this.userActor == false){
            this.router.navigateByUrl("/pages/dashboard")
        }
    }
}