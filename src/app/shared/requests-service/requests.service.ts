import { Request } from './../../models/requests/request';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getRequests(): Observable<Request[]>{
    return this.http.get(this.webservice+'requests/get').pipe(
      map(res=>res.json().requests.map( (item: any)=>{
          return new Request(item.request_name, null, null, null, null);
        })
      )
    )
  }

}
