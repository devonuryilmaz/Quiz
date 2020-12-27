import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SeviyeComponent } from "./seviye/seviye.component";
import { SoruComponent } from "./soru/soru.component";
import { SecenekComponent } from "./secenek/secenek.component";
import { KullaniciComponent } from "./kullanici/kullanici.component";
import { KullaniciIlerlemeComponent } from "./kullanici-ilerleme/kullanici-ilerleme.component";
import { KategoriComponent } from "./kategori/kategori.component";
import { ChatDenemeComponent } from "./chat-deneme/chat-deneme.component";
import { SoruFotografComponent } from "./soruFotograf/soru-fotograf.component";
import { OturumComponent } from "./oturum/oturum.component";

const routes: Routes = [{
    path: '',
   
    children: [
      {
        path: 'oturum',
      loadChildren: './oturum/oturum.module#OturumModule',
      },
      {
        path: 'kategori',
        component: KategoriComponent,
      },
      {
        path: 'seviye',
        component: SeviyeComponent,
      },
      {
        path: 'soru',
        component: SoruComponent,
      },
      {
        path: 'secenek',
        component: SecenekComponent,
      },
      {
        path: 'kullanici',
        component: KullaniciComponent,
      },
      {
        path: 'kullaniciIlerleme',
        component: KullaniciIlerlemeComponent,
      },
      {
        path: 'chat',
        component: ChatDenemeComponent,
      },
      {
        path: 'soruFotograf',
        component: SoruFotografComponent,
      }
  
    ]
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AdminnRoutingModule {
    /**
     *
     */
    constructor() {
      
      
    }
  }
  