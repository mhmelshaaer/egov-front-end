import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';

import { RequestsService } from '../../../shared/requests-service/requests.service';
import { DocumentsService } from './../../../shared/documents-service/documents.service';
import { FeesService } from './../../../shared/fees-service/fees.service';
import { UsersService } from './../../../shared/users-service/users.service';
import { FormsService } from './../../../shared/forms-service/forms.service';

import { Request } from 'src/app/models/requests/request';
import { Form } from './../../../models/forms/form';
import { RequestStep } from '../../../models/requests/request-step';
import { Document } from './../../../models/documents/document';
import { Fee } from './../../../models/fees/fee';
import { Group } from './../../../models/groups/group';

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

  @ViewChildren('requiredStepsCheckboxs') requiredStepsCheckboxs: QueryList<ElementRef>; 
  @ViewChildren('requiredDocumentsCheckboxs') requiredDocumentsCheckboxs: QueryList<ElementRef>; 
  @ViewChildren('mandatoryDocumentsCheckboxs') mandatoryDocumentsCheckboxs: QueryList<ElementRef>; 
  @ViewChildren('requiredFeesCheckboxs') requiredFeesCheckboxs: QueryList<ElementRef>; 

  faUsers = faUsers;
  faListOl = faListOl;

  requests: Request[]

  newRequests: Request[];
  newRequest: Request;

  currSelectedStep: RequestStep;
  currRequest: Request;
  currRequestNameEdit: string;
  currOrganizationName: string;
  // newGroup: Group;
  
  forms: Form[];
  selectedTransactionSteps: RequestStep[];

  documents: Document[];
  selectedDocuments: Document[];

  fees: Fee[];
  selectedFees: Fee[];

  groups: Group[];

  edit: boolean;

  requestsConfig: any;

  /**
   * *** These variales is related to add new group, so it will be removed ***
   */
  // users: GroupUser[];
  // groupSelectedUsers: GroupUser[];
  // users: User[];
  // groupUsers: GroupUser[];
  // groupSelectedUsers: User[];

  availableOrders: number[];

  constructor(private feesService: FeesService,
              private documentsService: DocumentsService,
              private formsService:FormsService,
              private requestsService: RequestsService,
              private usersService: UsersService) { }

  ngOnInit() {
    
    // Defaulte opened tabs
    document.getElementById("requiredStepsDefaultOpen").click();
    // document.getElementById("groupManagementDefaultOpen").click();

    this.edit = false;

    this.requests = [];

    this.requestsService.getRequestsResponse().subscribe(res => {
      res.requests.map(request => {
        this.requestsService.getRequestResponseList(""+request.id).subscribe(responseList=>{
          this.formattingRequestsResponse(responseList);
        })
      });
    });

    this.formsService.getForms().subscribe(data => this.forms=data);
    this.selectedTransactionSteps=[];

    this.documentsService.getDocuments().subscribe(data=>this.documents=data);
    this.selectedDocuments = [];

    this.feesService.getFees().subscribe(data=>this.fees=data);
    this.selectedFees = [];

    this.usersService.getGroups().subscribe(data => {this.groups = data});

    /**
     * *** This variale is related to add new group, so it will be removed ***
     */
    // this.usersService.getUsers().subscribe(data => this.users = data);

    /**
     * *** These variales is related to add new group, so it will be removed ***
     */
    // this.groupUsers = [];
    // this.groupSelectedUsers = [];

    this.availableOrders = [];

    this.currSelectedStep = new RequestStep(null, null, new Form(null, null), null);
    this.currRequest = null;
    this.currRequestNameEdit = "";
    this.currOrganizationName = "";

    /**
     * *** This variale is related to add new group, so it will be removed ***
     */
    // this.newGroup = new Group(null, null, this.groupSelectedUsers);

    this.newRequests = [];
    this.newRequest = new Request(null,
                                  "",
                                  "",
                                  this.selectedTransactionSteps,
                                  this.selectedDocuments,
                                  this.selectedFees);

    this.requestsConfig = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'اسم الطلب', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find a citizen with this national id, You can add new citizen below', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  }

  ngOnDestroy(){
    console.log(this.newRequests);
    console.log(this.requests);

    // this.requestsService.saveRequests(this.requests).subscribe(
    //   ()=> {this.newRequests.length > 0? this.requestsService.saveRequests(this.newRequests).subscribe(): null;}
    // );

  }

  saveChanges(){
    console.log(this.newRequests);
    console.log(this.requests);

    this.requestsService.saveRequests(this.requests).subscribe(
      ()=>{
        this.requests = [];
        if(this.newRequests.length > 0){
          this.requestsService.saveRequests(this.newRequests).subscribe(
            () =>{
              this.newRequests = [];
              this.requestsService.getRequestsResponse().subscribe(res => {
                res.requests.map(request => {
                  this.requestsService.getRequestResponseList(""+request.id).subscribe(responseList=>{
                    this.formattingRequestsResponse(responseList);
                  })
                });
              });
            }
          );
        }else{
          this.requestsService.getRequestsResponse().subscribe(res => {
            res.requests.map(request => {
              this.requestsService.getRequestResponseList(""+request.id).subscribe(responseList=>{
                this.formattingRequestsResponse(responseList);
              })
            });
          });
        }
      }
    );

    document.getElementById("close-step-order-tab").click();
  }

  /*******************************************************************************************************
   ****************************************** Creating Transaction ***************************************
  ********************************************************************************************************/

  /**
   * Creating a new Request
   */
  add(){
    this.newRequest.new_request = true;
    this.newRequests.push(this.newRequest);

    this.selectedTransactionSteps=[];
    this.selectedDocuments = [];
    this.selectedFees = [];
    // this.groupSelectedUsers = [];
    this.availableOrders = [];
    // this.currSelectedStep = new TransactionStep(null, new Form(null, null), [], null);
    this.currSelectedStep = new RequestStep(null, null, new Form(null, null), null);

    this.newRequest = new Request(  null,
                                    "",
                                    "",
                                    this.selectedTransactionSteps,
                                    this.selectedDocuments,
                                    this.selectedFees);

    this.resetCheckboxes();
    document.getElementById("close-step-order-tab").click();
  }

  selectRequest(){
    if(this.currRequest){
      // this.selectedTransactionSteps = this.currRequest.steps;
      this.resetCheckboxes();
      this.selectedTransactionSteps = Object.assign([], this.currRequest.steps);;
      this.selectedDocuments = this.currRequest.documents;
      this.selectedFees = this.currRequest.fees;
      this.currRequestNameEdit = this.currRequest.name;
      this.currOrganizationName = this.currRequest.parent;

      this.selectedTransactionSteps.forEach(step=>{
        this.requiredStepsCheckboxs.find(form=>form.nativeElement.value==step.form.id).nativeElement.checked=true;
      });
      
      this.selectedDocuments.forEach(document=>{
        this.requiredDocumentsCheckboxs.forEach((x, i)=>{
          if(x.nativeElement.value==document.id){
            x.nativeElement.checked=true;
            document.mandatory? this.mandatoryDocumentsCheckboxs.toArray()[i].nativeElement.checked=true: null;
          }
        });
      });

      this.selectedFees.forEach(fee=>{
        this.requiredFeesCheckboxs.find(x=>x.nativeElement.value==fee.id).nativeElement.checked=true;
      });
    }
  }

  saveEdit(){

    this.currRequest?
      this.selectedTransactionSteps.forEach(x=>x.new_request_step? this.currRequest.steps.push(x): null)
      :null;

    this.currRequest.updated = true;
    this.currRequest.name = this.currRequestNameEdit;
    this.currRequest.parent = this.currOrganizationName;
    this.selectedTransactionSteps = [];
    this.selectedDocuments = [];
    this.selectedFees = [];
    this.currRequestNameEdit = "";
    this.currOrganizationName = "";
    this.currRequest = null;
    this.resetCheckboxes();
    document.getElementById("close-step-order-tab").click();
  }

  deleteRequest(){
    this.currRequest.deleted = true;
    this.selectedTransactionSteps = [];
    this.selectedDocuments = [];
    this.selectedFees = [];
    this.currRequest = new Request(null, "اسم الطلب", null, null, null, null);
    this.resetCheckboxes();
  }

  /*******************************************************************************************************
   ******************************************** Fees utilities *******************************************
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
      selectedFee.new_fee = true;
      this.selectedFees.push(selectedFee);
    }else{
      this.selectedFees[deletionIndex].deleted?
        this.selectedFees[deletionIndex].deleted=false
        :this.removeSelectedFee(deletionIndex);
    }
    console.log(this.selectedFees);
  }

  /**
   * 
   * @param index index of fee to be removed from group selectedFees array
   */
  removeSelectedFee(index: number){
    let fee = this.selectedFees[index];

    if(fee.new_fee){
      this.selectedFees.splice(index, 1);
    }else{
      fee.deleted=true;
    }
  }

  selectedFee(index: number){
    let fee = this.fees[index];
    let exists = false;

    if(this.selectedFees.length > 0){
      let selectedFee = this.selectedFees.find(x => x.id==fee.id);
      exists= selectedFee? true: false;
    }
    return exists;
  }


  /*******************************************************************************************************
   ************************************** Documents utilities *******************************************
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
      selectedDocument.new_document=true;
      this.selectedDocuments.push(selectedDocument);
    }else{
      this.selectedDocuments[deletionIndex].deleted?
        this.selectedDocuments[deletionIndex].deleted=false
        :this.removeSelectedDocument(deletionIndex);
      
    }
    
    console.log(this.selectedDocuments);
  }

  /**
   * 
   * @param index index of document to be removed from group selectedDocuments array
   */
  removeSelectedDocument(index: number){
    let document = this.selectedDocuments[index];

    if(document.new_document){
      this.selectedDocuments.splice(index, 1);
    }else{
      document.deleted=true;
      document.mandatory=false;
    }
    // this.mandatoryDocumentsCheckboxs.toArray()[index].nativeElement.checked=false;
    this.mandatoryDocumentsCheckboxs.find(x=>x.nativeElement.value==document.id).nativeElement.checked=false;
  }

  mandatoryDocument(index: number){
    let selectedDocument = this.documents[index];
    let mandatoryDocument = this.selectedDocuments.find(x => x.id == selectedDocument.id);
    mandatoryDocument?mandatoryDocument.mandatory = true: null;

  }

  selectedDocument(index: number, el){

    let document = this.documents[index];
    let exists = false;

    if(this.selectedDocuments.length > 0){
      let selectedDocument = this.selectedDocuments.find(x => x.id==document.id);
      exists= selectedDocument? true: false;

      exists?
        selectedDocument.mandatory?
          el.checked=true
          :null
        :null;
    }
    return exists;
  }

  /*******************************************************************************************************
   ************************************** Transaction step utilities *************************************
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
      let newTransactionStep = new RequestStep(null, null, Object.assign({}, this.forms[index]), null, true);
      this.selectedTransactionSteps.push(newTransactionStep);
    }else{
      this.selectedTransactionSteps[deletionIndex].deleted?
        this.selectedTransactionSteps[deletionIndex].deleted = false
        :this.removeSelectedStep(deletionIndex);
    }
    
    //update available step orders
    this.updateAvailableOrders();
  }

  /**
   * 
   * @param index index of step  to be removed from group selectedTransactionSteps array
   */
  removeSelectedStep(index: number){
    let step = this.selectedTransactionSteps[index];
    // if(!step.id){
      // this.selectedTransactionSteps[index].deleted = true;
      this.currRequest? this.currRequest.steps.find(x=>x.id==step.id).deleted=true: null;
      this.selectedTransactionSteps.splice(index, 1);
    // }else{
      // step.deleted=true;
    // }
  }

  selectedStep(index: number){
    let form = this.forms[index];
    let exists = false;

    if(this.selectedTransactionSteps.length > 0){
      let step = this.selectedTransactionSteps.find(step => step.form.id==form.id);
      exists= step? true: false;
    }
    return exists;
  }

  /*******************************************************************************************************
   ****************************************** Groups utilities *******************************************
  ********************************************************************************************************/
  /**
   * 
   * @param index index of group to be  added to currSelectedStep groups array.
   * Note that if the group is already selected, the group will be removed from currSelectedStep groups array.
   * *** This function is related to selecting transaction step groups, so it will be removed ***
   */
  // selectGroup(event, index: number){

  //   // Prevent the input checkbox from being set checked on click, and make the selectControl directive
  //   // take care of that.
  //   event.preventDefault();

  //   let selectedGroup = this.groups[index];
  //   let deletionIndex: number = -1;

  //   let modifiedTransactionStep = this.selectedTransactionSteps.find(x => x.form.id == this.currSelectedStep.form.id);

  //   if(modifiedTransactionStep.groups.length > 0){
  //     modifiedTransactionStep.groups.forEach((group, i) => group.id == selectedGroup.id ? deletionIndex=i: null);
  //   }

  //   if(deletionIndex < 0) modifiedTransactionStep.groups.push(this.groups[index]);
  //   else this.removeSelectedGroup(modifiedTransactionStep, deletionIndex);
    
    
  //   this.currSelectedStep = modifiedTransactionStep;

  // }
  
  /**
   * 
   * @param index index of group  to be removed from currSelectedStep groups array.
   * *** This function is related to selecting transaction step groups, so it will be removed ***
   */
  // removeSelectedGroup(TransactionStep: TransactionStep, index: number){
  //   TransactionStep.groups.splice(index, 1);
  // }

  /**
   * 
   * @param index index of group user to be added to groupSelectedUsers array.
   * Note that if the user is already selected, the user will be removed from groupSelectedUsers array.
   * 
   * *** This function is related to add new group, so it will be removed ***
   */
  // selectGroupUser(index: number){
  //   let selectedGroupUser = this.users[index];
  //   let deletionIndex: number = -1;

  //   this.groupSelectedUsers.forEach((groupUser, i) => groupUser.id == selectedGroupUser.id ? deletionIndex=i: null);

  //   if(deletionIndex < 0){

  //     this.groupSelectedUsers.push(this.users[index]); 

  //   }else{
  //     this.removeGroupUser(deletionIndex);
  //   }

  // }

  /**
   * 
   * @param index index of group user to be removed from group groupSelectedUsers array
   * 
   * *** This function is related to add new group, so it will be removed ***
   */
  // removeGroupUser(index: number){
  //   this.groupSelectedUsers.splice(index, 1);
  // }

  /**
   * Add new group
   * 
   * *** This function will be deleted because group management moved to other part of the system ***
   */
  // addNewGroup(){
  //   let group = new Group(null, this.newGroup.name, this.newGroup.members);
  //   this.groups.push(group);
  //   this.groupSelectedUsers.forEach(SelectedUser => SelectedUser.groups.push(group.name));

  //   this.newGroup.name = null;
  //   this.groupSelectedUsers = [];

  //   let checkboxes = document.getElementById('add-new-group-table').getElementsByTagName('input');

  //   for(let i=0; i<checkboxes.length; i++){
  //     checkboxes[i].checked = false;
  //   }

  // }

  /**
   * return true if the goup with group_id is selected
   * *** This function is related to selecting transaction step groups, so it will be removed ***
   */
  // selected(group_id: number): boolean{

  //   let selected = false;

  //   if(this.currSelectedStep.groups.length > 0 ){
  //     this.currSelectedStep.groups.forEach(x=> x.id==group_id? selected = true: null);
  //   }else{
  //     return selected;
  //   }

  //   return selected;

  // }

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

    let currentForm = this.forms[index];
    
    //Setting the current selected step
    this.currSelectedStep = this.selectedTransactionSteps.find(x=>x.form.id==currentForm.id);

    //opening the current selected TransactionStep instance group management tab
    this.openTab(evt, tabClassName, linkClassName, terget, display);

  }

  /*******************************************************************************************************
   ********************************** Transaction step order utilities ***********************************
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

    //check if the current step is not new one to change its order in the original instance
    if(this.currSelectedStep.id){
      let updatedOldStep = this.currRequest.steps.find(x=>x.id==this.currSelectedStep.id);
      updatedOldStep.order = order;
      updatedOldStep.updated = true;
    }

    //update available step orders
    this.updateAvailableOrders();

  }

  updateAvailableOrders(){

    //Reset the array
    this.availableOrders = [];

    //Looping through each possible order and decide whether to be added to the availableOrders array for the
    //current selected step or not
    for(let stepOrder=1; stepOrder<=this.selectedTransactionSteps.length; stepOrder++){

      //flag sets to true if the stepOrder is already taken by some RequestStep instance
      let exists = false;

      //looping through to see if there exist a RequestStep instance having this stepOrder
      this.selectedTransactionSteps
          .forEach( (x)=> x.order?
                            x.order==stepOrder && this.currSelectedStep.order!=x.order?
                              exists=true
                              :null
                            :null);

      //add the stepOrder to the availableOrder array if it does not set for any other RequestStep
      //instance or if the current RequestStep instance is the one having this stepOrder                            
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

  toggleEdit(){
    this.edit = !this.edit;
    this.selectedTransactionSteps = [];
    this.selectedDocuments = [];
    this.selectedFees = [];
    this.currRequestNameEdit = "";
    this.updateAvailableOrders();
    this.resetCheckboxes();
    document.getElementById("close-step-order-tab").click();
  }

  resetCheckboxes(){
    let checkboxes = document.getElementsByTagName('input');

    for(let i=0; i<checkboxes.length; i++){
      checkboxes[i].checked = false;
    }
  }

  formattingRequestsResponse(responseList){
    
    let rawRequest = responseList[0].request;
    let rawSteps = responseList[1].steps;
    let rawRequestSteps = responseList[1].request_steps;
    let rawDocuments = responseList[2].documents;
    let rawRequestDocuments = responseList[2].request_documents;
    let rawFees = responseList[3].fees;
    
    let newRequest = new Request(rawRequest.id, rawRequest.request_name, rawRequest.request_parent, [], [], []);

    rawSteps.map((step, i)=>{
      newRequest.steps.push(new RequestStep(rawRequestSteps[i].id, rawRequest.id, new Form(step.id, step.form_name), rawRequestSteps[i].order_number));
    });

    rawDocuments.map((document, i)=>{
      newRequest.documents.push(new Document(document.id, document.document_name, rawRequestDocuments[i].mandatory));
    });

    rawFees.map((fee)=>{
      newRequest.fees.push(new Fee(fee.id, fee.fees_name, fee.default_value));
    });

    this.requests = this.requests.concat([newRequest]);
  }

}
