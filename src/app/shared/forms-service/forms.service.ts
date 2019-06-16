import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Form } from './../../models/forms/form';
import { MOCK_FORMS } from 'src/app/models/forms/forms-mockup';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private webservice: String = "http://localhost:8000/api/";

  constructor(private http:Http) { }


  updateForms(forms: Form[]) {
    console.log("saving forms...");
    console.log(forms);

    // this.headers.append('Content-Type','application/x-www-form-urlencoded');
    // this.headers.append('Content-Type','application/json');

    return this.http.post(this.webservice+'forms/fetch',{data: forms});
  }

  getForms(): Observable<Form[]>{ //return type when using http will be Observable<Document[]>
    // return MOCK_FORMS;
    return this.http.get(this.webservice+'forms/get').pipe(
      map(res=>res.json()[1].map( (item: any)=>{
          console.log(res.json());
          return new Form(item.id, item.form_name)
        })
      )
    )
  }

}
