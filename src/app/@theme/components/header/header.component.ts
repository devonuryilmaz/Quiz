import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NbMenuService, NbSidebarService, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { AuthService } from '../../../pages/auth/auth.service';
import { AuthHelper } from '../../../pages/auth/auth-helper';
import { NbUserComponent } from '../../../../../node_modules/@nebular/theme/components/user/user.component';
import { Router } from '@angular/router';
import { BindDataService } from '../../../pages/admin/helper/bind-data.service';
import { ChatService } from '../../../pages/admin/admin/chat-deneme/chat.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  @ViewChild(NbUserComponent)
  nbUserComponent: NbUserComponent;
  userName: any;
  userVisible = true;
  userMenu = [{ title: 'Çıkış Yap' }];
  msgCount = 0;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  pozisyon: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_LEFT;
  preventDuplicates = false;
  statusToast: NbToastStatus;
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService, 
              private router:Router,
              private bindDataService:BindDataService,
              private chatService:ChatService,
              private analyticsService: AnalyticsService,
              private authService:AuthService,
              private authHelper:AuthHelper,
              private toastrService: NbToastrService) {
  }

  MesajBilgi(headerMessage,bodyMessage){
    let type = NbToastStatus.PRIMARY;
    this.showToast(type, headerMessage, bodyMessage);
  }

  //Toast Gösterme
  showToast(type: NbToastStatus, title: string, body: string){
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.pozisyon,
      preventDuplicates: this.preventDuplicates,
    };
    this.toastrService.show(
      body,
      `${title}`,
      config);
  }

  deneme(title){
    console.log('NbUserComponent',this.nbUserComponent)
    console.log('title',title)
    this.menuService.onItemClick().subscribe(data=>{
      console.log('girdii')
      this.menuService.getSelectedItem().subscribe(item => {

     
       
        if(this.authHelper.token){
          console.log('tokennnn')
         this.authService.logOut();
        }
      })
     
     
     this.userVisible = true;
   })
   
  }
  messageClick(){
    this.router.navigate(['/pages/admin/chat'])
  }
  

  ngOnInit() {
    this.bindDataService.currentMsgCount.subscribe(data => {
  
      this.msgCount = this.msgCount - data;
    })

    if(this.authHelper.token){
      if(this.authService.loggedIn()){
      console.log('true')
      this.userVisible = false;
      this.userName = this.authService.getCurrentUserName()
    }
    this.chatService.GetNotReadedAllMessages(this.authHelper.userId).subscribe(data => {
      this.msgCount = data;
      if(this.msgCount>0){
        this.MesajBilgi("Mesajınız var!","Gelen Mesaj Sayısı="+this.msgCount+"\n\nGelen Kutunuzu Kontrol Edin.")
      }
    })
  }
 
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
