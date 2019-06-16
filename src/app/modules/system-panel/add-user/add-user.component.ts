import { UsersService } from './../../../shared/users-service/users.service';
import { EmployeesService } from './../../../shared/employees-service/employees.service';
import { Component, OnInit } from '@angular/core';

import { Employee } from 'src/app/models/employees/employee';
import { User } from './../../../models/users/user';
import { Role } from 'src/app/models/roles/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  config: any;

  employees: Employee[];
  currSelectOption: Employee;

  newUsers: User[];
  newUser: User;

  roles: Role[];

  constructor(private employeesService: EmployeesService, private usersService: UsersService) { }

  ngOnInit() {

    this.employees = [];

    this.employeesService.getEmployees().subscribe(data=>{this.employees=data; console.log(this.employees)});

    this.currSelectOption = null;

    this.newUsers = [];
    this.newUser = new User(null, "", "", new Role(""));

    this.roles = this.usersService.getRoles();

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

  ngOnDestroy(){
    this.newUsers.length>0? this.usersService.saveUsers(this.newUsers).subscribe(): null;
  }

  selectEmployee(){
    console.log(this.currSelectOption);
  }

  addUser(){
    this.newUser.employee = this.currSelectOption;
    this.newUsers.push(this.newUser)
    this.newUser = new User(null, "", "", new Role(""));
    console.log(this.newUsers);
  }

}
