import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Observable } from 'rxjs';
import { Kullanici } from '../models/kullanici';
import { CONFIG } from '../../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }
  test = CONFIG.apiURL;
  path = this.test + "/Auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";
  statusCode: number = 0;

  login(loginUser): Observable<any> {
    let user = new Kullanici();
    user["kullaniciAdi"] = loginUser["userNameControl"]
    user["sifre"] = loginUser["passwordControl"]
    //console.log(this.path+"login")
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "login", user, { headers: headers })
      .subscribe(async (response) => {
        console.log("1")
        if (response) {
          this.saveToken(response);
          console.log("getToken", this.token);
          this.userToken = response;
          this.decodedToken = this.jwtHelper.decodeToken(response.toString())
        }
        //this.router.navigateByUrl('/pages/dashboard')
      },
        error => {
          console.log('error', error.status)
          this.statusCode = error.status
        })
    return this.httpClient.post(this.path + "login", user, { headers: headers })

  }

  saveToken(token) {

    localStorage.setItem(this.TOKEN_KEY, token);//local storageye token ekledik
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY)//çıkış yapınca sildik
    //this.router.navigateByUrl("/pages/auth/dashboard")
    window.location.reload()
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY)//tokenin kalma süresi(aktif mi ?) kullanıcının kontrolleri buradan yapılacak
  }

  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).nameid//tokeni okuyup içindeki aktif kullanici id'yi verir
  }
  getCurrentUserRole() {
    //console.log("role",this.jwtHelper.decodeToken(this.token).actort)
    return this.jwtHelper.decodeToken(this.token).actort//tokeni okuyup içindeki rolü verir(admin mi ?)
  }

  getCurrentUserName() {
    return this.jwtHelper.decodeToken(this.token).unique_name//tokeni okuyup içindeki aktif kullanici adini veirr.
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }


}
