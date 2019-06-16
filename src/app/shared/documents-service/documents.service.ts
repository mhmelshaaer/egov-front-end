import { Injectable } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';
import { Observable, Subject, of, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Document } from './../../models/documents/document';

import { MOCK_DOCUMENTS } from './../../models/documents/documents-mockup';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private webservice: String = "http://localhost:8000/api/";
  // private headers: Headers = new Headers();

  constructor(private http:Http) { }

  updateDocuments(documents: Document[]) {
    console.log("saving documents...");
    console.log(documents);

    // this.headers.append('Content-Type','application/x-www-form-urlencoded');
    // this.headers.append('Content-Type','application/json');

    return this.http.post(this.webservice+'documents/fetch',{data: documents});
  }

  getDocuments(): Observable<Document[]>{ //return type when using http will be Observable<Document[]>
    // return MOCK_DOCUMENTS;
    return this.http.get(this.webservice+'documents/get').pipe(
      map(res=>res.json().documents.map( (item: any)=>{
          return new Document(item.id, item.document_name)
        })
      )
    )
  }

}
