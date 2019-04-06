import { Component, OnInit } from '@angular/core';

import { TransactionsService } from './../../../shared/transactions-service/transactions.service';
import { DocumentsService } from './../../../shared/documents-service/documents.service';
import { FeesService } from './../../../shared/fees-service/fees.service';
import { UsersService } from './../../../shared/users-service/users.service';

import { Form } from './../../../models/forms/form';
import { TransactionStep } from './../../../models/transactions/transaction-step';
import { Document } from './../../../models/documents/document';
import { Fee } from './../../../models/fees/fee';
import { User } from './../../../models/users/user';
import { Group } from './../../../models/groups/group';

import {
  faUsers,
  faListOl
} from '@fortawesome/free-solid-svg-icons';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  faUsers = faUsers;
  faListOl = faListOl;

  currSelectedStep: TransactionStep;
  newGroup: Group;
  
  forms: Form[];
  selectedTransactionSteps: TransactionStep[];

  documents: Document[];
  selectedDocuments: Document[];

  fees: Fee[];
  selectedFees: Fee[];

  groups: Group[];
  selectedGroups: Group[];

  users: User[];
  groupSelectedUsers: User[];

  availableOrders: number[];
  // currentAvailableOrder: number[]

  constructor(private feesService: FeesService,
              private documentsService: DocumentsService,
              private transactionsService: TransactionsService,
              private usersService: UsersService) { }

  ngOnInit() {
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("requiredStepsDefaultOpen").click();
    document.getElementById("groupManagementDefaultOpen").click();

    this.forms = this.transactionsService.getForms();
    this.selectedTransactionSteps=[];

    this.documentsService.getDocuments().subscribe(data=>this.documents=data);
    this.selectedDocuments = [];

    this.feesService.getFees().subscribe(data=>this.fees=data);
    this.selectedFees = [];

    this.groups = this.usersService.getGroups();
    this.selectedGroups = [];

    this.users = this.usersService.getUsers();
    this.groupSelectedUsers = [];

    this.availableOrders = [];
    // this.currentAvailableOrder = [];

    this.currSelectedStep = new TransactionStep(null, new Form(null), null, null);
    this.newGroup = new Group(null, this.groupSelectedUsers);

  }


  /*******************************************************************************************************
   ********************************************* Fees utilities ******************************************
  ********************************************************************************************************/
  /**
   * 
   * @param index index of fee to be  added to selectedFees array.
   * Note that if the fee is already selected, the fee will be removed from selectedFees array.
   */
  selectFee(index: number){
    let selectedFee = this.fees[index];
    let deletionIndex: number = -1;

    this.selectedFees.forEach( (fee, i) => fee.id == selectedFee.id? deletionIndex=i: null);

    if(deletionIndex < 0) {
      this.selectedFees.push(selectedFee);
    }else{
      this.removeSelectedFee(deletionIndex);
    }
  }

  /**
   * 
   * @param index index of fee to be removed from group selectedFees array
   */
  removeSelectedFee(index: number){
    this.selectedFees.splice(index, 1);
  }


  /*******************************************************************************************************
   **************************************** Documents utilities ******************************************
  ********************************************************************************************************/
 /**
   * 
   * @param index index of document to be  added to selectedDocuments array.
   * Note that if the document is already selected, the document will be removed from selectedDocuments array.
   */
  selectDocument(index: number){

    let selectedDocument = this.documents[index];
    let deletionIndex: number = -1;

    this.selectedDocuments.forEach( (document, i) => document.id == selectedDocument.id? deletionIndex=i: null);

    if(deletionIndex < 0) {
      this.selectedDocuments.push(selectedDocument);
    }else{
      this.removeSelectedDocument(deletionIndex);
    }
    console.log(this.selectedDocuments);
  }

  /**
   * 
   * @param index index of document to be removed from group selectedDocuments array
   */
  removeSelectedDocument(index: number){
    this.selectedDocuments.splice(index, 1);
  }

  /*******************************************************************************************************
   *************************************** Transaction step utilities ************************************
  ********************************************************************************************************/
  /**
   * 
   * @param index index of step(form) to be  added to selectedTransactionSteps array.
   * Note that if the step is already selected, the step will be removed from selectedTransactionSteps array.
   */
  selectStep(index: number){
    let selectedTransactionStep = this.forms[index];
    let deletionIndex: number = -1;

    this.selectedTransactionSteps
        .forEach((transactionStep, i) => transactionStep.form.id == selectedTransactionStep.id? deletionIndex=i: null);

    if(deletionIndex < 0) {
      this.selectedTransactionSteps.push(new TransactionStep(null, Object.assign({}, this.forms[index]), null, null));
    }else{
      this.removeSelectedStep(deletionIndex);
    }
    
    // this.availableOrders= [];
    // this.selectedTransactionSteps
    //     .forEach( (selectedTransactionStep, i) => selectedTransactionStep.order == null?
    //                                                 this.availableOrders.push(i+1):
    //                                                 null);

    console.log(this.selectedTransactionSteps);
    console.log(this.availableOrders);
  }

  /**
   * 
   * @param index index of step  to be removed from group selectedTransactionSteps array
   */
  removeSelectedStep(index: number){
    this.selectedTransactionSteps.splice(index, 1);
  }

  /*******************************************************************************************************
   *************************************** Groups utilities **********************************************
  ********************************************************************************************************/
  /**
   * 
   * @param index index of group to be  added to selectedGroups array.
   * Note that if the group is already selected, the group will be removed from selectedGroups array.
   */
  selectGroup(index: number){
    let selectedGroup = this.groups[index];
    let deletionIndex: number = -1;

    this.selectedGroups.forEach((group, i) => group.id == selectedGroup.id ? deletionIndex=i: null);

    if(deletionIndex < 0) this.selectedGroups.push(this.groups[index]);
    else this.removeSelectedGroup(deletionIndex);
    
    let modifiedTransactionStep = this.selectedTransactionSteps.find(x => x.id == this.currSelectedStep.form.id);
    modifiedTransactionStep.groups = this.selectedGroups;

    console.log(this.selectedTransactionSteps);

  }
  
  /**
   * 
   * @param index index of group  to be removed from group selectedGroups array
   */
  removeSelectedGroup(index: number){
    this.selectedGroups.splice(index, 1);
  }

  /**
   * 
   * @param index index of group user to be added to groupSelectedUsers array.
   * Note that if the user is already selected, the user will be removed from groupSelectedUsers array.
   */
  selectGroupUser(index: number){
    let selectedGroupUser = this.users[index];
    let deletionIndex: number = -1;

    this.groupSelectedUsers.forEach((groupUser, i) => groupUser.id == selectedGroupUser.id ? deletionIndex=i: null);

    if(deletionIndex < 0) this.groupSelectedUsers.push(this.users[index]);
    else this.removeGroupUser(deletionIndex);

    console.log(this.groupSelectedUsers);
  }

  /**
   * 
   * @param index index of group user to be removed from group groupSelectedUsers array
   */
  removeGroupUser(index: number){
    this.groupSelectedUsers.splice(index, 1);
  }

  /**
   * Add new group
   */
  addNewGroup(){
    let group = new Group(this.newGroup.name, this.newGroup.members);
    this.groups.push(group);
    this.groupSelectedUsers.forEach(SelectedUsers => SelectedUsers.groups.push(group.name));

    this.newGroup.name = null;
    this.groupSelectedUsers = [];

    let checkboxes = document.getElementById('add-new-group-table').getElementsByTagName('input');

    for(let i=0; i<checkboxes.length; i++){
      checkboxes[i].checked = false;
    }

    console.log(this.newGroup, this.groupSelectedUsers);
  }

  /**
   * 
   * @param index index of the current step
   * @param evt the click event
   * @param tabClassName tabs class name to control current tab visibility
   * @param linkClassName tab links class
   * @param terget default tab to be active
   * @param display optional display css property
   */
  manageGroups(index, evt, tabClassName, linkClassName, terget, display="block"){

    //Setting the current selected step
    this.currSelectedStep.form = this.forms[index];

    //opening the current selected TransactionStep instance group management tab
    this.openTab(evt, tabClassName, linkClassName, terget, display);

  }

  /*******************************************************************************************************
   *********************************** Transaction step order utilities **********************************
  ********************************************************************************************************/
  /**
   * 
   * @param index index of the current step
   * @param evt the click event
   * @param tabClassName tabs class name to control current tab visibility
   * @param linkClassName tab links class
   * @param terget default tab to be active
   * @param display optional display css property
   */
  manageOrder(index, evt, tabClassName, linkClassName, terget, display="block"){

    //Setting the current selected step
    this.currSelectedStep = this.selectedTransactionSteps.find(x=>x.form.id == this.forms[index].id);

    //update available step orders
    this.updateAvailableOrders();
                                         
    //opening the current selected TransactionStep instance order management tab
    this.openTab(evt, tabClassName, linkClassName, terget, display);

  }

  selectOrder(order: number){

    //Set the step order for the TransactionStep instance in the selectedTransactionSteps array
    let modifiedTransactionStep = this.selectedTransactionSteps.find(x => x.form.id == this.currSelectedStep.form.id);
    modifiedTransactionStep.order = order;

    //Set the step order for the currSelectedStep
    this.currSelectedStep.order = order;

    //update available step orders
    this.updateAvailableOrders();

  }

  updateAvailableOrders(){

    //Reset the array
    this.availableOrders = [];

    //Looping through each possible order and decide whether to be added to the availableOrders array for the
    //current selected step or not
    for(let stepOrder=1; stepOrder<=this.selectedTransactionSteps.length; stepOrder++){

      //flag sets to true if the stepOrder is already taken by some TransactionStep instance
      let exists = false;

      //looping through to see if there exist a TransactionStep instance having this stepOrder
      this.selectedTransactionSteps
          .forEach( (x)=> x.order?
                            x.order==stepOrder && this.currSelectedStep.order!=x.order?
                              exists=true
                              :null
                            :null);

      //add the stepOrder to the availableOrder array if it does not set for any other TransactionStep
      //instance or if the current TransactionStep instance is the one having this stepOrder                            
      !exists? this.availableOrders.push(stepOrder): null;
    }
  }

  clearStepOrder(){
    //Clear the step order for the TransactionStep instance in the selectedTransactionSteps array
    let modifiedTransactionStep = this.selectedTransactionSteps.find(x => x.form.id == this.currSelectedStep.form.id);
    modifiedTransactionStep.order = null;

    //Clear the step order for the TransactionStep instance
    this.currSelectedStep.order = null;

    //update availableOrders array
    this.updateAvailableOrders();

    console.log(this.availableOrders);
  }

  /**
   * 
   * @param evt click event
   * @param tabClassName tabs class name to control current tab visibility
   * @param linkClassName tab links class
   * @param terget default tab to be active
   * @param display optional display css property
   */
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

  /**
   * 
   * @param terget target tab to be displayed none
   */
  closeTab(terget){
      document.getElementById(terget).style.display = "none";
  }

}
