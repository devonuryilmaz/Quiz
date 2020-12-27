import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminnRoutingModule } from './adminn-routing.module';
import { SeviyeComponent } from './seviye/seviye.component';
import { SoruComponent } from './soru/soru.component';
import { SecenekComponent } from './secenek/secenek.component';
import { KullaniciComponent } from './kullanici/kullanici.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { KullaniciIlerlemeComponent } from './kullanici-ilerleme/kullanici-ilerleme.component';
import { KategoriComponent } from './kategori/kategori.component';
import { VideoPlayerComponent } from '../helper/video-player/video-player.component';
import { ChatDenemeComponent } from './chat-deneme/chat-deneme.component';
import { NbChatModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { SoruFotografComponent } from './soruFotograf/soru-fotograf.component';
import { OturumComponent } from './oturum/oturum.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SeviyeComponent, KategoriComponent, SoruComponent, SecenekComponent, KullaniciComponent, KullaniciIlerlemeComponent, VideoPlayerComponent, ChatDenemeComponent, SoruFotografComponent
  ],
  imports: [
    CommonModule,
    AdminnRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbChatModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbCheckboxModule

  ],
  entryComponents: [
    VideoPlayerComponent
  ],
  exports: [
    VideoPlayerComponent
  ]

})
export class AdminModule {

  /**
   *
   */
  constructor() {


  }
}
