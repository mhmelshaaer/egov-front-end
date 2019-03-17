import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable, Subject, of, throwError} from 'rxjs';

import { Document } from './../../models/documents/document';

import { MOCK_DOCUMENTS } from './../../models/documents/documents-mockup';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private webservice: String;

  constructor(private http:Http) { }

  saveDocuments(documents: Document[]) {
    console.log("saving documents...");
    console.log(documents);
  }

  getDocuments():Document[]{ //return type when using http will be Observable<any[]>
    return MOCK_DOCUMENTS;
  }

}
