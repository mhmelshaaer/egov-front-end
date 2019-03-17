import { DocumentsService } from './../../../shared/documents-service/documents.service';
import { Component, OnInit } from '@angular/core';

import { Document } from './../../../models/documents/document';

import { MOCK_DOCUMENTS } from 'src/app/models/documents/documents-mockup';

import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt = faTrashAlt;

  documents:Document[]
  newDocument: Document;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {

    this.documents = this.documentsService.getDocuments();
    this.newDocument = new Document("");
    console.log(this.documents);

  }

  ngOnDestroy(){
    
    this.documentsService.saveDocuments(this.documents);
  }

  add(){
    if(this.newDocument.name != ""){
      this.documents.push(this.newDocument);
      this.newDocument = new Document("");
    }else{
      console.log('fuck you');
    }
  }

  delete(index: number){
    this.documents.splice(index, 1);
  }

}
