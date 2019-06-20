import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutsModule } from './../layouts/layouts.module';
import { TransactionsFormsModule } from './../transactions-forms/transactions-forms.module';

import { RequestsControllerRoutingModule } from './requests-controller-routing.module';
import { RequestTypeSelectionComponent } from './request-type-selection/request-type-selection.component';
import { LUSRequestModule } from './../lusrequest/lusrequest.module';
import { OpenRequestComponent } from './open-request/open-request.component';
import { RequestNavigatorComponent } from './request-navigator/request-navigator.component';
import { ModuleRoutingControllerComponent } from './module-routing-controller/module-routing-controller.component';

@NgModule({
  declarations: [
    RequestTypeSelectionComponent,
    OpenRequestComponent,
    RequestNavigatorComponent,
    ModuleRoutingControllerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RequestsControllerRoutingModule,
    LUSRequestModule,
    LayoutsModule,
    TransactionsFormsModule
  ]
})
export class RequestsControllerModule { }
