import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OturumRoutingModule } from './oturum-routing.module';
import { OturumComponent } from './oturum.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../@theme/theme.module';
import { NbChatModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { OturumListComponent } from './oturum-list/oturum-list.component';
import { OturumUpdateComponent } from './oturum-update/oturum-update.component';

@NgModule({
  declarations: [OturumComponent, OturumListComponent, OturumUpdateComponent],
  imports: [
    CommonModule,
    OturumRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbChatModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbCheckboxModule
  ]
})
export class OturumModule { }
