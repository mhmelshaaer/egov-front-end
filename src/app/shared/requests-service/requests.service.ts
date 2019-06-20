import { Request } from '../../models/requests/request';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

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

}
