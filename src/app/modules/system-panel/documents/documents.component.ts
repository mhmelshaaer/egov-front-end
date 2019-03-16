import { Component, OnInit } from '@angular/core';

import { Document } from './../../../models/documents/document';

import { MOCK_DOCUMENTS } from 'src/app/models/documents/documents-mockup';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  documents:Document[]

  constructor() { }

  ngOnInit() {

    this.documents = MOCK_DOCUMENTS;
    console.log(this.documents);

  }

}
