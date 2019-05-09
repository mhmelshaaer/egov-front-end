import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LUSRequestsListComponent } from './lusrequests-list/lusrequests-list.component';
import { LUSRequestMetaDataComponent } from './lusrequest-meta-data/lusrequest-meta-data.component';
import { LUSRequestHomeComponent } from './lusrequest-home/lusrequest-home.component';

const routes: Routes = [
  {
    path: "lusrequest",
    component: LUSRequestHomeComponent,
    children: [
      {
        path: 'metadata',
        component: LUSRequestMetaDataComponent
      },
      {
        path: 'list-all',
        component: LUSRequestsListComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LUSRequestRoutingModule { }
