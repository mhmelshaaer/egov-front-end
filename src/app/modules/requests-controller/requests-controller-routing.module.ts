import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LUSRequestMetaDataComponent } from './../lusrequest/lusrequest-meta-data/lusrequest-meta-data.component';
import { RequestTypeSelectionComponent } from './request-type-selection/request-type-selection.component';
import { RequestNavigatorComponent } from './request-navigator/request-navigator.component';
import { ModuleRoutingControllerComponent } from './module-routing-controller/module-routing-controller.component';

const routes: Routes = [

  {
    path: 'requests-controller',
    component: ModuleRoutingControllerComponent,
    children: [
      {
        path: 'navigator/:transaction-type/:request-id',
        component: RequestNavigatorComponent,
        children: [
          // all forms components will be children to the navigation component. the navigation select box
          // will be the controller of which form to be rendered in the child route
        ]
      }
    ]
  }



];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RequestsControllerRoutingModule { }
