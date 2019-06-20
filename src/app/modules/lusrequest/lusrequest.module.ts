import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectDropDownModule } from 'ngx-select-dropdown'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    FormsModule,
    SelectDropDownModule,
    LUSRequestRoutingModule,
    FontAwesomeModule
  ]
})
export class LUSRequestModule {
  
}
