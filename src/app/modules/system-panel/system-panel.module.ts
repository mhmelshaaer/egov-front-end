import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//External Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SystemPanelRoutingModule } from './system-panel.routing';

import { PanelHomeComponent } from './panel-home/panel-home.component';
import { SidenavComponent } from './../layouts/sidenav/sidenav.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeesComponent } from './fees/fees.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    PanelHomeComponent,
    SidenavComponent,
    DocumentsComponent,
    FeesComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    SystemPanelRoutingModule,
    FontAwesomeModule
  ]
})
export class SystemPanelModule { }
