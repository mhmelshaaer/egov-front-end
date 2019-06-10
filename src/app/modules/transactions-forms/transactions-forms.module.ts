import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsFormsRoutingModule } from './transactions-forms-routing.module';
import { DeliverablesChecklistComponent } from './deliverables-checklist/deliverables-checklist.component';
import { DeliverablesScreeningComponent } from './deliverables-screening/deliverables-screening.component';
import { InitialFeesComponent } from './initial-fees/initial-fees.component';
import { InitialFeesProcurementComponent } from './initial-fees-procurement/initial-fees-procurement.component';
import { InspectionsDatesComponent } from './inspections-dates/inspections-dates.component';
import { FeesComponent } from './fees/fees.component';
import { FeesProcurementComponent } from './fees-procurement/fees-procurement.component';
import { InspectionsDateNotificationComponent } from './inspections-date-notification/inspections-date-notification.component';
import { InspectionsResultComponent } from './inspections-result/inspections-result.component';
import { IssuingLicenseComponent } from './issuing-license/issuing-license.component';
import { BuildingCostComponent } from './building-cost/building-cost.component';

@NgModule({
  declarations: [DeliverablesChecklistComponent, DeliverablesScreeningComponent, InitialFeesComponent, InitialFeesProcurementComponent, InspectionsDatesComponent, FeesComponent, FeesProcurementComponent, InspectionsDateNotificationComponent, InspectionsResultComponent, IssuingLicenseComponent, BuildingCostComponent],
  imports: [
    CommonModule,
    TransactionsFormsRoutingModule
  ]
})
export class TransactionsFormsModule { }
