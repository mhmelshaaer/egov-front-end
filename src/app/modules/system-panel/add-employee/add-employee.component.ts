import { Component, OnInit } from '@angular/core';

import { EmployeesService } from './../../../shared/employees-service/employees.service';
import { DepartmentsService } from './../../../shared/departments-service/departments.service';
import { CitizensService } from './../../../shared/citizens-service/citizens.service';

import { Citizen } from './../../../models/citizen/citizen';
import { Employee } from 'src/app/models/employees/employee';
import { Department } from 'src/app/models/departments/department';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  config: any;

  citizens: Citizen[];
  newCitizen: Citizen;
  newCitizens: Citizen[];
  currSelectOption: Citizen;
  selectedCitizen: Citizen;

  departments: Department[];

  newEmployees: Employee[];
  newEmployee: Employee;

  constructor(private employeesService: EmployeesService, private citizensService: CitizensService, private departmentsService: DepartmentsService) { }

  ngOnInit() {

    this.citizensService.getCitizens().subscribe(data=>{

      this.citizens=data
      
    });
    this.newCitizen = new Citizen(null, "", "");
    this.newCitizens = [];
    this.currSelectOption = null;
    this.selectedCitizen = new Citizen(null, "", "");

    this.departments = this.departmentsService.getDepartments();

    this.newEmployees = [];
    this.newEmployee = new Employee("", null, new Department(""));

    this.config = {
      displayKey:"national_id", //if objects array passed which key to be displayed defaults to description
      search:true, //true/false for the search functionlity defaults to false
      height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'الرقم القومى', // text to be displayed when no item is selected defaults to Select
      customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case
      limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'Can\'t find a citizen with this national id, You can add new citizen below', // text to be displayed when no items are found while searching
      searchPlaceholder:'بحث', // label thats displayed in search input,
      searchOnKey: 'national_id', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
    
  }

  ngOnDestroy(){
    this.employeesService.saveEmployees(this.newCitizens, this.newEmployees).subscribe();
  }

  selectCitizen(){
    this.selectedCitizen = this.currSelectOption? this.currSelectOption: new Citizen(null, "", "");
  }

  addNewCitizen(){
    /**
     * Note here, why we update the citizens array with the concat() and not just by pushing the newCitizen in
     * the array,
     * 
     * **this.citizens.push(this.newCitizen);**
     * 
     * why? because the pipes used in the drop-down search are **pure pipes**, hence **pure function**, so
     * angular won't update the view because in pure pipes angular just check the **reference** of the citizens
     * array, **not its content**, since we did not change the reference, the citizens array object, so angular
     * will not update the view.
     * But, when redefining the citizens array, changing the reference, now angular knows that we did changed
     * the reference, so this results in updating the view.
     * 
     * **reference: https://angular.io/guide/pipes**
     */

    this.citizens = this.citizens.concat(this.newCitizen); //redefining the citizens array
    this.newCitizens.push(this.newCitizen); //on saving changes this new citizens will be sent to back end 
    this.newCitizen = new Citizen(null, "", "");
    
  }

  addNewEmployee(){
    this.newEmployee.citizen = this.selectedCitizen;
    this.newEmployees.push(this.newEmployee);
    this.newEmployee = new Employee("", null, new Department(""));
    this.selectedCitizen = new Citizen(null, "", "");
  }

}
