import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { KateorilerPageComponent } from './quiz/kateoriler-page/kateoriler-page.component';
import { LoginComponent } from './auth/login/login.component';
import { VideoUploadComponent } from './admin/helper/video-upload/video-upload.component';
import { VideoUploadCustomComponent } from './admin/helper/video-upload-custom/video-upload-custom.component';
import { VideoPlayerComponent } from './admin/helper/video-player/video-player.component';
import { VideoUploadCustomSoruComponent } from './admin/helper/video-upload-custom-soru/video-upload-custom-soru.component';
import { VideoUploadGazeSecenek1Component } from './admin/helper/video-upload-gaze-secenek1/video-upload-gaze-secenek1.component';
import { VideoUploadGazeSecenek2Component } from './admin/helper/video-upload-gaze-secenek2/video-upload-gaze-secenek2.component';
import { VideoUploadGazeSecenek3Component } from './admin/helper/video-upload-gaze-secenek3/video-upload-gaze-secenek3.component';
import { VideoUploadGazeSecenek4Component } from './admin/helper/video-upload-gaze-secenek4/video-upload-gaze-secenek4.component';
import { VideoUploadGazeSecenek5Component } from './admin/helper/video-upload-gaze-secenek5/video-upload-gaze-secenek5.component';
import { VideoUploadGazeSecenek6Component } from './admin/helper/video-upload-gaze-secenek6/video-upload-gaze-secenek6.component';
import { VideoUploadGazeSecenek7Component } from './admin/helper/video-upload-gaze-secenek7/video-upload-gaze-secenek7.component';
import { VideoUploadGazeSecenek8Component } from './admin/helper/video-upload-gaze-secenek8/video-upload-gaze-secenek8.component';
import { RaporUserComponent } from './rapor-user/rapor-user.component';


const PAGES_COMPONENTS = [
  PagesComponent,

];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    LoginComponent,
    VideoUploadComponent,
    VideoUploadCustomComponent,
    VideoUploadCustomSoruComponent,
    VideoUploadGazeSecenek1Component,
    VideoUploadGazeSecenek2Component,
    VideoUploadGazeSecenek3Component,
    VideoUploadGazeSecenek4Component,
    VideoUploadGazeSecenek5Component,
    VideoUploadGazeSecenek6Component,
    VideoUploadGazeSecenek7Component,
    VideoUploadGazeSecenek8Component,
    RaporUserComponent
    ,
  ],
  entryComponents: [
    VideoUploadComponent,
    VideoUploadCustomComponent,
    VideoUploadCustomSoruComponent,
    VideoUploadGazeSecenek1Component,
    VideoUploadGazeSecenek2Component,
    VideoUploadGazeSecenek3Component,
    VideoUploadGazeSecenek4Component,
    VideoUploadGazeSecenek5Component,
    VideoUploadGazeSecenek6Component,
    VideoUploadGazeSecenek7Component,
    VideoUploadGazeSecenek8Component
  ],

})
export class PagesModule {
}
