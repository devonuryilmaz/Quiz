import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GazeRoutingModule } from './gaze-routing.module';
import { GazeComponent } from './gaze/gaze.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { AdminModule } from '../admin/admin.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { GazeSeviyeComponent } from './gaze-seviye/gaze-seviye.component';
import { GazeSoruComponent } from './gaze-soru/gaze-soru.component';
import { GazeSecenekComponent } from './gaze-secenek/gaze-secenek.component';

@NgModule({
  declarations: [GazeComponent, GazeSeviyeComponent, GazeSoruComponent, GazeSecenekComponent],
  imports: [
    CommonModule,
    GazeRoutingModule,
    ThemeModule,
    AdminModule,
    Ng2SmartTableModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class GazeModule { }
