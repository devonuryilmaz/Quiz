import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KateorilerPageComponent } from './kateoriler-page/kateoriler-page.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SeviyelerPageComponent } from './seviyeler-page/seviyeler-page.component';
import { SorularPageComponent } from './sorular-page/sorular-page.component';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { QuizSoruComponent } from './quiz-atif-soru/quiz-soru/quiz-soru.component';
import { FacetoFactSoruComponent } from './quiz-facetofact-soru/faceto-fact-soru/faceto-fact-soru.component';
import { QuizGazeSoruComponent } from './quiz-gaze-soru/quiz-gaze-soru/quiz-gaze-soru.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SeviyelerAtifComponent } from './seviyeler-atif/seviyeler-atif.component';
import { SeviyelerGazecastComponent } from './seviyeler-gazecast/seviyeler-gazecast.component';
import { SeviyelerFacetofactComponent } from './seviyeler-facetofact/seviyeler-facetofact.component';
import { OturumPageComponent } from './oturum-page/oturum-page.component';


@NgModule({
  declarations: [KateorilerPageComponent, SeviyelerPageComponent, SorularPageComponent,QuizSoruComponent, QuizGazeSoruComponent, FacetoFactSoruComponent, SeviyelerAtifComponent, SeviyelerGazecastComponent, SeviyelerFacetofactComponent, OturumPageComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    NgbCarouselModule,
    ThemeModule,
    NbWindowModule
  ]
})
export class QuizModule {
  /**
   *
   */
  constructor() {
    
    console.log('...')

  }
}
