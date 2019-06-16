import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable, Subject, of, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Fee } from './../../models/fees/fee';

import { MOCK_FEES } from 'src/app/models/fees/fees-mockup';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http:Http) { }

  saveFees(fees: Fee[]) {
    console.log("saving fees...");
    console.log(fees);

    return this.http.post(this.webservice+'fees/fetch',{data: fees});
  }

  getFees(): Observable<Fee[]>{ //return type when using http will be Observable<any[]>
    // return MOCK_FEES;
    return this.http.get(this.webservice+'fees/get').pipe(
      map(res=>res.json().fees.map( (item: any)=>{
          return new Fee(item.id, item.fees_name, item.default_value)
        })
      )
    )
  }

}
