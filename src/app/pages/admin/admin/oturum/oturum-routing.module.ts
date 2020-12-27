import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { OturumComponent } from "./oturum.component";
import { OturumListComponent } from "./oturum-list/oturum-list.component";
import { OturumUpdateComponent } from "./oturum-update/oturum-update.component";

const routes: Routes = [{
    path: '',
   
    children: [
      {
        path: 'Ekle',
        component: OturumComponent,
      } ,
      {
        path: 'Liste',
        component: OturumListComponent,
      } ,
      {
        path: 'Guncelle/:id',
        component: OturumUpdateComponent,
      }  
    ]
  }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class OturumRoutingModule {
    /**
     *
     */
    constructor() {
      
      
    }
  }
  