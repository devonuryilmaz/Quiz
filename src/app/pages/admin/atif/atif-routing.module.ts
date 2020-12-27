import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtifKategoriComponent } from './atif-kategori/atif-kategori.component';
import { AtifSoruComponent } from './atif-soru/atif-soru.component';
import { AtifSeviyeComponent } from './atif-seviye/atif-seviye.component';

const routes: Routes = [{
  path: '',
 
  children: [
    {
      path: 'kategori',
      component: AtifKategoriComponent,
    },
    {
      path: 'seviye',
      component: AtifSeviyeComponent,
    },
    {
      path: 'soru',
      component: AtifSoruComponent,
    },
    

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtifRoutingModule { }
