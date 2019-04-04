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

    this.documentsService.getDocuments().subscribe(data=> this.documents=data);
    this.newDocument = new Document(null, "");
    // console.log(this.documents);

  }

  ngOnDestroy(){
    
    this.documentsService.updateDocuments(this.documents).subscribe();
    // this.documentsService.updateDocuments(this.documents);
  }

  add(){
    if(this.newDocument.name != ""){
      this.newDocument.new_document = true;
      this.documents.push(this.newDocument);
      this.newDocument = new Document(null, "");
    }else{
      console.log('fuck you');
    }
  }

  delete(index: number){

    if(this.documents[index].new_document){
      this.documents.splice(index, 1);
    }else{
      this.documents[index].deleted = true;
    }
    
  }

}
