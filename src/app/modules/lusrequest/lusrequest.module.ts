import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LUSRequestRoutingModule } from './lusrequest-routing.module';

import { LUSRequestHomeComponent } from './lusrequest-home/lusrequest-home.component';
import { LUSRequestMetaDataComponent } from './lusrequest-meta-data/lusrequest-meta-data.component';
import { LUSRequestsListComponent } from './lusrequests-list/lusrequests-list.component';
import { LUSRequestDataComponent } from './lusrequest-data/lusrequest-data.component';

@NgModule({
  declarations: [
    LUSRequestHomeComponent,
    LUSRequestMetaDataComponent,
    LUSRequestsListComponent,
    LUSRequestDataComponent
  ],
  imports: [
    CommonModule,
    LUSRequestRoutingModule
  ]
})
export class LUSRequestModule {
  
}
