import { RequestsService } from './../../../shared/requests-service/requests.service';

import { Fee } from './../../../models/fees/fee';
import { Component, OnInit, Input } from '@angular/core';

import { Employee } from './../../../models/employees/employee';

import { EmployeesService } from './../../../shared/employees-service/employees.service';
import { TransactionsService } from 'src/app/shared/transactions-service/transactions.service';


@Component({
  selector: 'initial-fees',
  templateUrl: './initial-fees.component.html',
  styleUrls: ['./initial-fees.component.scss']
})
export class InitialFeesComponent implements OnInit {

  @Input() step: string;

  requestID: number;
  requestInstanceFeesSum: number;
 
  // paymentTypes: PaymentType;
  requestFees: Fee[];
  requestFeeInstances: Fee[];
  employees: Employee[];

  currEmployee: Employee;
  currFee: Fee;

  employeesConfig: any;
  
  constructor(private employeesService: EmployeesService,
              private requestsService:RequestsService,
              private transactionsService:TransactionsService) {}

  ngOnInit() {
    this.requestID = this.transactionsService.defaultRequestInstance.request.id;
    this.requestInstanceFeesSum = 0;
    this.employeesService.getEmployees().subscribe(data=>{this.employees=data; console.log(this.employees)});
    this.requestFeeInstances = [];

    this.currEmployee = null;
    this.currFee = null;

    this.requestsService.getRequestFees(""+this.requestID).subscribe(data=>{
      this.requestFees=data
      console.log(this.requestFees);
    });

    this.employeesConfig = {
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

  initialFeesAdd(){
    console.log("initial fees");
  }

  addRequestFeeInstance(){
    console.log(this.currFee);
    this.requestFeeInstances.push(this.currFee);
    console.log(this.requestFeeInstances);
    this.requestInstanceFeesSum += this.currFee.value;
  }

  /**
   * hna kol instance hn3mlha add fel table hansave al sum bt3ha fel instance_fees_details
   * w hnsave kol item et3mlo add fel table h7otlo instance fel instance_fees
   */

}
