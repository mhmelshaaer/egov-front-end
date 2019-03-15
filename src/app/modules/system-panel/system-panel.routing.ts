import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { TransactionsComponent } from './transactions/transactions.component';
import { FeesComponent } from './fees/fees.component';
import { DocumentsComponent } from './documents/documents.component';
import { PanelHomeComponent } from './panel-home/panel-home.component';


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
		}
	  ]
  }
]


@NgModule({
	imports:[RouterModule.forChild(routes)],
	exports:[RouterModule]
})

export class SystemPanelRoutingModule {}