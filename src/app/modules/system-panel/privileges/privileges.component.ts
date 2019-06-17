import { FormsService } from './../../../shared/forms-service/forms.service';
import { UsersService } from 'src/app/shared/users-service/users.service';
import { PrivilegesService } from './../../../shared/privileges-service/privileges.service';
import { Component, OnInit } from '@angular/core';


import { Privilege } from 'src/app/models/privileges/Privilege';

import {
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { Module } from 'src/app/models/modules/Module';
import { Form } from 'src/app/models/forms/form';
import { Group } from 'src/app/models/groups/group';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss']
})
export class PrivilegesComponent implements OnInit {

  //Fontawesome icons
  faTrashAlt=faTrashAlt;

  privileges: Privilege[];
  newPrivilege: Privilege;

  forms: Form[];
  groups: Group[];

  constructor(private privilegesService:PrivilegesService,
              private usersService:UsersService,
              private formsService:FormsService) { }

  ngOnInit() {

    this.privilegesService.getPrivileges().subscribe(data => {this.privileges = data; console.log(this.privileges);})
    this.newPrivilege = new Privilege(null, "", new Module(0, ""), new Form(0, ""), new Group(0, ""));

    this.usersService.getGroups().subscribe(data => {this.groups = data});
    this.formsService.getForms().subscribe(data => {this.forms = data});

  }

  ngOnDestroy(){
    console.log(this.privileges);
    this.privilegesService.savePrivileges(this.privileges).subscribe();
  }

  add(){  

    this.newPrivilege.new_privilege = true;
    this.privileges.push(this.newPrivilege);
    this.newPrivilege = new Privilege(null, "", new Module(0, ""), new Form(0, ""), new Group(0, ""));

    let checkboxes = document.getElementsByTagName('input');

    for(let i=0; i<checkboxes.length; i++){
      checkboxes[i].checked = false;
    }

  }

  hello(){
    console.log("hello");
  }

  deletePrivilege(index: number){
    
    if(this.privileges[index].new_privilege){
      this.privileges.splice(index, 1);
    }else{
      this.privileges[index].deleted = true;
    }
    
  }

  toggleDelete(value){
    this.newPrivilege.delete_operations = value;
  }
  toggleUpdate(value){
    this.newPrivilege.update_operations = value;
  }
  toggleInsert(value){
    this.newPrivilege.insert_operations = value;
  }
}
