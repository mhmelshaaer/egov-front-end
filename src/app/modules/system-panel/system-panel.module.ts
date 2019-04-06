import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//External Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SystemPanelRoutingModule } from './system-panel.routing';

import { PanelHomeComponent } from './panel-home/panel-home.component';
import { SidenavComponent } from './../layouts/sidenav/sidenav.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeesComponent } from './fees/fees.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { SelectControlDirective } from './directives/select-control/select-control.directive';

@NgModule({
  declarations: [
    PanelHomeComponent,
    SidenavComponent,
    DocumentsComponent,
    FeesComponent,
    TransactionsComponent,
    DisableControlDirective,
    SelectControlDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemPanelRoutingModule,
    FontAwesomeModule
  ]
})
export class SystemPanelModule { }
