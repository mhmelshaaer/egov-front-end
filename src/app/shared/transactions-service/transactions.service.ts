import { Transaction } from './../../models/transactions/transaction';
import { MOCK_FORMS } from './../../models/forms/forms-mockup';
import { Form } from './../../models/forms/form';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http:Http) { }

  saveTransactions(transactions: Transaction[]) {
    console.log("saving transactions...");
    console.log(transactions);

    return this.http.post(this.webservice+'transactions/fetch',{data: transactions});
  }

  getForms():Form[]{ //return type when using http will be Observable<any[]>
    return MOCK_FORMS;
  }
}
