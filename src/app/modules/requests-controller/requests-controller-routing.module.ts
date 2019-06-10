import { FeesComponent } from './../transactions-forms/fees/fees.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleRoutingControllerComponent } from './module-routing-controller/module-routing-controller.component';
import { RequestNavigatorComponent } from './request-navigator/request-navigator.component';

import { LUSRequestDataComponent } from './../lusrequest/lusrequest-data/lusrequest-data.component';
import { DeliverablesChecklistComponent } from './../transactions-forms/deliverables-checklist/deliverables-checklist.component';
import { DeliverablesScreeningComponent } from './../transactions-forms/deliverables-screening/deliverables-screening.component';
import { InitialFeesComponent } from './../transactions-forms/initial-fees/initial-fees.component';
import { InitialFeesProcurementComponent } from './../transactions-forms/initial-fees-procurement/initial-fees-procurement.component';
import { InspectionsDatesComponent } from './../transactions-forms/inspections-dates/inspections-dates.component';
import { InspectionsDateNotificationComponent } from './../transactions-forms/inspections-date-notification/inspections-date-notification.component';
import { InspectionsResultComponent } from './../transactions-forms/inspections-result/inspections-result.component';
import { BuildingCostComponent } from './../transactions-forms/building-cost/building-cost.component';
import { FeesProcurementComponent } from './../transactions-forms/fees-procurement/fees-procurement.component';
import { IssuingLicenseComponent } from './../transactions-forms/issuing-license/issuing-license.component';

const routes: Routes = [

  {
    path: 'requests-controller',
    component: ModuleRoutingControllerComponent,
    children: [
      {
        path: 'navigator/:transaction-type/:request-id',
        component: RequestNavigatorComponent,
        children: [
         
          /**
           * All TransactionsForms components will be children to the navigation component.
           * The navigation step select box will be the controller of which form to be rendered
           * in the child route.
           */

          /**
           * The request data components are forms that are specific for each
           * request type/ So, this component is part of the request type module
           * not the the TransactionsForms module. 
           */
          {
            path: 'lusrequest-data',
            component: LUSRequestDataComponent
          },
          {
            path: 'other-transaction-type-data',
            component: LUSRequestDataComponent
          },

          /***********************************************************************/

          /**
           * The remaining routes corressponds to a general trasaction form
           */
          {
            path: 'deliverables-checklist',
            component: DeliverablesChecklistComponent
          },
          {
            path: 'deliverables-screening',
            component: DeliverablesScreeningComponent
          },
          {
            path: 'initial-fees',
            component: InitialFeesComponent
          },
          {
            path: 'initial-fees-procurement',
            component: InitialFeesProcurementComponent
          },
          {
            path: 'inspections-dates',
            component: InspectionsDatesComponent
          },
          {
            path: 'inspections-date-notification',
            component: InspectionsDateNotificationComponent
          },
          {
            path: 'inspections-result',
            component: InspectionsResultComponent
          },
          {
            path: 'building-cost',
            component: BuildingCostComponent
          },
          {
            path: 'fees',
            component: FeesComponent
          },
          {
            path: 'fees-procurement',
            component: FeesProcurementComponent
          },
          {
            path: 'issuing-license',
            component: IssuingLicenseComponent
          },

          /***********************************************************************/
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
