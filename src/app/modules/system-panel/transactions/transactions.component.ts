import { TransactionStep } from './../../../models/transactions/transaction-step';
import { Component, OnInit } from '@angular/core';

import { TransactionsService } from './../../../shared/transactions-service/transactions.service';
import { DocumentsService } from './../../../shared/documents-service/documents.service';
import { FeesService } from './../../../shared/fees-service/fees.service';

import { Form } from './../../../models/forms/form';
import { Document } from './../../../models/documents/document';
import { Fee } from './../../../models/fees/fee';

import {
  faUsers,
  faListOl
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  faUsers = faUsers;
  faListOl = faListOl;

  currSelectedStep: String;
  
  forms: Form[];
  selectedTransactionSteps: TransactionStep[];

  documents: Document[];
  selectedDocuments: Document[];

  fees: Fee[];
  selectedFees: Fee[];

  constructor(private feesService: FeesService,
              private documentsService: DocumentsService,
              private transactionsService: TransactionsService) { }

  ngOnInit() {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("requiredStepsDefaultOpen").click();
    document.getElementById("groupManagementDefaultOpen").click();

    this.currSelectedStep = null;

    this.forms = this.transactionsService.getForms();
    this.selectedTransactionSteps=[];

    this.documents = this.documentsService.getDocuments();
    this.selectedDocuments = [];

    this.fees = this.feesService.getFees();
    this.selectedFees = [];

    console.log(
      this.forms,
      this.documents,
      this.fees
    );
  }

  selectFee(index: number){
    this.selectedFees.push(this.fees[index]);
  }

  selectDocument(index: number){
    this.selectedDocuments.push(this.documents[index]);
  }

  selectStep(index){
    this.selectedTransactionSteps.push(new TransactionStep(null, this.forms[index], null, null));
    console.log(this.selectedTransactionSteps);
  }

  selectGroups(index, evt, tabClassName, linkClassName, terget, display="block"){
    this.currSelectedStep = this.forms[index].name;
    this.openTab(evt, tabClassName, linkClassName, terget, display);
  }

  selectOrder(index, evt, tabClassName, linkClassName, terget, display="block"){
    this.currSelectedStep = this.forms[index].name;
    this.openTab(evt, tabClassName, linkClassName, terget, display);
  }

  openTab(evt, tabClassName, linkClassName, terget, display="block") {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(tabClassName);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName(linkClassName);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(terget).style.display = display;
    evt.currentTarget.className += " active";
  }

  closeTab(terget){
      document.getElementById(terget).style.display = "none";
  }

}
