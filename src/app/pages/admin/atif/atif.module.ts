import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtifRoutingModule } from './atif-routing.module';
import { AtifKategoriComponent } from './atif-kategori/atif-kategori.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VideoPlayerComponent } from '../helper/video-player/video-player.component';
import { AdminModule } from '../admin/admin.module';
import { AtifSoruComponent } from './atif-soru/atif-soru.component';
import { AtifSeviyeComponent } from './atif-seviye/atif-seviye.component';

@NgModule({
  declarations: [AtifKategoriComponent, AtifSoruComponent, AtifSeviyeComponent],
  imports: [
    CommonModule,
    AtifRoutingModule,
    ThemeModule,
    AdminModule,
    Ng2SmartTableModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
 
})
export class AtifModule { 
  /**
   *
   */
  constructor() {
   console.log('atif module')
    
  }
}
