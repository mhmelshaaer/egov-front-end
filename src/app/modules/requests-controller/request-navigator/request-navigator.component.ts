import { EngineersService } from './../../../shared/engineers-service/engineers.service';
import { Form } from './../../../models/forms/form';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { TransactionsService } from 'src/app/shared/transactions-service/transactions.service';

import { Transaction } from 'src/app/models/transactions/transaction';
import { AddressStructure } from './../../../models/address-structures/AddressStructure';
import { RequestInstance } from 'src/app/models/request-instances/request-instance';
import { Citizen } from 'src/app/models/citizen/citizen';
import { Request } from 'src/app/models/requests/request';
import { Lus } from 'src/app/models/lus/lus';

@Component({
  selector: 'app-request-navigator',
  templateUrl: './request-navigator.component.html',
  styleUrls: ['./request-navigator.component.scss']
})
export class RequestNavigatorComponent implements OnInit {

  REQUEST_ID_LENGTH: number = 10;
  requestInstanceFormatedID: string;

  transactionType: string;
  requestInstanceID: string;

  requestInstance: RequestInstance;
  transaction: Transaction;
  forms: Form[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private transactionsService:TransactionsService) { }

  ngOnInit() {

    this.route.params.subscribe(params =>{
      this.transactionType = params['transaction-type'];
      this.requestInstanceID = params['request-id'];
      this.requestInstanceFormatedID = this.formatID(+this.requestInstanceID);
      console.log(this.transactionType);
    });

    this.requestInstance = null;
    this.transaction = null;
    this.forms = [];

    this.transactionsService.getRequestInstanceResponse(this.requestInstanceID).subscribe(
      responseList =>{

        let rawRequestsInstance = responseList.instance_request;
        let rawTransaction = responseList.transaction;
        let rawCustomer = responseList.customer; //returned in the response but i'm not using it
        let rawCitizen = responseList.citizen;
        let rawRequest = responseList.request;
        let rawStructure = responseList.structure;
        let rawAgency = responseList.agency;
        let forms = responseList.forms;

        this.requestInstance = new RequestInstance( rawRequestsInstance.id,
                                                    new Request(rawRequest.id, rawRequest.request_name, null, null, null, null),
                                                    new AddressStructure(rawStructure.id, rawStructure.acc_code, rawStructure.acc_address, null, null),
                                                    new Citizen(rawCitizen.id, rawCitizen.citizen_name, rawCitizen.citizen_national_id));

        this.transaction = new Transaction( rawTransaction.id,
                                            null,
                                            new Citizen(rawAgency.id, rawAgency.citizen_name, rawAgency.citizen_national_id),
                                            new Lus(rawTransaction.LUS_id, null, null, null),
                                            rawTransaction.License_Id);


        this.transactionsService.updateRequestInstanceStream(this.requestInstance);
        this.transactionsService.updateTransactionStream(this.transaction);
        
        forms.map(item=>{
          this.forms.push(new Form(item.id, item.form_name));
        });
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

  formatID(id: number){

    let strID: string = ""+id;
    let remainingDigits = this.REQUEST_ID_LENGTH - strID.length;

    for(let i=0; i<remainingDigits; i++){
      strID = '0' + strID;
    }

    return strID;
  }

  goBack(){
    this.router.navigate(['/panel-home/requests-list']);
  }

}
