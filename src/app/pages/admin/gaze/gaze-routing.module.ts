import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GazeComponent } from './gaze/gaze.component';
import { GazeSeviyeComponent } from './gaze-seviye/gaze-seviye.component';
import { GazeSoruComponent } from './gaze-soru/gaze-soru.component';
import { GazeSecenekComponent } from './gaze-secenek/gaze-secenek.component';

const routes: Routes = [{
  path: '',
 
  children: [
    {
      path: 'kategori',
      component: GazeComponent,
    },
    {
      path: 'seviye',
      component: GazeSeviyeComponent,
    },
    {
      path: 'soru',
      component: GazeSoruComponent,
    },
    {
      path: 'secenek',
      component: GazeSecenekComponent,
    },
    

  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GazeRoutingModule { }
