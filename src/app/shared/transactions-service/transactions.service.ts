import { UsersService } from './../users-service/users.service';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { HttpParams } from  "@angular/common/http";
import { Injectable } from '@angular/core';
import { RequestInstance } from 'src/app/models/request-instances/request-instance';
import { Transaction } from 'src/app/models/transactions/transaction';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http:Http, private usersService:UsersService) { }

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
