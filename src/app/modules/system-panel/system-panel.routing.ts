import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { PanelHomeComponent } from './panel-home/panel-home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeesComponent } from './fees/fees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component';


const routes:Routes=[
  {
	  path: 'panel-home',
	  component: PanelHomeComponent,
	  children: [
			{
				path: 'transactions',
				component: TransactionsComponent
			},
			{
				path: 'documents',
				component: DocumentsComponent
			},
			{
				path: 'fees',
				component: FeesComponent
			},
			{
				path: 'add-employee',
				component: AddEmployeeComponent
			},
			{
				path: 'add-user',
				component: AddUserComponent
			}
	  ]
  }
]


@NgModule({
	imports:[RouterModule.forChild(routes)],
	exports:[RouterModule]
})

export class SystemPanelRoutingModule {}