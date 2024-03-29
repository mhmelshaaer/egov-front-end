import { Request } from './../../models/requests/request';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { HttpParams } from  "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, forkJoin, Subject } from 'rxjs';

import { UsersService } from './../users-service/users.service';

import { Transaction } from './../../models/transactions/transaction';
import { RequestInstance } from './../../models/request-instances/request-instance';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private webservice: String = "http://localhost:8000/api/";

  //a default variables used in components onInit
  defaultRequestInstance: RequestInstance;
  defaultTransaction: Transaction;
  currRequest: Request;
  defaultRequestType: string;

  // observable source
  private requestInstance = new Subject<RequestInstance>();
  private transaction = new Subject<Transaction>();
  private requestType = new Subject<string>();

  // observable stream
  requestInstance$ = this.requestInstance.asObservable();
  transaction$ = this.transaction.asObservable();
  requestType$ = this.requestType.asObservable();

  constructor(private http:Http, private usersService:UsersService) { }

  updateRequestInstanceStream(data: RequestInstance){
    this.requestInstance.next(data);
    this.defaultRequestInstance = data;
  }

  updateTransactionStream(data: Transaction){
    this.transaction.next(data);
    this.defaultTransaction = data;
  }

  updateRequestTypeStream(data: string){
    this.requestType.next(data);
    this.defaultRequestType = data;
  }

  updateRequestStream(data: Request){
    // this.requestType.next(data);
    this.currRequest = data;
  }

  saveRequestInstance(requestInstance: RequestInstance) {
    console.log("saving requestInstance...");
    return this.http.post(this.webservice+'instanceRequest/fetch',{
      data: {request_instance: requestInstance}
    });
  }

  saveTransaction(requestInstanceID: string, transaction: Transaction) {
    console.log("saving Transaction...");
    return this.http.post(this.webservice+'transaction/insert',{
      data: {
        request_instance_id: requestInstanceID, transaction: transaction
      }
    });
  }

  saveLicense(requestInstanceID: string,transactionID: string, lusID: string){
    console.log("saving License...");
    return this.http.post(this.webservice+'license/insert',{
      data: {
        request_instance_id: requestInstanceID, transaction_id: transactionID, lus_id: lusID
      }
    });
  }

  saveBuildingLicense(licenseID: string){
    console.log("saving Build License...");
    return this.http.post(this.webservice+'building-license/insert',{
      data: {
        license_id: licenseID
      }
    });
  }

  saveFeesDetails(requestInstanceID: string, requestStepID: string, feeDetails){
    console.log("saving Build License...");
    return this.http.post(this.webservice+'instance-fees-details/fetch',{
      data: {
        instance_request_id: requestInstanceID, request_step_id: requestStepID, fees_details: feeDetails
      }
    });
  }

  updateTransaction(transactionID: string, transactionAttributes){
    console.log("saving Transaction Attributes...");
    return this.http.post(this.webservice+'transaction/update',{
      data: {
        transaction_id: transactionID, attributes: transactionAttributes
      }
    });
  }

  updateInstanceFees(requestInstanceID: string, instanceFees){
    console.log("saving instance Fees Attributes...");
    return this.http.post(this.webservice+'instance-fees/update',{
      data: {
        instance_request_id: requestInstanceID, attributes: instanceFees
      }
    });
  }

  getRequestsInstancesResponse(): Observable<RequestInstance[]>{
    return this.http.get(this.webservice+'requests-instances/get').pipe(
      map(res=>res.json().requests_instances)
    )
  }

  getRequestInstanceResponse(id: string): Observable<any>{
    return this.http.get(this.webservice+'request-instance/get/'+id).pipe(
      map(res=>res.json())
    )
  }

  getRequestsInstances():Observable<any>{
    let requests_instances = this.getRequestsInstancesResponse();
    let customers = this.usersService.getCustomersResponse();

    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([requests_instances, customers]);
  } 

}
