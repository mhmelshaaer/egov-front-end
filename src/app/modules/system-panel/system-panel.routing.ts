import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


import { PanelHomeComponent } from './panel-home/panel-home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DocumentsComponent } from './documents/documents.component';
import { FeesComponent } from './fees/fees.component';
import { FormsComponent } from './forms/forms.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddUserComponent } from './add-user/add-user.component';
import { GroupsComponent } from './groups/groups.component';
import { RequestTypeSelectionComponent } from './../requests-controller/request-type-selection/request-type-selection.component';
import { LUSRequestsListComponent } from './../lusrequest/lusrequests-list/lusrequests-list.component';
import { OpenRequestComponent } from '../requests-controller/open-request/open-request.component';
import { ModuleRoutingControllerComponent } from '../requests-controller/module-routing-controller/module-routing-controller.component';



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
				path: 'forms',
				component: FormsComponent
			},
			{
				path: 'add-employee',
				component: AddEmployeeComponent
			},
			{
				path: 'add-user',
				component: AddUserComponent
			},
			{
				path: 'groups',
				component: GroupsComponent
			},
			{
				path: 'requests-add',
				component: RequestTypeSelectionComponent,
				children: [
					{
						path: 'lusrequest-metadata',
						// component: LUSRequestMetaDataComponent
						redirectTo: '/lusrequest/metadata'
					},
					{
						path: 'otherRequestType-metadata',
						// component: LUSRequestMetaDataComponent
						redirectTo: '/lusrequest/metadata'

					}
				]
			},
			{
				path: 'requests-list',
				component: RequestTypeSelectionComponent,
				children: [
					{
						path: 'lusrequest-list-all',
						component: LUSRequestsListComponent,
						children: [
							{
								path: 'request-open/:transaction-type/:request-id',
								redirectTo: '/requests-controller/navigator/:transaction-type/:request-id'
							}
						]
					},
					{
						path: 'otherRequestType-list-all',
						component: LUSRequestsListComponent

					}
				]
			}
	  ]
  }
]


@NgModule({
	imports:[RouterModule.forChild(routes)],
	exports:[RouterModule]
})

export class SystemPanelRoutingModule {}