import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsFormsRoutingModule } from './transactions-forms-routing.module';
import { DeliverablesChecklistComponent } from './deliverables-checklist/deliverables-checklist.component';
import { DeliverablesScreeningComponent } from './deliverables-screening/deliverables-screening.component';
import { InitialFeesComponent } from './initial-fees/initial-fees.component';
import { InitialFeesProcurementComponent } from './initial-fees-procurement/initial-fees-procurement.component';
import { InspectionsDatesComponent } from './inspections-dates/inspections-dates.component';

@NgModule({
  declarations: [DeliverablesChecklistComponent, DeliverablesScreeningComponent, InitialFeesComponent, InitialFeesProcurementComponent, InspectionsDatesComponent],
  imports: [
    CommonModule,
    TransactionsFormsRoutingModule
  ]
})
export class TransactionsFormsModule { }
