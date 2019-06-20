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

  saveTransaction(requestInstance: RequestInstance, transaction: Transaction) {
    console.log("saving requestInstance...");
    return this.http.post(this.webservice+'instanceRequest/fetch',{
      data: {
        request_instance: requestInstance, transaction: transaction
      }
    });
  }

  getRequestsInstancesResponse(): Observable<RequestInstance[]>{
    return this.http.get(this.webservice+'requests-instances/get').pipe(
      map(res=>res.json().requests_instances)
    )
  }

  getRequestInstanceResponse(id: string): Observable<any>{

    // let params = new HttpParams();
    // params = params.append('id', id);

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

  // getRequestInstance():Observable<any>{

  //   let response = this.getRequestInstanceResponse();
  //   console.log(response);

  //   // let requests_instances = this.getRequestsInstancesResponse();
  //   // let customers = this.usersService.getCustomersResponse();
  //   // let structure = this.usersService.getCustomersResponse();

  //   // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
  //   return forkJoin([]);
  // } 

}
