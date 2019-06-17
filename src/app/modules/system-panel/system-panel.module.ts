import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//External Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectDropDownModule } from 'ngx-select-dropdown'


import { LayoutsModule } from '../layouts/layouts.module';
import { SystemPanelRoutingModule } from './system-panel.routing';

//Components
import { PanelHomeComponent } from './panel-home/panel-home.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeesComponent } from './fees/fees.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component';

//Directives
import { DisableControlDirective } from './directives/disable-control/disable-control.directive';
import { SelectControlDirective } from './directives/select-control/select-control.directive';
import { FormsComponent } from './forms/forms.component';
import { GroupsComponent } from './groups/groups.component';
import { PrivilegesComponent } from './privileges/privileges.component';

@NgModule({
  declarations: [
    PanelHomeComponent,
    DocumentsComponent,
    FeesComponent,
    TransactionsComponent,
    DisableControlDirective,
    SelectControlDirective,
    AddEmployeeComponent,
    AddUserComponent,
    FormsComponent,
    GroupsComponent,
    PrivilegesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SystemPanelRoutingModule,
    FontAwesomeModule,
    SelectDropDownModule,
    LayoutsModule
  ]
})
export class SystemPanelModule { }
