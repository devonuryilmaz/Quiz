import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacetofaceComponent } from './facetoface/facetoface.component';
import { FacetofaceSeviyeComponent } from './facetoface-seviye/facetoface-seviye.component';
import { FacetofaceSoruComponent } from './facetoface-soru/facetoface-soru.component';
import { FacetofacePhotoComponent } from './facetoface-photo/facetoface-photo.component';
import { FacetofaceSecenekComponent } from './facetoface-secenek/facetoface-secenek.component';

const routes: Routes = [{
  path: '',
 
  children: [
    {
      path: 'kategori',
      component: FacetofaceComponent,
    },
    {
      path: 'seviye',
      component: FacetofaceSeviyeComponent,
    },
    {
      path: 'soru',
      component: FacetofaceSoruComponent,
    },
    {
      path: 'soruPhoto',
      component: FacetofacePhotoComponent,
    },
    {
      path: 'soruSecenek',
      component: FacetofaceSecenekComponent,
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacetofaceRoutingModule { }
