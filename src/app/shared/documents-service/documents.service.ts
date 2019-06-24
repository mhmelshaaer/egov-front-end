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

    return this.http.post(this.webservice+'documents/fetch',{data: documents});
  }

  getDocuments(): Observable<Document[]>{
    return this.http.get(this.webservice+'documents/get').pipe(
      map(res=>res.json().documents.map( (item: any)=>{
          return new Document(item.id, item.document_name)
        })
      )
    )
  }

  getRequestDocuments(request_id: string): Observable<Document[]>{
    return this.http.get(this.webservice+'documents/get/' + request_id).pipe(
      map(res=>res.json().documents.map( (item: any)=>{
          let requestDocument = res.json().request_documents.find(x=>x.document_id==item.id)
          return new Document(item.id, item.document_name, requestDocument.mandatory);
        })
      )
    )
  }

}
