import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NbWindowModule, NbDialogModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    NbDialogModule

  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {
  /**
   *
   */
  constructor() {


  }
}
