import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable, Subject, of, throwError} from 'rxjs';

import { Fee } from './../../models/fees/fee';

import { MOCK_FEES } from 'src/app/models/fees/fees-mockup';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  private webservice: String;

  constructor(private http:Http) { }

  saveFees(fees: Fee[], modified_fees: Fee[]) {
    console.log("saving fees...");
    console.log(fees);
    console.log(modified_fees);
  }

  getFees():Fee[]{ //return type when using http will be Observable<any[]>
    return MOCK_FEES;
  }

}
