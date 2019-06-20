import { AddressStructure } from './../../../models/address-structures/AddressStructure';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/shared/transactions-service/transactions.service';
import { RequestInstance } from 'src/app/models/request-instances/request-instance';
import { Citizen } from 'src/app/models/citizen/citizen';
import { Request } from 'src/app/models/requests/request';

@Component({
  selector: 'app-request-navigator',
  templateUrl: './request-navigator.component.html',
  styleUrls: ['./request-navigator.component.scss']
})
export class RequestNavigatorComponent implements OnInit {

  transactionType: string;
  requestInstanceID: string;

  requestInstance: RequestInstance;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private transactionsService:TransactionsService) { }

  ngOnInit() {

    this.route.params.subscribe(params =>{
      this.transactionType = params['transaction-type'];
      this.requestInstanceID = params['request-id'];
      console.log(this.transactionType);
    });

    this.requestInstance = null;

    this.transactionsService.getRequestInstanceResponse(this.requestInstanceID).subscribe(
      responseList =>{

        console.log(responseList);

        let rawRequestsInstance = responseList.instance_request;
        let rawCustomer = responseList.customer;
        let rawRequest = responseList.request;
        let rawStructure = responseList.structure;

        this.requestInstance = new RequestInstance( rawRequestsInstance.id,
                                                    new Request(rawRequest.request_name, null, null, null, null),
                                                    new AddressStructure(rawStructure.id, rawStructure.acc_code, rawStructure.acc_address, null, null),
                                                    new Citizen(null, rawCustomer.customer_name, rawCustomer.citizen_national_id));

        console.log(this.requestInstance);
      }
    )   

  }

  openSelectedStep(event){
    this.router
          .navigate(
            [event.target.value],
            {relativeTo: this.route}
          );
  }

  goBack(){
    this.router.navigate(['/panel-home/requests-list']);
  }

}
