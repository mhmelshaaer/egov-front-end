import { MOCK_FORMS } from './../../models/forms/forms-mockup';
import { Form } from './../../models/forms/form';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http:Http) { }

  saveTransaction() {
  }

  getForms():Form[]{ //return type when using http will be Observable<any[]>
    return MOCK_FORMS;
  }
}
