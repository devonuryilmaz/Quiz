import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RaporUserComponent } from './rapor-user/rapor-user.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'rapor',
      component:  RaporUserComponent,
    },
    {
      path: 'admin',
      loadChildren: './admin/admin/admin.module#AdminModule',
    },
    {
      path: 'atif',
      loadChildren: './admin/atif/atif.module#AtifModule',
    },
    {
      path: 'gaze',
      loadChildren: './admin/gaze/gaze.module#GazeModule',
    },
    {
      path: 'facetoface',
      loadChildren: './admin/facetoface/facetoface.module#FacetofaceModule',
    },
    {
      path: 'quiz',
      loadChildren: './quiz/quiz.module#QuizModule',
    },
    {
      path:'login',
      component:LoginComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
