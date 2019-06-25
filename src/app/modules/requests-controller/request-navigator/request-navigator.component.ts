import { LandsService } from './../../../shared/lands-service/lands.service';
import { Fee } from './../../../models/fees/fee';
import { Document } from './../../../models/documents/document';
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
import { RequestsService } from 'src/app/shared/requests-service/requests.service';
import { RequestStep } from 'src/app/models/requests/request-step';

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
  address: string;

  requestInstance: RequestInstance;
  transaction: Transaction;
  forms: Form[];
  requestData: Request;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private transactionsService:TransactionsService,
              private requestsService:RequestsService,
              private landsService:LandsService) { }

  ngOnInit() {

    this.requestData = new Request(null, null, null, [], [], []);
    
    this.route.params.subscribe(params =>{
      this.transactionType = params['transaction-type'];
      this.requestInstanceID = params['request-id'];
      this.requestInstanceFormatedID = this.formatID(+this.requestInstanceID);
      console.log(this.transactionType);
    });

    this.requestInstance = new RequestInstance(null,
                                                new Request(null, null, null, null, null, null),
                                                new AddressStructure(null, null, null, null, null),
                                                new Citizen(null, null, null));
    this.transaction = new Transaction(null, null, new Citizen(null, null, null), null);
    this.forms = [];
    this.address = "";

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
        
        // forms.map(item=>{
        //   this.forms.push(new Form(item.id, item.form_name));
        // });

        this.requestsService.getRequestResponseList(""+rawRequest.id).subscribe(responseList=>{
          this.formattingRequestsResponse(responseList);
          this.requestData.steps.sort( (a, b)=> a.order - b.order );
          this.transactionsService.updateRequestStream(this.requestData);
        })

        this.landsService.getCitizenLus(""+this.requestInstance.customer.id, ""+this.transaction.lus.id)
            .subscribe(
              lus => {
                this.transaction.lus.area = lus.area;
                this.transaction.lus.serial = lus.serial;
                this.transaction.lus.structure = lus.structure;
                this.address = lus.structure.accumulated_address+"-"+"قطعة"+"-"+lus.serial;
              }
            )

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


  formattingRequestsResponse(responseList){
    
    let rawRequest = responseList[0].request;
    let rawSteps = responseList[1].steps;
    let rawRequestSteps = responseList[1].request_steps;
    let rawDocuments = responseList[2].documents;
    let rawRequestDocuments = responseList[2].request_documents;
    let rawFees = responseList[3].fees;
    
    let newRequest = new Request(rawRequest.id, rawRequest.request_name, rawRequest.request_parent, [], [], []);

    rawSteps.map((step, i)=>{
      newRequest.steps.push(new RequestStep(rawRequestSteps[i].id, rawRequest.id, new Form(step.id, step.form_name), rawRequestSteps[i].order_number));
    });

    rawDocuments.map((document, i)=>{
      newRequest.documents.push(new Document(document.id, document.document_name, rawRequestDocuments[i].mandatory));
    });

    rawFees.map((fee)=>{
      newRequest.fees.push(new Fee(fee.id, fee.fees_name, fee.default_value));
    });

    this.requestData = newRequest;
  }

}
