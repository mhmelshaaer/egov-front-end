import { UsersService } from './../../../shared/users-service/users.service';
import { TransactionsService } from './../../../shared/transactions-service/transactions.service';
import { Transaction } from './../../../models/transactions/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  faTrashAlt,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import { RequestInstance } from 'src/app/models/request-instances/request-instance';
import { Citizen } from 'src/app/models/citizen/citizen';

@Component({
  selector: 'app-lusrequests-list',
  templateUrl: './lusrequests-list.component.html',
  styleUrls: ['./lusrequests-list.component.scss']
})
export class LUSRequestsListComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt = faTrashAlt;
  faEye = faEye;

  transactionType: string;
  requestID: number;

  transactions: Transaction[];
  requestsInstances: RequestInstance[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private transactionsService:TransactionsService,
              private usersService:UsersService) { }

  ngOnInit() {
    this.transactionType = 'lusrequest'
    this.requestID = 1;

    this.transactions = [];

    this.transactionsService.getRequestsInstances().subscribe(
      responseList =>{

        let rawRequestsInstances = responseList[0];
        let rawCustomers = responseList[1];

        this.requestsInstances = [];
        rawRequestsInstances.map(
          (item: any)=>{
            let customer = rawCustomers.find(x => x.id == item.customer_id);
            let newRequestInstance = new RequestInstance(item.id, null, null, new Citizen(null, customer.customer_name, null));
            this.requestsInstances.push(newRequestInstance);
          }
        )
      }
    )    

  }

  openRequestsInstance(transactionType: string, requestID: string){

    this.router
        .navigate(
          ['panel-home/requests-list/lusrequest-list-all/request-open/'+transactionType+'/'+requestID]
        );

  }

}
