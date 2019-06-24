import { Transaction } from './../../../models/transactions/transaction';
import { EmployeesService } from './../../../shared/employees-service/employees.service';
import { Employee } from './../../../models/employees/employee';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/transactions-service/transactions.service';
import { TransactionAttributes } from 'src/app/interfaces/transactions-attributes/transaction-attributes';

@Component({
  selector: 'app-deliverables-screening',
  templateUrl: './deliverables-screening.component.html',
  styleUrls: ['./deliverables-screening.component.scss']
})
export class DeliverablesScreeningComponent implements OnInit {

  config: any;

  transactionID: number;
  transactionAttributes: TransactionAttributes;

  employees: Employee[];
  currSelectOption: Employee;
  inspectionStatus: string;
  canceled: boolean;

  constructor(private employeesService: EmployeesService,
              private transactionService:TransactionsService) { }

  ngOnInit() {
    this.transactionID = this.transactionService.defaultTransaction.id;

    this.employees = [];
    this.employeesService.getEmployees().subscribe(data=>{this.employees=data; console.log(this.employees)});
    this.currSelectOption = null;
    this.inspectionStatus = "";
    this.canceled = false;

    this.config = {
      displayKey:"name", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'اسم الموظف', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find a citizen with this national id, You can add new citizen below', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'name', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  }

  selectRadio(el, bool: boolean){
    this.inspectionStatus = el.id;
  }

  saveChanges(){
    this.canceled = this.inspectionStatus == "canceled"? true: false;
    console.log(this.canceled);

    this.initializeTransactionAttributes();
    this.transactionService
        .updateTransaction(""+this.transactionID, this.transactionAttributes)
        .subscribe();
  }

  initializeTransactionAttributes(){
    let newTransactionAttributes: TransactionAttributes = {
      Canceled: this.canceled
    };

    this.transactionAttributes = newTransactionAttributes;
  }

}
