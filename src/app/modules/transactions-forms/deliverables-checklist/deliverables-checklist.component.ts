import { TransactionsService } from './../../../shared/transactions-service/transactions.service';
import { DocumentsService } from './../../../shared/documents-service/documents.service';
import { Document } from './../../../models/documents/document';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deliverables-checklist',
  templateUrl: './deliverables-checklist.component.html',
  styleUrls: ['./deliverables-checklist.component.scss']
})
export class DeliverablesChecklistComponent implements OnInit {

  requestDocuments: Document[];
  requestInstanceID: number;

  constructor(private documentsService:DocumentsService,
              private transactionsService:TransactionsService) { }

  ngOnInit() {
    this.requestInstanceID = this.transactionsService.defaultRequestInstance.request.id;
    
    this.requestDocuments = [];
    this.documentsService.getRequestDocuments(""+this.requestInstanceID).subscribe(data=>{
      this.requestDocuments=data
      console.log(this.requestDocuments);
    });
  }

  saveChanges(){
    console.log("saving..");
  }

}
