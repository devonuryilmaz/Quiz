import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { KateorilerPageComponent } from "./kateoriler-page/kateoriler-page.component";
import { SeviyelerPageComponent } from "./seviyeler-page/seviyeler-page.component";
import { SorularPageComponent } from "./sorular-page/sorular-page.component";
import { QuizSoruComponent } from "./quiz-atif-soru/quiz-soru/quiz-soru.component";
import { QuizGazeSoruComponent } from "./quiz-gaze-soru/quiz-gaze-soru/quiz-gaze-soru.component";
import { FacetoFactSoruComponent } from "./quiz-facetofact-soru/faceto-fact-soru/faceto-fact-soru.component";
import { SeviyelerAtifComponent } from "./seviyeler-atif/seviyeler-atif.component";
import { SeviyelerGazecastComponent } from "./seviyeler-gazecast/seviyeler-gazecast.component";
import { SeviyelerFacetofactComponent } from "./seviyeler-facetofact/seviyeler-facetofact.component";
import { OturumPageComponent } from "./oturum-page/oturum-page.component";


const routes: Routes = [{
    path: '',
    //component:KateorilerPageComponent,
    children: [
      {
        path: 'oturumlar',
        component: OturumPageComponent,
      },
      {
        path: 'kategoriler',
        component: KateorilerPageComponent,
      },
      {
        path: 'seviyeler/:id',
        component: SeviyelerPageComponent,
      },
      {
        path: 'atif-seviyeler/:id',
        component: SeviyelerAtifComponent,
      },
      {
        path: 'gazecast-seviyeler/:id',
        component: SeviyelerGazecastComponent,
      },
      {
        path: 'facetofact-seviyeler/:id',
        component: SeviyelerFacetofactComponent,
      },
      {
        path: 'sorular/:id',
        component: SorularPageComponent,
      },
      {
        path: 'atif-sorular/:id',
        component: QuizSoruComponent,
      },
      {
        path: 'gazecast-sorular/:id',
        component: QuizGazeSoruComponent,
      },
      {
        path: 'facetı-fact-sorular/:id',
        component: FacetoFactSoruComponent,
      },
  
    ]
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class QuizRoutingModule {
    /**
     *
     */
    constructor() {
      
      
    }
  }
  