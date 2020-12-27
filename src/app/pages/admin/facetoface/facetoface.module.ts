import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacetofaceRoutingModule } from './facetoface-routing.module';
import { FacetofaceComponent } from './facetoface/facetoface.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { AdminModule } from '../admin/admin.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FacetofaceSeviyeComponent } from './facetoface-seviye/facetoface-seviye.component';
import { FacetofaceSoruComponent } from './facetoface-soru/facetoface-soru.component';
import { FacetofacePhotoComponent } from './facetoface-photo/facetoface-photo.component';
import { FacetofaceSecenekComponent } from './facetoface-secenek/facetoface-secenek.component';

@NgModule({
  declarations: [FacetofaceComponent, FacetofaceSeviyeComponent, FacetofaceSoruComponent, FacetofacePhotoComponent, FacetofaceSecenekComponent],
  imports: [
    CommonModule,
    FacetofaceRoutingModule,
    ThemeModule,
    AdminModule,
    Ng2SmartTableModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class FacetofaceModule { 
  /**
   *
   */
  constructor() {
    console.log('face')
    
  }
}
