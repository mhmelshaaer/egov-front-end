import { Fee } from './../../models/fees/fee';
import { Request } from './../../models/requests/request';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http:Http) { }

  saveRequests(requests: Request[]) {
    console.log("saving requests...");
    console.log(requests);

    return this.http.post(this.webservice+'requests/fetch',{data: requests});
  }


  /*****************************************
   * Request Functions
   ******************************************/

  getRequestsResponse(): Observable<any>{
    return this.http.get(this.webservice+'requests/get').pipe(
      map(res=>res.json())
    )
  }

  getRequests(): Observable<Request[]>{
    return this.http.get(this.webservice+'requests/get').pipe(
      map(res=>res.json().requests.map( (item: any)=>{
          return new Request(item.id, item.request_name, null, null, null, null);
        })
      )
    )
  }

  getRequestResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request/get/' + requestID).pipe(
      map(res=>res.json())
    )
  }

  getRequestStepsResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request-steps/get/' + requestID).pipe(
      map(res=>res.json())
    )
  }

  getRequestDocumentsResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request-documents/get/' + requestID).pipe(
      map(res=>res.json())
    )
  }

  getRequestFeesResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request-fees/get/' + requestID).pipe(
      map(res=>res.json())
    )
  }

  getRequestFees(requestID: string): Observable<Fee[]>{
    return this.http.get(this.webservice+'request-fees/get/' + requestID).pipe(
      map(res=>res.json().fees.map( (item: any)=>{
          return new Fee(item.id, item.fees_name, item.default_value);
        })
      )
    )
  }

  getRequestResponseList(requestID: string):Observable<any[]>{

    let request = this.getRequestResponse(requestID);
    let request_steps = this.getRequestStepsResponse(requestID);
    let request_documents = this.getRequestDocumentsResponse(requestID);
    let request_fees = this.getRequestFeesResponse(requestID);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([request, request_steps, request_documents, request_fees]);
  }


  /*****************************************
   * Request Instance Functions
   ******************************************/
  getRequestInstanceResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request/get' + requestID).pipe(
      map(res=>res.json())
    )
  }

  getRequestInstanceDocumentsResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request-documents/get/' + requestID).pipe(
      map(res=>res.json())
    )
  }

  getRequestInstanceFeesResponse(requestID: string): Observable<any>{
    return this.http.get(this.webservice+'request-fees/get/' + requestID).pipe(
      map(res=>res.json())
    )
  }

}
